import { Box, Grid, GridItem, HStack, Image, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import Timeline from "../../components/layout/timeline";

const Years = ({ yearChangelogsMap }) => {

  const yearsRecent = Object.keys(yearChangelogsMap || {}).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB.getTime() - dateA.getTime();
  });
  const yearUrls: IMonthlyChangelog[][] = yearsRecent.map((year) => {
    return yearChangelogsMap[year];
  });

  return (
    <>
      {yearUrls.map((changelogs, index) => (
        <Timeline key={index} date={dayjs(yearsRecent[index]).format("YYYY")}>
          <Box display="flex" paddingBottom={index === yearUrls.length - 1 ? 0 : 20}>
            <VStack>
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
                    gap={"8px"}
                    templateColumns="repeat(8, 1fr)"
                    templateRows="repeat(7, 1fr)"
                    height="100%"
                  >
                    {changelogs.slice(0, 9).map(({ imageUrl }, index) => (
                      <GridItem
                        key={index}
                        rowSpan={[0, 2, 3].includes(index) ? 3 : 2}
                        colSpan={[1, 3, 6].includes(index) ? 4 : 2}
                      >
                        <Image
                          src={imageUrl}
                          alt={`${Object.keys(yearChangelogsMap)[index]} - ${index}`}
                          height="100%"
                          objectFit={"cover"}
                        />
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
