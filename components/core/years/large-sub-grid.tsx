import { Grid, GridItem, Image } from "@chakra-ui/react";
import { IImagePreviewMeta } from "lib/models/view";

interface ISubGridProps {
  changelogs: IImagePreviewMeta[];
  rowLength?: number;
}

const LargeSubGrid = (props: ISubGridProps) => {
  const { changelogs, rowLength } = props;

  return (
    <Grid gap="2px" templateColumns={`repeat(${changelogs.length}, 1fr)`}>
      {changelogs.map(({ imageUrl, slug }, subI) => (
        <GridItem key={subI}>
          <Image
            loading="lazy"
            src={imageUrl}
            alt={slug}
            height={rowLength - 1 <= 4 ? "198px" : "98px"}
            width={`${400 / changelogs.length - 2}px`}
            objectFit={"cover"}
          />
        </GridItem>
      ))}
    </Grid>
  );
};

export default LargeSubGrid;
