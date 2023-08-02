import { ContentLayout } from "components/layout/content-layout";
import { generateRssFeed } from "lib/generate-rss-feed";
import { getArticleSlugs } from "lib/get-articles-slugs";
import useTimelineStore from "lib/state/use-timeline-store";
import { IPageProps } from "pages";
import React, { useState } from "react";
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";
import dynamic from "next/dynamic";
import { MainLayout } from "components/layout/main-layout";

const WEEKS_PER_RENDER = 4;

const Page = ({ slugs }: IPageProps) => {
  const Articles = React.useMemo(() => {
    return slugs.map((slug) => dynamic(() => import(`../../../../pages/changelogs/${slug}.mdx`)));
  }, [slugs]);

  const timeline = useTimelineStore();

  React.useEffect(() => {
    timeline.setView("weeks");
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [timeline.view]);

  const [renderedWeeks, setRenderedWeeks] = useState(WEEKS_PER_RENDER);

  const handleLoadMore = () => {
    setRenderedWeeks((prevRenderedWeeks) => prevRenderedWeeks + WEEKS_PER_RENDER);
  };

  const ArticlesToInitiallyRender = Articles.slice(0, WEEKS_PER_RENDER);

  const ArticlesToRenderOnLoadMore = Articles.slice(WEEKS_PER_RENDER, renderedWeeks);

  const hasMoreWeeks = () => renderedWeeks < slugs.length;

  React.useEffect(() => {
    timeline.setView("weeks");
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [timeline.view]);

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
      {ArticlesToInitiallyRender.map((Article, index) => (
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
      <InfiniteScroll
        style={{ overflow: "visible" }}
        dataLength={renderedWeeks}
        next={handleLoadMore}
        hasMore={hasMoreWeeks()}
        loader={<h4>Loading...</h4>}
        scrollThreshold={0.7}
      >
        {ArticlesToRenderOnLoadMore.map((Article, index) => (
          // @ts-ignore
          <Article
            key={slugs[index]}
            // @ts-ignore
            index={index + WEEKS_PER_RENDER}
            hideLayout={true}
            hideHead={true}
            hideAuthors={true}
            isInfiniteScrollingView={true}
          />
        ))}
      </InfiniteScroll>
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
  await generateRssFeed();
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
