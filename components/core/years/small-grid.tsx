import { Box, HStack, Image, VStack, Skeleton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { IGridProps } from "./grid-interfaces";

const SmallGrid = (props: IGridProps) => {
  const { changelogs } = props;

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
          />
        </motion.div>
      </Box>
      <VStack width="176px" height="100%">
        {changelogs.slice(1, changelogs.length).map(({ imageUrl, slug }, index) => (
          <Image
            key={index}
            src={imageUrl}
            alt={slug}
            objectFit={"cover"}
            maxHeight="176px"
            height="100%"
            maxWidth="176px"
            fallbackSrc="/plain-gray.jpg"
          />
        ))}
      </VStack>
    </HStack>
  );
};

export default SmallGrid;
