import dynamic from "next/dynamic";

interface IWeeks {
  slugs: string[];
}

const Weeks = ({ slugs }: IWeeks) => {
  const Articles = slugs.map((slug) => dynamic(() => import(`../../pages/changelogs/${slug}.mdx`)));

  return (
    <>
      {Articles.map((Article, index) => (
        // @ts-ignore
        <Article key={index} hideLayout={true} hideHead={true} hideAuthors={true} />
      ))}
    </>
  );
};

export default Weeks;
