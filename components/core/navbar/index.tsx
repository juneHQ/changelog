import { useState } from 'react';
import Link from 'next/link';
import { defaultPx } from 'lib/utils/default-container-px';
import { DesktopNavItem } from 'components/core/navbar/desktop-nav-item';
import { HamburgerMenu } from 'components/core/custom-icons/hamburger-icon';
import { CloseIcon } from 'components/core/custom-icons/close-icon';
import { Box, Button, Container, Flex, HStack, Image, Stack, Text } from '@chakra-ui/react';

const MOBILE_MENU_COLOR = "#6e5899";
const MOBILE_FONT_WEIGHT = 600;

const ROUTES = [
  {
    href: process.env.NEXT_PUBLIC_MARKETING_HOST + "/company/about-us",
    title: "About",
    type: "external-link",
  },
  {
    href: process.env.NEXT_PUBLIC_MARKETING_HOST + "/resources",
    title: "Resources",
    type: "external-link",
  },
  {
    href: "https://blog.zingfi.co",
    title: "Blog",
    type: "external-link",
  },
  {
    href: "https://docs.zingfi.co",
    title: "Documentation",
    type: "external-link",
  },
] as const;

interface Props {
  activeHref?: typeof ROUTES[number]["href"];
}

export default function Navbar(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile navbar */}
      {isOpen ? (
        <Box
          w="100%"
          maxWidth="100vw"
          position="fixed"
          zIndex="overlay"
          display={["block", "block", "none"]}
        >
          <Flex direction="column">
            <Flex align="center" justify="space-between">
              <Flex p={4} as="a" href="/">
                <Image h={12} src="/june-logo-small.svg" alt="june-logo" />
              </Flex>
              <Flex p={4} onClick={toggle}>
                <Box pr={1}>
                  <CloseIcon />
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      ) : (
        <Box w="100%" zIndex="overlay" display={["block", "block", "none"]} position="absolute">
          <Flex direction="column">
            <Flex align="center" justify="space-between">
              <Flex p={4} as="a" href="/">
                <Image h={12} src="/june-logo-small.svg" alt="june-logo" />
              </Flex>
              <Flex p={4} onClick={toggle}>
                <Box>
                  <HamburgerMenu />
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      )}
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
        display={isOpen ? "block" : "none"}
      >
        <Flex width="100%" direction="column" h="40%" justify="space-between">
          <Flex
            align="center"
            as="a"
            href={`${process.env.NEXT_PUBLIC_MARKETING_HOST}/company/about-us`}
            style={{ textDecoration: "none" }}
          >
            <Text fontSize="4xl" fontWeight="bold" color={MOBILE_MENU_COLOR}>
              About
            </Text>
          </Flex>
          <Link
            prefetch={false}
            href={`${process.env.NEXT_PUBLIC_MARKETING_HOST}/resources`}
          >
            <Flex align="center" style={{ textDecoration: "none" }}>
              <Text fontSize="4xl" fontWeight="bold" color={MOBILE_MENU_COLOR}>
                Resources
              </Text>
            </Flex>
          </Link>
          <Link prefetch={false} href="https://blog.zingfi.co">
            <Flex align="center" style={{ textDecoration: "none" }}>
              <Text fontSize="4xl" fontWeight="bold" color={MOBILE_MENU_COLOR}>
                Blog
              </Text>
            </Flex>
          </Link>
          <Link
            prefetch={false}
            href="https://docs.zingfi.co"
            passHref
          >
            <Flex align="center" style={{ textDecoration: "none" }} _hover={{ cursor: "pointer" }}>
              <Text fontSize="4xl" fontWeight="bold" color={MOBILE_MENU_COLOR}>
                Documentation
              </Text>
            </Flex>
          </Link>
        </Flex>
        <Stack spacing={4} mt={16}>
          <Button
            colorScheme="purple"
            size="md"
            h={50}
            as="a"
            href={process.env.NEXT_PUBLIC_MARKETING_HOST}
            borderRadius={6}
            fontWeight={MOBILE_FONT_WEIGHT}
          >
            Back to website
          </Button>
        </Stack>
      </Flex>
      {/* Desktop Navbar */}
      <Container
        position="absolute"
        maxW="landingMax"
        left="50%"
        transform="translateX(-50%)"
        zIndex={15}
        overflowX="hidden"
        display={["none", "none", "block"]}
        px={defaultPx(32)}
      >
        <Flex py={6} direction="row" justify="space-between">
          {/* Logo */}
          <Link href="/">
            <Flex display={["none", "none", "block"]} cursor="pointer">
              <Image h={8} src="/June-logo.svg" alt="june-logo" />
            </Flex>
          </Link>
          {/* Navigation items */}
          <HStack spacing={[0, 0, 8, 16, 100]} align="center">
            {/* Rest of routes */}
            {ROUTES.map((route) => (
              <DesktopNavItem
                key={route.href}
                {...route}
                isActive={props.activeHref === route.href}
              />
            ))}
          </HStack>
          {/* CTAs */}
          <HStack spacing={4} align="center">
            <Button
              as="a"
              size="landingMd"
              variant="landingSolid"
              href={process.env.NEXT_PUBLIC_MARKETING_HOST}
            >
              Back to website
            </Button>
          </HStack>
        </Flex>
      </Container>
    </>
  );
}
