import { Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
export function DesktopNavItem(props) {
    var Wrapper = props.type !== "internal-link"
        ? React.Fragment
        : function (linkProps) { return (<Link href={props.href} passHref prefetch={false} {...linkProps}/>); };
    return (<Wrapper>
      <Text {...defaultNavItemStyle} color={props.isActive ? "purple.500" : "landing.black"} as={props.type === "external-link" ? "a" : "div"} {...(props.type === "external-link" && {
        href: props.href,
        rel: "noreferrer noopener",
    })}>
        {props.title}
      </Text>
    </Wrapper>);
}
export var defaultNavItemStyle = {
    style: { textDecoration: "none" },
    fontFamily: "landingHeading",
    fontWeight: "bold",
    fontSize: "md",
    color: "landing.black",
    textAlign: "center",
    cursor: "pointer",
    _hover: { color: "purple.500" },
    _active: { color: "purple.600" },
};
