import { GetServerSideProps } from "../../moovite/types";
import { Item } from "../components/Item";

export const getServerSideProps: GetServerSideProps = async ({ prisma }) => {
  let user = await prisma.user.findFirst();
  return { name: user?.name };
};

type Props = {
  name: string;
};

const Homepage = ({ name }: Props) => {
  return (
    <div onClick={() => console.log("hello")}>
      Hello from prisma, {name}
      <Item />
    </div>
  );
};

export default Homepage;
