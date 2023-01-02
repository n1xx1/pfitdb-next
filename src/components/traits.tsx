import { allTraits, Trait } from "contentlayer/generated";
import { cx } from "cva";
import Link from "next/link";

interface TraitsProps {
  traits: string[];
  className?: string;
}

export function Traits({ traits, className }: TraitsProps) {
  if (!traits || traits.length === 0) return null;

  return (
    <div className={cx("my-2 flex flex-wrap gap-1", className)}>
      {traits.map((id) => (
        <TraitBadge
          id={id}
          key={id}
          trait={allTraits.find((x) => x.url_ === `tratti/${id}`)}
        />
      ))}
    </div>
  );
}

export interface TraitBadgeProps {
  id: string;
  trait?: Trait | null;
}

export function TraitBadge({ id, trait }: TraitBadgeProps) {
  if (!trait) {
    return (
      <span className="inline-block rounded-md bg-red-500 px-2 py-0.5 text-sm">
        {id}
      </span>
    );
  }

  return (
    <Link
      key={id}
      href={trait.url_}
      className={cx(
        "inline-block rounded-md px-2 py-0.5 text-sm font-semibold",
        traitColorMap[id] ?? "bg-amber-800/30 text-amber-800"
      )}
    >
      {trait.title.name ?? id}
    </Link>
  );
}

const traitColorMap: Record<string, string> = {
  "non-comune": "bg-orange-500/30 text-orange-800",
  raro: "bg-blue-600/30 text-blue-800",
  unico: "bg-purple-600/30 text-purple-800",
};
