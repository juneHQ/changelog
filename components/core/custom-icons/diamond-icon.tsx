import { SVGProps } from "react";
import * as React from "react";

export const DiamondIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={22} height={22} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="m21.203 7.39-4.201-4.812a1.733 1.733 0 0 0-1.141-.515H6.236a1.753 1.753 0 0 0-1.148.515L.798 7.391a.839.839 0 0 0 0 1.045l9.769 12.003a.537.537 0 0 0 .866 0l9.79-12.003a.845.845 0 0 0-.02-1.045ZM7.088 8.939l1.3 5.561-4.545-5.562h3.245Zm4.558-4.813.983 2.75H9.372l.983-2.75h1.292Zm1.148 4.813L11 16.623 9.206 8.938h3.588Zm2.118 0h3.238l-4.537 5.561 1.299-5.562Zm3.1-2.063h-3.19l-.982-2.75h1.773l2.4 2.75ZM6.47 4.125h1.692l-.983 2.75H4.022l2.447-2.75Z"
      fill="currentColor"
    />
  </svg>
);
