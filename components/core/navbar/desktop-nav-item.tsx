import { Text, TextProps } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export interface DesktopNavItemProps {
  title: string;
  type: "external-link" | "internal-link";
  href?: string;
  isActive?: boolean;
}

export function DesktopNavItem(props: DesktopNavItemProps) {
  const Wrapper =
    props.type !== "internal-link"
      ? React.Fragment
      : (linkProps: { children: React.ReactNode }) => (
          <Link href={props.href} passHref prefetch={false} {...linkProps} />
        );

  return (
    <Wrapper>
      <Text
        {...defaultNavItemStyle}
        color={props.isActive ? "purple.500" : "landing.black"}
        as={props.type === "external-link" ? "a" : "div"}
        {...(props.type === "external-link" && {
          href: props.href,
          rel: "noreferrer noopener",
        })}
      >
        {props.title}
      </Text>
    </Wrapper>
  );
}

export const defaultNavItemStyle: TextProps = {
  style: { textDecoration: "none" },
  fontFamily: "landingHeading",
  fontWeight: "bold",
  fontSize: "sm",
  color: "landing.black",
  textAlign: "center",
  cursor: "pointer",
  _hover: { color: "purple.500" },
  _active: { color: "purple.600" },
};
