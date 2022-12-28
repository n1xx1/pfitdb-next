import clsx from "clsx";
import { allTraits } from "contentlayer/generated";
import Link from "next/link";
import { ReactNode } from "react";

interface TraitsProps {
  traits: string[];
  className?: string;
}

export function Traits({ traits, className }: TraitsProps) {
  if (!traits || traits.length === 0) return null;

  return (
    <div className="my-2 flex gap-1">
      {traits.map((id) => (
        <Trait id={id} key={id} />
      ))}
    </div>
  );
}

interface TraitProps {
  id: string;
}

function Trait({ id }: TraitProps) {
  const trait = allTraits.find((x) => x.url_ === `tratti/${id}`);
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
      className={clsx(
        "inline-block rounded-md px-2 py-0.5 text-sm",
        traitColorMap[id] ?? "bg-orange-800 text-white"
      )}
    >
      {trait?.title.name ?? id}
    </Link>
  );
}

const traitColorMap: Record<string, string> = {
  "non-comune": "bg-orange-500 text-white",
  raro: "bg-blue-600 text-white",
  unico: "bg-purple-600 text-white",
};
