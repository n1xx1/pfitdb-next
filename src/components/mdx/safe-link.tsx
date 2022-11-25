import clsx from "clsx";
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
  const [realLink] = href.split("#");
  if (root.get(realLink.replace(/^\//, "").split("/"))) {
    return (
      <Link href={href} className={className} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={clsx(className, { "text-red-700": !href.startsWith("#") })}
      {...props}
    >
      {children}
    </a>
  );
}
