import React from "react";
import Link from "next/link";
import { Box, Button, Container, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { PageSectionProps } from "lib/models/page-section-props";
import { GradientHighlight, Highlight } from "./highlight";

interface TryJuneBannerProps extends PageSectionProps {
  subheading?: string;
  heading?: string | React.ReactNode;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  buttonHrefType?: "external" | "internal";
  mode?: "light" | "dark";
}

function TryJuneBanner(props: TryJuneBannerProps) {
  const {
    heading = (
      <>
        Set up June{" "}
        <GradientHighlight {...(props.mode === "dark" && { variant: "lightest", glow: true })}>
          in 2 minutes
        </GradientHighlight>
      </>
    ),
    description = (
      <>
        Just connect <Highlight>Segment</Highlight>, implement{" "}
        <Highlight as="a" href="https://www.june.so/docs">
          our SDK
        </Highlight>{" "}
        or use our <Highlight>other integrations</Highlight> to start understanding how your product
        is used
      </>
    ),
    buttonText = "Get started for free",
    buttonHref = "https://analytics.june.so/start",
    buttonHrefType = "external",
    mode = "light",
  } = props;

  const LinkOrFragment =
    buttonHrefType === "external"
      ? React.Fragment
      : (linkProps: { children: React.ReactNode }) => (
          <Link href={buttonHref} passHref prefetch={false} {...linkProps} />
        );

  return (
    <Container maxW="landingMax" position="relative" px={[0, 0, 12, 12, 40]} {...props._wrapper}>
      {/* Glowing background */}
      {mode === "dark" && (
        <Box
          pos="absolute"
          bg="purple.500"
          opacity={0.5}
          filter="blur(200px)"
          top="64px"
          bottom="64px"
          left="-16px"
          right="-16px"
          zIndex="auto"
        />
      )}
      <Box
        position="relative"
        px={[8, 8, 20]}
        py={[8, 8, 16]}
        {...(mode === "dark" && {
          bg: "purple.900",
          border: "2px solid",
          borderColor: "purple.800",
          borderRadius: "2xl",
          filter: "drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.2))",
        })}
      >
        {/* Background with opacity */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity={0.05}
          borderRadius="2xl"
          bg="linear-gradient(129.77deg, #ADABFF 16.97%, #9C88DD 64.88%, #CB8AE8 94.21%);"
        />
        {/* Background grid */}
        <Box position="absolute" right={0} bottom={0} top={0}>
          <Image
            src="/try-june-bg-grid.svg"
            alt="Background grid"
            sx={{ aspectRatio: "0.7788018433" }}
            height="full"
            visibility={["hidden", "hidden", "visible"]}
          />
        </Box>
        <VStack align="center" spacing={6}>
          <VStack align="center" spacing={4} pos="relative">
            <Heading
              as="h2"
              fontFamily="landingHeading"
              fontSize={[48, 48, 64]}
              lineHeight="1.2"
              color={mode === "light" ? "purple.900" : "white"}
              letterSpacing="-0.02em"
              textAlign={"center"}
            >
              {heading}
            </Heading>
            <Text
              fontSize="md"
              fontFamily="landingHeading"
              color={mode === "light" ? "gray.900" : "white"}
              lineHeight="7"
              maxW={["100%", "100%", "75%"]}
              textAlign={"center"}
            >
              {description}
            </Text>
          </VStack>
          <LinkOrFragment>
            <Button
              as="a"
              size="landingMd"
              variant={"landingGradient"}
              rel="noreferrer noopener"
              className="g-conversion-button"
              w={["full", "full", "unset"]}
              {...(buttonHrefType === "external" && { href: buttonHref })}
            >
              {buttonText}
            </Button>
          </LinkOrFragment>
        </VStack>
      </Box>
    </Container>
  );
}

export default TryJuneBanner;
