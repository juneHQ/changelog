import { Box, HStack, Text, VStack, useMediaQuery } from "@chakra-ui/react";
import BackButton from "components/core/timeline/back-button";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

export interface TimelineProps {
  date: string;
  children: ReactNode;
  id?: string;
  className?: string;
}

const Timeline = (props: TimelineProps) => {
  const { children, date } = props;

  const router = useRouter();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(router.pathname.includes("/changelogs"));
  }, [router.pathname, isLargerThan768]);

  return (
    <HStack
      id={props.id}
      className={props.className}
      display="flex"
      position="relative"
      justifyContent="center"
      alignItems="start"
      spacing={0}
      pt={isOpen ? (isLargerThan768 ? 28 : 8) : 0}
      px={isOpen ? 4 : 0}
      minWidth={isLargerThan768 ? "768px" : "100%"}
    >
      {isLargerThan768 && (
        <VStack position="relative" top={isOpen ? "" : "-8px"} width="120px" spacing={4}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {isOpen && <BackButton />}
          </motion.div>
          <Text fontSize="16px" color="#868E96" alignItems="start" width="125px">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {date}
            </motion.div>
          </Text>
        </VStack>
      )}
      <HStack
        alignItems="start"
        spacing={isOpen ? 0 : 8}
        display="relative"
        id={date.replace(/[\s_]+/g, "-").toLowerCase()}
        className="timeline-item"
      >
        {!isOpen && (
          <Box
            style={{
              display: isOpen ? "hidden" : "flex",
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
        )}
        <VStack alignItems="start" spacing={[0, 0, 2]}>
          {!isLargerThan768 && (
            <VStack position="relative" top="-8px" spacing={4} mb={[4, 4]}>
              {isOpen && <BackButton />}
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
