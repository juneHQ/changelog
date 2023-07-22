import { Box, Grid, HStack, Image, VStack } from "@chakra-ui/react";
import MoreItems from "components/core/more-items";
import dayjs from "dayjs";
import { IAggregatedChangelogs, IImagePreviewMeta } from "lib/models/view";
import useTimelineStore from "lib/state/use-timeline-store";
import { useRouter } from "next/router";
import Timeline from "./timeline";
import React from "react";
import { motion } from "framer-motion";

interface IMonthsProps {
  monthChangelogsMap: IAggregatedChangelogs;
  isInfiniteScrollingView?: boolean;
}

const Months = ({ monthChangelogsMap, isInfiniteScrollingView }: IMonthsProps) => {
  const router = useRouter();
  const timeline = useTimelineStore();

  const sortedChangelogsArrayByMonth: IImagePreviewMeta[][] = Object.keys(monthChangelogsMap || {})
    .sort((a, b) => {
      const dateB = new Date(b);
      const dateA = new Date(a);
      return dateB.getTime() - dateA.getTime();
    })
    .map((date) => {
      return monthChangelogsMap[date];
    });

  // check for query params: year = YYYY on load, if so scroll to that year
  React.useLayoutEffect(() => {
    // if year && the first item in sortedChangelogsArrayByMonth is not the year, scroll to that year

    const year = router.asPath.split("year=")[1];

    if (
      year &&
      sortedChangelogsArrayByMonth[0] &&
      dayjs(sortedChangelogsArrayByMonth[0][0].publishedAt).format("YYYY") !== year
    ) {
      const yearIndex = sortedChangelogsArrayByMonth.findIndex((changelogs) => {
        return dayjs(changelogs[0].publishedAt).format("YYYY") === year;
      });
      if (yearIndex !== -1) {
        window.scrollTo({
          top: document.getElementById(`timeline-month-${yearIndex}`)?.offsetTop - 70,
          behavior: "smooth",
        });
      }
    }
  }, [router.asPath, monthChangelogsMap]);

  return (
    <>
      {sortedChangelogsArrayByMonth.map((changelogs, index) => (
        <Timeline
          id={`timeline-month-${index}`}
          key={index}
          date={dayjs(Object.keys(monthChangelogsMap)[index]).format("MMM YYYY")}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Box
              display="flex"
              paddingBottom={index === sortedChangelogsArrayByMonth.length - 1 ? 0 : [12, 16, 20]}
            >
              <VStack
                // onClick={() => {
                //   timeline.setView("weeks");
                // }}
                cursor="pointer"
              >
                <Box
                  maxHeight="360px"
                  // overflow="hidden"
                  borderRadius={"16px"}
                  maxWidth={"682px"}
                  display="flex"
                  onClick={() => {
                    // timeline.setView("weeks");
                    // router.push(
                    //   `/page/${changelogs[0].weeklyViewPage}#weeks?month=${dayjs(
                    //     Object.keys(monthChangelogsMap)[index]
                    //   ).format("MM")}`
                    // );
                    const date = dayjs(Object.keys(monthChangelogsMap)[index]);
                    const month = date.format("MM");
                    const year = date.format("YYYY");
                    router.push(`/years/${year}/months/${month}`, undefined, {
                      // NOTE: not working yet
                      scroll: true,
                    });
                  }}
                  position="relative"
                  _hover={{
                    "& img": {
                      boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                  sx={{
                    "& img": {
                      transition: "box-shadow 0.3s",
                    },
                  }}
                >
                  {changelogs.length > 3 && <MoreItems numberOfItems={changelogs.length - 3} />}
                  {changelogs.length <= 2 ? (
                    <Grid
                      gap={"8px"}
                      templateColumns={
                        changelogs.length === 1 ? "repeat(1, 1fr)" : "repeat(2, 1fr)"
                      }
                      height="100%"
                    >
                      {changelogs.map(({ imageUrl, slug }, index) => (
                        <Box key={index}>
                          <motion.div
                            layoutId={index === 0 && isInfiniteScrollingView ? slug : ``}
                            initial={{
                              scale: index === 0 && isInfiniteScrollingView ? 0.7 : 1,
                              opacity: 1,
                            }}
                            animate={{
                              scale: 1,
                            }}
                            transition={{ duration: 0.6 }}
                          >
                            <Image
                              src={imageUrl}
                              alt={`${Object.keys(monthChangelogsMap)[index]} - ${index}`}
                              height="100%"
                              maxHeight={"100%"}
                              objectFit={"cover"}
                              borderLeftRadius={index === 0 ? "16px" : 0}
                              borderRightRadius={
                                index === 1 || changelogs.length === 1 ? "16px" : 0
                              }
                            />
                          </motion.div>
                        </Box>
                      ))}
                    </Grid>
                  ) : (
                    <HStack height="100%">
                      <Box width="100%">
                        <motion.div
                          // layoutId={`${changelogs[0]?.slug}`}
                          // initial="visible"
                          // transition={{ duration: 0.6 }}
                          layoutId={
                            index === 0 && isInfiniteScrollingView ? changelogs[0]?.slug : ``
                          }
                          initial={{
                            scale: index === 0 && isInfiniteScrollingView ? 0.7 : 1,
                            opacity: 1,
                          }}
                          animate={{
                            scale: 1,
                          }}
                          transition={{ duration: 0.6 }}
                        >
                          <Image
                            src={changelogs[0]?.imageUrl}
                            alt={`${Object.keys(monthChangelogsMap)[index]} - ${0}`}
                            minHeight={["176px", "176px", "360px"]}
                            height="100%"
                            objectFit={"cover"}
                            borderLeftRadius={"16px"}
                          />
                        </motion.div>
                      </Box>
                      <VStack width="176px" height="100%">
                        {changelogs.slice(1, 3).map(({ imageUrl }, index) => (
                          <Image
                            key={index}
                            src={imageUrl}
                            alt={`${Object.keys(monthChangelogsMap)[index]} - ${index}`}
                            height="100%"
                            objectFit={"cover"}
                            borderTopRightRadius={index === 0 ? "16px" : 0}
                            borderBottomRightRadius={index === 1 ? "16px" : 0}
                          />
                        ))}
                      </VStack>
                    </HStack>
                  )}
                </Box>
              </VStack>
            </Box>
          </motion.div>
        </Timeline>
      ))}
    </>
  );
};

export default Months;
