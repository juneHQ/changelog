import React from "react";
import { useRouter } from "next/router";
import useTimelineStore from "lib/state/use-timeline-store";
import { IAggregatedChangelogs, IImagePreviewMeta } from "lib/models/view";
import { getArticleSlugs } from "lib/get-articles-slugs";
import { generateRssFeed } from "lib/generate-rss-feed";
import { generateLatestChangelogsJson } from "lib/generate-latest-json";
import Years from "components/layout/years";
import Weeks from "components/layout/weeks";
import Months from "components/layout/months";
import { MainLayout } from "components/layout/main-layout";
import { TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

const ITEMS_PER_PAGE = 4;

export interface IPageProps {
  slugs: string[];
  changelogsMap: { months: IAggregatedChangelogs; years: IAggregatedChangelogs };
  totalItems: { weeks: number; months: number; years: number };
}

const Page = ({ slugs, changelogsMap, totalItems }: IPageProps) => {
  const timeline = useTimelineStore();
  const router = useRouter();
  const page = parseInt((router.query?.page || "0") as string);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      // window.scrollTo(0, 0);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [timeline.view]);

  return (
    <MainLayout
      page={page}
      itemsPerPage={ITEMS_PER_PAGE}
      totalItems={{
        weeks: totalItems.weeks,
        months: totalItems.months,
        years: totalItems.years,
      }}
    >
      <Tabs
        isLazy
        lazyBehavior="keepMounted"
        isFitted
        index={timeline.view === "weeks" ? 0 : timeline.view === "months" ? 1 : 2}
        onChange={(index) => {
          if (index === 0) {
            timeline.setView("weeks");
          } else if (index === 1) {
            timeline.setView("months");
          } else if (index === 2) {
            timeline.setView("years");
          }
        }}
      >
        <TabPanels>
          <TabPanel padding={0}>
            <Weeks slugs={slugs} />
          </TabPanel>
          <TabPanel padding={0}>
            <Months monthChangelogsMap={changelogsMap.months} />
          </TabPanel>
          <TabPanel padding={0}>
            <Years yearChangelogsMap={changelogsMap.years} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MainLayout>
  );
};

export async function getStaticProps({ params }) {
  await generateRssFeed();
  await generateLatestChangelogsJson();
  const slugs = getArticleSlugs();

  const results = await Promise.allSettled(slugs.map((slug) => import(`./changelogs/${slug}.mdx`)));

  const meta = results
    .map((res) => res.status === "fulfilled" && res.value.meta)
    .filter((item) => item);

  meta.sort((a, b) => {
    const dateB = new Date(b.publishedAt);
    const dateA = new Date(a.publishedAt);
    return dateB.getTime() - dateA.getTime();
  });

  const start = parseInt(params?.page ?? 0) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const recents = meta.slice(start, end).map((item) => item.slug);

  // aggregate images for monthly changelogs
  const monthChangelogsMap: IAggregatedChangelogs = meta.reduce((acc, item, index) => {
    const date = new Date(item.publishedAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const key = `${year}-${month}`;
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

  const recentMonthChangelogsMap: IAggregatedChangelogs = Object.keys(monthChangelogsMap)
    .slice(start, end)
    .reduce((acc, key) => {
      acc[key] = monthChangelogsMap[key];
      return acc;
    }, {});

  const yearsChangelogsMap: IAggregatedChangelogs = meta.reduce((acc, item, index) => {
    const date = new Date(item.publishedAt);
    const year = date.getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }

    acc[year].push({
      imageUrl: item.headerImage,
      slug: item.slug,
      publishedAt: item.publishedAt,
      weeklyViewPage: Math.floor(index / ITEMS_PER_PAGE),
      monthlyViewPage: Math.floor(
        (Object.keys(monthChangelogsMap)
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
          .indexOf(`${year}-${date.getMonth() + 1}`) +
          1) /
          ITEMS_PER_PAGE
      ),
    } as IImagePreviewMeta);
    return acc;
  }, {});

  const recentYearsChangelogsMap: IAggregatedChangelogs = Object.keys(yearsChangelogsMap)
    .slice(start, end)
    .reduce((acc, key) => {
      acc[key] = yearsChangelogsMap[key];
      return acc;
    }, {});

  return {
    props: {
      slugs: recents,
      changelogsMap: { months: recentMonthChangelogsMap, years: recentYearsChangelogsMap },
      totalItems: {
        weeks: slugs.length,
        months: Object.keys(monthChangelogsMap).length,
        years: Object.keys(yearsChangelogsMap).length,
      },
    },
    revalidate: 1,
  };
}

export default Page;
