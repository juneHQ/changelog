import { Box, Grid, GridItem, HStack, Image, VStack } from "@chakra-ui/react";
import MoreItems from "components/core/more-items";
import LargeGrid from "components/core/years/large-grid";
import MediumGrid from "components/core/years/medium-grid";
import SmallGrid from "components/core/years/small-grid";
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
    const years = []
  sortedChangelogsByYear.forEach(element => {
      years.push(element.slice(0,5))
  });

  return (
    <>
      {years.map((changelogs, index) => (
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
                {changelogs.length > 27 && <MoreItems numberOfItems={changelogs.length - 27} />}
                {changelogs.length === 3 && <SmallGrid changelogs={changelogs} />}
                {changelogs.length <= 9 && changelogs.length !== 3 && (
                  <MediumGrid changelogs={changelogs} />
                )}
                {changelogs.length > 9 && <LargeGrid changelogs={changelogs} />}
              </Box>
            </VStack>
          </Box>
        </Timeline>
      ))}
    </>
  );
};

export default Years;
