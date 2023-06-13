import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export interface TimelineProps {
  date: string;
  children: ReactNode;
  selected?: boolean;
}

const Timeline = ({ date, children, selected = false }) => {
  const router = useRouter();

  return (
    <HStack
      display="flex"
      position="relative"
      justifyContent="center"
      alignItems="start"
      spacing={0}
      pt={selected ? 40 : 0}
    >
      <VStack position="relative" top="-8px" width="120px" spacing={4}>
        {selected && (
          <Box
            onClick={() => {
              router.back();
            }}
            cursor="pointer"
            display="flex"
            gap={3}
            alignItems="center"
            justifyContent="start"
            width="full"
          >
            <svg
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.25 9L1.25 5L5.25 1"
                stroke="#868E96"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <Text
              fontSize="16px"
              color="#868E96"
              alignItems="start"
              _hover={{ textDecoration: "underline" }}
            >
              Back
            </Text>
          </Box>
        )}
        <Text fontSize="16px" color="#868E96" alignItems="start" width="full">
          {date}
        </Text>
      </VStack>
      <HStack alignItems="start" spacing={8} display="relative">
        <Box
          style={{
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
            height: "100%",
            width: "10px",
            position: "absolute",
          }}
          hidden={selected}
        >
          <Box
            style={{
              height: "8px",
              width: "8px",
              background: "#0D131B",
              borderRadius: "100%",
              zIndex: 10,
            }}
          />
          <Box
            style={{
              position: "absolute",
              height: "100%",
              width: "2px",
              background: "#E9ECEF",
              zIndex: 5,
            }}
          />
        </Box>
        {children}
      </HStack>
    </HStack>
  );
};

export default Timeline;
