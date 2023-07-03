import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export interface TimelineProps {
  date: string;
  children: ReactNode;
}

const BackButton = () => {
  const router = useRouter();

  return (
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
      // on hover change .arrow-line fill to #000000 and .arrow-head stroke to #000000
      // and .back-button-text color to #000000
      _hover={{
        ".arrow-line": {
          fill: "#000000",
        },
        ".arrow-head": {
          stroke: "#000000",
        },
        ".back-button-text": {
          color: "#000000",
        },
      }}
      sx={{
        ".arrow-line": {
          transition: "fill 0.2s ease",
        },
        ".arrow-head": {
          transition: "stroke 0.2s ease",
        },
        ".back-button-text": {
          transition: "color 0.2s ease",
        },
      }}
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
            fill="transparent"
            className="arrow-line"
          />
          <path
            className="arrow-head"
            d="M5.25 9L1.25 5L5.25 1"
            // stroke="black"
            // store rgba(134, 142, 150, 1)
            stroke="#868E96"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_2_2540">
            <rect width="11" height="10" fill="white" transform="translate(11 10) rotate(-180)" />
          </clipPath>
        </defs>
      </svg>

      <Text
        className="back-button-text"
        fontSize="16px"
        color="#868E96"
        alignItems="start"
        // _hover={{ textDecoration: "underline" }}
      >
        Back
      </Text>
    </Box>
  );
};

export default BackButton;
