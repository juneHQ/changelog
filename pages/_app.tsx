import { ChakraProvider } from "@chakra-ui/react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

import "@fontsource/rubik/300.css";
import "@fontsource/rubik/400.css";
import "@fontsource/rubik/500.css";
import "@fontsource/rubik/600.css";
import "@fontsource/rubik/700.css";
import "@fontsource/rubik/800.css";
import "@fontsource/rubik/900.css";

import screebTheme from "../lib/theme";

dayjs.extend(advancedFormat);

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={screebTheme}>
      {/* <Layout> */}
      <Component {...pageProps} />
      {/* </Layout> */}
    </ChakraProvider>
  );
};

export default MyApp;
