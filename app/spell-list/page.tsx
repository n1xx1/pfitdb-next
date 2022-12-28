import { PageHeading } from "@/components/page-heading";
import { Traits } from "@/components/traits";
import { allSpells, Spell } from "contentlayer/generated";
import { getMDXComponent } from "@/contentlayer-mdx";
import { statblockComponents } from "@/components/mdx/base";
import { cx } from "cva";

export default function Page({
  searchParams,
}: {
  searchParams?: Record<string, string | string[]>;
}) {
  const pages = (
    Array.isArray(searchParams?.pages)
      ? searchParams!.pages
      : searchParams?.pages
      ? [searchParams.pages]
      : []
  ).flatMap((x) => x.split(/\s*,\s*/g));

  return (
    <div className="columns-2 gap-10 p-4" style={{ zoom: 0.7 }}>
      {pages.map((id) => {
        const url = `incantesimi/${id}`;
        const spell = allSpells.find((x) => url === x.url_);
        if (!spell) {
          return (
            <div key={id} className="break-inside-avoid pb-8">
              Not found: {id}
            </div>
          );
        }
        return (
          <div key={spell.url_} className="break-inside-avoid pb-8">
            <Spell spell={spell} />
          </div>
        );
      })}
    </div>
  );
}

interface SpellProps {
  spell: Spell;
}

function Spell({ spell }: SpellProps) {
  const MDXContent = getMDXComponent(spell.body.code);

  return (
    <>
      <PageHeading title={spell.title} id={spell.titleSlug} isStatblock />
      <Traits traits={spell.traits ?? []} />
      <hr />
      <MDXContent components={statblockComponents} />
    </>
  );
}
