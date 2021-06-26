import fs from "fs";
import path from "path";
import express from "express";
import { createServer as createViteServer, send } from "vite";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { pageLoader } from "./server/pageLoader";
import { urlToFileName } from "./server/urlToFilePath";
import reactRefresh from "@vitejs/plugin-react-refresh";

async function createServer() {
  const app = express();

  // Create vite server in middleware mode. This disables Vite's own HTML
  // serving logic and let the parent server take control.
  //
  // If you want to use Vite's own HTML serving logic (using Vite as
  // a development middleware), using 'html' instead.
  const vite = await createViteServer({
    server: { middlewareMode: "ssr" },
  });
  // use vite's connect instance as middleware
  app.use(vite.middlewares);

  app.use("*.client.tsx", async (req, res) => {
    let filename = req.baseUrl.replace(".client", "").replace(".tsx", "");
    let generatedFile = `./server/${req.baseUrl.replace(/\//g, "-")}`;
    let alreadyExists = fs.existsSync(generatedFile);
    if (!alreadyExists) {
      let template = fs.readFileSync("./server/client.tsx", "utf-8");

      fs.writeFileSync(
        generatedFile,
        `import {default as Page} from '..${filename}'
      ${template}`
      );
    }
    const result = await vite.transformRequest(generatedFile.substring(1));
    if (result) {
      return send(
        req,
        res,
        //@ts-ignore
        result.code,
        "js",
        //@ts-ignore
        result.etag,
        // allow browser to cache npm deps!
        "no-cache",
        //@ts-ignore

        result.map
      );
    }
    res.send();
  });
  app.use("*", async (req, res) => {
    const url = req.originalUrl;

    try {
      let { template, Page, getServerSideProps } = await pageLoader({
        url,
        vite,
      });

      let props = {};
      if (getServerSideProps) props = await getServerSideProps();

      // 4. render the app HTML. This assumes entry-server.js's exported `render`
      //    function calls appropriate framework SSR APIs,
      //    e.g. ReactDOMServer.renderToString()
      const appHtml = await ReactDOMServer.renderToString(
        React.createElement(Page, props)
      );

      // 5. Inject the app-rendered HTML into the template.
      const html = template
        .replace(`<!--app-html-->`, appHtml)
        .replace(
          "/src/pages/index.tsx",
          `/src/pages${urlToFileName(url)}.client.tsx`
        )
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
  });

  app.listen(3000, () => console.log("listening on :3000"));
}

createServer();
