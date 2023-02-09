import { GetStaticProps } from "next";

const Index = () => {
  return null;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    redirect: {
      destination: "/page/0",
      permanent: true,
    },
  };
};

export default Index;
