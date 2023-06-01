import { Text } from "@chakra-ui/react";
import React from "react";
export function FooterTitle(props) {
    return (<Text fontFamily="landingHeading" fontWeight="bold" color="landing.black">
      {props.children}
    </Text>);
}
