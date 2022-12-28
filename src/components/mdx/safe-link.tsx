import { cx } from "cva";
import Link from "next/link";
import { AnchorHTMLAttributes } from "react";
import { root } from "src/contentlayer-utils";

export function SafeLink({
  href,
  children,
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  href = href ?? "";
  const [realLink, anchor] = href.split("#");
  const tree = root.get(realLink.replace(/^\//, "").split("/"));
  if (tree && tree.page) {
    return (
      <Link
        href={`/${tree.page.url_}${anchor ? `#${anchor}` : ""}`}
        className={className}
        {...props}
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={cx(className, !href.startsWith("#") && "text-red-700")}
      {...props}
    >
      {children}
    </a>
  );
}
