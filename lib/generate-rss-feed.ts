import { Feed } from "feed";
import fs from "fs";
import path from "path";

const MDX_DIR = "changelogs";

export const generateRssFeed = async () => {
  const siteURL = process.env.NEXT_PUBLIC_APP_HOST;
  const date = new Date();
  const author = {
    name: "Screeb",
    link: "https://twitter.com/ScreebApp",
  };

  const feed = new Feed({
    title: "Screeb Changelog",
    description: "How Screeb gets better every week",
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/favicon.ico`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Screeb`,
    updated: date, // today's date
    generator: "Feed for Screeb changelog",
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`, // xml format
      json: `${siteURL}/rss/feed.json`, // json fromat
    },
    author,
  });

  const changelogFileObjects = fs.readdirSync(path.join(process.cwd(), "pages", MDX_DIR), {
    withFileTypes: true,
  });  

  const changelogFiles = await Promise.allSettled(
    changelogFileObjects.map((file) => import(`../pages/changelogs/${file.name}`))
  );

  const changelogsMeta = changelogFiles
    .map((res) => res.status === "fulfilled" && res.value.meta)
    .filter((item) => item)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  changelogsMeta.forEach((changelog) => {
    const { title, description, content, publishedAt, slug, headerImage } = changelog;
    const url = `${siteURL}/changelogs/${slug}`;
    feed.addItem({
      title: title,
      id: url,
      link: url,
      description: description,
      content: content,
      image: headerImage,
      date: new Date(publishedAt),
    });
  });

  console.debug("-------------------");
  console.debug("Generating RSS feed");
  console.debug("-------------------");
  const Rssfeed = feed.rss2();

  console.debug("-------------------");
  console.debug("Writing RSS feed to public/rss.xml");
  console.debug("-------------------");

  fs.writeFileSync("./public/rss.xml", Rssfeed, "utf8");
};
