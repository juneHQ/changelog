import {
  Button,
  VStack,
  ButtonGroup,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import useTimelineStore from "lib/state/useTimelineStore";


const TimeSelectionTabs = () => {
  const buttonGroup: Array<"weeks" | "months" | "years"> = ["weeks", "months", "years"];

  const timeline = useTimelineStore()
  return (
    <VStack>
      <ButtonGroup
        variant="outline"
        spacing={0}
        background="#F8F9FA"
        borderRadius="100px"
        padding="5px"
        color="#868E96"
        border="3px solid rgba(104, 104, 247, 0.25)"
      >
        {buttonGroup.map((view, index) => (
          <Button
            key={view}
            h="36px"
            borderRadius="100px"
            border="0px"
            fontWeight="bold"
            fontSize="14px"
            lineHeight="20px"
            verticalAlign="middle"
            px={5}
            style={
              timeline.view === view
                ? {
                    background: "transparent",
                    color: "#FFFFFF",
                  }
                : {}
            }
            onClick={() => timeline.setView(view)}
            isActive={timeline.view === view}
            _hover={{
              color: "#0D131B",
            }}
            textTransform="capitalize"
            position="relative"
            _focus={{ boxShadow: "none" }}
          >
            {timeline.view === view && (
              <motion.div
                layoutId="tab-selector"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, #6868F7 0%, #4C40D9 100%)",
                  borderRadius: "9999px",
                  boxShadow: "0px 0.636364px 2.24px rgba(33, 40, 54, 0.16)",
                }}
                transition={{ type: "linear", duration: 0.3 }}
              />
            )}
            <span style={{ position: "relative", zIndex: 10 }}>{view}</span>
          </Button>
        ))}
      </ButtonGroup>
    </VStack>
  );
};

export default TimeSelectionTabs;
