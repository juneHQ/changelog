import { Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  children: React.ReactNode;
  mode?: "light" | "dark";
};

export function FooterTitle(props: Props) {
  return (
    <Text
      fontFamily="landingHeading"
      fontWeight="bold"
      color={props.mode === "dark" ? "white" : "landing.black"}
    >
      {props.children}
    </Text>
  );
}
