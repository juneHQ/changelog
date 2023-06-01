var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { PaginatedArticles } from "components/paginated-articles";
import { getArticleSlugs } from "lib/get-articles-slugs";
var ARTICLES_PER_PAGE = 4;
var Page = function (_a) {
    var slugs = _a.slugs;
    var router = useRouter();
    var page = parseInt(router.query.page);
    var Articles = slugs.map(function (slug) { return dynamic(function () { return import("../changelogs/".concat(slug, ".mdx")); }); });
    return (<PaginatedArticles page={page}>
      {Articles.map(function (Article, index) { return (<Article key={index} hideLayout={true} hideHead={true} hideAuthors={true}/>); })}
    </PaginatedArticles>);
};
export function getStaticPaths() {
    return __awaiter(this, void 0, void 0, function () {
        var slugs, articlesLength, numbers;
        return __generator(this, function (_a) {
            slugs = getArticleSlugs();
            articlesLength = Math.floor(slugs.length / ARTICLES_PER_PAGE);
            numbers = Array.from(Array(articlesLength), function (x, i) { return i; });
            return [2 /*return*/, {
                    paths: numbers.map(function (number) { return ({
                        params: {
                            page: number.toString(),
                        },
                    }); }),
                    fallback: false,
                }];
        });
    });
}
export function getStaticProps(_a) {
    var params = _a.params;
    return __awaiter(this, void 0, void 0, function () {
        var slugs, results, meta, start, end, recents;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    slugs = getArticleSlugs();
                    return [4 /*yield*/, Promise.allSettled(slugs.map(function (slug) { return import("../changelogs/".concat(slug, ".mdx")); }))];
                case 1:
                    results = _b.sent();
                    meta = results
                        .map(function (res) { return res.status === "fulfilled" && res.value.meta; })
                        .filter(function (item) { return item; });
                    meta.sort(function (a, b) {
                        var dateB = new Date(b.publishedAt);
                        var dateA = new Date(a.publishedAt);
                        return dateB.getTime() - dateA.getTime();
                    });
                    start = parseInt(params.page) * ARTICLES_PER_PAGE;
                    end = start + ARTICLES_PER_PAGE;
                    recents = meta.slice(start, end).map(function (item) { return item.slug; });
                    return [2 /*return*/, {
                            props: { slugs: recents },
                            revalidate: 1,
                        }];
            }
        });
    });
}
export default Page;
