# Changelog 🚀

![summary-repo](https://github.com/juneHQ/changelog/assets/104089773/91b333a5-0e66-420d-b0bf-815e76570501)

![screenshot-repo](https://github.com/juneHQ/changelog/assets/104089773/18ff86a4-3e9f-4fc8-9fab-38fb15b0c8cd)

Set-up a changelog and share what you ship as easy as 1-2-3. A Next.js blog starter project built with MDX and Chakra UI. Fully-customizable and open source, so don't hesitate to add new features and report bugs!

#### [👉 Visit working demo](https://changelog.june.so)

> June has shut down, so the changelog at [changelog.june.so](https://changelog.june.so) is now an archive: a static export of this repository, hosted on GitHub Pages. See [Deploying](#deploying).

## Features

- 💅 A stylish changelog
- ⏳ Timeline view
- 📆 Date switcher
- 🧩 Mosaic mode
- 🏄‍♀️ Smooth transitions
- 🎉 Celebrate your team's achievements with team credits on each post
- ⚙️ Easy-to-use, just use markdown files to write your changelogs~

👇 Mosaic mode in action below

![Changelog demo](https://github.com/juneHQ/changelog/assets/104089773/6ae75ac9-2a47-4dc9-9fb0-73cb90dbd2b7)

## Getting started

The easiest way to try this is to run it locally on your computer.

First, you'll need to create your own copy of this code. You can do so by clicking the ["Fork"](https://github.com/juneHQ/changelog/fork) button on GitHub and filling out the form.

Once you've cloned the repository, install dependencies and start the Next.js server (the site needs no environment variables):

```bash
# Using yarn
yarn install
yarn dev

# Using npm
npm install
npm run dev
```

## Deploying

`yarn build` exports the whole changelog as a static site in `out/` (`next build && next export`, then the sitemap and `bin/postexport.mjs`), so any static host can serve it.

changelog.june.so is served by GitHub Pages: `.github/workflows/pages.yml` builds and deploys `out/` on every push to `master`.

- Settings > Pages: Source is "GitHub Actions", and the custom domain is `changelog.june.so`, with "Enforce HTTPS" on.
- DNS: `changelog` is a CNAME to `junehq.github.io`. In Cloudflare it must be "DNS only", or GitHub cannot issue the certificate.

`bin/postexport.mjs` adapts the export to GitHub Pages:

- Pages such as `/years/2024`, which share a path with a directory, get an `index.html` copy inside that directory.
- Every entry gets a redirect page at its old `/changelog/<slug>` URL.
- The build fails if anything still points at the old S3 image bucket.

`pages/404.tsx` retries a URL once without a trailing slash, like Vercel's redirects did.

## Routes

- `/pages/:pageNumber` - displays paginated articles
- `/` - redirects to `/pages/0`
- `/changelogs/:id` - displays one article

## File structure

```bash

bin             # Scripts
components      # Reusable components
├─ core
├─ mdx-layout.tsx
└─ ...
lib              # Types, theme, utilities, services
pages
├─ changelogs    # MDX articles
├─ page
│  └─ [page].tsx # Paginated articles
├─ _app.tsx
└─ _middleware.ts
...
```

## Writing articles

To write a new blog post, create a new `.mdx` file in the `/pages/changelogs` directory.

### Anatomy of an MDX article

MDX is a superset of markdown that lets you write JSX directly in your markdown files. It is a powerful way to add dynamic interactivity, and embed components within your content, helping you to bring your pages to life.

![mdx-preview](https://github.com/danieljune/changelog/assets/104089773/83a35930-8f4e-4c3d-a077-afcd8251af0b)

Learn more 👉 [Next.js: Using MDX](https://nextjs.org/docs/advanced-features/using-mdx), [Using MDX](https://mdxjs.com/docs/using-mdx/)

## Managing images and assets

Images live in `public/images` and articles reference them from the root, e.g. `headerImage: "/images/<slug>/header.png"`. The RSS feed, `latest.json` and social previews turn these into full `https://changelog.june.so/...` URLs.

They used to be served from an S3 bucket. `bin/archive/self-host-images.mjs` copied every image the articles used from a local copy of that bucket into `public/images`, at most 1600px wide and as WebP where that is smaller, and rewrote the URLs.

## Branding customization

Most of the branding elements can be found in `<Navbar>` and `<Footer>` components. To customize these components, update the code in these directories:

- [`components/core/navbar/index.tsx`](https://github.com/juneHQ/changelog/tree/master/components/core/navbar)
- [`components/core/footer/index.tsx`](https://github.com/juneHQ/changelog/tree/master/components/core/footer)
