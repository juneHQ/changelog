var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * Gets the default array of responsive values that's mainly used in section containers.
 *
 * @example <Container maxW="landingMax" px={defaultPx(32)} />
 * @param desktopValue value for desktop sizes
 * @returns array of responsive values
 */
export var defaultPx = function (desktopValue) {
    var newValues = [];
    if (typeof desktopValue === "string" || typeof desktopValue === "number") {
        newValues = [desktopValue];
    }
    else {
        newValues = desktopValue;
    }
    return __spreadArray([4, 4, 12, 12], newValues, true);
};
