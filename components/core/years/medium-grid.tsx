import { Box, Grid, GridItem, Image, VStack } from "@chakra-ui/react";
import { IGridProps } from "./grid-interfaces";

const MediumGrid = (props: IGridProps) => {
  const { changelogs } = props;

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
          <Grid
            key={i}
            gap={"8px"}
            templateColumns={`repeat(${rowItems.length}, 1fr)`}
            height="100%"
          >
            {rowItems
              .reverse()
              .map(({ imageUrl, slug }, index) =>
                imageUrl ? (
                  <Image key={index} src={imageUrl} alt={slug} height="100%" objectFit={"cover"} />
                ) : (
                  <Box bg="#F1F3F5" h="full" w="full" />
                )
              )}
          </Grid>
        ))}
    </VStack>
  ) : (
    <Grid gap={"8px"} templateColumns="repeat(8, 1fr)" templateRows="repeat(7, 1fr)" height="100%">
      {changelogs.map(({ imageUrl, slug }, index) => (
        <GridItem
          key={index}
          rowSpan={[0, 2, 3].includes(index) ? 3 : 2}
          colSpan={[1, 3, 6].includes(index) ? 4 : 2}
        >
          <Image src={imageUrl} alt={slug} height="100%" objectFit={"cover"} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default MediumGrid;
