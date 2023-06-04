import dynamic from 'next/dynamic';
import { getArticleSlugs } from 'lib/get-articles-slugs';
import { PaginatedArticles } from 'components/paginated-articles';
import { Box, Button, Grid, Heading, HStack, Image, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import Link from 'next/link';

const ARTICLES_PER_PAGE = 4;

const Page = ({ slugs, monthChangelogsMap }) => {
  const [view, setView] = useState<"weeks" | "months" | "years">("months");

  const Articles = slugs.map((slug) => dynamic(() => import(`./changelogs/${slug}.mdx`)));

  const monthUrls : IMonthlyChangelog[][] = Object.keys(monthChangelogsMap || {})
    .sort((a, b) => {
      const dateB = new Date(b);
      const dateA = new Date(a);
      return dateB.getTime() - dateA.getTime();
    })
    .map((date) => {
      return monthChangelogsMap[date]
    });

    return (
      <>
        <PaginatedArticles
          page={0}
        >
          <VStack>
            <HStack>
              <Button
                variant="landingOutline"
                size="landingLg"
                onClick={() => setView("weeks")}
                isActive={view === "weeks"}
              >
                Weeks
              </Button>
              <Button
                variant="landingOutline"
                size="landingLg"
                onClick={() => setView("months")}
                isActive={view === "months"}
              >
                Months
              </Button>
              <Button
                variant="landingOutline"
                size="landingLg"
                onClick={() => setView("years")}
                isActive={view === "years"}
              >
                Years
              </Button>
            </HStack>
          </VStack>
          {view === 'weeks' && Articles.map((Article, index) => (
            <Box>
              <Article key={index} hideLayout={true} hideHead={true} hideAuthors={true} />
            </Box>
          ))}
          {view === 'months' && monthUrls.map((changelogs, index) => (
            <VStack key={index}>
              <Link href={`/page/${changelogs[0]?.weeklyViewPage}`}>
                <Heading as="h2" size="lg" mb={4}>
                  {Object.keys(monthChangelogsMap)[index]}
                </Heading>
              </Link>
              <Box height={'360px'} overflow='hidden'
                borderRadius={'16px'}
                maxWidth={'682px'}
                display="flex"
                onClick={() => {
                }}
              >
                {changelogs.length <= 2 ? (
                  <Grid
                    gap={'8px'}
                    // templateColumns="repeat(2, 1fr)"
                    templateColumns={
                      changelogs.length === 1 ? "repeat(1, 1fr)" : "repeat(2, 1fr)"
                    }
                    height="100%"
                  >
                    {changelogs.map(({imageUrl}, index) => (
                      <Box
                        key={index}
                      >
                        <Image
                          src={imageUrl}
                          alt={
                            `${Object.keys(monthChangelogsMap)[index]} - ${index}`
                          }
                          height="100%"
                          objectFit={'cover'}
                        />
                      </Box>
                    ))}
                  </Grid>
                ) : (
                  <Grid
                    height="100%"
                    gap={'8px'}
                    templateColumns="repeat(2, 1fr)"
                  >
                    <Box
                      flex={1}
                    >
                      <Image
                        src={
                          changelogs[0]?.imageUrl
                        }
                        alt={
                          `${Object.keys(monthChangelogsMap)[index]} - ${0}`
                        }
                        height="100%"
                        objectFit={'cover'}
                      />
                    </Box>
                    <Grid
                      gap={'8px'}
                      templateColumns="repeat(1, 1fr)"
                    >
                      {changelogs.slice(1, 3).map(({imageUrl}, index) => (
                        <Image
                          key={index}
                          src={imageUrl}
                          alt={
                            `${Object.keys(monthChangelogsMap)[index]} - ${index}`
                          }
                          height="100%"
                          objectFit={'cover'}
                        />
                      ))}
                    </Grid>
                  </Grid>
                )}
              </Box>
            </VStack>
          ))}
        </PaginatedArticles>
      </>
    );
};

interface IMonthlyChangelog {
  imageUrl: string;
  slug: string;
  publishedAt: string;
  weeklyViewPage: number;
}

export async function getStaticProps() {
  const slugs = getArticleSlugs();

  const results = await Promise.allSettled(slugs.map((slug) => import(`./changelogs/${slug}.mdx`)));

  const meta = results
    .map((res) => res.status === "fulfilled" && res.value.meta)
    .filter((item) => item);

  meta.sort((a, b) => {
    const dateB = new Date(b.publishedAt);
    const dateA = new Date(a.publishedAt);
    return dateB.getTime() - dateA.getTime();
  });

  const start = 0;
  const end = ARTICLES_PER_PAGE;
  const recents = meta.slice(start, end).map((item) => item.slug);

  // aggregate images for monthly changelogs
  const monthChangelogsMap : {
    [key: string]: IMonthlyChangelog[];
  } = meta.reduce((acc, item, index) => {
    const date = new Date(item.publishedAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const key = `${year}-${month}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push({
      imageUrl: item.headerImage,
      slug: item.slug,
      publishedAt: item.publishedAt,
      weeklyViewPage: index / ARTICLES_PER_PAGE + 1,
    });
    return acc;
  }, {});

  const recentMonthChangelogsMap = Object.keys(monthChangelogsMap)
    .slice(start, end)
    .reduce((acc, key) => {
      acc[key] = monthChangelogsMap[key];
      return acc;
    }, {}); 

  return {
    props: { 
      slugs: recents,
      monthChangelogsMap: recentMonthChangelogsMap,
    },
    revalidate: 1,
  };
}

export default Page;
