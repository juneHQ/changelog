import React from 'react';
import { IPageProps } from 'pages';
import dynamic from 'next/dynamic';
import { getArticleSlugs } from 'lib/get-articles-slugs';
import dayjs from 'dayjs';
import { MainLayout } from 'components/layout/main-layout';

const Page = ({ slugs }: IPageProps) => {
  const Articles = React.useMemo(() => {
    return slugs.map((slug) => dynamic(() => import(`../../../../pages/changelogs/${slug}.mdx`)));
  }, [slugs]);

  React.useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      const targetElementId = hash.slice(hash.indexOf("#") + 1);
      console.log(">>>:", targetElementId, Articles[0]);
      if (
        targetElementId ===
        // first element in the list
        slugs[0]
      ) {
        return;
      }

      setTimeout(() => {
        const element = document.getElementById(targetElementId);
        const firstElement = document.querySelector(".timeline-item");

        if (element === firstElement) {
          return;
        }

        if (element) {
          const y = element.getBoundingClientRect().top + window.pageYOffset - 120;

          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 1000);
    }
  }, []);

  return (
    <MainLayout infiniteScrollingView="month">
      {Articles.map((Article, index) => (
        // @ts-ignore
        <Article
          key={slugs[index]}
          // @ts-ignore
          index={index}
          hideLayout={true}
          hideHead={true}
          hideAuthors={true}
          isInfiniteScrollingView={true}
        />
      ))}
    </MainLayout>
  );
};

export async function getStaticPaths() {
  const currentYear = new Date().getFullYear();
  const years = Array.from(Array(41), (x, i) => currentYear - 20 + i); // Generate paths for 20 years back and forth from the current year
  const months = Array.from(Array(12)).map((month, index) =>
    index < 9 ? `0${index + 1}` : `${index + 1}`
  );

  const paths = months
    .map((month) =>
      years.map((year) => ({
        params: {
          month: month.toString(),
          year: year.toString(),
        },
      }))
    )
    .flat();

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async ({ params }) => {
  const slugs = getArticleSlugs();

  const results = await Promise.allSettled(
    slugs.map((slug) => import(`../../../changelogs/${slug}.mdx`))
  );

  const { month, year } = params;

  const meta = results
    .map((res) => res.status === "fulfilled" && res.value.meta)
    .filter((item) => {
      const publishedAt = dayjs(item.publishedAt);

      return item && publishedAt.format("YYYY") === year && publishedAt.format("MM") === month;
    });

  meta.sort((a, b) => {
    const dateB = new Date(b.publishedAt);
    const dateA = new Date(a.publishedAt);
    return dateB.getTime() - dateA.getTime();
  });

  const recents = meta.map((item) => item.slug);

  return {
    props: {
      slugs: recents,
      totalItems: {
        weeks: slugs.length,
      },
    },
    revalidate: 1,
  };
};

export default Page;
