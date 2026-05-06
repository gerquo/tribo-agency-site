import type { SVGProps } from "react";

export function XLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M18.9 2H21l-6.86 7.84L22.2 22h-6.3l-4.94-7.46L4.43 22H2.32l7.34-8.4L1.8 2h6.46l4.47 6.83L18.9 2Zm-1.1 18h1.75L7.3 3.9H5.42L17.8 20Z" />
    </svg>
  );
}
