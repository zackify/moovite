import fs from "fs";
import path from "path";
import { ViteDevServer } from "vite";
import { urlToFilePath } from "./urlToFilePath";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Props = {
  url: string;
  vite: ViteDevServer;
};

type PageLoaderResult = {
  template: string;
  Page: any;
  App: any;
  props: any;
};

export const pageLoader = async ({
  url,
  vite,
}: Props): Promise<PageLoaderResult> => {
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

  const [{ default: Page, getServerSideProps }, { App }] = await Promise.all([
    vite.ssrLoadModule(`/src/pages${urlToFilePath(url)}`),
    vite.ssrLoadModule(`/moovite/entry.tsx`),
  ]);

  let props = {};
  if (getServerSideProps) props = await getServerSideProps({ prisma });

  return { template, Page, props, App };
};
