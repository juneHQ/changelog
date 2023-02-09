import { Text, TextProps } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Link from "next/link";

type Props = {
  title: string | ReactNode;
  href?: string;
  type?: "internal" | "external" | "text" | "node";
  style?: TextProps;
  mode?: "light" | "dark";
};

export function FooterLink({ type = "internal", href = "", ...props }: Props) {
  const Wrapper =
    type === "internal"
      ? ({ children }: { children: React.ReactNode }) => (
          <Link href={href} passHref>
            {children}
          </Link>
        )
      : React.Fragment;

  return (
    <Wrapper>
      {typeof props.title === "string" ? (
        <Text
          as={type === "text" ? "p" : "a"}
          color={props.mode === "dark" ? "white" : "landing.gray"}
          {...(type === "external" && { href })}
          {...props.style}
        >
          {props.title}
        </Text>
      ) : (
        props.title
      )}
    </Wrapper>
  );
}
