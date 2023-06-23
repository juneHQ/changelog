import { Box, HStack, Text, VStack, useMediaQuery } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export interface TimelineProps {
  date: string;
  children: ReactNode;
}

const Timeline = (props: TimelineProps) => {
  const { children, date } = props;

  const router = useRouter();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const selected = router.pathname.includes("/changelogs");

  return (
    <HStack
      display="flex"
      position="relative"
      justifyContent="center"
      alignItems="start"
      spacing={0}
      pt={selected ? (isLargerThan768 ? 52 : 28) : 0}
      px={selected ? [6, 6, 0] : 0}
    >
      {/* {isLargerThan768 &&( */}
      <VStack
        position="relative"
        top={selected ? "" : "-8px"}
        width="120px"
        spacing={4}
        display={isLargerThan768 ? "flex" : "none"}
      >
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
            width="125px"
          >
            <div>
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
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
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
        <Text fontSize="16px" color="#868E96" alignItems="start" width="125px">
          {date}
        </Text>
      </VStack>
      {/* )} */}
      <HStack alignItems="start" spacing={selected ? 0 : 8} display="relative">
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
        <VStack alignItems="start" spacing={[0, 0, 2]}>
          <VStack
            position="relative"
            top="-8px"
            spacing={4}
            display={isLargerThan768 ? "none" : "flex"}
            mb={[4, 4]}
          >
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
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
          {children}
        </VStack>
      </HStack>
    </HStack>
  );
};

export default Timeline;
