import { RequestHandler } from "express";
import { RouteParameters } from "express-serve-static-core";
import { send, ViteDevServer } from "vite";
import fs from "fs";
import { SourceDescription } from "rollup";

type Props = {
  vite: ViteDevServer;
};

export const transformClientBundle = ({
  vite,
}: Props): RequestHandler<RouteParameters<"*.client.tsx">> => {
  try {
    fs.mkdirSync(process.cwd() + "/dist/.cache");
  } catch (e) {}

  return async (req, res) => {
    let filename = req.baseUrl.replace(".client", "").replace(".tsx", "");
    let generatedFile = `/dist/.cache/${req.baseUrl.replace(/\//g, "-")}`;

    if (!fs.existsSync(process.cwd() + generatedFile)) {
      let template = fs.readFileSync(__dirname + "/client.tsx", "utf-8");

      fs.writeFileSync(
        process.cwd() + generatedFile,
        `import {default as Page} from '../..${filename}'
      ${template}`
      );
    }
    const result = (await vite.transformRequest(
      generatedFile
    )) as Partial<SourceDescription>;

    return send(
      req,
      res,
      result.code as string,
      "js",
      undefined,
      "no-cache",
      null
    );
  };
};
