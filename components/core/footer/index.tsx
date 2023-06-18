import React from "react";
import NextImage from "next/image";
import {
  Box,
  chakra,
  Container,
  ContainerProps,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FooterTitle } from "./footer-title";
import { FooterLink } from "./footer-link";
import { NextResponsiveImage } from "../next-responsive-image";
import { defaultPx } from "lib/utils/default-container-px";

const LINK_GAPS = [2, 2, 8];

interface FooterProps {
  _wrapper?: ContainerProps;
  mode?: "light" | "dark";
}

export function Footer(props: FooterProps) {
  return (
    <Container maxW="landingMax" px={defaultPx(32)} {...props._wrapper}>
      <Grid
        gap={[6, 6, 4]}
        templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(5, 1fr)"]}
        gridTemplateAreas={[
          "'logo logo' 'solution for' 'company legal'",
          "'logo logo' 'solution for' 'company legal'",
          "'logo solution for company legal'",
        ]}
      >
        <GridItem gridArea="logo">
          <Box flexShrink={0} mb={8}>
            <NextResponsiveImage
              src="/june-logo-symbol-only.svg"
              alt="june"
              width={["75px"]}
              height={["80px"]}
              {...(props.mode === "dark" && {
                filter: "invert(1) brightness(10000%)",
              })}
            />
          </Box>
          <FooterLink
            mode={props.mode}
            title={
              <HStack>
                <Image src="/soc2type2.svg" alt="SOC 2 Type II" />
                <Text color={props.mode === "dark" ? "gray.600" : "landing.gray"}>
                  SOC 2 Type II
                </Text>
              </HStack>
            }
          />
          <FooterLink
            mode={props.mode}
            title={
              <HStack>
                <Flex h="32px" w="32px" justify={"center"} align="center">
                  <Image h={"24px"} w={"24px"} src="/gdrp.svg" alt="GDPR" />
                </Flex>
                <Text color={props.mode === "dark" ? "gray.600" : "landing.gray"}>GDPR Ready</Text>
              </HStack>
            }
          />
        </GridItem>
        <GridItem gridArea="solution">
          <VStack align="start" spacing={LINK_GAPS}>
            <FooterTitle mode={props.mode}>Solutions</FooterTitle>
            <FooterLink mode={props.mode} title="Product Analytics" href="/" />
            <FooterLink mode={props.mode} title="Feature Report" href="/feature-launches" />
            <FooterLink
              mode={props.mode}
              title="Qualification Bot"
              type="external"
              href="https://qualify.june.so"
            />
            <FooterLink
              mode={props.mode}
              title="Widget for iOS"
              type="external"
              href="https://widgets.june.so"
            />
          </VStack>
        </GridItem>
        <GridItem gridArea="for">
          <VStack align="start" spacing={LINK_GAPS}>
            <FooterTitle mode={props.mode}>Resources</FooterTitle>
            <FooterLink mode={props.mode} title="Customers" href="/customer-stories" />
            <FooterLink mode={props.mode} title="Docs" href="/docs" />
            <FooterLink mode={props.mode} title="June School" href="https://school.june.so" />
            <FooterLink
              mode={props.mode}
              title="Benchmarks"
              type="external"
              href="https://www.june.so/benchmarks"
            />
            <FooterLink
              mode={props.mode}
              title="June vs Amplitude"
              href="/blog/june-vs-amplitude"
            />
            <FooterLink mode={props.mode} title="June vs Mixpanel" href="/blog/june-vs-mixpanel" />
            <FooterLink mode={props.mode} title="June vs Heap" href="/blog/june-vs-heap" />
            <FooterLink mode={props.mode} title="June vs Pendo" href="/blog/june-vs-pendo" />
          </VStack>
        </GridItem>
        <GridItem gridArea="company">
          <VStack align="start" spacing={LINK_GAPS}>
            <FooterTitle mode={props.mode}>Company</FooterTitle>
            <FooterLink mode={props.mode} title="Pricing" href="/pricing" />
            <FooterLink
              mode={props.mode}
              title="Changelog"
              type="external"
              href="https://changelog.june.so"
            />
            <FooterLink
              mode={props.mode}
              title="Linkedin"
              type="external"
              href="https://www.linkedin.com/company/junedotso/"
            />
            <FooterLink
              mode={props.mode}
              title="Twitter"
              type="external"
              href="https://twitter.com/JuneDotSo"
            />
            <FooterLink
              mode={props.mode}
              title="Blog"
              type="external"
              href="https://june.so/blog"
            />
            <FooterLink
              mode={props.mode}
              title="Careers"
              type="external"
              href="https://www.notion.so/projectanalytics/Work-at-June-ba2ff41d03cb4a1ba230eda21daccada"
            />
            <FooterLink
              mode={props.mode}
              title="Contact us"
              type="external"
              href="mailto:enzo@june.so"
            />
          </VStack>
        </GridItem>
        <GridItem gridArea="legal">
          <VStack align="start" spacing={LINK_GAPS}>
            <FooterTitle mode={props.mode}>Legal</FooterTitle>
            <FooterLink
              mode={props.mode}
              title="Terms"
              type="external"
              href="https://help.june.so/en/articles/6823511-terms-of-service"
            />
            <FooterLink
              mode={props.mode}
              title="Privacy"
              type="external"
              href="https://help.june.so/en/articles/6823521-privacy-policy"
            />
            <FooterLink mode={props.mode} title="Security" type="internal" href="/security" />
            <VStack align="start">
              <FooterLink
                style={{ display: ["none", "none", "block"] }}
                mode={props.mode}
                title="Backed by"
                type="text"
              />
              <FooterLink
                type="node"
                title={
                  <Box
                    position="relative"
                    sx={{ aspectRatio: "5" }}
                    h={6}
                    w="auto"
                    display={["none", "none", "block"]}
                  >
                    <NextImage src="/yc-orange-logo.png" alt="y-combinator logo" layout="fill" />
                  </Box>
                }
              />
            </VStack>
            <FooterLink
              type="node"
              title={
                <chakra.a
                  href="https://www.producthunt.com/posts/june-1-0?utm_source=badge-golden-kitty-badge&utm_medium=badge&utm_souce=badge-june-1-0"
                  target="_blank"
                  rel="noreferrer"
                  display={["none", "none", "block"]}
                >
                  <Image
                    src="https://api.producthunt.com/widgets/embed-image/v1/golden-kitty-badge.svg?post_id=285721&theme=light"
                    alt="June 1.0 - Instant analytics reports built on top of Segment | Product Hunt"
                    htmlWidth="250"
                    htmlHeight="54"
                    width="250px"
                    height="54px"
                  />
                </chakra.a>
              }
            />
            <FooterLink
              mode={props.mode}
              title={`Copyright © ${new Date().getFullYear().toString()} June`}
              type="text"
            />
          </VStack>
        </GridItem>
        <GridItem display={["block", "block", "none"]}>
          <VStack align="start">
            <FooterLink mode={props.mode} title="Backed by" type="text" />
            <FooterLink
              type="node"
              title={
                <Box>
                  <NextImage
                    src="/yc-orange-logo.png"
                    alt="y-combinator logo"
                    width={120}
                    height={24}
                  />
                </Box>
              }
            />
          </VStack>
        </GridItem>
        <GridItem display={["block", "block", "none"]}>
          <VStack align="start" spacing={LINK_GAPS}>
            <FooterLink
              type="node"
              title={
                <a
                  href="https://www.producthunt.com/posts/june-1-0?utm_source=badge-golden-kitty-badge&utm_medium=badge&utm_souce=badge-june-1-0"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src="https://api.producthunt.com/widgets/embed-image/v1/golden-kitty-badge.svg?post_id=285721&theme=light"
                    alt="June 1.0 - Instant analytics reports built on top of Segment | Product Hunt"
                    htmlWidth="250"
                    htmlHeight="54"
                    width="250px"
                    height="54px"
                  />
                </a>
              }
            />
          </VStack>
        </GridItem>
      </Grid>
    </Container>
  );
}
