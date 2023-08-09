import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { MdxMeta } from "lib/models/mdx-meta";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { Contributor } from "components/contributor";
import { ReactNode } from "@mdx-js/react/lib";
import { MDXProvider } from "@mdx-js/react";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
  VStack,
  Stack,
} from "@chakra-ui/react";
import Timeline from "./layout/timeline";
import { MainLayout } from "./layout/main-layout";

import type { MDXComponents } from "mdx/types";
const components: MDXComponents = {
  h1: (props) => <Heading as="h1" fontSize={["2xl", "2xl", "32px"]} color="#000" {...props} />,
  h2: (props) => <Text fontWeight="bold" fontSize="xl" mt={12} mb={6} {...props} />,
  p: (props) => <Text my={6} color="#495057" fontSize="16px" lineHeight="24px" {...props} />,
  a: (props) => (
    <Text as="a" href={props.href} rel="noopener noreferrer" color="#6868F7" fontWeight="bold">
      {props.children}
    </Text>
  ),
  ul: (props) => <UnorderedList spacing={4} {...props} />,
  ol: (props) => <OrderedList spacing={4} {...props} />,
  li: (props) => (
    <ListItem
      color="#495057"
      lineHeight="32px"
      fontSize="16px"
      _before={{ content: "unset" }}
      {...props}
    />
  ),
};

export interface MdxLayoutProps {
  meta: MdxMeta;
  children: ReactNode;
  hideLayout?: boolean;
  hideHead?: boolean;
  hideAuthorsNames?: boolean;
  imagePreviewMode?: boolean;
  tags?: string[];
  index?: number;
  isInfiniteScrollingView?: boolean;
}

export const MdxLayout = (props: MdxLayoutProps) => {
  const title = `${props.meta.title} | Screeb Changelog`;
  const description = "Discover new updates and improvements to Screeb.";
  const url = "https://changelog.screeb.app";

  const router = useRouter();
  React.useLayoutEffect(() => {
    // using a timeout to wait for the page to render and get the right scroll position
    const timeout = setTimeout(() => {
      const month = router.asPath.split("month=")[1];

      const articleMonth = dayjs(props.meta.publishedAt).format("MM");

      // if the current article is the first one in the page
      // and the month is different from the current month
      // scroll to the month
      if (month && month !== articleMonth && props.index === 0 && props.hideLayout) {
        const element = document.querySelector(`.timeline-month-${month}`);
        const rect = element?.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const top = rect?.top + scrollTop;

        window.scrollTo({
          behavior: "smooth",
          top: top - 70,
        });
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [router.asPath]);

  if (props.imagePreviewMode) {
    return (
      <Image
        src={props.meta.headerImage}
        alt={props.meta.title}
        height="100%"
        objectFit={"cover"}
      />
    );
  }

  const shouldAnimateFromPreviousPage =
    props.hideLayout && props.isInfiniteScrollingView && props.index === 0;

  const isInBlogPage = router.pathname.startsWith("/changelogs/");

  const MDX = () => (
    <MDXProvider components={components}>
      {!props.hideHead && (
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="title" content={title} />
          <meta name="description" content={description} />
          <meta name="image" content={props.meta.headerImage} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={url} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={props.meta.headerImage} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content={url} />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={props.meta.headerImage} />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="Screeb Changelog"
            href="https://changelog.screeb.app/rss.xml"
          />
        </Head>
      )}
      <Timeline
        date={dayjs(props.meta.publishedAt).format("MMM DD YYYY")}
        className={`timeline-month-${dayjs(props.meta.publishedAt).format("MM")}`}
      >
        <Box
          // mt={!props.hideLayout && [86, 86, 140]}
          // maxW="4xl"
          // mx="auto"
          width={["100%", "100%", "682px"]}
          // w="100%"
          maxW="682px"
          // px={defaultPx(32)}
        >
          {/* Article header */}
          <VStack align="start" spacing={[4, 4, 6]}>
            {props.tags !== undefined && (
              <Flex gap={2}>
                {props.tags?.map((tag, index) => (
                  <Box
                    height="22px"
                    bg="#F1F3F5"
                    color="#0D131B"
                    fontSize="14px"
                    borderRadius="full"
                    px={2}
                    lineHeight="21px"
                    fontWeight={500}
                    position="relative"
                    top="-8px"
                    mb="-10px"
                  >
                    {tag}
                  </Box>
                ))}
              </Flex>
            )}
            <motion.div
              layoutId={shouldAnimateFromPreviousPage ? `${props.meta.slug}` : ``}
              initial={{
                opacity: shouldAnimateFromPreviousPage ? 1 : 0,
                y: shouldAnimateFromPreviousPage ? 0 : 20,
                scale: shouldAnimateFromPreviousPage ? 0.9 : 1,
              }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.6 }, scale: 1 }}
              style={{ width: "100%", overflow: "hidden", borderRadius: "16px", height: "100%" }}
            >
              <Link href={props.hideLayout ? `/changelogs/${props.meta.slug}` : ""}>
                <Image
                  src={props.meta.headerImage}
                  alt={props.meta.title}
                  w="full"
                  height={["100%", "100%", "360px"]}
                  objectFit={"cover"}
                  cursor={props.hideLayout ? "pointer" : "default"}
                  _hover={{
                    // apply underline on hover to the next first .article-title
                    // "& + .article-title": {
                    //   textDecoration: "underline",
                    // },
                    boxShadow: props.hideLayout ? "0px 2px 4px 0px rgba(0, 0, 0, 0.1)" : "",
                  }}
                  fallback={
                    props.isInfiniteScrollingView ? (
                      <Box height={["100%", "100%", "360px"]} />
                    ) : (
                      <Image
                        src="/plain-gray.jpg"
                        height={["100%", "100%", "360px"]}
                        objectFit={"cover"}
                        w="full"
                      />
                    )
                  }
                />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: shouldAnimateFromPreviousPage ? 0 : 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } }}
            >
              <Link href={props.hideLayout ? `/changelogs/${props.meta.slug}` : ""}>
                <Heading
                  className="article-title"
                  as="h1"
                  fontSize="24px"
                  color="#0D131B"
                  cursor={props.hideLayout ? "pointer" : "default"}
                  _hover={{
                    textDecoration: "underline",
                  }}
                >
                  {props.meta.title}
                </Heading>
              </Link>
            </motion.div>
          </VStack>
          {/* Article content */}
          <motion.div
            initial={{ opacity: 0, y: props.hideLayout ? 0 : 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } }}
          >
            <Box fontSize="lg" lineHeight="32px" color="landing.almostBlack.500">
              {props.children}
            </Box>
          </motion.div>
          {/* Article authors */}
          <Divider mt={16} mb={8} />
          <Stack
            px={[6]}
            align="start"
            spacing={4}
            direction={props.hideAuthorsNames ? "row" : "column"}
          >
            {props.meta.authors.map((author) => (
              <Contributor hideNames={props.hideAuthorsNames} key={author.name} {...author} />
            ))}
          </Stack>
        </Box>
      </Timeline>
    </MDXProvider>
  );

  return isInBlogPage ? (
    <MainLayout>
      <MDX />
    </MainLayout>
  ) : (
    <MDX />
  );
};
