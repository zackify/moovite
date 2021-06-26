import express from "express";
import { createServer as createViteServer, send } from "vite";
import { transformClientBundle } from "./moovite/transformClientBundle";
import { serverRenderRoute } from "./moovite/serverRenderRoute";

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: "ssr" },
  });
  // use vite's connect instance as middleware
  app.use(vite.middlewares);

  app.use("*.client.tsx", transformClientBundle({ vite }));
  app.use("*", serverRenderRoute({ vite }));

  app.listen(3000, () => console.log("listening on :3000"));
}

createServer();
