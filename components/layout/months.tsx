import { Box, Grid, HStack, Image, VStack } from "@chakra-ui/react";
import MoreItems from "components/core/more-items";
import dayjs from "dayjs";
import { IAggregatedChangelogs, IImagePreviewMeta } from "lib/models/view";
import useTimelineStore from "lib/state/use-timeline-store";
import { useRouter } from "next/router";
import Timeline from "./timeline";

interface IMonthsProps {
  monthChangelogsMap: IAggregatedChangelogs;
}

const Months = ({ monthChangelogsMap }: IMonthsProps) => {
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

  return (
    <>
      {sortedChangelogsArrayByMonth.map((changelogs, index) => (
        <Timeline
          key={index}
          date={dayjs(Object.keys(monthChangelogsMap)[index]).format("MMM YYYY")}
        >
          <Box
            display="flex"
            paddingBottom={index === sortedChangelogsArrayByMonth.length - 1 ? 0 : [12, 16, 20]}
            position="relative"
            top="-8px"
          >
            <VStack
              onClick={() => {
                timeline.setView("weeks");
              }}
              cursor="pointer"
            >
              <Box
                maxHeight="360px"
                overflow="hidden"
                borderRadius={"16px"}
                maxWidth={"682px"}
                display="flex"
                onClick={() => {
                  timeline.setView("weeks");
                  router.push(`/page/${changelogs[0].weeklyViewPage}#weeks`);
                }}
                position="relative"
              >
                {sortedChangelogsArrayByMonth.length > 3 && (
                  <MoreItems numberOfItems={sortedChangelogsArrayByMonth.length - 3} />
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
                          alt={`${Object.keys(monthChangelogsMap)[index]} - ${index}`}
                          height="100%"
                          objectFit={"cover"}
                        />
                      </Box>
                    ))}
                  </Grid>
                ) : (
                  <HStack height="100%">
                    <Box width="100%">
                      <Image
                        src={changelogs[0]?.imageUrl}
                        alt={`${Object.keys(monthChangelogsMap)[index]} - ${0}`}
                        minHeight={["176px", "176px", "360px"]}
                        height="100%"
                        objectFit={"cover"}
                      />
                    </Box>
                    <VStack width="176px" height="100%">
                      {changelogs.slice(1, 3).map(({ imageUrl }, index) => (
                        <Image
                          key={index}
                          src={imageUrl}
                          alt={`${Object.keys(monthChangelogsMap)[index]} - ${index}`}
                          height="100%"
                          objectFit={"cover"}
                        />
                      ))}
                    </VStack>
                  </HStack>
                )}
              </Box>
            </VStack>
          </Box>
        </Timeline>
      ))}
    </>
  );
};

export default Months;
