import React, { useEffect } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import CloseIcon from '../custom-icons/CloseIcon';

export interface NavbarMobileMenuProps {
  toggle: () => void;
  isHome: boolean;
  isFeatureLaunches: boolean;
  isAI: boolean;
  isRoleProduct: boolean;
  isRoleSuccessSales: boolean;
}

export const NavbarMobileMenu = ({ toggle, isRoleProduct, isRoleSuccessSales }: NavbarMobileMenuProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-white">
      <Box w="100%" maxWidth="100vw" position="fixed" zIndex="overlay" display={['block', 'block', 'none']}>
        <Flex direction="column" className="bg-white">
          <Flex align="center" justify="space-between">
            <Flex p={4} as="a" href="/">
              <NextImage height={48} width={48} src="/june-logo-symbol-only.svg" alt="customer analytics software" />
            </Flex>
            <Flex p={4} onClick={toggle}>
              <Box pr={1}>
                <CloseIcon />
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Flex pt="90px" h="100vh" w="100vw" bg="white" direction="column" justify="space-between" overflowY="auto">
        <VStack alignItems="start" spacing="24px" px="24px" className="font-black text-primary text-[20px] font-hero">
          <div className="">Features</div>
          <VStack alignItems="start" spacing="24px" px="12px" className="w-full">
            <Link href={`${process.env.NEXT_PUBLIC_MARKETING_HOST}/role/product`} passHref>
              <HStack as="a" spacing={2} className="hover:underline w-full underline-offset-[3px] cursor-pointer">
                <img className="mr-1" src="/navbar/product-analytics.svg" alt="Role Product" />
                <div className="flex justify-between w-full">
                  <Text>For Product teams</Text>
                  {isRoleProduct && <img src="/navbar/check.svg" alt="Check" />}
                </div>
              </HStack>
            </Link>
            <Link href={`${process.env.NEXT_PUBLIC_MARKETING_HOST}/role/success-sales`} passHref>
              <HStack as="a" spacing={2} className="hover:underline underline-offset-[3px] w-full cursor-pointer">
                <img className="mr-1" src="/navbar/success-sales.svg" alt="Role Success Sales" />
                <div className="flex justify-between w-full">
                  <Text>For CS and Sales teams</Text>
                  {isRoleSuccessSales && <img src="/navbar/check.svg" alt="Check" />}
                </div>
              </HStack>
            </Link>
            <div className="w-full h-[1px] bg-gray-200" />
            <Link href={`${process.env.NEXT_PUBLIC_MARKETING_HOST}/integration/hubspot`} passHref>
              <HStack as="a" spacing={2} className="hover:underline underline-offset-[3px] cursor-pointer">
                <img className="mr-1" src="/navbar/hubspot-integration.svg" alt="HubSpot integration" />
                <Text>HubSpot integration</Text>
                <div className="flex items-center justify-center w-[44px] h-[20px] rounded-full outline outline-2 outline-gray-200 font-black text-[12px]">
                  NEW
                </div>
              </HStack>
            </Link>
            <Link href={`${process.env.NEXT_PUBLIC_MARKETING_HOST}/integration/attio`} passHref>
              <HStack as="a" spacing={2} className="hover:underline underline-offset-[3px] cursor-pointer">
                <img className="mr-1" src="/navbar/attio-integration.svg" alt="Attio integration" />
                <Text>Attio integration</Text>
                <div className="flex items-center justify-center w-[44px] h-[20px] rounded-full outline outline-2 outline-gray-200 font-black text-[12px]">
                  NEW
                </div>
              </HStack>
            </Link>
          </VStack>
          <Link href={`${process.env.NEXT_PUBLIC_MARKETING_HOST}/customer-stories`} passHref>
            <a className="">Customers</a>
          </Link>
          <Link href={`${process.env.NEXT_PUBLIC_MARKETING_HOST}/pricing`} passHref>
            <a className="">Pricing</a>
          </Link>
          <Link href="https://changelog.june.so/" passHref>
            <a className="">Changelog</a>
          </Link>

          <div className="h-[192px] w-full" />
        </VStack>
      </Flex>

      <div className="flex flex-col gap-4 font-hero text-[20px] bg-white border-t-[1px] border-gray-200 p-6 font-bold absolute w-full h-[192px] bottom-0">
        <a
          href={`${process.env.NEXT_PUBLIC_APP_HOST}/log-in`}
          className="inline-block bg-white h-16 flex items-center justify-center text-primary rounded-[20px] py-2 px-4 md:px-12 text-center border-[1px] border-[#E9ECEF] shadow-[inset_0_-2px_4px_0_rgba(0,0,0,0.20)] "
        >
          Login
        </a>
        <a
          href={`${process.env.NEXT_PUBLIC_MARKETING_HOST}/demo`}
          className="flex items-center justify-center inline-block h-16 rounded-[20px] px-4 py-2 text-center text-white bg-primary md:px-12 g-conversion-button"
        >
          Request a demo
        </a>
      </div>
    </div>
  );
};
