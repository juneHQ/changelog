import React from "react";
import Link from "next/link";
import NextImage from "next/image";
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import CloseIcon from "../custom-icons/CloseIcon";

export interface NavbarMobileMenuProps {
  toggle: () => void;
}

const MOBILE_MENU_COLOR = "rgba(36,31,71,1)";
const MOBILE_FONT_WEIGHT = 600;

export const NavbarMobileMenu = ({ toggle }: NavbarMobileMenuProps) => (
  <>
    <Box
      w="100%"
      maxWidth="100vw"
      position="fixed"
      zIndex="overlay"
      display={["block", "block", "none"]}
    >
      <Flex direction="column">
        <Flex align="center" justify="space-between">
          <Flex p={4} as="a" href="https://screeb.app/">
            <NextImage
              height={48}
              width={48}
              src="/screeb-logo-symbol-only.png"
              alt="screeb-logo"
            />
          </Flex>
          <Flex p={4} onClick={toggle}>
            <Box pr={1}>
              <CloseIcon />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
    <Flex
      px={5}
      py="30%"
      h="100vh"
      w="100vw"
      position="fixed"
      bg="white"
      zIndex="sticky"
      direction="column"
      justify="space-between"
      overflowY="hidden"
    >
      <Flex width="100%" direction="column" h="40%" justify="space-between">
        <Flex align="center" as="a" href="/" style={{ textDecoration: "none" }}>
          <Text fontSize="4xl" fontWeight="bold" color={MOBILE_MENU_COLOR}>
            Changelog
          </Text>
        </Flex>
        <Link prefetch={false} href="https://github.com/ScreebApp/developers/wiki" passHref>
          <Flex align="center" style={{ textDecoration: "none" }} _hover={{ cursor: "pointer" }}>
            <Text fontSize="4xl" fontWeight="bold" color={MOBILE_MENU_COLOR}>
              Developers Doc
            </Text>
          </Flex>
        </Link>
      </Flex>
      <Stack spacing={4} mt={16}>
        <Button
          h={50}
          size="md"
          as="a"
          href={`${process.env.NEXT_PUBLIC_MARKETING_HOST}/get-a-demo`}
          borderRadius={6}
          fontWeight={MOBILE_FONT_WEIGHT}
        >
          Get a demo
        </Button>
        <Button
          colorScheme="purple"
          size="md"
          h={50}
          as="a"
          href={`${process.env.NEXT_PUBLIC_MARKETING_HOST}/pricing`}
          borderRadius={6}
          fontWeight={MOBILE_FONT_WEIGHT}
          className="g-conversion-button"
        >
          Try for free
        </Button>
      </Stack>
    </Flex>
  </>
);
