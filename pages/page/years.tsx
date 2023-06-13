import { Box, Grid, GridItem, HStack, Image, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import useTimelineStore from "lib/state/useTimelineStore";
import Timeline from "../../components/layout/timeline";

const Years = ({ yearChangelogsMap }) => {
  const timeline = useTimelineStore();

  const yearsRecent = Object.keys(yearChangelogsMap || {}).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB.getTime() - dateA.getTime();
  });
  const yearUrls: IMonthlyChangelog[][] = yearsRecent.map((year) => {
    return yearChangelogsMap[year];
  });
  const yearChangelogs = [];

  yearUrls.forEach((year, index) => {
    const urls = year.slice(0, 27);
    const YearViewGridLayer = [];
    
    while (urls.length) {
      const currentLength = urls.length;
      YearViewGridLayer.push(
      urls.length < 9 ? urls.splice(0, 9).concat(Array(9 - currentLength).fill([])) : urls.splice(0, 9)
    )};

    yearChangelogs.push(YearViewGridLayer);
  });

  return (
    <>
      {yearChangelogs.map((changelogs, index) => (
        <Timeline key={index} date={dayjs(yearsRecent[index]).format("YYYY")}>
          <Box display="flex" paddingBottom={index === yearChangelogs.length - 1 ? 0 : 20}>
            <VStack
              onClick={() => {
                timeline.setView("months");
              }}
              cursor="pointer"
            >
              <Box
                overflow="hidden"
                borderRadius={"16px"}
                width="682px"
                // maxWidth={"682px"}
                display="flex"
                onClick={() => {}}
                position="relative"
              >
                {changelogs.length > 9 && (
                  <Box
                    w={10}
                    h={6}
                    display="flex"
                    position="absolute"
                    bottom={4}
                    right={4}
                    bg="linear-gradient(180deg, #6868F7 0%, #4C40D9 100%)"
                    borderRadius={999}
                    textAlign="center"
                    fontSize="14px"
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                    fontWeight="bold"
                  >
                    +{changelogs.length - 9}
                  </Box>
                )}
                {changelogs.length <= 2 ? (
                  <Grid
                    gap={"8px"}
                    templateColumns={changelogs.length === 1 ? "repeat(1, 1fr)" : "repeat(2, 1fr)"}
                    height="100%"
                  >
                    {changelogs.map(({ imageUrl }, index) => (
                      <Box key={index}>
                        <Image
                          src={imageUrl}
                          alt={`${Object.keys(yearChangelogsMap)[index]} - ${index}`}
                          height="100%"
                          objectFit={"cover"}
                        />
                      </Box>
                    ))}
                  </Grid>
                ) : (
                  <Grid
                    gap={"2px"}
                    templateColumns="repeat(1, 1fr)"
                    templateRows="repeat(3, 1fr)"
                    height="100%"
                  >
                    {changelogs.map((gridItems, index) => (
                      <GridItem rowSpan={1} key={index}>
                        <HStack spacing="2px">
                          {index % 2 === 0 && (
                            <>
                              <Image
                                src={gridItems[0].imageUrl}
                                alt={`${Object.keys(yearChangelogsMap)[index]} - ${index}`}
                                h="198px"
                                w="282px"
                                objectFit={"cover"}
                              />
                              <Grid
                                gap="2px"
                                templateColumns="repeat(4, 1fr)"
                                templateRows="repeat(2, 1fr)"
                              >
                                {gridItems
                                  .slice(1, gridItems.length)
                                  .map(({ imageUrl, slug }, index) => (
                                    <GridItem key={index} rowSpan={1} colSpan={1}>
                                      {imageUrl ? (
                                        <Image
                                          src={imageUrl}
                                          alt={`${
                                            Object.keys(yearChangelogsMap)[index]
                                          } - ${index}`}
                                          height="98px"
                                          objectFit={"cover"}
                                        />
                                      ) : (
                                        <Box bg="#F1F3F5" h="full" w="full" />
                                      )}
                                    </GridItem>
                                  ))}
                              </Grid>
                            </>
                          )}
                          {index % 2 === 1 && (
                            <>
                              <Grid
                                gap="2px"
                                templateColumns="repeat(4, 1fr)"
                                templateRows="repeat(2, 1fr)"
                              >
                                {gridItems
                                  .slice(0, gridItems.length - 1)
                                  .map(({ imageUrl, slug }, index) => (
                                    <GridItem key={index} rowSpan={1} colSpan={1}>
                                      {imageUrl ? (
                                        <Image
                                          src={imageUrl}
                                          alt={`${
                                            Object.keys(yearChangelogsMap)[index]
                                          } - ${index}`}
                                          height="98px"
                                          objectFit={"cover"}
                                        />
                                      ) : (
                                        <Box bg="#F1F3F5" h="full" w="full" />
                                      )}
                                    </GridItem>
                                  ))}
                              </Grid>
                              <Image
                                src={gridItems[gridItems.length - 1].imageUrl}
                                alt={`${Object.keys(yearChangelogsMap)[index]} - ${index}`}
                                h="198px"
                                w="282px"
                                objectFit={"cover"}
                              />
                            </>
                          )}
                        </HStack>
                      </GridItem>
                    ))}
                  </Grid>
                )}
              </Box>
            </VStack>
          </Box>
        </Timeline>
      ))}
    </>
  );
};

interface IMonthlyChangelog {
  imageUrl: string;
  slug: string;
  publishedAt: string;
  weeklyViewPage: number;
}

export default Years;
