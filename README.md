# Changelog 🚀

![summary-repo](https://github.com/juneHQ/changelog/assets/104089773/91b333a5-0e66-420d-b0bf-815e76570501)

![screenshot-repo](https://github.com/juneHQ/changelog/assets/104089773/18ff86a4-3e9f-4fc8-9fab-38fb15b0c8cd)

Set-up a changelog and share what you ship as easily as 1-2-3. A Next.js blog starter project built with MDX and Chakra UI. Fully-customizable and open source, so don't hesitate to add new features and report bugs!

#### [👉 Visit working demo](https://changelog.june.so)

## Features

- 💅 A stylish changelog
- ⏳ Timeline view
- 📆 Date switcher
- 🧩 Mosaic mode
- 🏄‍♀️ Smooth transitions
- 🎉 Celebrate your team's achievements with team credits on each post
- ⚙️ Easy-to-use admin panel

👇 Mosaic mode in action below

![ezgif com-video-to-gif (39)](https://github.com/juneHQ/changelog/assets/104089773/6ae75ac9-2a47-4dc9-9fb0-73cb90dbd2b7)

## Getting started

The easiest way to try this is to run it locally on your computer.

First, you'll need to create your own copy of this code. You can do so by clicking the ["Fork"](https://github.com/juneHQ/changelog/fork) button on GitHub and filling out the form.

Once you've cloned the repository, create a `.env.local` file to setup the environment variables, you can reuse the default variables or change them as you will:

```bash
cp .env.example .env.local
```

Then install dependencies and start the Next.js server:

```bash
# Using yarn
yarn install
yarn dev

# Using npm
npm install
npm run dev
```

## Deploying

You can deploy your blog to any hosting provider that supports Next.js. We recommend [Vercel](https://vercel.com), as it is the easiest way to deploy Next.js apps.

To deploy you'll need to make sure you include the right environment variables. You can find some examples of our environment variables in the [`.env.local.example`](https://github.com/juneHQ/changelog/tree/master/.env.example) file.

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

If you start having too many changelogs, you'll want to move your images in an S3 bucket.

To do so you'll need to:

1. Create an S3 bucket for your changelog images
2. Add the bucket name to your `.env` file
3. Make sure you are authenticated to your AWS account and have the `aws` CLI installed
4. Create a `changelog-images` directory in your repository (`mkdir changelog-images`)
5. Run `sync_images.sh` to sync the images from your local to your S3 bucket

You'll need to run the `sync_images.sh` script to sync your local images with your S3 bucket. This script will upload all images in the `/changelog-images` directory to your S3 bucket.

```bash
./sync_images.sh
```

## Branding customization

Most of the branding elements can be found in `<Navbar>` and `<Footer>` components. To customize these components, update the code in these directories:

- [`components/core/navbar/index.tsx`](https://github.com/juneHQ/changelog/tree/master/components/core/navbar)
- [`components/core/footer/index.tsx`](https://github.com/juneHQ/changelog/tree/master/components/core/footer)
