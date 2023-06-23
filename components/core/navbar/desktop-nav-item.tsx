import { Text, TextProps } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export interface DesktopNavItemProps {
  title: string;
  type: "external-link" | "internal-link";
  href?: string;
  isActive?: boolean;
  mode?: "light" | "dark";
}

export function DesktopNavItem(props: DesktopNavItemProps) {
  const Wrapper =
    props.type !== "internal-link"
      ? React.Fragment
      : (linkProps: { children: React.ReactNode }) => (
          <Link href={props.href} passHref prefetch={false} {...linkProps} />
        );

  const staticColor = props.mode === "dark" ? "white" : "purple.900";

  return (
    <Wrapper>
      <Text
        {...desktopNavItemStyle}
        color={props.isActive ? "purple.500" : staticColor}
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

export const desktopNavItemStyle: TextProps = {
  style: { textDecoration: "none" },
  fontWeight: "semibold",
  color: "purple.900",
  textAlign: "center",
  cursor: "pointer",
  _hover: { color: "purple.500" },
  _active: { color: "purple.600" },
};
