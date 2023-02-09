import { Box, Button, Container, Divider, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";

import Footer from "components/core/footer";
import Navbar from "components/core/navbar";
import { TryBanner } from "components/core/try-banner";
import { defaultPx } from "lib/utils/default-container-px";
import { ReactNode } from "react";

export interface PaginatedArticlesProps {
  page: number;
  children: ReactNode;
}

export const PaginatedArticles = ({ page, children }: PaginatedArticlesProps) => {
  const metaTitle = `${page > 0 ? `Page ${page} -` : ""} June Changelog`;

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="title" content={metaTitle} />
        <meta name="description" content="Discover new updates and improvements to June." />
        <meta name="image" content="https://changelog.june.so/social.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://changelog.june.so" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content="Discover new updates and improvements to June." />
        <meta property="og:image" content="https://changelog.june.so/social.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://changelog.june.so" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content="Discover new updates and improvements to June." />
        <meta name="twitter:image" content="https://changelog.june.so/social.png" />
      </Head>
      <Navbar />
      <Box w="full" maxW="100vw" overflow="hidden" zIndex="docked">
        <Container maxW="landingMax" px={defaultPx(32)} mt={[86, 86, 140]}>
          <VStack>
            <Heading as="h1" fontSize={["5xl"]} color="black">
              Changelog
            </Heading>
            <Text fontSize="xl" color="gray.700">
              How June gets better, every week
            </Text>
          </VStack>
          <Divider my={16} />
          <VStack spacing={16} divider={<Divider />}>
            {children}
            <VStack align={["stretch", "stretch", "center"]}>
              {page === 0 ? (
                <Link href="/page/1">
                  <Button variant="landingOutline" size="landingLg">
                    Load more
                  </Button>
                </Link>
              ) : (
                <HStack justifyContent="center" spacing={4}>
                  {page > 0 && (
                    <Link href={`/page/${page - 1}`}>
                      <Button variant="landingOutline" size="landingLg">
                        Previous page
                      </Button>
                    </Link>
                  )}
                  <Link href={`/page/${page + 1}`}>
                    <Button variant="landingOutline" size="landingLg">
                      Next page
                    </Button>
                  </Link>
                </HStack>
              )}
            </VStack>
          </VStack>
        </Container>
        <TryBanner _wrapper={{ my: [50, 50, 120] }} />
        <Footer _wrapper={{ mt: [50, 50, 120], mb: 20 }} />
      </Box>
    </>
  );
};
