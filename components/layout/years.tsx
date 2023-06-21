import { Box, Grid, GridItem, HStack, Image, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { IAggregatedChangelogs, IImagePreviewMeta } from "lib/models/view";
import useTimelineStore from "lib/state/use-timeline-store";
import { useRouter } from "next/router";
import Timeline from "../../components/layout/timeline";

interface IYearsProps {
  yearChangelogsMap: IAggregatedChangelogs;
}

const Years = ({ yearChangelogsMap }: IYearsProps) => {
  const timeline = useTimelineStore();
  const router = useRouter();

  const sortedYearKeys = Object.keys(yearChangelogsMap || {}).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB.getTime() - dateA.getTime();
  });

  const sortedChangelogsByYear: IImagePreviewMeta[][] = sortedYearKeys.map((year) => {
    return yearChangelogsMap[year];
  });

  return (
    <>
      {sortedChangelogsByYear.map((changelogs, index) => (
        <Timeline key={index} date={dayjs(sortedYearKeys[index]).format("YYYY")}>
          <Box display="flex" paddingBottom={index === sortedChangelogsByYear.length - 1 ? 0 : 20}>
            <VStack
              onClick={() => {
                timeline.setView("months");
                router.push(`/page/${index}#months`);
              }}
              cursor="pointer"
            >
              <Box
                overflow="hidden"
                borderRadius={"16px"}
                width="682px"
                display="flex"
                onClick={() => {}}
                position="relative"
              >
                {changelogs.length > 27 && (
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
                    +{changelogs.length - 27}
                  </Box>
                )}
                {changelogs.length === 3 && (
                  <HStack height="100%">
                    <Box width="498px">
                      <Image
                        src={changelogs[0]?.imageUrl}
                        alt={`${Object.keys(yearChangelogsMap)[index]} - ${0}`}
                        height="360px"
                        objectFit={"cover"}
                      />
                    </Box>
                    <VStack width="176px" height="100%">
                      {changelogs.slice(1, 3).map(({ imageUrl }, index) => (
                        <Image
                          key={index}
                          src={imageUrl}
                          alt={`${Object.keys(yearChangelogsMap)[index]} - ${index}`}
                          height="100%"
                          objectFit={"cover"}
                        />
                      ))}
                    </VStack>
                  </HStack>
                )}
                {changelogs.length < 9 && changelogs.length !== 3 && (
                  <VStack key={index} spacing="8px">
                    {changelogs
                      .reverse()
                      .reduce((result, item, index) => {
                        const rowIndex = Math.floor(index / 3);
                        if (!result[rowIndex]) {
                          result[rowIndex] = [];
                        }
                        result[rowIndex].push(item);
                        return result;
                      }, [])
                      .reverse()
                      .map((rowItems, i) => (
                        <Grid
                          key={i}
                          gap={"8px"}
                          templateColumns={`repeat(${rowItems.length}, 1fr)`}
                          height="100%"
                        >
                          {rowItems
                            .reverse()
                            .map(({ imageUrl }, index) =>
                              imageUrl ? (
                                <Image
                                  key={index}
                                  src={imageUrl}
                                  alt={`${Object.keys(yearChangelogsMap)[index]} - ${index}`}
                                  height="100%"
                                  objectFit={"cover"}
                                />
                              ) : (
                                <Box bg="#F1F3F5" h="full" w="full" />
                              )
                            )}
                        </Grid>
                      ))}
                  </VStack>
                )}
                {changelogs.length === 9 && (
                  <Grid
                    key={index}
                    gap={"8px"}
                    templateColumns="repeat(8, 1fr)"
                    templateRows="repeat(7, 1fr)"
                    height="100%"
                  >
                    {changelogs.map(({ imageUrl }, index) => (
                      <GridItem
                        key={index}
                        rowSpan={[0, 2, 3].includes(index) ? 3 : 2}
                        colSpan={[1, 3, 6].includes(index) ? 4 : 2}
                      >
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={`${Object.keys(yearChangelogsMap)[index]} - ${index}`}
                            height="100%"
                            objectFit={"cover"}
                          />
                        ) : (
                          <Box bg="#F1F3F5" h="full" w="full" />
                        )}
                      </GridItem>
                    ))}
                  </Grid>
                )}
                {changelogs.length > 9 && (
                  <Grid
                    key={index}
                    gap={"2px"}
                    templateColumns="repeat(1, 1fr)"
                    templateRows={`repeat(${Math.floor(changelogs.slice(0, 27).length / 9)}, 1fr)`}
                    height="100%"
                  >
                    {changelogs
                      .slice(0, 27)
                      .reduce((result, item, index) => {
                        const rowIndex = Math.floor(index / 9);
                        if (!result[rowIndex]) {
                          result[rowIndex] = [];
                        }
                        result[rowIndex].push(item);

                        return result;
                      }, [])
                      .map((rowItems, i) => (
                        <GridItem rowSpan={1} key={i}>
                          <HStack spacing="2px">
                            {i % 2 === 0 && (
                              <>
                                <Image
                                  src={rowItems[0].imageUrl}
                                  alt={`${Object.keys(yearChangelogsMap)[index]} - ${index}`}
                                  h="198px"
                                  w={rowItems.length === 1 ? "100%" : "282px"}
                                  objectFit={"cover"}
                                />
                                <VStack spacing="2px">
                                  {rowItems
                                    .slice(1, rowItems.length)
                                    .reduce((result, item, index) => {
                                      const rowIndex = Math.floor(index / 4);
                                      if (!result[rowIndex]) {
                                        result[rowIndex] = [];
                                      }
                                      result[rowIndex].push(item);

                                      return result;
                                    }, [])
                                    .map((subGridRowItems, subIndex) => (
                                      <Grid
                                        key={subIndex}
                                        gap="2px"
                                        templateColumns={`repeat(${subGridRowItems.length}, 1fr)`}
                                      >
                                        {subGridRowItems.map(({ imageUrl }, subI) => (
                                          <GridItem key={subI}>
                                            {imageUrl ? (
                                              <Image
                                                src={imageUrl}
                                                alt={`${
                                                  Object.keys(yearChangelogsMap)[index]
                                                } - ${index}`}
                                                height={rowItems.length - 1 <= 4 ? "198px" : "98px"}
                                                width={`${400 / subGridRowItems.length - 2}px`}
                                                objectFit={"cover"}
                                              />
                                            ) : (
                                              <Image
                                                src={
                                                  rowItems[Math.floor(Math.random() * 3)].imageUrl
                                                }
                                                alt={`${
                                                  Object.keys(yearChangelogsMap)[index]
                                                } - ${index}`}
                                                h="full"
                                                w="full"
                                                objectFit={"cover"}
                                              />
                                            )}
                                          </GridItem>
                                        ))}
                                      </Grid>
                                    ))}
                                </VStack>
                              </>
                            )}
                            {i % 2 === 1 && (
                              <>
                                <VStack spacing="2px">
                                  {rowItems
                                    .slice(0, rowItems.length - 1)
                                    .reduce((result, item, index) => {
                                      const rowIndex = Math.floor(index / 4);
                                      if (!result[rowIndex]) {
                                        result[rowIndex] = [];
                                      }
                                      result[rowIndex].push(item);

                                      return result;
                                    }, [])
                                    .map((subGridRowItems, subIndex) => (
                                      <Grid
                                        key={subIndex}
                                        gap="2px"
                                        templateColumns={`repeat(${subGridRowItems.length}, 1fr)`}
                                      >
                                        {subGridRowItems.map(({ imageUrl }, subI) => (
                                          <GridItem key={subI}>
                                            {imageUrl ? (
                                              <Image
                                                src={imageUrl}
                                                alt={`${
                                                  Object.keys(yearChangelogsMap)[index]
                                                } - ${index}`}
                                                height={rowItems.length - 1 <= 4 ? "198px" : "98px"}
                                                width={`${400 / subGridRowItems.length - 2}px`}
                                                objectFit={"cover"}
                                              />
                                            ) : (
                                              <Image
                                                src={
                                                  rowItems[Math.floor(Math.random() * 3)].imageUrl
                                                }
                                                alt={`${
                                                  Object.keys(yearChangelogsMap)[index]
                                                } - ${index}`}
                                                h="full"
                                                w="full"
                                                objectFit={"cover"}
                                              />
                                            )}
                                          </GridItem>
                                        ))}
                                      </Grid>
                                    ))}
                                </VStack>
                                <Image
                                  src={rowItems[0].imageUrl}
                                  alt={`${Object.keys(yearChangelogsMap)[index]} - ${index}`}
                                  h="198px"
                                  w={rowItems.length === 1 ? "100%" : "282px"}
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

export default Years;
