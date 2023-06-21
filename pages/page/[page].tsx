import { getArticleSlugs } from "lib/get-articles-slugs";
import { getStaticProps as getStaticPropsForIndexPage } from "pages";
import IndexPage from "../index";

const ITEMS_PER_PAGE = 4;

const Page = IndexPage;

export async function getStaticPaths() {
  const slugs = getArticleSlugs();
  const articlesLength = Math.floor(slugs.length / ITEMS_PER_PAGE);
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

export const getStaticProps = getStaticPropsForIndexPage;

export default Page;
