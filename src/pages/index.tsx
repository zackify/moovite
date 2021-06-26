import { Item } from "../components/Item";

export const getServerSideProps = () => {
  return { name: "Bob from server!" };
};

type Props = {
  name: string;
};

const Homepage = ({ name }: Props) => {
  return (
    <div onClick={() => console.log("hello")}>
      Hello {name}
      <Item />
    </div>
  );
};

export default Homepage;
