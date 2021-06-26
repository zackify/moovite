import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter } from "react-router-dom";

let Index = React.lazy(() => import("../src/pages/index"));
let Test = React.lazy(() => import("../src/pages/test"));

ReactDOM.hydrate(
  <BrowserRouter>
    <Switch>
      <Route path="/">
        <Index {...((window as any)._MOOVITE_PROPS_ || {})} />
      </Route>
      <Route path="/test">
        <Test name="wrong" />
      </Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById("app")
);
