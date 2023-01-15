import { cx } from "cva";
import { HTMLAttributes, useContext } from "react";
import { parseTitle } from "src/utils";
import { Anchor } from "../anchor";
import { IncludedContext } from "./include";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  depth: number;
}

export function Heading({
  depth,
  className,
  id,
  children,
  ...props
}: HeadingProps) {
  type HeadingType = `h${1 | 2 | 3 | 4 | 5 | 6}`;
  const ctx = useContext(IncludedContext);
  depth = Math.min(depth + (ctx?.depth ?? 0), 6);
  const Component = `h${depth}` as HeadingType;

  if (typeof children === "string") {
    const { name, level, type } = parseTitle(children);
    children = (
      <>
        <span className="flex-1">{name}</span>
        <span>
          {type}
          {!!level && <> {level}</>}
        </span>
      </>
    );
  } else {
    children = <span>{children}</span>;
  }

  return (
    <Component
      {...props}
      id={id}
      className={cx(
        "group -ml-4 flex scroll-mt-[var(--scroll-mt)] gap-[.25em] whitespace-pre-wrap pl-4",
        className
      )}
    >
      <Anchor href={`#${id}`} />
      {children}
    </Component>
  );
}
