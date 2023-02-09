import { mode, transparentize } from "@chakra-ui/theme-tools";

const baseStyle = {
  lineHeight: "1.2",
  fontWeight: "medium",
  borderRadius: "lg",
  _focus: {
    boxShadow: "outline",
  },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    boxShadow: "none",
  },
  _hover: {
    _disabled: {
      bg: "initial",
    },
  },
};

function variantGhost(props) {
  const { colorScheme: c, theme } = props;

  if (c === "gray") {
    return {
      color: mode(`inherit`, `whiteAlpha.900`)(props),
      _hover: {
        bg: mode(`gray.100`, `whiteAlpha.200`)(props),
      },
      _active: { bg: mode(`gray.200`, `whiteAlpha.300`)(props) },
    };
  }

  const darkHoverBg = transparentize(`${c}.200`, 0.12)(theme);
  const darkActiveBg = transparentize(`${c}.200`, 0.24)(theme);

  return {
    color: mode(`${c}.600`, `${c}.200`)(props),
    bg: "transparent",
    _hover: {
      bg: mode(`${c}.50`, darkHoverBg)(props),
    },
    _active: {
      bg: mode(`${c}.100`, darkActiveBg)(props),
    },
  };
}

function variantOutline(props) {
  const { colorScheme: c } = props;
  const borderColor = mode(`gray.200`, `whiteAlpha.300`)(props);
  return {
    border: "1px solid",
    borderColor: c === "gray" ? borderColor : "currentColor",
    ...variantGhost(props),
  };
}

const accessibleColorMap = {
  yellow: {
    bg: "yellow.400",
    color: "black",
    hoverBg: "yellow.500",
    activeBg: "yellow.600",
  },
  cyan: {
    bg: "cyan.400",
    color: "black",
    hoverBg: "cyan.500",
    activeBg: "cyan.600",
  },
};

function variantSolid(props) {
  const { colorScheme: c } = props;

  if (c === "gray") {
    const bgColor = mode(`whiteAlpha.900`)(props);

    return {
      bg: bgColor,
      border: "1px solid",
      borderColor: mode(`gray.200`)(props),
      color: mode(`gray.800`)(props),
      _hover: {
        bg: mode(`gray.100`)(props),
        _disabled: {
          bg: bgColor,
        },
      },
      _active: { bg: mode(`gray.300`)(props) },
    };
  }

  if (c === "black") {
    const bgColor = mode(`gray.800`)(props);

    return {
      bg: bgColor,

      borderColor: bgColor,
      color: mode(`whiteAlpha.900`)(props),
      _hover: {
        bg: mode(`gray.900`)(props),
        _disabled: {
          bg: bgColor,
        },
      },
      _active: { bg: mode(`gray.900`, `whiteAlpha.400`)(props) },
    };
  }

  const {
    bg = `${c}.500`,
    color = "white",
    hoverBg = `${c}.600`,
    activeBg = `${c}.700`,
  } = accessibleColorMap[c] || {};

  const background = mode(bg, `${c}.200`)(props);

  return {
    bg: background,
    color: mode(color, `gray.800`)(props),
    _hover: {
      bg: mode(hoverBg, `${c}.300`)(props),
      _disabled: {
        bg: background,
      },
    },
    _active: { bg: mode(activeBg, `${c}.400`)(props) },
  };
}

function variantLink(props) {
  const { colorScheme: c } = props;
  return {
    padding: 0,
    height: "auto",
    lineHeight: "normal",
    verticalAlign: "baseline",
    color: mode(`${c}.500`, `${c}.200`)(props),
    _hover: {
      textDecoration: "underline",
      _disabled: {
        textDecoration: "none",
      },
    },
    _active: {
      color: mode(`${c}.700`, `${c}.500`)(props),
    },
  };
}

function variantLandingGhost(props) {
  return {
    color: mode(`primary`, `whiteAlpha.900`)(props),
    _hover: {
      bg: mode(`gray.100`, `whiteAlpha.200`)(props),
    },
    _active: {
      bg: mode(`gray.200`, `whiteAlpha.300`)(props),
    },
    fontFamily: "landingHeading",
  };
}

function variantLandingOutline(props) {
  const borderColor = mode("#8E93E8", `whiteAlpha.300`)(props);
  return {
    border: "1px solid",
    borderColor,
    ...variantLandingGhost(props),
  };
}

function variantLandingSolid(props) {
  const bgColor = mode("primary", `whiteAlpha.900`)(props);
  return {
    bg: bgColor,
    border: "1px solid",
    borderColor: mode("primary")(props),
    color: mode(`white`)(props),
    _hover: {
      bg: mode(`purple.600`)(props),
      borderColor: mode(`purple.600`)(props),
      _disabled: {
        bg: bgColor,
      },
    },
    _active: {
      bg: mode(`purple.700`)(props),
      borderColor: mode(`purple.700`)(props),
    },
    fontFamily: "landingHeading",
  };
}

const variantUnstyled = {
  bg: "none",
  color: "inherit",
  display: "inline",
  lineHeight: "inherit",
  m: 0,
  p: 0,
};

const variants = {
  ghost: variantGhost,
  outline: variantOutline,
  solid: variantSolid,
  link: variantLink,
  unstyled: variantUnstyled,
  // Landing specific variants
  landingGhost: variantLandingGhost,
  landingOutline: variantLandingOutline,
  landingSolid: variantLandingSolid,
};

const sizes = {
  lg: {
    h: 12,
    minW: 12,
    fontSize: "lg",
    px: 6,
  },
  md: {
    h: 8,
    minW: 10,
    fontSize: "sm",
    px: 3,
  },
  sm: {
    h: 8,
    minW: 8,
    fontSize: "sm",
    px: 3,
  },
  xs: {
    h: 6,
    minW: 6,
    fontSize: "xs",
    px: 2,
  },
  // Landing specific sizes
  landingMd: {
    p: 3,
    fontSize: "md",
    fontWeight: "semibold",
  },
  landingLg: {
    p: 4,
    fontSize: "lg",
    fontWeight: "bold",
  },
};

const defaultProps = {
  variant: "solid",
  size: "md",
  colorScheme: "gray",
};

const Button = {
  baseStyle,
  variants,
  sizes,
  defaultProps,
};

export default Button;
