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
            <FooterTitle>Company</FooterTitle>
            <FooterLink
              title="About"
              type="external"
              href={`${process.env.NEXT_PUBLIC_MARKETING_HOST}/company/about-us`}
            />
            <FooterLink
              title="Blog"
              type="external"
              href={`${process.env.NEXT_PUBLIC_MARKETING_HOST}/blog`}
            />
            <FooterLink 
              title="Resources"
              type="external"
              href={`${process.env.NEXT_PUBLIC_MARKETING_HOST}/resources`}
              />
            <FooterLink title="Contact" type="external" href={`${process.env.NEXT_PUBLIC_MARKETING_HOST}/contact`} />
          </VStack>
        </GridItem>
        <GridItem gridArea="for">
          <VStack align="start" spacing={gap}>
            <FooterTitle>Products</FooterTitle>
            <FooterLink
              title="Identity"
              type="external"
              href="#"
            />
            <FooterLink
              title="Transactons"
              type="external"
              href="#"
            />
            <FooterLink
              title="Income"
              type="external"
              href="#"
            />
            <FooterLink
              title="Balances"
              type="external"
              href="#"
            />
            <FooterLink
              title="Investments"
              type="external"
              href="#"
            />
            <FooterLink
              title="Payments"
              type="external"
              href="#"
            />
          </VStack>
        </GridItem>
        <GridItem gridArea="company">
          <VStack align="start" spacing={gap}>
            <FooterTitle>Solutions</FooterTitle>
            {/* <FooterLink title="Our story" /> */}
            <FooterLink
              title="Mortgages"
              type="external"
              href="#"
            />
            <FooterLink title="Lending" type="external" href="#" />
            <FooterLink title="Banking" type="external" href="#" />
          </VStack>
        </GridItem>
        <GridItem gridArea="legal">
          <VStack align="start" spacing={gap}>
            <FooterTitle>Developer</FooterTitle>
            <FooterLink
              title="Quickstart"
              type="external"
              href="#"
            />
            <FooterLink
              title="Documentation"
              type="external"
              href="#"
            />
            <FooterLink
              title="API Reference"
              type="external"
              href="#"
            />
            <FooterLink title="Copyright © 2023 Zing" type="text" />
          </VStack>
        </GridItem>
      </Grid>
    </Container>
  );
}
