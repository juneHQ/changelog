import dynamic from "next/dynamic";
import React from "react";

interface IWeeksProps {
  slugs: string[];
}

const Weeks = ({ slugs }: IWeeksProps) => {
  const Articles = React.useMemo(() => {
    return slugs.map((slug) => dynamic(() => import(`../../pages/changelogs/${slug}.mdx`)));
  }, [slugs]);

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
