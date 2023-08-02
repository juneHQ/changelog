import { Box, Grid, GridItem, Image, VStack, Skeleton } from "@chakra-ui/react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { IGridProps } from "./grid-interfaces";

const MediumGrid = (props: IGridProps) => {
  const { changelogs } = props;
  const router = useRouter();


  return changelogs.length < 9 ? (
    <VStack spacing="8px">
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
          <Grid key={i} gap={"8px"} templateColumns={`repeat(${rowItems.length}, 1fr)`}>
            {rowItems.reverse().map(({ imageUrl, slug }, index) =>
              imageUrl ? (
                <motion.div
                  layoutId={i === 0 && props.isFirstItem ? rowItems[0].slug : ``}
                  initial={{
                    scale: 1,
                  }}
                  transition={{
                    duration: 0,
                  }}
                  style={{ height: "100%" }}
                >
                  <Image
                    key={index}
                    src={imageUrl}
                    alt={slug}
                    height="100%"
                    objectFit={"cover"}
                    fallbackSrc="/plain-gray.jpg"
                  />
                </motion.div>
              ) : (
                <Box bg="#F1F3F5" h="full" w="full" />
              )
            )}
          </Grid>
        ))}
    </VStack>
  ) : (
    <Grid
      gap={"8px"}
      templateColumns="repeat(8, 1fr)"
      templateRows="repeat(7, 1fr)"
      height="100%"
      maxHeight="601px"
    >
      {changelogs.slice(0, 9).map(({ imageUrl, slug, publishedAt }, index) => (
        <GridItem
          key={index}
          rowSpan={[0, 2, 3].includes(index) ? 3 : 2}
          colSpan={[1, 3, 6].includes(index) ? 4 : 2}
        >
          <motion.div
            layoutId={index === 0 && props.isFirstItem ? slug : ``}
            initial={{
              scale: 1,
            }}
            transition={{
              duration: 0,
            }}
            style={{ height: "100%" }}
          >
            <Image
              src={imageUrl}
              alt={slug}
              height="100%"
              width="100%"
              objectFit={"cover"}
              fallback={
                <Box overflow="hidden" width="100%">
                  <Skeleton height={[0, 2, 3].includes(index) ? "253px" : "166px"} width="3000px" />
                </Box>
              }
              onClick={() => {
                const date = dayjs(publishedAt);
                const targetDate = date.format("MMM YYYY");
                const year = date.format("YYYY");
                const hash = targetDate.replace(/[\s_]+/g, "-").toLowerCase();

                router.push(`/years/${year}#${hash}`, undefined, { scroll: true });
              }}
            />
          </motion.div>
        </GridItem>
      ))}
    </Grid>
  );
};

export default MediumGrid;
