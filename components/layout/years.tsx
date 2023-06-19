import { Box, Grid, GridItem, HStack, Image, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { IImagePreviewMeta, IYearlyChangelog } from "lib/models/view";
import useTimelineStore from "lib/state/use-timeline-store";
import { useRouter } from "next/router";
import Timeline from "../../components/layout/timeline";

interface IYearsProps {
  yearChangelogsMap: { [key: string]: IImagePreviewMeta[] };
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

  const yearChangelogs = [];

  sortedChangelogsByYear.forEach((year, index) => {

    if (year.length <= 9 ){
      yearChangelogs.push(year.concat(Array(9 - year.length).fill([])));
    } else {
      //convert 1d array to 2d array for grid layout
      const imagePreviewMetas = year.slice(0, 27);
      const yearViewGridRows = [];

      while (imagePreviewMetas.length) {
        const currentLength = imagePreviewMetas.length;
        yearViewGridRows.push(
          imagePreviewMetas.length < 9
            ? imagePreviewMetas.splice(0, 9).concat(Array(9 - currentLength).fill([]))
            : imagePreviewMetas.splice(0, 9)
        );
      }

      yearChangelogs.push(yearViewGridRows);
    }
  });

  return (
    <>
      {yearChangelogs.map((changelogs, index) => (
        <Timeline key={index} date={dayjs(sortedYearKeys[index]).format("YYYY")}>
          <Box display="flex" paddingBottom={index === yearChangelogs.length - 1 ? 0 : 20}>
            <VStack
              onClick={() => {
                timeline.setView("months");
                router.push(`/page/${index}/months`);
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
                {/* {
                  (changelogs.length === 3 && (
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
                      +{changelogs.length === 3 ? changelogs.length - 9 : 12 }
                    </Box>
                  ))} */}
                {changelogs.length === 9 ? (
                  <Grid
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

export default Years;
