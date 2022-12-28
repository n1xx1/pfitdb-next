import { FunctionComponent, SVGProps } from "react";

export function IconChevronRight({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 3 6" {...props}>
      <path
        d="M0 0L3 3L0 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconChevronLeft({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 3 6" {...props}>
      <path
        d="M3 0L0 3L3 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconGithub({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export function IconAnchor({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" aria-hidden="true" {...props}>
      <path
        d="M3.75 1v10M8.25 1v10M1 3.75h10M1 8.25h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconHamburger({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" {...props}>
      <path
        d="M5 6h14M5 12h14M5 18h14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      ></path>
    </svg>
  );
}

export function IconAncestry({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="currentColor"
      width="24"
      height="24"
      viewBox="0 -8 72 72"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M47.71,24.61a15.61,15.61,0,0,0,2.44.19,11.08,11.08,0,0,0,8-3.11l1.19-1.19a2,2,0,1,0-2.88-2.88l-.29.29L46.09,7.82l.29-.28A2,2,0,0,0,43.5,4.66L42.31,5.85a11,11,0,0,0-3.11,8,16.59,16.59,0,0,0,2.14,8,12.82,12.82,0,0,1,1.62,6,7.73,7.73,0,0,1-1.12,4.14L32,22.16a6.54,6.54,0,0,1,2.1-.88l7.8,7.8a7.12,7.12,0,0,0,.09-1.17,10.69,10.69,0,0,0-.36-2.71l-4.07-4.07a12.88,12.88,0,0,1,2.61.63,18.21,18.21,0,0,1-1.6-4.6A15.61,15.61,0,0,0,36.08,17,10.65,10.65,0,0,0,25,28.08a16.59,16.59,0,0,0,2.14,8,12.82,12.82,0,0,1,1.62,6,7.73,7.73,0,0,1-1.12,4.14l-9.89-9.89a6.59,6.59,0,0,1,2.11-.88l7.79,7.79a6.93,6.93,0,0,0,.09-1.16,10.69,10.69,0,0,0-.36-2.71l-4.06-4.06a12.92,12.92,0,0,1,2.6.62,18.24,18.24,0,0,1-1.61-4.6,15.4,15.4,0,0,0-2.43-.19,11,11,0,0,0-8,3.11L12.66,35.5a2,2,0,0,0,2.88,2.88l.29-.29L25.91,48.17l-.29.29a2,2,0,1,0,2.88,2.88l1.19-1.19a11,11,0,0,0,3.11-8,16.59,16.59,0,0,0-2.14-8,12.82,12.82,0,0,1-1.62-6A7.73,7.73,0,0,1,30.16,24l9.89,9.89a6.54,6.54,0,0,1-2.1.88l-7.8-7.8a7.12,7.12,0,0,0-.09,1.17,10.56,10.56,0,0,0,.36,2.7l4.07,4.08a13.58,13.58,0,0,1-2.61-.63,18.21,18.21,0,0,1,1.6,4.6,15.61,15.61,0,0,0,2.44.19A10.65,10.65,0,0,0,47,27.92a16.59,16.59,0,0,0-2.14-8,12.82,12.82,0,0,1-1.62-6,7.73,7.73,0,0,1,1.12-4.14l9.89,9.89a6.82,6.82,0,0,1-2.11.88l-7.8-7.8a8.31,8.31,0,0,0-.08,1.17,10.69,10.69,0,0,0,.36,2.71l4.06,4.06a12.16,12.16,0,0,1-2.6-.63A18.28,18.28,0,0,1,47.71,24.61Z" />
    </svg>
  );
}
