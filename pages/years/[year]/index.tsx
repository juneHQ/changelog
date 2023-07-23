import Months from "components/layout/months";
import { ContentLayout } from "components/layout/content-layout";
import { generateRssFeed } from "lib/generate-rss-feed";
import { getArticleSlugs } from "lib/get-articles-slugs";
import { IAggregatedChangelogs, IImagePreviewMeta } from "lib/models/view";
import useTimelineStore from "lib/state/use-timeline-store";
import { IPageProps } from "pages";
import React, { useEffect, useState } from "react";
import { TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";

const ITEMS_PER_PAGE = 4;
const MONTHS_PER_RENDER = 4;

const Page = ({ changelogsMap }: IPageProps) => {
  const timeline = useTimelineStore();
  const [renderedMonths, setRenderedMonths] = useState(0);

  useEffect(() => {
    setRenderedMonths((prevRenderedMonths) => prevRenderedMonths + MONTHS_PER_RENDER);
  }, []);

  const hasMoreMonths = () => renderedMonths < Object.keys(changelogsMap.months).length;

  const handleLoadMore = () => {
    setRenderedMonths((prevRenderedMonths) => prevRenderedMonths + MONTHS_PER_RENDER);
  };

  const monthsToRender = Object.entries(changelogsMap.months)
    .slice(0, renderedMonths)
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

  React.useEffect(() => {
    timeline.setView("months");
    if (typeof window !== "undefined") {
      // window.scrollTo(0, 0);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [timeline.view]);

  return (
    <ContentLayout infiniteScrollingView="year">
      <InfiniteScroll
        style={{ overflow: "visible" }}
        dataLength={renderedMonths}
        next={handleLoadMore}
        hasMore={hasMoreMonths()}
        loader={<h4>Loading...</h4>}
        scrollThreshold={0.7}
      >
        <Months monthChangelogsMap={monthsToRender} isInfiniteScrollingView />
      </InfiniteScroll>
    </ContentLayout>
  );
};

export async function getStaticPaths() {
  const currentYear = new Date().getFullYear();
  const years = Array.from(Array(41), (x, i) => currentYear - 20 + i); // Generate paths for 20 years back and forth from the current year

  const paths = years.map((year) => ({
    params: {
      year: year.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async ({ params }) => {
  await generateRssFeed();
  const slugs = getArticleSlugs();

  const results = await Promise.allSettled(
    slugs.map((slug) => import(`../../changelogs/${slug}.mdx`))
  );

  const meta = results
    .map((res) => res.status === "fulfilled" && res.value.meta)
    .filter((item) => item);

  meta.sort((a, b) => {
    const dateB = new Date(b.publishedAt);
    const dateA = new Date(a.publishedAt);
    return dateB.getTime() - dateA.getTime();
  });

  const recents = meta.map((item) => item.slug);

  // aggregate images for monthly changelogs
  const monthChangelogsMap: IAggregatedChangelogs = meta.reduce((acc, item, index) => {
    const date = new Date(item.publishedAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const key = `${year}-${month}`;

    if (year.toString() !== params.year) return acc;

    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push({
      imageUrl: item.headerImage,
      slug: item.slug,
      publishedAt: item.publishedAt,
      weeklyViewPage: Math.floor(index / ITEMS_PER_PAGE),
    } as IImagePreviewMeta);
    return acc;
  }, {});

  const recentMonthChangelogsMap: IAggregatedChangelogs = Object.keys(monthChangelogsMap).reduce(
    (acc, key) => {
      acc[key] = monthChangelogsMap[key];
      return acc;
    },
    {}
  );

  return {
    props: {
      slugs: recents,
      changelogsMap: { months: recentMonthChangelogsMap },
      totalItems: {
        weeks: slugs.length,
        months: Object.keys(monthChangelogsMap).length,
      },
    },
    revalidate: 1,
  };
};

export default Page;
