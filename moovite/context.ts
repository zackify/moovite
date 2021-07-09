type SingleRoute = {
  path: string;
  exact?: boolean;
  getComponent: () => any;
};

export const routes: SingleRoute[] = [
  {
    path: "/",
    exact: true,
    getComponent: () => import("../src/pages/index"),
  },
  {
    path: "/test",
    getComponent: () => import("../src/pages/test"),
  },
];

import { createContext, useContext } from "react";
import { Page } from "./types";

type MooviteContextType = {
  activePage: Page;
  setActivePage: (page: Page) => void;
};

export const MooviteContext = createContext<MooviteContextType>({} as any);

const getServerData = async (to) => {
  let res = await fetch(`/data/${to}`);
  return await res.json();
};

export const useMoovite = () => {
  let { setActivePage } = useContext(MooviteContext);

  return {
    navigate: async (to: string) => {
      let [props, { default: component }] = await Promise.all([
        getServerData(to),
        routes.find((route) => route.path === to).getComponent(),
      ]);

      setActivePage({ path: to, component, props });
      history.pushState(null, "", to);
    },
  };
};
