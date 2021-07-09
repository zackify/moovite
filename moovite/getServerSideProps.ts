import { RequestHandler } from "express-serve-static-core";
import { ViteDevServer } from "vite";
import { pageLoader } from "./pageLoader";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Props = {
  vite: ViteDevServer;
};

export const getServerSideProps =
  ({ vite }: Props): RequestHandler =>
  async (req, res) => {
    const url = req.originalUrl.replace("/data/", "");

    let { getServerSideProps } = await pageLoader({
      url,
      vite,
    });

    let props = {};
    if (getServerSideProps) props = await getServerSideProps({ prisma });

    res.send(props);
  };
