import { RequestHandler } from "express-serve-static-core";
import { ViteDevServer } from "vite";
import { pageLoader } from "./pageLoader";

type Props = {
  vite: ViteDevServer;
};

export const getServerSideProps =
  ({ vite }: Props): RequestHandler =>
  async (req, res) => {
    const url = req.originalUrl.replace("/data/", "");

    let { props } = await pageLoader({
      url,
      vite,
    });

    res.send(props);
  };
