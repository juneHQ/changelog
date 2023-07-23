import { ContentLayout } from "components/layout/content-layout";
import { generateRssFeed } from "lib/generate-rss-feed";
import { getArticleSlugs } from "lib/get-articles-slugs";
import useTimelineStore from "lib/state/use-timeline-store";
import { useRouter } from "next/router";
import { IPageProps } from "pages";
import React, { useState } from "react";
import dayjs from "dayjs";
import Weeks from "components/layout/weeks";
import { TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";

const WEEKS_PER_RENDER = 1;

const Page = ({ slugs }: IPageProps) => {
  const timeline = useTimelineStore();

  React.useEffect(() => {
    timeline.setView("weeks");
    if (typeof window !== "undefined") {
      // window.scrollTo(0, 0);
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

  const weeksToRender = slugs.slice(0, renderedWeeks)

  const hasMoreWeeks = () => renderedWeeks < slugs.length;



  return (
    <ContentLayout infiniteScrollingView="month">
      <InfiniteScroll
        style={{ overflow: "visible" }}
        dataLength={renderedWeeks}
        next={handleLoadMore}
        hasMore={hasMoreWeeks()}
        loader={<h4>Loading...</h4>}
        scrollThreshold={0.7}
      >
        <Weeks slugs={weeksToRender} isInfiniteScrollingView />
      </InfiniteScroll>
    </ContentLayout>
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
