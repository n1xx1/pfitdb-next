import { getChildren } from "@/contentlayer-utils";
import { tw } from "@/styles/tw";
import { cva, cx, VariantProps } from "cva";
import Link from "next/link";
import { ReactNode, useContext } from "react";
import { Button } from "../button";
import { useCurrentPage } from "./context";

const resourceStyles = cva(tw`group !flex flex-col`, {
  variants: {
    size: {
      sm: tw`!p-2 text-left text-lg`,
      md: tw`!p-6 text-center text-xl`,
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const resourceListStyles = cva(tw`not-prose grid`, {
  variants: {
    columns: {
      "1": tw`grid-cols-1`,
      "2": tw`grid-cols-2`,
      "3": tw`grid-cols-3`,
      "4": tw`grid-cols-4`,
    },
    size: {
      sm: tw`gap-2`,
      md: tw`gap-4`,
    },
  },
  defaultVariants: {
    size: "md",
    columns: "2",
  },
});

export interface ResourceListProps
  extends VariantProps<typeof resourceListStyles> {
  children?: ReactNode;
  className?: string;
}

export function ResourceList({
  columns,
  size,
  className,
  children,
}: ResourceListProps) {
  const page = useCurrentPage();

  if (!children && page) {
    children = getChildren(page).map((page, i) => (
      <Resource key={i} href={"/" + (page?.url_ ?? "")}>
        {page?.title.name ?? "?"}
      </Resource>
    ));
  }

  return (
    <div className={cx(resourceListStyles({ columns, size }), className)}>
      {children}
    </div>
  );
}

export interface ResourceProps extends VariantProps<typeof resourceStyles> {
  children?: ReactNode;
  className?: string;
  href: string;
}

export function Resource({ size, href, className, children }: ResourceProps) {
  return (
    <Button
      as={Link}
      href={href ?? "/"}
      variant="solid"
      className={cx(resourceListStyles({ size }), className)}
    >
      {children}
    </Button>
  );
}
