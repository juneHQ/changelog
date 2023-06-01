import { Box, Button, Container, Heading, Image, Text, VStack, } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
export function TryBanner(props) {
    var _a = props.subheading, subheading = _a === void 0 ? "Try today" : _a, _b = props.heading, heading = _b === void 0 ? (<>
        Set up June in
        <br />5 minutes
      </>) : _b, _c = props.description, description = _c === void 0 ? "Get instant product analytics reports in seconds not hours." : _c, _d = props.buttonText, buttonText = _d === void 0 ? "Get started" : _d, _e = props.buttonHref, buttonHref = _e === void 0 ? "".concat(process.env.NEXT_PUBLIC_APP_HOST, "/start") : _e, _f = props.buttonHrefType, buttonHrefType = _f === void 0 ? "external" : _f;
    var LinkOrFragment = buttonHrefType === "external"
        ? React.Fragment
        : function (linkProps) { return (<Link href={buttonHref} passHref prefetch={false} {...linkProps}/>); };
    return (<Container maxW="landingMax" px={[0, 0, 12, 12, 32]} {...props._wrapper}>
      <Box bg="linear-gradient(113.99deg, #D1D4FF 15.75%, #A7ACFC 57.98%, #8588E5 83.82%);" borderRadius="md" pos="relative" p={[8, 8, 16, 16, 120]}>
        <picture>
          <source type="image/webp" srcSet="/rocket.webp"/>
          <source type="image/png" srcSet="/rocket.png"/>
          <Image src="/rocket.png" alt="rocket" objectFit={["cover"]} pos="absolute" w={["3xl", 800]} h={["3xl", 800]} top="50%" left="50%" transform={["translate(15%, -42.5%)", "translate(-5%, -45%)"]} display={["none", "none", "block"]}/>
        </picture>
        <VStack align="start" spacing={4} pos="relative">
          <Text fontFamily="landingHeading" fontSize={38} fontWeight="semibold" color="#8588E5" lineHeight="shorter">
            {subheading}
          </Text>
          <Heading as="h2" fontFamily="landingHeading" fontSize={[54, 54, 80]} lineHeight={[1.2, 1.2, "83.5px"]} color="landing.almostBlack.500">
            {heading}
          </Heading>
          <Text fontSize={22} fontWeight="medium" color="landing.gray">
            {description}
          </Text>
          <LinkOrFragment>
            <Button as="a" size="landingMd" variant="landingSolid" fontFamily="landingHeading" rel="noreferrer noopener" {...(buttonHrefType === "external" && { href: buttonHref })}>
              {buttonText}
            </Button>
          </LinkOrFragment>
        </VStack>
      </Box>
    </Container>);
}
