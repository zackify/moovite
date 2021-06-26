import ReactDOM from "react-dom";

ReactDOM.hydrate(
  //@ts-ignore
  <Page {...(window._MOOVITE_PROPS_ || {})} />,
  document.getElementById("app")
);
