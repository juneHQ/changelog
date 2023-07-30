import { Box, Grid, GridItem, Image, Skeleton } from "@chakra-ui/react";
import dayjs from "dayjs";
import { IImagePreviewMeta } from "lib/models/view";
import { useRouter } from "next/router";


interface ISubGridProps {
  changelogs: IImagePreviewMeta[];
  rowLength?: number;
}

const LargeSubGrid = (props: ISubGridProps) => {
  const { changelogs, rowLength } = props;
  const router = useRouter()


  return (
    <Grid gap="2px" templateColumns={`repeat(${changelogs.length}, 1fr)`}>
      {changelogs.map(({ imageUrl, slug, publishedAt }, subI) => (
        <GridItem key={subI}>
          <Image
            src={imageUrl}
            alt={slug}
            height={rowLength - 1 <= 4 ? "198px" : "98px"}
            width={`${400 / changelogs.length - 2}px`}
            objectFit={"cover"}
            fallback={
              <Box overflow="hidden">
                <Skeleton
                  height={rowLength - 1 <= 4 ? "198px" : "98px"}
                  width={`${400 / changelogs.length - 2}px`}
                />
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
        </GridItem>
      ))}
    </Grid>
  );
};

export default LargeSubGrid;
