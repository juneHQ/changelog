import { Box, HStack, Image, VStack, Skeleton } from "@chakra-ui/react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { IGridProps } from "./grid-interfaces";

const SmallGrid = (props: IGridProps) => {
  const { changelogs } = props;
  const router = useRouter();

  return (
    <HStack height="100%" maxHeight="360px" maxWidth={"682px"}>
      <Box width="100%">
        <motion.div
          layoutId={props.isFirstItem ? changelogs[0].slug : ``}
          initial={{
            scale: 1,
          }}
          transition={{
            duration: 0,
          }}
          style={{ overflow: "hidden" }}
        >
          <Image
            src={changelogs[0]?.imageUrl}
            alt={changelogs[0]?.slug}
            minHeight={["176px", "176px", "360px"]}
            objectFit={"cover"}
            fallbackSrc="/plain-gray.jpg"
            onClick={() => {
              const date = dayjs(changelogs[0]?.publishedAt);
              const targetDate = date.format("MMM YYYY");
              const year = date.format("YYYY");
              const hash = targetDate.replace(/[\s_]+/g, "-").toLowerCase();

              router.push(`/years/${year}#${hash}`, undefined, { scroll: true });
            }}
          />
        </motion.div>
      </Box>
      <VStack width="176px" height="100%">
        {changelogs.slice(1, changelogs.length).map(({ imageUrl, slug, publishedAt}, index) => (
          <Image
            key={index}
            src={imageUrl}
            alt={slug}
            objectFit={"cover"}
            maxHeight="176px"
            height="100%"
            maxWidth="176px"
            fallbackSrc="/plain-gray.jpg"
            onClick={() => {
              const date = dayjs(publishedAt);
              const targetDate = date.format("MMM YYYY");
              const year = date.format("YYYY");
              const hash = targetDate.replace(/[\s_]+/g, "-").toLowerCase();

              router.push(`/years/${year}#${hash}`, undefined, { scroll: true });
            }}
          />
        ))}
      </VStack>
    </HStack>
  );
};

export default SmallGrid;
