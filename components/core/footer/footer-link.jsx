var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { Text } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
export function FooterLink(_a) {
    var _b = _a.type, type = _b === void 0 ? "internal" : _b, _c = _a.href, href = _c === void 0 ? "" : _c, props = __rest(_a, ["type", "href"]);
    var Wrapper = type === "internal"
        ? function (_a) {
            var children = _a.children;
            return (<Link href={href} passHref>
            {children}
          </Link>);
        }
        : React.Fragment;
    return (<Wrapper>
      {typeof props.title === "string" ? (<Text as={type === "text" ? "p" : "a"} color={props.mode === "dark" ? "white" : "landing.gray"} {...(type === "external" && { href: href })} {...props.style}>
          {props.title}
        </Text>) : (props.title)}
    </Wrapper>);
}
