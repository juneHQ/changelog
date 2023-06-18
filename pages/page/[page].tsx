import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { PaginatedArticles } from "components/paginated-articles";
import { getArticleSlugs } from "lib/get-articles-slugs";
import { getStaticProps as getStaticPropsForIndexPage } from "pages";
import useTimelineStore from "lib/state/use-timeline-store";
import Weeks from "components/layout/weeks";
import Months from "components/layout/months";
import Years from "components/layout/years";
import { useEffect } from "react";

const ARTICLES_PER_PAGE = 4;

const Page = ({ slugs, changelogsMap }) => {
  const router = useRouter();
  const page = parseInt(router.query.page as string);

  const timeline = useTimelineStore();

  return (
    <PaginatedArticles page={page}>
      {timeline.view === "weeks" && <Weeks slugs={slugs} />}
      {timeline.view === "months" && <Months monthChangelogsMap={changelogsMap.months} />}
      {timeline.view === "years" && <Years yearChangelogsMap={changelogsMap.years} />}
    </PaginatedArticles>
  );
};

export async function getStaticPaths() {
  const slugs = getArticleSlugs();
  const articlesLength = Math.floor(slugs.length / ARTICLES_PER_PAGE);
  const numbers = Array.from(Array(articlesLength), (x, i) => i);

  return {
    paths: numbers.map((number) => ({
      params: {
        page: number.toString(),
      },
    })),
    fallback: false,
  };
}

// export async function getStaticProps({ params }) {
//   const slugs = getArticleSlugs();

//   const results = await Promise.allSettled(
//     slugs.map((slug) => import(`../changelogs/${slug}.mdx`))
//   );

//   const meta = results
//     .map((res) => res.status === "fulfilled" && res.value.meta)
//     .filter((item) => item);

//   meta.sort((a, b) => {
//     const dateB = new Date(b.publishedAt);
//     const dateA = new Date(a.publishedAt);
//     return dateB.getTime() - dateA.getTime();
//   });

//   const start = parseInt(params.page) * ARTICLES_PER_PAGE;
//   const end = start + ARTICLES_PER_PAGE;
//   const recents = meta.slice(start, end).map((item) => item.slug);

//   return {
//     props: { slugs: recents },
//     revalidate: 1,
//   };
// }

export const getStaticProps = getStaticPropsForIndexPage;

export default Page;
