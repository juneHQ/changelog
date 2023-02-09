import { extendTheme } from "@chakra-ui/react";
import typography from "./typograpy";
import sizes, { baseSizes } from "./sizes";
import colors from "./colors";
import Button from "./Button";

const overrides = {
  ...typography,
  space: baseSizes,
  sizes,
  colors,
  components: {
    Button,
  },
};

const juneTheme = extendTheme(overrides);

export default juneTheme;
