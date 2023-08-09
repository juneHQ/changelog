import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { Button, HStack, VStack } from "@chakra-ui/react";
import useTimelineStore from "lib/state/use-timeline-store";
import { motion } from "framer-motion";
import useAnimatePageStore from "lib/state/use-animate-page-store";

export interface ContentLayoutProps {
  page?: number;
  children: ReactNode;
  itemsPerPage?: number;
  totalItems?: {
    weeks: number;
    months: number;
    years: number;
  };
  infiniteScrollingView?: "year" | "month";
}

export const ContentLayout = ({
  page,
  children,
  itemsPerPage,
  totalItems,
  infiniteScrollingView,
}: ContentLayoutProps) => {
  const metaTitle = `${
    infiniteScrollingView ? "" : page > 0 ? `Page ${page} -` : ""
  } Screeb Changelog`;
  const timeline = useTimelineStore();
  const { animatePage, setAnimatePage } = useAnimatePageStore();

  React.useEffect(() => {
    const hash = window?.location.hash ?? "";

    timeline.setView(
      hash ? (hash === "#months" ? "months" : hash === "#years" ? "years" : "weeks") : "weeks"
    );
  }, []);

  const hasMorePage =
    !infiniteScrollingView && page < Math.floor(totalItems[timeline.view] / itemsPerPage);

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="title" content={metaTitle} />
        <meta property="og:title" content={metaTitle} />
        <meta name="twitter:title" content={metaTitle} />
      </Head>
      <motion.div
        initial={animatePage ? "hidden" : "visible"}
        animate="visible"
        onAnimationComplete={() => {
          setAnimatePage(false);
        }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } },
        }}
      >
        <VStack align={["stretch", "stretch", "center"]}>
          {page === 0 && hasMorePage ? (
            <Link href={`/page/1#${timeline.view}`}>
              <Button variant="landingOutline" size="landingLg">
                Load more
              </Button>
            </Link>
          ) : (
            <HStack justifyContent="center" spacing={4}>
              {page > 0 && (
                <Link href={`/page/${page - 1}${"#" + timeline.view}`}>
                  <Button
                    variant="landingOutline"
                    size="landingLg"
                    opacity={infiniteScrollingView ? 0 : 1}
                  >
                    Previous page
                  </Button>
                </Link>
              )}
              {hasMorePage && (
                <Link href={`/page/${page + 1}${"#" + timeline.view}`}>
                  <Button variant="landingOutline" size="landingLg">
                    Next page
                  </Button>
                </Link>
              )}
            </HStack>
          )}
        </VStack>
      </motion.div>
    </>
  );
};
