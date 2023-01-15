import { Title } from "@/utils";
import { cx } from "cva";
import { Anchor } from "./anchor";

interface PageHeadingProps {
  id: string;
  title: Title;
  isStatblock?: boolean;
  className?: string;
}

export function PageHeading({
  id,
  title,
  isStatblock,
  className,
}: PageHeadingProps) {
  return (
    <h1
      className={cx(
        "group -ml-4 flex scroll-mt-[var(--scroll-mt)] gap-[.25em] whitespace-pre-wrap pl-4",
        isStatblock && "text-xl font-bold uppercase",
        className
      )}
      id={id}
    >
      <Anchor href={`#${id}`} />
      <span className="flex-1">{title.name}</span>
      {title.type && <span>{title.type}</span>}
      {title.level && <span>{title.level}</span>}
    </h1>
  );
}
