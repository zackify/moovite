export const getServerSideProps = () => {
  return { name: "Another test page!" };
};

type Props = {
  name: string;
};

const Test = ({ name }: Props) => {
  return <div onClick={() => console.log("hello")}>Hello {name} from test</div>;
};

export default Test;
