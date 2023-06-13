import { getArticleSlugs } from "lib/get-articles-slugs";
import { PaginatedArticles } from "components/paginated-articles";
import Months from "./page/months";
import Years from "./page/years";
import Weeks from "./page/weeks";
import useTimelineStore from "lib/state/useTimelineStore";

const ARTICLES_PER_PAGE = 4;

const Page = ({ slugs, changelogsMap }) => {
  const timeline = useTimelineStore();

  return (
    <>
      <PaginatedArticles page={0}>
        {timeline.view === "weeks" && <Weeks slugs={slugs} />}
        {timeline.view === "months" && <Months monthChangelogsMap={changelogsMap.months} />}
        {timeline.view === "years" && <Years yearChangelogsMap={changelogsMap.years} />}
      </PaginatedArticles>
    </>
  );
};

export interface IMonthlyChangelog {
  imageUrl: string;
  slug: string;
  publishedAt: string;
  weeklyViewPage: number;
}

export async function getStaticProps() {
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

  const start = 0;
  const end = ARTICLES_PER_PAGE;
  const recents = meta.slice(start, end).map((item) => item.slug);

  // aggregate images for monthly changelogs
  const monthChangelogsMap: {
    [key: string]: IMonthlyChangelog[];
  } = meta.reduce((acc, item, index) => {
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
      weeklyViewPage: index / ARTICLES_PER_PAGE + 1,
    });
    return acc;
  }, {});

  const recentMonthChangelogsMap = Object.keys(monthChangelogsMap)
    .slice(start, end)
    .reduce((acc, key) => {
      acc[key] = monthChangelogsMap[key];
      return acc;
    }, {});

  const yearsChangelogsMap: { [key: string]: IMonthlyChangelog[] } = meta.reduce(
    (acc, item, index) => {
      const date = new Date(item.publishedAt);
      const year = date.getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push({
        imageUrl: item.headerImage,
        slug: item.slug,
        publishedAt: item.publishedAt,
        weeklyViewPage: index / ARTICLES_PER_PAGE + 1,
      });
      return acc;
    },
    {}
  );

  return {
    props: {
      slugs: recents,
      changelogsMap: { months: recentMonthChangelogsMap, years: yearsChangelogsMap },
    },
    revalidate: 1,
  };
}

export default Page;
