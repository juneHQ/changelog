import path from "path";
import fs from "fs";
import { absoluteUrl } from "./utils";

const MDX_DIR = "changelogs";

export const generateLatestChangelogsJson = async () => {
  const changelogFileObjects = fs.readdirSync(path.join(process.cwd(), "pages", MDX_DIR), {
    withFileTypes: true,
  });

  console.debug("-------------------");
  console.debug("Generating latest.json");
  console.debug("-------------------");

  const changelogFiles = await Promise.allSettled(
    changelogFileObjects.map((file) => import(`../pages/changelogs/${file.name}`))
  );

  const changelogsMeta = changelogFiles
    .map((res) => res.status === "fulfilled" && res.value.meta)
    .filter((item) => item)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const latestChangelogs = changelogsMeta.slice(0, 3).map((meta) => ({
    ...meta,
    headerImage: absoluteUrl(meta.headerImage),
    authors: meta.authors?.map((author) => ({ ...author, avatarUrl: absoluteUrl(author.avatarUrl) })),
  }));

  console.debug("-------------------");
  console.debug("Writing latest.json to public/latest.json");
  console.debug("-------------------");

  fs.writeFileSync(
    path.join(process.cwd(), "public", "latest.json"),
    JSON.stringify(latestChangelogs),
    "utf8"
  );

  console.debug("-------------------");
  console.debug("Finished generating latest.json");
  console.debug("-------------------");
};
