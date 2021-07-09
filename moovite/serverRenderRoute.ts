import { RequestHandler } from "express-serve-static-core";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { ViteDevServer } from "vite";
import { pageLoader } from "./pageLoader";
import { urlToFileName } from "./urlToFilePath";
import { PrismaClient } from "@prisma/client";
import { StaticRouter } from "react-router-dom";
const prisma = new PrismaClient();

type Props = {
  vite: ViteDevServer;
};

export const serverRenderRoute =
  ({ vite }: Props): RequestHandler =>
  async (req, res) => {
    const url = req.originalUrl;

    //bail out for other file types, add express routes above this for static files
    if (url.includes(".")) {
      res.statusCode = 404;
      return res.send();
    }

    try {
      let { template, getServerSideProps } = await pageLoader({
        url,
        vite,
      });

      // todo make this do the production way differently
      const { App } = await vite.ssrLoadModule(`/moovite/entry.tsx`);

      let props = {};
      if (getServerSideProps) props = await getServerSideProps({ prisma });

      let index = await vite.ssrLoadModule(`/src/pages/index.tsx`);
      let test = await vite.ssrLoadModule(`/src/pages/test.tsx`);
      const routes = [
        {
          path: "/",
          exact: true,
          component: index.default,
        },
        {
          path: "/test",
          component: test.default,
        },
      ];

      const appHtml = await ReactDOMServer.renderToString(
        React.createElement(
          StaticRouter,
          { location: req.originalUrl },
          React.createElement(App, {
            pageProps: props,
            routes,
          })
        )
      );

      // 5. Inject the app-rendered HTML into the template.
      const html = template
        .replace(`<!--app-html-->`, appHtml)
        .replace(
          "</head>",
          `<script type="text/javascript">window._MOOVITE_PROPS_ = ${JSON.stringify(
            props
          )}</script></head>`
        );

      // 6. Send the rendered HTML back.
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      // If an error is caught, let vite fix the stracktrace so it maps back to
      // your actual source code.
      vite.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end(e.message);
    }
  };
