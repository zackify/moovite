import { createElement } from "react";

type Props = {
  page?: any;
};

export const App = ({ page }: Props) => {
  return createElement(page.component, page.props);
};
