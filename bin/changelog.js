const fs = require("fs");
const path = require("path");
const weeklyImprovements = require("./weekly-improvements");

function parseArguments(args) {
  const result = {};
  args.forEach((arg) => {
    const [key, value] = arg.split("=");
    result[key.replace(/^-+/, "")] = value;
  });
  return result;
}

async function generateChangelogContent(title, slug) {
  const improvements = await weeklyImprovements();

  return `import { MdxLayout } from "components/mdx-layout.tsx";
  

export const meta = {
  slug: "${slug}",
  publishedAt: "${new Date(
    new Date().setDate(new Date().getDate() - (((new Date().getDay() + 1) % 7) + 1))
  ).toISOString()}",
  title: "${title}",
  headerImage: "https://june-changelog.s3.eu-central-1.amazonaws.com/${slug}/header.png",
  authors: ${JSON.stringify(
    JSON.parse(fs.readFileSync(path.join(__dirname, "../team.json"))).authors
  )},
};

**Other improvements**

${improvements.join("\n")}




export default ({ children, ...rest }) => (
  <MdxLayout meta={meta} {...rest}>
    {children}
  </MdxLayout>
);
`;
}

async function main() {
  const args = parseArguments(process.argv.slice(2));
  const title = args.title;
  if (!title) {
    throw new Error("No title provided. Please pass a --title to create a changelog");
  }
  const slug = args.slug || title.toLowerCase().replace(/ /g, "-");

  const content = await generateChangelogContent(title, slug);
  const filePath = path.join(__dirname, `../pages/changelogs/${slug}.mdx`);

  fs.writeFileSync(filePath, content);
  console.log(`Changelog created at ${filePath}`);
}

main();
