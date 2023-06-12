import dynamic from "next/dynamic";

const Weeks = ({ slugs }) => {
  const Articles = slugs.map((slug) => dynamic(() => import(`../changelogs/${slug}.mdx`)));

  return (
    <>
      {Articles.map((Article, index) => (
        <Article key={index} hideLayout={true} hideHead={true} hideAuthors={true} />
      ))}
    </>
  );
};

export default Weeks;
