import express from "express";
import { createServer as createViteServer } from "vite";
import { serverRenderRoute } from "./moovite/ssr/serverRenderRoute";

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: "ssr" },
  });
  app.use(vite.middlewares);

  app.use("*", serverRenderRoute({ vite }));

  app.listen(3000, () => console.log("listening on :3000"));
}

createServer();
