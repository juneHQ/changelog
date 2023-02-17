import dynamic from 'next/dynamic';
import { getArticleSlugs } from 'lib/get-articles-slugs';
import { PaginatedArticles } from 'components/paginated-articles';

const ARTICLES_PER_PAGE = 4;

const Page = ({ slugs }) => {
  const Articles = slugs.map((slug) => dynamic(() => import(`./changelogs/${slug}.mdx`)));

  return (
    <PaginatedArticles page={0}>
      {Articles.map((Article, index) => (
        <Article key={index} hideLayout={true} hideHead={true} hideAuthors={true} />
      ))}
    </PaginatedArticles>
  );
};

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

  return {
    props: { slugs: recents },
    revalidate: 1,
  };
}

export default Page;
