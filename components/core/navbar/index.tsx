import { useState } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import dynamic from 'next/dynamic';
import { defaultPx } from 'lib/utils/default-container-px';
import { useAuth } from 'lib/state/use-auth';
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  useClipboard,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import { NavbarMobileMenuProps } from './navbar-mobile-menu';
import { DesktopNavItem } from './desktop-nav-item';
import { NextResponsiveImage } from '../next-responsive-image';

const DynamicNavbarMobileMenu = dynamic<NavbarMobileMenuProps>(
  () => import("./navbar-mobile-menu").then((mod) => mod.NavbarMobileMenu),
  { ssr: false }
);

const logoSvg = `<svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 8h24v24H8V8zm28 0h16v24H36V8zm20 0h16v24H56V8zm20 0h16v24H76V8z" fill="#FF6B35"/>
<text x="8" y="22" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#333">数数科技</text>
</svg>
`;

const wordmarkSvg = `<svg width="313" height="100" viewBox="0 0 313 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M147.236 55.4194V21.1543C147.236 18.8145 148.574 17.4775 150.914 17.4775H156.847C159.187 17.4775 160.524 18.8145 160.524 21.1543V54.918C160.524 68.2896 152.92 76.981 138.796 76.981C130.605 76.981 123.808 73.7427 119.49 67.9551C118.061 66.0396 118.738 64.1108 120.828 62.9409L125.09 60.6006C127.095 59.5142 128.683 60.0991 130.271 62.0215C132.361 64.5288 135.035 65.8657 138.378 65.8657C144.144 65.8657 147.236 61.7705 147.236 55.4194ZM170.056 57.1743V36.3647C170.056 34.0249 171.393 32.6875 173.733 32.6875H179.082C181.422 32.6875 182.759 34.0249 182.759 36.3647V57.9263C182.759 64.0273 186.269 67.0356 191.033 67.0356C195.797 67.0356 199.306 64.0273 199.306 57.9263V36.3647C199.306 34.0249 200.643 32.6875 202.983 32.6875H208.332C210.673 32.6875 212.009 34.0249 212.009 36.3647V57.1743C212.009 70.2949 203.903 76.981 191.033 76.981C178.163 76.981 170.056 70.2949 170.056 57.1743ZM233.407 46.3936V72.3008C233.407 74.6406 232.07 75.978 229.729 75.978H224.381C222.041 75.978 220.704 74.6406 220.704 72.3008V36.3647C220.704 34.0249 222.041 32.6875 224.381 32.6875H229.729C232.07 32.6875 233.407 34.0249 233.407 36.3647V37.5347C236.499 34.3589 241.68 31.6846 247.614 31.6846C256.64 31.6846 262.741 37.3677 262.741 48.2319V72.3008C262.741 74.6406 261.404 75.978 259.063 75.978H253.715C251.375 75.978 250.038 74.6406 250.038 72.3008V49.5693C250.038 44.4712 247.781 41.6299 243.185 41.6299C239.257 41.6299 235.496 43.8862 233.407 46.3936ZM312.553 54.834C312.553 57.1743 311.133 58.4277 308.793 58.4277H281.883C282.801 63.8599 286.729 67.0356 292.747 67.0356C295.588 67.0356 297.844 66.1167 299.766 64.5288C301.522 63.0244 303.11 62.6064 304.948 63.9434L307.706 65.8657C309.712 67.2866 310.146 69.309 308.291 71.0474C304.148 74.93 298.68 76.981 292.245 76.981C278.038 76.981 269.262 67.5371 269.262 54.333C269.262 41.1284 277.955 31.6846 290.992 31.6846C303.862 31.6846 312.553 41.0449 312.553 54.5V54.834ZM281.799 49.8198H300.017C299.516 44.7222 295.923 41.6299 290.992 41.6299C285.893 41.6299 282.55 44.5547 281.799 49.8198Z" fill="#6968F4"/>
<path d="M69.5254 42.4262C71.0719 51.197 66.2102 57.3388 57.1438 58.9375C50.2173 60.1588 44.3935 58.0871 41.6543 53.237C41.3247 52.6533 41.2603 51.9568 41.4766 51.3223C41.6927 50.6878 42.1691 50.1735 42.7868 49.9132L46.8414 48.205C47.8061 47.7986 48.9206 48.0793 49.5793 48.8929C50.7906 50.3891 52.7584 51.2251 55.3472 50.7686C59.0428 50.117 61.0497 47.375 60.3808 43.5811L57.9305 29.6851L43.7369 32.1878C42.4589 32.4131 41.2401 31.5597 41.0147 30.2817L40.4321 26.9771C40.2067 25.6991 41.0601 24.4803 42.3382 24.2549L63.2839 20.5616C64.562 20.3363 65.7808 21.1897 66.0062 22.4677L69.5254 42.4262ZM87.2854 14.4816C85.605 4.9519 76.5176 -1.41121 66.988 0.269114L29.2723 6.9194C24.696 7.72631 20.6277 10.3182 17.9623 14.1246L3.54789 34.7106C0.882542 38.5171 -0.16151 43.2265 0.645405 47.8028L7.2957 85.5185C8.97603 95.0481 18.0635 101.411 27.5932 99.7309L65.3088 93.0806C69.8851 92.2737 73.9535 89.6819 76.6187 85.8754L91.0332 65.2894C93.6985 61.4829 94.7426 56.7735 93.9357 52.1972L87.2854 14.4816ZM87.077 53.6595C88.0852 59.3773 84.2673 64.8297 78.5495 65.8379L40.5886 72.5315C34.8708 73.5397 29.4183 69.7218 28.4101 64.004L21.7165 26.0431C20.7084 20.3253 24.5263 14.8728 30.244 13.8646L68.205 7.17111C73.9227 6.16293 79.3752 9.98077 80.3834 15.6986L87.077 53.6595Z" fill="#6968F4"/>
</svg>
`;

const ROUTES = [
  { href: "https://www.thinkingdata.cn/solution", title: "解决方案", type: "external-link" },
  { href: "https://www.thinkingdata.cn/case", title: "客户案例", type: "external-link" },
  { href: "https://www.thinkingdata.cn/support", title: "帮助与支持", type: "external-link" },
  { href: "/", title: "更新日志", type: "internal-link" },
] as const;

interface NavbarProps {
  activeHref?: typeof ROUTES[number]["href"] | "/" | "/feature-launches" | "/ai";
  mode?: "light" | "dark";
}

function Navbar(props: NavbarProps) {
  const { loggedIn } = useAuth();
  const { isOpen: isMobileMenuOpen, onToggle: onMobileMenuToggle } = useDisclosure();

  const [showLogoMenu, setShowLogoMenu] = useState(false);
  const { onCopy: onCopyLogo } = useClipboard(logoSvg);
  const { onCopy: onCopyWordmark } = useClipboard(wordmarkSvg);

  const toast = useToast();

  const handleCopy = (svgName: "logo" | "wordmark") => {
    if (svgName === "logo") onCopyLogo();
    if (svgName === "wordmark") onCopyWordmark();

    setShowLogoMenu(false);
    toast({
      title: "Copied to clipboard",
      status: "success",
      duration: 1000,
    });
  };



  return (
    <>
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
              <Flex p={4} as="a" href="https://www.thinkingdata.cn/">
                <NextImage
                  height={48}
                  width={48}
                  src="/logo.svg"
                  alt="数数科技 ThinkingData"
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
      {showLogoMenu && (
        <Container maxW="landingMax" display={["none", "none", "none", "block"]}>
          <Box
            position="absolute"
            top={10}
            left={32}
            zIndex={"popover"}
            boxShadow="0px 2px 8px rgba(104, 104, 247, 0.1);"
            background="white"
            border="1px solid"
            borderColor={"gray.200"}
            rounded="lg"
            onContextMenu={(e) => {
              e.preventDefault();
              setShowLogoMenu(false);
            }}
          >
            <Box p={[2]}>
              <VStack alignItems="start" spacing={[2]}>
                <Button
                  onClick={() => {
                    handleCopy("logo");
                  }}
                  justifyContent={"start"}
                  w="full"
                  variant={"ghost"}
                >
                  <Text fontSize={"sm"}>Copy logo as SVG</Text>
                </Button>
                <Button
                  onClick={() => {
                    handleCopy("wordmark");
                  }}
                  justifyContent={"start"}
                  w="full"
                  variant={"ghost"}
                >
                  <Text fontSize={"sm"}>Copy wordmark as SVG</Text>
                </Button>
              </VStack>
            </Box>
          </Box>
        </Container>
      )}
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
          <Box
            onContextMenu={(e) => {
              e.preventDefault();
              setShowLogoMenu(!showLogoMenu);
            }}
          >
            <Link href="https://www.thinkingdata.cn/" passHref prefetch={false}>
              <NextResponsiveImage
                display={["none", "none", "block"]}
                src="/logo.svg"
                alt="数数科技 ThinkingData"
                width={["120px"]}
                height={["40px"]}
                cursor="pointer"
                {...(props.mode === "dark" && {
                  filter: "invert(1) brightness(10000%)",
                })}
              />
            </Link>
          </Box>
          {/* Navigation items */}
          <HStack spacing={[0, 0, 4, 12, 20]} align="center">
            {/* Solution tab with popup menu */}
            <Popover variant="responsive" trigger="hover">
              <PopoverTrigger>
                <HStack role="group" spacing={[1]}>
                  <p
                    className='font-hero text-[16px] cursor-pointer hover:underline underline-offset-[3px] font-bold leading-normal text-primary'
                  >
                    产品能力
                  </p>
                  <ChevronDownIcon
                    boxSize={[5]}
                    {...(props.mode === 'dark' && {
                      color: 'white',
                    })}
                  />
                </HStack>
              </PopoverTrigger>
              <Portal>
                <PopoverContent
                  boxShadow="0px 2px 8px rgba(104, 104, 247, 0.1);"
                  background="white"
                  border="1px solid #F8F9FA"
                  rounded="2xl"
                  minWidth="unset"
                  width="unset"
                >
                  <Box className="w-[360px] p-5">
                  <VStack alignItems="start" spacing={[4]} className="font-bold text-primary font-hero">
                    <Link href="https://www.thinkingdata.cn/product/ta" passHref>
                      <HStack as="a" spacing={2} className="hover:underline underline-offset-[3px] cursor-pointer">
                        <Text>实时用户行为分析</Text>
                      </HStack>
                    </Link>
                    <Link href="https://www.thinkingdata.cn/product/te" passHref>
                      <HStack as="a" spacing={2} className="hover:underline underline-offset-[3px] cursor-pointer">
                        <Text>一站式精细化运营</Text>
                      </HStack>
                    </Link>
                    <Link href="https://www.thinkingdata.cn/product/cdp" passHref>
                      <HStack as="a" spacing={2} className="hover:underline underline-offset-[3px] cursor-pointer">
                        <Text>数据开发治理平台</Text>
                      </HStack>
                    </Link>
                    <Link href="https://www.thinkingdata.cn/product/sdk" passHref>
                      <HStack as="a" spacing={2} className="hover:underline underline-offset-[3px] cursor-pointer">
                        <Text>自助BI数据可视化</Text>
                      </HStack>
                    </Link>
                    <Link href="https://www.thinkingdata.cn/product/community" passHref>
                      <HStack as="a" spacing={2} className="hover:underline underline-offset-[3px] cursor-pointer">
                        <Text>玩家社区分析平台</Text>
                        <div className="flex items-center justify-center w-[44px] h-[20px] rounded-full outline outline-2 outline-gray-200 font-black text-[12px]">
                          热门
                        </div>
                      </HStack>
                    </Link>
                  </VStack>
                </Box>
                </PopoverContent>
              </Portal>
            </Popover>
            {/* Rest of routes */}
            {ROUTES.map((route) => (
              <DesktopNavItem
                key={route.href}
                mode={props.mode}
                {...route}
                isActive={props.activeHref === route.href}
              />
            ))}
            <Popover variant="responsive" trigger="hover" placement="bottom-start" strategy="fixed">
              <PopoverTrigger>
                <HStack role="group" spacing={[1]}>
                  <DesktopNavItem
                    key={'/resources'}
                    mode={props.mode}
                    {...{ href: "https://www.thinkingdata.cn/resources", title: '资源中心', type: 'external-link' }}
                    isActive={false}
                  />
                  <ChevronDownIcon
                    boxSize={[5]}
                    {...(props.mode === 'dark' && {
                      color: 'white',
                    })}
                  />
                </HStack>
              </PopoverTrigger>
              <PopoverContent
                background="white"
                border="1px solid #F8F9FA"
                rounded="20px"
                minWidth="unset"
                width="unset"
                className="relative z-20 drop-shadow-md"
              >
                <Box className="w-[240px] p-5">
                  <VStack alignItems="start" spacing={[4]} className="font-bold text-primary font-hero">
                    <Link href="https://www.thinkingdata.cn/reports" passHref>
                      <HStack as="a" spacing={2} className="hover:underline underline-offset-[3px] cursor-pointer">
                        <div className="grid w-[32px] h-[32px] p-1 mr-1 bg-secondary rounded-[8px]">
                          <img src="/navbar/blog-post.svg" alt="Reports" className="w-[20px] place-self-center" />
                        </div>
                        <Text>报告&白皮书下载</Text>
                      </HStack>
                    </Link>
                    <Link href="https://www.thinkingdata.cn/courses" passHref>
                      <HStack as="a" spacing={2} className="hover:underline underline-offset-[3px] cursor-pointer">
                        <div className="grid w-[32px] h-[32px] mr-1 p-1 bg-brown-300 rounded-[8px]">
                          <img src="/navbar/guide.svg" alt="Courses" className="w-[20px] place-self-center" />
                        </div>
                        <Text>数数课堂</Text>
                      </HStack>
                    </Link>
                    <Link href="https://www.thinkingdata.cn/blog" passHref>
                      <HStack as="a" spacing={2} className="hover:underline underline-offset-[3px] cursor-pointer">
                        <div className="grid w-[32px] h-[32px] mr-1 p-1 bg-blue-300 rounded-[8px]">
                          <img src="/navbar/blog-post.svg" alt="Blog" className="w-[20px] place-self-center" />
                        </div>
                        <Text>博客文章</Text>
                      </HStack>
                    </Link>
                  </VStack>
                </Box>
              </PopoverContent>
            </Popover>
          </HStack>
          {/* CTAs */}
          <HStack spacing={4} align="center">
            <>
              <a
                className={`text-[16px] font-bold font-hero leading-normal text-primary hover:underline underline-offset-2`}
                href="https://www.thinkingdata.cn/login"
              >
                登录
              </a>
              <div className="flex justify-center items-center space-x-2"></div>
              <div>
                <a
                  className='relative h-12 px-4 flex justify-center items-center font-hero border-2 rounded-[12px] text-[16px] leading-normal font-semibold bg-primary text-white hover:bg-white hover:text-primary border-primary'
                  href="https://www.thinkingdata.cn/trial"
                >
                  免费试用
                </a>
              </div>
            </>
          </HStack>
        </Flex>
      </Container>
    </>
  );
}

export default Navbar;
