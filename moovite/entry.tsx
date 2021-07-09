import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactDOM from "react-dom";

type Props = {
  pageProps?: any;
  routes?: { path: string; component: any; exact?: boolean }[];
};

export const App = ({ pageProps, routes }: Props) => {
  return (
    <Switch>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          exact={route.exact}
          render={(props) => (
            <route.component {...pageProps} {...props.location.state} />
          )}
        />
      ))}
    </Switch>
  );
};

//React.lazy only works on the frontend

import Test from "../src/pages/test";
import Index from "../src/pages/index";
const clientRoutes = [
  {
    path: "/",
    exact: true,
    component: Index,
  },
  {
    path: "/test",
    component: Test,
  },
];

const hydrate = async () => {
  ReactDOM.hydrate(
    <Router>
      <App pageProps={(window as any)._MOOVITE_PROPS_} routes={clientRoutes} />
    </Router>,
    document.getElementById("app")
  );
};

if (!import.meta.env.SSR) hydrate();
