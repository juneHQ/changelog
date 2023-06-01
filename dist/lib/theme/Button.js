var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { mode, transparentize } from "@chakra-ui/theme-tools";
var baseStyle = {
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
    var c = props.colorScheme, theme = props.theme;
    if (c === "gray") {
        return {
            color: mode("inherit", "whiteAlpha.900")(props),
            _hover: {
                bg: mode("gray.100", "whiteAlpha.200")(props),
            },
            _active: { bg: mode("gray.200", "whiteAlpha.300")(props) },
        };
    }
    var darkHoverBg = transparentize("".concat(c, ".200"), 0.12)(theme);
    var darkActiveBg = transparentize("".concat(c, ".200"), 0.24)(theme);
    return {
        color: mode("".concat(c, ".600"), "".concat(c, ".200"))(props),
        bg: "transparent",
        _hover: {
            bg: mode("".concat(c, ".50"), darkHoverBg)(props),
        },
        _active: {
            bg: mode("".concat(c, ".100"), darkActiveBg)(props),
        },
    };
}
function variantOutline(props) {
    var c = props.colorScheme;
    var borderColor = mode("gray.200", "whiteAlpha.300")(props);
    return __assign({ border: "1px solid", borderColor: c === "gray" ? borderColor : "currentColor" }, variantGhost(props));
}
var accessibleColorMap = {
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
    var c = props.colorScheme;
    if (c === "gray") {
        var bgColor = mode("whiteAlpha.900")(props);
        return {
            bg: bgColor,
            border: "1px solid",
            borderColor: mode("gray.200")(props),
            color: mode("gray.800")(props),
            _hover: {
                bg: mode("gray.100")(props),
                _disabled: {
                    bg: bgColor,
                },
            },
            _active: { bg: mode("gray.300")(props) },
        };
    }
    if (c === "black") {
        var bgColor = mode("gray.800")(props);
        return {
            bg: bgColor,
            borderColor: bgColor,
            color: mode("whiteAlpha.900")(props),
            _hover: {
                bg: mode("gray.900")(props),
                _disabled: {
                    bg: bgColor,
                },
            },
            _active: { bg: mode("gray.900", "whiteAlpha.400")(props) },
        };
    }
    var _a = accessibleColorMap[c] || {}, _b = _a.bg, bg = _b === void 0 ? "".concat(c, ".500") : _b, _c = _a.color, color = _c === void 0 ? "white" : _c, _d = _a.hoverBg, hoverBg = _d === void 0 ? "".concat(c, ".600") : _d, _e = _a.activeBg, activeBg = _e === void 0 ? "".concat(c, ".700") : _e;
    var background = mode(bg, "".concat(c, ".200"))(props);
    return {
        bg: background,
        color: mode(color, "gray.800")(props),
        _hover: {
            bg: mode(hoverBg, "".concat(c, ".300"))(props),
            _disabled: {
                bg: background,
            },
        },
        _active: { bg: mode(activeBg, "".concat(c, ".400"))(props) },
    };
}
function variantLink(props) {
    var c = props.colorScheme;
    return {
        padding: 0,
        height: "auto",
        lineHeight: "normal",
        verticalAlign: "baseline",
        color: mode("".concat(c, ".500"), "".concat(c, ".200"))(props),
        _hover: {
            textDecoration: "underline",
            _disabled: {
                textDecoration: "none",
            },
        },
        _active: {
            color: mode("".concat(c, ".700"), "".concat(c, ".500"))(props),
        },
    };
}
function variantLandingGhost(props) {
    return {
        color: mode("primary", "whiteAlpha.900")(props),
        _hover: {
            bg: mode("gray.100", "whiteAlpha.200")(props),
        },
        _active: {
            bg: mode("gray.200", "whiteAlpha.300")(props),
        },
        fontFamily: "landingHeading",
    };
}
function variantLandingOutline(props) {
    var borderColor = mode("#6e5899", "whiteAlpha.300")(props);
    return __assign({ border: "1px solid", borderColor: borderColor }, variantLandingGhost(props));
}
function variantLandingSolid(props) {
    var bgColor = mode("primary", "whiteAlpha.900")(props);
    return {
        bg: bgColor,
        border: "1px solid",
        borderColor: mode("primary")(props),
        color: mode("white")(props),
        _hover: {
            bg: mode("purple.600")(props),
            borderColor: mode("purple.600")(props),
            _disabled: {
                bg: bgColor,
            },
        },
        _active: {
            bg: mode("purple.700")(props),
            borderColor: mode("purple.700")(props),
        },
        fontFamily: "landingHeading",
    };
}
var variantUnstyled = {
    bg: "none",
    color: "inherit",
    display: "inline",
    lineHeight: "inherit",
    m: 0,
    p: 0,
};
var variants = {
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
var sizes = {
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
var defaultProps = {
    variant: "solid",
    size: "md",
    colorScheme: "gray",
};
var Button = {
    baseStyle: baseStyle,
    variants: variants,
    sizes: sizes,
    defaultProps: defaultProps,
};
export default Button;
