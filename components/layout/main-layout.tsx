import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { defaultPx } from 'lib/utils/default-container-px';
import useTimelineStore from 'lib/state/use-timeline-store';
import usePageStatusStore from 'lib/state/use-page-status-store';
import useAnimatePageStore from 'lib/state/use-animate-page-store';
import { motion } from 'framer-motion';
import TryBanner from 'components/core/try-banner';
import Navbar from 'components/core/navbar';
import { Footer } from 'components/core/footer';
import { Box, Button, Container, HStack, VStack } from '@chakra-ui/react';
import TimeSelectionTabs from '../core/time-selection-tabs';

export interface MainLayoutProps {
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

export const MainLayout = ({
  page,
  children,
  itemsPerPage,
  totalItems,
  infiniteScrollingView,
}: MainLayoutProps) => {
  const metaTitle = `${
    infiniteScrollingView ? "" : page > 0 ? `Page ${page} -` : ""
  } June Changelog`;
  const timeline = useTimelineStore();
  const { animatePage, setAnimatePage } = useAnimatePageStore();
  const router = useRouter();
  const pageStatus = usePageStatusStore();

  React.useEffect(() => {
    const hash = window?.location.hash ?? "";

    timeline.setView(
      hash ? (hash === "#months" ? "months" : hash === "#years" ? "years" : "weeks") : "weeks"
    );
  }, []);

  React.useEffect(() => {
    router.events.on("routeChangeStart", (url: string) => {
      if (!url.includes("/changelogs/")) {
        window.scrollTo({
          top: 0,
        });
      }

      pageStatus.setIsLoading(true);

      if (url.includes("/years") && !url.includes("/months")) {
        timeline.setView("months");
      } else if (url.includes("/years") && url.includes("/months")) {
        timeline.setView("weeks");
      }
    });

    router.events.on("routeChangeComplete", (url: string) => {
      pageStatus.setIsLoading(false);

      if (url.includes("/years") && !url.includes("/months")) {
        timeline.setView("months");
      } else if (url.includes("/years") && url.includes("/months")) {
        timeline.setView("weeks");
      }
    });
  }, []);

  const hasMorePage =
    !infiniteScrollingView &&
    page !== undefined &&
    page < (Math.floor(totalItems[timeline.view] / itemsPerPage) - 1);

  const isInBlogPage = router.pathname.startsWith("/changelogs/");

  return (
    <>
      {!isInBlogPage && (
        <Head>
          <title>{metaTitle}</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="title" content={metaTitle} />
          <meta name="description" content="Discover new updates and improvements to June." />
          <meta name="image" content="https://changelog.june.so/social.png" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://changelog.june.so" />
          <meta property="og:title" content={metaTitle} />
          <meta
            property="og:description"
            content="Discover new updates and improvements to June."
          />
          <meta property="og:image" content="https://changelog.june.so/social.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://changelog.june.so" />
          <meta name="twitter:title" content={metaTitle} />
          <meta
            name="twitter:description"
            content="Discover new updates and improvements to June."
          />
          <meta name="twitter:image" content="https://changelog.june.so/social.png" />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="June Changelog"
            href="https://changelog.june.so/rss.xml"
          />
        </Head>
      )}
      <motion.div
        initial={animatePage ? "hidden" : "visible"}
        animate="visible"
        onAnimationComplete={() => {
          setAnimatePage(false);
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.6 } },
          }}
        >
          <Navbar />
        </motion.div>
        {!isInBlogPage && (
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.6, delay: 0.2 } },
            }}
            layout
            layoutId="timeline-switcher-button"
            transition={{ duration: 0 }}
            style={{
              position: "sticky",
              top: "32px",
              zIndex: 1,
              paddingBottom: "32px",
            }}
          >
            <TimeSelectionTabs />
          </motion.div>
        )}
        <Box w="100vw" maxW={"100%"} zIndex="docked">
          <Container maxW="landingMax" display="flex" justifyContent="center" px={defaultPx(32)}>
            <VStack spacing={8} alignItems="center" w="full">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
                }}
              >
                <VStack
                  display="flex"
                  justifyContent="start"
                  alignItems="start"
                  gap={[8, 8, 14]}
                  minWidth={["100%", "100%", "834px"]}
                  minHeight="100vh"
                >
                  {!isInBlogPage && (
                    <div className="font-hero flex flex-col items-start w-full gap-2">
                      <h1 className="text-5xl font-hero font-black tracking-tight text-gray-900 sm:text-6xl sm:leading-[75px] text-left">
                        Changelog
                      </h1>
                      <p className="max-w-2xl text-2xl font-hero font-bold leading-8 text-gray-900 text-left">
                        New features, improvements, and fixes every week
                      </p>
                    </div>
                  )}
                  <div className="flex flex-col justify-center">
                    {children}
                  </div>
                </VStack>
              </motion.div>
              <motion.div
                hidden={!!infiniteScrollingView}
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
                          <Button variant="landingOutline" size="landingLg">
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
            </VStack>
          </Container>
        </Box>
      </motion.div>
      <Footer />
    </>
  );
};
