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
import { extendTheme } from "@chakra-ui/react";
import typography from "./typograpy";
import sizes, { baseSizes } from "./sizes";
import colors from "./colors";
import Button from "./Button";
var overrides = __assign(__assign({}, typography), { space: baseSizes, sizes: sizes, colors: colors, components: {
        Button: Button,
    } });
var juneTheme = extendTheme(overrides);
export default juneTheme;
