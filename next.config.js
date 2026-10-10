const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");

const nextConfig = {
  env: {
    NEXT_PUBLIC_MARKETING_HOST: "https://www.june.so",
  },
  // The site is a static export (see README), and Next 12.1's default next/image loader needs
  // a server. The akamai loader only appends "?imwidth=N" to the path, which a static host
  // ignores, so next/image serves the files in public/ as they are.
  images: { loader: "akamai", path: "/" },
};

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    providerImportSource: "@mdx-js/react",
  },
});

const config = withPlugins(
  [
    [
      optimizedImages,
      {
        // optimisation disabled by default, to enable check https://github.com/cyrilwanner/next-optimized-images
        optimizeImages: false,
      },
    ],
    [
      withMDX({
        // Append the default value with md extensions
        pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
      }),
    ],
  ],
  nextConfig
);

module.exports = config;
