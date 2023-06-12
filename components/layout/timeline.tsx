import {
  Box,
  HStack,
  Text,
} from "@chakra-ui/react";
import { ReactNode } from "react";

export interface TimelineProps {
  date: string;
  children: ReactNode;
}

const Timeline = ({  date, children}) => {

return (
    <HStack display="flex" position="relative" alignItems="start" spacing={0}>
      <Box position="relative" top="-8px" width="120px">
        <Text fontSize="16px" color="#868E96" alignItems="start">
          {date}
        </Text>
      </Box>
      <HStack alignItems="start" spacing={8}>
        <Box
          style={{
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
            height: "100%",
            width: "10px",
          }}
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
