import { Box, Divider, Heading, Image, ListItem, OrderedList, Text, UnorderedList, VStack, } from "@chakra-ui/react";
import { MDXProvider } from "@mdx-js/react";
import dayjs from "dayjs";
import Head from "next/head";
import Link from "next/link";
import { Contributor } from "components/contributor";
import Footer from "components/core/footer";
import Navbar from "components/core/navbar";
import { defaultPx } from "lib/utils/default-container-px";
var components = {
    h1: function (props) { return <Heading as="h1" fontSize={["2xl", "2xl", "32px"]} color="#000" {...props}/>; },
    h2: function (props) { return <Text fontWeight="bold" fontSize="xl" mt={12} mb={6} {...props}/>; },
    p: function (props) { return <Text my={6} {...props}/>; },
    a: function (props) { return (<Text as="a" href={props.href} rel="noopener noreferrer" color="#6868F7" fontWeight="bold">
      {props.children}
    </Text>); },
    ul: function (props) { return <UnorderedList spacing={4} {...props}/>; },
    ol: function (props) { return <OrderedList spacing={4} {...props}/>; },
    li: function (props) { return <ListItem _before={{ content: "unset" }} {...props}/>; },
};
export var MdxLayout = function (props) {
    var title = "".concat(props.meta.title, " | Zing Changelog");
    var description = "Discover new updates and improvements to Zing.";
    var url = "https://changelog.zingfi.co";
    return (<MDXProvider components={components}>
      {!props.hideHead && (<Head>
          <title>{title}</title>
          <link rel="icon" href="https://res.cloudinary.com/tamilore/image/upload/c_scale,w_32/v1685100484/favicon.svg"/>
          <meta name="title" content={title}/>
          <meta name="description" content={description}/>
          <meta name="image" content={props.meta.headerImage}/>
          <meta property="og:type" content="website"/>
          <meta property="og:url" content={url}/>
          <meta property="og:title" content={title}/>
          <meta property="og:description" content={description}/>
          <meta property="og:image" content={props.meta.headerImage}/>
          <meta name="twitter:card" content="summary_large_image"/>
          <meta name="twitter:url" content={url}/>
          <meta name="twitter:title" content={title}/>
          <meta name="twitter:description" content={description}/>
          <meta name="twitter:image" content={props.meta.headerImage}/>
        </Head>)}
      <Box>
        {!props.hideLayout && <Navbar />}
        <Box w="full" maxW="100vw" overflow="hidden" zIndex="docked">
          <Box mt={!props.hideLayout && [86, 86, 140]} maxW="4xl" mx="auto" px={defaultPx(32)}>
            {/* Article header */}
            <VStack align="start" spacing={[4, 4, 6]}>
              <VStack align="start">
                <Text fontSize="sm" color="landing.gray">
                  {dayjs(props.meta.publishedAt).format("MMM Do YYYY")}
                </Text>
                <Link href={"/changelogs/".concat(props.meta.slug)}>
                  <Heading as="h1" fontSize={["2xl", "2xl", "32px"]} color="#000" cursor="pointer" _hover={{
            textDecor: "underline",
        }}>
                    {props.meta.title}
                  </Heading>
                </Link>
              </VStack>
              <Image borderRadius="md" src={props.meta.headerImage} alt={props.meta.title} w="full"/>
            </VStack>
            {/* Article content */}
            <Box px={[6]} pt={[10]} fontSize="lg" lineHeight="32px" color="landing.almostBlack.500">
              {props.children}
            </Box>
            {/* Article authors */}
            {!props.hideAuthors && (<>
                <Divider mt={16} mb={8}/>
                <VStack px={[6]} align="start" spacing={4}>
                  {props.meta.authors.map(function (author) { return (<Contributor key={author.name} {...author}/>); })}
                </VStack>
              </>)}
          </Box>
          {!props.hideLayout && (<>
              <Footer _wrapper={{ mt: [50, 50, 120], mb: 20 }}/>
            </>)}
        </Box>
      </Box>
    </MDXProvider>);
};
