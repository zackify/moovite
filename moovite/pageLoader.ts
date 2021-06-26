import fs from "fs";
import path from "path";
import { ViteDevServer } from "vite";
import { urlToFilePath } from "./urlToFilePath";

type Props = {
  url: string;
  vite: ViteDevServer;
};

type PageLoaderResult = {
  template: string;
  Page: any;
  getServerSideProps?: () => any;
};

export const pageLoader = async ({
  url,
  vite,
}: Props): Promise<PageLoaderResult> => {
  if (process.env.NODE_ENV === "production") {
    let template = fs.readFileSync(require("dist/client/index.html"), "utf-8");
    let {
      default: Page,
      getServerSideProps,
    } = require(`./dist/server/src/pages${urlToFilePath(url)}`);
    return { template, Page, getServerSideProps };
  }

  // 1. Read index.html
  let template = fs.readFileSync(
    path.resolve(process.cwd(), "index.html"),
    "utf-8"
  );

  // 2. Apply vite HTML transforms. This injects the vite HMR client, and
  //    also applies HTML transforms from Vite plugins, e.g. global preambles
  //    from @vitejs/plugin-react-refresh
  template = await vite.transformIndexHtml(url, template);
  // 3. Load the server entry. vite.ssrLoadModule automatically transforms
  //    your ESM source code to be usable in Node.js! There is no bundling
  //    required, and provides efficient invalidation similar to HMR.

  const { default: Page, getServerSideProps } = await vite.ssrLoadModule(
    `/src/pages${urlToFilePath(url)}`
  );

  return { template, Page, getServerSideProps };
};
