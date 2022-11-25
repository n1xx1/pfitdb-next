import clsx from "clsx";
import { cx } from "cva";
import { ReactNode } from "react";
import { IconChevronRight, IconHamburger } from "./icons";
import { SafeLink } from "./mdx/safe-link";

export type Breadcrumb = { href?: string; children: ReactNode };

interface MobileBreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

export function MobileBreadcrumbs({ breadcrumbs }: MobileBreadcrumbsProps) {
  const last = breadcrumbs.length - 1;
  return (
    <div className="flex items-center border-b border-gray-900/10 p-4 lg:hidden">
      <button type="button" className="text-slate-500 hover:text-slate-600">
        <span className="sr-only">Navigation</span>
        <IconHamburger />
      </button>
      <ol className="ml-4 flex min-w-0 whitespace-nowrap text-sm leading-6">
        {breadcrumbs.map((b, i) => (
          <li
            key={i}
            className={clsx(
              "flex items-center",
              i === last && "truncate font-semibold text-gray-900"
            )}
          >
            {i !== last && !!b.href ? (
              <SafeLink href={`/${b.href}`}>{b.children}</SafeLink>
            ) : (
              b.children
            )}
            {i !== last && (
              <IconChevronRight className="mx-3 h-1.5 w-auto overflow-visible text-slate-400" />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
