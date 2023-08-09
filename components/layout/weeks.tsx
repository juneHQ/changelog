import dynamic from "next/dynamic";
import React from "react";

interface IWeeksProps {
  slugs: string[];
  isInfiniteScrollingView?: boolean;
}

const Weeks = ({ slugs, isInfiniteScrollingView }: IWeeksProps) => {
  const Articles = React.useMemo(() => {
    return slugs.map((slug) => dynamic(() => import(`../../pages/changelogs/${slug}.mdx`)));
  }, [slugs]);

  return (
    <>
      {Articles.map((Article, index) => (
        // @ts-ignore
        <Article
          key={index}
          // @ts-ignore
          index={index}
          hideLayout={true}
          hideHead={true}
          hideAuthorsNames={true}
          isInfiniteScrollingView={isInfiniteScrollingView}
        />
      ))}
    </>
  );
};

export default Weeks;
