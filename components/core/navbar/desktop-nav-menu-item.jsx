import { HStack, Text } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
export var DesktopNavMenuItem = function (props) {
    return (<Link href={props.href} passHref>
      <HStack p={2} cursor="pointer" borderRadius="6px" role="group" _hover={{ bg: "#F47D831A" }} sx={{ ":hover svg": { color: "#F47D83" } }}>
        <props.Icon color="#ADB5BD"/>
        <Text fontWeight="medium" color="#030334" _groupHover={{ color: "#F47D83" }}>
          {props.text}
        </Text>
      </HStack>
    </Link>);
};
