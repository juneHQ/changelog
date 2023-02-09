# Weekly Changelog Blog

Set-up a blog and share what you ship as easy as 1-2-3!

![screenshot](/changelog.png)

A Next.js blog starter project built with MDX and Chakra UI. Fully-customizable and open source, so don't hesitate to add new features and report bugs!

## Features

- A stylish changelog
- Celebrate your team's achievements - with team credits on each post
- Easy-to-use admin panel

## Getting started

The easiest way to try this starter is to run it locally on your computer.

First, you'll need to create your own copy of this starter. You can do so by clicking the ["Use this template"](https://github.com/ferrucc-io/weekly-changelog/generate) button on GitHub and filling out the [form](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template).

Once you've cloned the repository, make sure you're in the `frontend` directory:

```bash
cd frontend
```

Install dependencies and start the Next.js server:

```bash
# Using yarn
yarn install
yarn dev

# Using npm
npm install
npm run dev
```

If you want to change the default environment variables, create a `.env.local` file like this:

```
cp .env.local.example .env.local
```

## Routes

- `/pages/:pageNumber` - displays paginated articles
- `/` - redirects to `/pages/0`
- `/changelogs/:id` - displays one article

## File structure

```bash
frontend
├─ bin             # Scripts
├─ components      # Reusable components
│  ├─ core
│  ├─ mdx-layout.tsx
│  └─ ...
├─ lib              # Types, theme, utilities, services
├─ pages
│  ├─ changelogs    # MDX articles
│  ├─ page
│  │  └─ [page].tsx # Paginated articles
│  ├─ _app.tsx
│  └─ _middleware.ts
└─ ...
```

## Writing articles

To write a new blog post, create a new `.mdx` file in the `/pages/changelogs` directory.

### Anatomy of an MDX article

MDX is a superset of markdown that lets you write JSX directly in your markdown files. It is a powerful way to add dynamic interactivity, and embed components within your content, helping you to bring your pages to life.

![mdx-preview](/mdx-preview.png)

Learn more 👉 [Next.js: Using MDX](https://nextjs.org/docs/advanced-features/using-mdx), [Using MDX](https://mdxjs.com/docs/using-mdx/)

## Branding customization

Most of the branding elements can be found in `<Navbar>` and `<Footer>` components. To customize these components, update the code in these directories:

- [`frontend/components/core/navbar/index.tsx`](https://github.com/juneHQ/weekly-changelog/tree/master/frontend/components/core/navbar)
- [`frontend/components/core/footer/index.tsx`](https://github.com/juneHQ/weekly-changelog/tree/master/frontend/components/core/footer)
