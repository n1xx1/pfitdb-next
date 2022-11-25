import { allDocuments } from ".contentlayer/generated";
import Link from "next/link";
import { SafeLink } from "./safe-link";

export interface TraitListProps {
  category: string;
}

export function TraitList({ category }: TraitListProps) {
  const traits = allDocuments.filter(
    (x) =>
      x.url_.startsWith("tratti/") && (x as any).categories?.includes(category)
  );

  return (
    <div className="flex flex-wrap gap-1">
      {traits.map((t) => (
        <SafeLink className="block" key={t.url_} href={`/${t.url_}`}>
          {t.title.name}
        </SafeLink>
      ))}
    </div>
  );
}
