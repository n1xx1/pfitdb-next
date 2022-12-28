import { allTraits } from ".contentlayer/generated";
import { TraitBadge } from "../traits";

export interface TraitListProps {
  category: string;
}

export function TraitList({ category }: TraitListProps) {
  const traits = allTraits.filter((x) => x.categories?.includes(category));

  return (
    <div className="not-prose flex flex-wrap gap-1">
      {traits.map((t, i) => (
        <TraitBadge id={t.titleSlug} key={i} trait={t} />
      ))}
    </div>
  );
}
