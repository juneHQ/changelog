import { getArticleSlugs } from "lib/get-articles-slugs";
import { PaginatedArticles } from "components/paginated-articles";
import Months from "components/layout/months";
import Years from "components/layout/years";
import Weeks from "components/layout/weeks";
import useTimelineStore from "lib/state/use-timeline-store";
import { IImagePreviewMeta, IYearlyChangelog } from "lib/models/view";
import { AnimatePresence, motion } from "framer-motion";

const ARTICLES_PER_PAGE = 4;

const Page = ({ slugs, changelogsMap }) => {
  const timeline = useTimelineStore();

  return (
    <>
      <PaginatedArticles page={0}>
        <AnimatePresence>
          {timeline.view === "weeks" && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.6 } },
              }}
              exit={{ opacity: 0 }}
            >
              <Weeks slugs={slugs} />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {timeline.view === "months" && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.6 } },
              }}
              exit={{ opacity: 0 }}
            >
              <Months monthChangelogsMap={changelogsMap.months} />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {timeline.view === "years" && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.6 } },
              }}
              exit={{ opacity: 0 }}
            >
              <Years yearChangelogsMap={changelogsMap.years} />
            </motion.div>
          )}
        </AnimatePresence>
      </PaginatedArticles>
    </>
  );
};

export async function getStaticProps({ params }) {
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

  const start = parseInt(params?.page ?? 0) * ARTICLES_PER_PAGE;
  const end = start + ARTICLES_PER_PAGE;
  const recents = meta.slice(start, end).map((item) => item.slug);

  // aggregate images for monthly changelogs
  const monthChangelogsMap: {
    [key: string]: IImagePreviewMeta[];
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
      weeklyViewPage: Math.floor(index / ARTICLES_PER_PAGE + 1),
    });
    return acc;
  }, {});

  const recentMonthChangelogsMap = Object.keys(monthChangelogsMap)
    .slice(start, end)
    .reduce((acc, key) => {
      acc[key] = monthChangelogsMap[key];
      return acc;
    }, {});

  const yearsChangelogsMap: { [key: string]: IImagePreviewMeta[] } = meta.reduce(
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
        weeklyViewPage: Math.floor(index / ARTICLES_PER_PAGE + 1),
        montlyViewPage: Math.floor(
          Object.keys(monthChangelogsMap).indexOf(`${year}-${date.getMonth() + 1}`) /
            ARTICLES_PER_PAGE +
            1
        ),
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
