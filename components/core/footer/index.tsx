import React from "react";
import { defaultPx } from "lib/utils/default-container-px";
import { Box, Container, ContainerProps, HStack, Text } from "@chakra-ui/react";
import { FooterLink } from "./footer-link";
import { NextResponsiveImage } from "../next-responsive-image";

const LINK_GAPS = [2, 2, 8];

interface FooterProps {
  _wrapper?: ContainerProps;
  mode?: "light" | "dark";
}

export function Footer(props: FooterProps) {
  return (
    <Container maxW="landingMax" px={defaultPx(32)} {...props._wrapper}>
      <HStack spacing={LINK_GAPS} justify="center" align="center">
        <Box flexShrink={0}>
          <NextResponsiveImage
            src="/screeb-logo.svg"
            alt="screeb"
            width={["128px"]}
            height={["60px"]}
            {...(props.mode === "dark" && {
              filter: "invert(1) brightness(10000%)",
            })}
          />
        </Box>
        <Text fontWeight="bold">The All-In-One solution to accelerate your product discovery</Text>
        <FooterLink
          mode={props.mode}
          title={`Copyright © ${new Date().getFullYear().toString()} Screeb`}
          type="text"
        />
      </HStack>
    </Container>
  );
}
