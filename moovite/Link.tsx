import { ReactNode } from "react";
import { useHistory } from "react-router-dom";

type Props = {
  to: string;
  children: ReactNode;
};

const getServerData = async (to) => {
  let res = await fetch(`/data/${to}`);
  return await res.json();
};

export const Link = ({ to, children }: Props) => {
  let history = useHistory();
  return (
    <a
      href={to}
      onClick={async (e) => {
        e.preventDefault();
        let data = await getServerData(to);
        history.push(to, data);
      }}
    >
      {children}
    </a>
  );
};
