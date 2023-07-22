import { Box } from "@chakra-ui/react";

const MoreItems = (props: { numberOfItems: number }) => {
  const { numberOfItems } = props;

  return (
    <Box
      w={10}
      h={6}
      display="flex"
      position="absolute"
      zIndex={999}
      bottom={4}
      right={4}
      bg="linear-gradient(180deg, #6868F7 0%, #4C40D9 100%)"
      borderRadius={999}
      textAlign="center"
      fontSize="12px"
      alignItems="center"
      justifyContent="center"
      color="white"
      fontWeight="semibold"
      lineHeight={"14.52px"}
    >
      +{numberOfItems}
    </Box>
  );
};

export default MoreItems;
