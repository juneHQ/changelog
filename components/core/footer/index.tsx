import { defaultPx } from "lib/utils/default-container-px";
import { FooterTitle } from "components/core/footer/footer-title";
import { FooterLink } from "components/core/footer/footer-link";
import {
  Box,
  chakra,
  Container,
  ContainerProps,
  Grid,
  GridItem,
  Image,
  VStack,
} from "@chakra-ui/react";

const gap = [2, 2, 8];

interface Props {
  _wrapper?: ContainerProps;
}

export default function Footer(props: Props) {
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
          <Box flexShrink={0}>
            <Image
              src="/june-logo-small.svg"
              alt="june"
              width={68}
              height={68}
              htmlWidth={68}
              htmlHeight={68}
            />
          </Box>
        </GridItem>
        <GridItem gridArea="solution">
          <VStack align="start" spacing={gap}>
            <FooterTitle>Explore</FooterTitle>
            <FooterLink
              title="Overview"
              type="external"
              href={process.env.NEXT_PUBLIC_MARKETING_HOST}
            />
            <FooterLink
              title="Pricing"
              type="external"
              href={`${process.env.NEXT_PUBLIC_MARKETING_HOST}/pricing`}
            />
            <FooterLink title="Changelog" href="/" />
            <FooterLink title="Widget for iOS" type="external" href="https://widgets.june.so/" />
          </VStack>
        </GridItem>
        <GridItem gridArea="for">
          <VStack align="start" spacing={gap}>
            <FooterTitle>Alternatives</FooterTitle>
            <FooterLink
              title="June vs Amplitude"
              type="external"
              href={`${process.env.NEXT_PUBLIC_MARKETING_HOST}/blog/june-vs-amplitude`}
            />
            <FooterLink
              title="June vs Mixpanel"
              type="external"
              href={`${process.env.NEXT_PUBLIC_MARKETING_HOST}/blog/june-vs-mixpanel`}
            />
          </VStack>
        </GridItem>
        <GridItem gridArea="company">
          <VStack align="start" spacing={gap}>
            <FooterTitle>Company</FooterTitle>
            {/* <FooterLink title="Our story" /> */}
            <FooterLink
              title="Careers"
              type="external"
              href="https://www.notion.so/projectanalytics/Work-at-June-ba2ff41d03cb4a1ba230eda21daccada"
            />
            <FooterLink title="Contact" type="external" href="mailto:enzo@june.so" />
            <FooterLink title="Twitter" type="external" href="https://twitter.com/JuneDotSo" />
            <FooterLink title="Blog" type="external" href="https://inside.june.so" />
          </VStack>
        </GridItem>
        <GridItem gridArea="legal">
          <VStack align="start" spacing={gap}>
            <FooterTitle>Legal</FooterTitle>
            <FooterLink
              title="Terms"
              type="external"
              href="https://www.notion.so/Terms-of-Service-3a8be1c25dd04cf699800425153a03f8"
            />
            <FooterLink
              title="Privacy"
              type="external"
              href="https://www.notion.so/Privacy-Policy-a4f99393a98b4ce6aa1bacd5f48157cc"
            />
            <VStack align="start">
              <FooterLink
                style={{ display: ["none", "none", "block"] }}
                title="Backed by"
                type="text"
              />
              <FooterLink
                type="node"
                title={
                  <Image
                    src="/yc-orange-logo.png"
                    alt="y-combinator logo"
                    height={6}
                    w="auto"
                    display={["none", "none", "block"]}
                  />
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
            <FooterLink title="Copyright © 2023 June" type="text" />
          </VStack>
        </GridItem>
        <GridItem display={["block", "block", "none"]}>
          <VStack align="start">
            <FooterLink title="Backed by" type="text" />
            <FooterLink
              type="node"
              title={
                <Image src="/yc-orange-logo.png" alt="y-combinator logo" height={6} w="auto" />
              }
            />
          </VStack>
        </GridItem>
        <GridItem display={["block", "block", "none"]}>
          <VStack align="start" spacing={gap}>
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
