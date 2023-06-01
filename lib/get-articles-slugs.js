import fs from "fs";
import path from "path";
var MDX_DIR = "changelogs";
export function getArticleSlugs() {
    var files = fs.readdirSync(path.join(process.cwd(), "pages", MDX_DIR), {
        withFileTypes: true,
    });
    var articles = files
        .map(function (file) {
        if (!file.name.endsWith(".mdx")) {
            return null;
        }
        return file.name.replace(".mdx", "");
    })
        .filter(function (article) { return article; });
    return articles;
}
