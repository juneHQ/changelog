import { mode, transparentize } from "@chakra-ui/theme-tools";

const baseStyle = {
  lineHeight: "1.2",
  fontWeight: "medium",
  borderRadius: "lg",
  boxSizing: "border-box",
  _focus: {
    boxShadow: "none",
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
    const bgColor = `whiteAlpha.900`;

    return {
      bg: bgColor,
      border: "1px solid",
      borderColor: "gray.200",
      color: "gray.800",
      _hover: {
        bg: `gray.100`,
        _disabled: {
          bg: bgColor,
        },
      },
      _active: { bg: `gray.300` },
    };
  }

  if (c === "black") {
    const bgColor = `gray.800`;

    return {
      bg: bgColor,

      borderColor: bgColor,
      color: `whiteAlpha.900`,
      _hover: {
        bg: `gray.900`,
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
    color: "#271041",
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
  const borderColor = "#271041";
  return {
    ...variantLandingGhost(props),
    border: "2px solid",
    borderColor,
    _hover: {
      borderColor: "#502c9e",
      color: "#502c9e",
    },
    _active: {
      borderColor: "#502c9e",
      color: "#502c9e",
    },
  };
}

function variantLandingOutlineDark(props) {
  return {
    ...variantLandingGhost(props),
    color: "white",
    border: "2px solid",
    borderColor: "white",
    _hover: { bg: "whiteAlpha.200" },
    _active: { bg: "whiteAlpha.200" },
  };
}

function variantLandingSolid(props) {
  const { colorScheme } = props; // gray is default

  let primary = colorScheme;
  if (!colorScheme || colorScheme === "gray") {
    primary = "purple";
  }

  return {
    bg: "#271041",
    border: "1px solid",
    borderColor: `#271041`,
    color: `white`,
    _hover: {
      bg: `#502c9e`,
      borderColor: `#502c9e`,
      _disabled: {
        bg: "#271041",
      },
    },
    _active: {
      bg: `${primary}.700`,
      borderColor: `${primary}.700`,
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
  landingOutlineDark: variantLandingOutlineDark,
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
    fontSize: "md",
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
    h: 12,
    px: 5,
    fontSize: "md",
    fontWeight: "semibold",
  },
  landingBlock: {
    h: 12,
    px: 5,
    minWidth: "292px",
    fontSize: "lg",
    fontWeight: "semibold",
  },
  landingBlockSm: {
    p: 3,
    px: 5,
    minWidth: "292px",
    fontSize: "md",
    fontWeight: "semibold",
  },
  landingLg: {
    p: 4,
    px: 6,
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
