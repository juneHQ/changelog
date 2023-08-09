import Link from "next/link";
import NextImage from "next/image";
import dynamic from "next/dynamic";
import { defaultPx } from "lib/utils/default-container-px";
import { Box, Button, Container, Flex, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { NavbarMobileMenuProps } from "./navbar-mobile-menu";
import { DesktopNavItem } from "./desktop-nav-item";
import { NextResponsiveImage } from "../next-responsive-image";

const DynamicNavbarMobileMenu = dynamic<NavbarMobileMenuProps>(
  () => import("./navbar-mobile-menu").then((mod) => mod.NavbarMobileMenu),
  { ssr: false }
);

const ROUTES = [
  { href: "/", title: "Changelog", type: "internal-link" },
  {
    href: "hhttps://github.com/ScreebApp/developers/wiki",
    title: "Developers Doc",
    type: "external-link",
  },
] as const;

interface NavbarProps {
  activeHref?: typeof ROUTES[number]["href"] | "/" | "/feature-launches" | "/ai";
  mode?: "light" | "dark";
}

function Navbar(props: NavbarProps) {
  const { isOpen: isMobileMenuOpen, onToggle: onMobileMenuToggle } = useDisclosure();

  return (
    <>
      {/* Mobile navbar */}
      {isMobileMenuOpen ? (
        // @ts-ignore
        <DynamicNavbarMobileMenu toggle={onMobileMenuToggle} />
      ) : (
        <Box
          w="100%"
          zIndex="overlay"
          display={["block", "block", "block", "none"]}
          position="relative"
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
              <Flex p={4} onClick={onMobileMenuToggle}>
                <Box>
                  <HamburgerIcon
                    boxSize={7}
                    color={props.mode === "dark" ? "white" : "landing.almostBlack.500"}
                  />
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      )}
      {/* Desktop Navbar */}
      <Container
        position="relative"
        maxW="landingMax"
        zIndex={15}
        overflowX="hidden"
        display={["none", "none", "none", "block"]}
        px={defaultPx("120px")}
        my={[6]}
        top={0}
      >
        <Flex direction="row" alignItems="center" justify="space-between">
          {/* Logo */}
          <Box>
            <Link href="https://screeb.app/" passHref prefetch={false}>
              <NextResponsiveImage
                display={["none", "none", "block"]}
                src="/screeb-logo.svg"
                alt="Screeb's logo"
                width={["100px"]}
                height={["48px"]}
                cursor="pointer"
                {...(props.mode === "dark" && {
                  filter: "invert(1) brightness(10000%)",
                })}
              />
            </Link>
          </Box>
          {/* Navigation items */}
          <HStack spacing={[0, 0, 4, 12, 20]} align="center">
            {/* Rest of routes */}
            {ROUTES.map((route) => (
              <DesktopNavItem
                key={route.href}
                mode={props.mode}
                {...route}
                isActive={props.activeHref === route.href}
              />
            ))}
          </HStack>
          {/* CTAs */}
          <HStack spacing={4} align="center">
            <Box pr={4}>
              <a href={`https://admin.screeb.app`}>
                <Text fontWeight={400}>Sign in</Text>
              </a>
            </Box>
            <Button
              as="a"
              size="landingMd"
              variant="landingOutline"
              href={`${process.env.NEXT_PUBLIC_MARKETING_HOST}/get-a-demo`}
              {...(props.mode === "dark" && {
                variant: "landingOutlineDark",
              })}
            >
              Get a demo
            </Button>
            <div>
              <Button
                className="g-conversion-button"
                as="a"
                size="landingMd"
                variant="landingSolid"
                href={`${process.env.NEXT_PUBLIC_MARKETING_HOST}/pricing`}
              >
                Try for free
              </Button>
            </div>
          </HStack>
        </Flex>
      </Container>
    </>
  );
}

export default Navbar;
