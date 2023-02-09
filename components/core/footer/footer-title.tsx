import { Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export function FooterTitle(props: Props) {
  return (
    <Text fontFamily="landingHeading" fontWeight="bold" color="landing.black">
      {props.children}
    </Text>
  );
}
