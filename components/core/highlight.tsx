import { chakra, ChakraProps, ComponentWithAs } from "@chakra-ui/react";
import { gradients, shadows } from "lib/constants/gradients";

export const Highlight = chakra("span", {
  baseStyle: { color: "primary" },
});

const GRADIENT_VARIANTS = {
  default: gradients.PRIMARY_DARKER,
  lighter: gradients.PRIMARY_LIGHTER,
  lightest: gradients.PRIMARY_LIGHTEST,
};

interface GradientHighlightProps extends ChakraProps {
  variant?: keyof typeof GRADIENT_VARIANTS;
  glow?: boolean;
}

export const GradientHighlight: ComponentWithAs<"span", GradientHighlightProps> = chakra("span", {
  // @ts-ignore
  baseStyle: ({ variant = "default", glow = false }) => ({
    bgGradient: GRADIENT_VARIANTS[variant],
    bgClip: "text",
    ...(glow && {
      filter: shadows.PRIMARY_LIGHTEST,
    }),
  }),
});
