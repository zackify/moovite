import { ReactNode } from "react";
import { useMoovite } from "./context";

type Props = {
  to: string;
  children: ReactNode;
};

export const Link = ({ to, children }: Props) => {
  let { navigate } = useMoovite();
  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
};
