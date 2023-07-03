import { useRouter } from "next/router";
import useTimelineStore from "lib/state/use-timeline-store";
import { IAggregatedChangelogs, IImagePreviewMeta } from "lib/models/view";
import dayjs from "dayjs";
import SmallGrid from "components/core/years/small-grid";
import MediumGrid from "components/core/years/medium-grid";
import LargeGrid from "components/core/years/large-grid";
import MoreItems from "components/core/more-items";
import { Box, useMediaQuery, VStack } from "@chakra-ui/react";
import Timeline from "../../components/layout/timeline";

interface IYearsProps {
  yearChangelogsMap: IAggregatedChangelogs;
}

const Years = ({ yearChangelogsMap }: IYearsProps) => {
  const timeline = useTimelineStore();
  const router = useRouter();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

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
          <Box
            display="flex"
            paddingBottom={index === sortedChangelogsByYear.length - 1 ? 0 : [12, 16, 20]}
          >
            <VStack
              onClick={() => {
                timeline.setView("months");
                router.push(
                  `/page/${changelogs[0]?.monthlyViewPage || 0}#months?year=${dayjs(
                    sortedYearKeys[index]
                  ).format("YYYY")}`
                );
              }}
              cursor="pointer"
            >
              <Box
                overflow="hidden"
                borderRadius={"16px"}
                maxWidth="682px"
                display="flex"
                onClick={() => {}}
                position="relative"
                _hover={{
                  boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)",
                  "& img": {
                    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)",
                  },
                }}
                sx={{
                  transition: "box-shadow 0.3s",
                  "& img": {
                    transition: "box-shadow 0.3s",
                  },
                }}
              >
                {/* {changelogs.length > 27 && <MoreItems numberOfItems={changelogs.length - 27} />} */}
                {/* {changelogs.length === 3 && <SmallGrid changelogs={changelogs} />} */}
                {((changelogs.length <= 9 && changelogs.length !== 3) || !isLargerThan768) && (
                  <MediumGrid changelogs={changelogs} />
                )}
                {changelogs.length > 9 && isLargerThan768 && <LargeGrid changelogs={changelogs} />}
              </Box>
            </VStack>
          </Box>
        </Timeline>
      ))}
    </>
  );
};

export default Years;
