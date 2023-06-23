import { Box, HStack, Text, VStack, useMediaQuery } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

export interface TimelineProps {
  date: string;
  children: ReactNode;
}

const Timeline = (props: TimelineProps) => {
  const { children, date } = props;

  const router = useRouter();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(router.pathname.includes("/changelogs"));
  }, [router.pathname]);

  return (
    <HStack
      display="flex"
      position="relative"
      justifyContent="center"
      alignItems="start"
      spacing={0}
      pt={isOpen ? (isLargerThan768 ? 52 : 28) : 0}
      px={isOpen ? [6, 6, 0] : 0}
    >
      {isLargerThan768 && (
        <VStack
          position="relative"
          top={isOpen ? "" : "-8px"}
          width="120px"
          spacing={4}
        >
          {isOpen && (
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
              <svg
                width="11"
                height="10"
                viewBox="0 0 11 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_2_2540)">
                  <path
                    d="M1.25 5.75L10.25 5.75C10.6642 5.75 11 5.41421 11 5C11 4.58579 10.6642 4.25 10.25 4.25L1.25 4.25C0.835787 4.25 0.5 4.58579 0.5 5C0.5 5.41421 0.835787 5.75 1.25 5.75Z"
                    fill="black"
                  />
                  <path
                    d="M5.25 9L1.25 5L5.25 1"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2_2540">
                    <rect
                      width="11"
                      height="10"
                      fill="white"
                      transform="translate(11 10) rotate(-180)"
                    />
                  </clipPath>
                </defs>
              </svg>

              <Text
                fontSize="16px"
                color="#0D131B"
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
      )}
      <HStack alignItems="start" spacing={isOpen ? 0 : 8} display="relative">
        <Box
          style={{
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
            height: "100%",
            width: "10px",
            position: "absolute",
          }}
          hidden={isOpen}
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
          {!isLargerThan768 && (
            <VStack
              position="relative"
              top="-8px"
              spacing={4}
              mb={[4, 4]}
            >
              {isOpen && (
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
                    width="11"
                    height="10"
                    viewBox="0 0 11 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_2_2540)">
                      <path
                        d="M1.25 5.75L10.25 5.75C10.6642 5.75 11 5.41421 11 5C11 4.58579 10.6642 4.25 10.25 4.25L1.25 4.25C0.835787 4.25 0.5 4.58579 0.5 5C0.5 5.41421 0.835787 5.75 1.25 5.75Z"
                        fill="black"
                      />
                      <path
                        d="M5.25 9L1.25 5L5.25 1"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2_2540">
                        <rect
                          width="11"
                          height="10"
                          fill="white"
                          transform="translate(11 10) rotate(-180)"
                        />
                      </clipPath>
                    </defs>
                  </svg>

                  <Text
                    fontSize="16px"
                    color="#0D131B"
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
          )}
          {children}
        </VStack>
      </HStack>
    </HStack>
  );
};

export default Timeline;
