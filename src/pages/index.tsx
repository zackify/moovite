import { Link } from "../../moovite/Link";
import { GetServerSideProps } from "../../moovite/ssr/types";

export const getServerSideProps: GetServerSideProps = async ({ prisma }) => {
  let firstMessage = await prisma.message.findFirst();
  return { message: firstMessage.text };
};

type Props = {
  message: string;
};
const Homepage = ({ message }: Props) => {
  return (
    <div onClick={() => console.log("hello")}>
      {message}
      <Link to="/test">Go to test</Link>
    </div>
  );
};

export default Homepage;
