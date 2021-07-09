import { Link } from "../../moovite/Link";
export const getServerSideProps = () => {
  return { name: "Another test page!" };
};

type Props = {
  name: string;
};

const Test = ({ name }: Props) => {
  return (
    <div onClick={() => console.log("hello")}>
      Hello {name} from test <Link to="/">Go to home</Link>
    </div>
  );
};

export default Test;
