import { Box } from "@chakra-ui/react";

const MoreItems = (props: { numberOfItems: number }) => {
  const { numberOfItems } = props;

  return (
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
      +{numberOfItems}
    </Box>
  );
};

export default MoreItems;
