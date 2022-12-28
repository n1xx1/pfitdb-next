import { cx } from "cva";
import { AnchorHTMLAttributes } from "react";
import { IconAnchor } from "./icons";

export function Anchor({
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cx(
        "absolute -ml-10 flex items-center border-0 opacity-0 group-hover:opacity-100",
        className
      )}
      aria-label="Anchor"
      {...props}
    >
      &#8203;
      <div className="flex h-6 w-6 items-center justify-center rounded-md text-slate-400 shadow-sm ring-1 ring-slate-900/5 hover:text-slate-700 hover:shadow hover:ring-slate-900/10">
        <IconAnchor width="12" height="12" />
      </div>
    </a>
  );
}
