import { Link } from "../../moovite/Link";
import { GetServerSideProps } from "../../moovite/types";

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
      <Link to="/test">Go to test</Link>
    </div>
  );
};

export default Homepage;
