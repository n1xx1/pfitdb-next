import { getChildren } from "@/contentlayer-utils";
import Link from "next/link";
import { ReactNode, useContext } from "react";
import { Traits } from "../traits";
import { PageContext } from "./context";

export interface TableProps {
  children?: ReactNode;
  className?: string;
  columns?: { key: string; name: ReactNode }[];
}

export function Table({ columns, className, children }: TableProps) {
  const ctx = useContext(PageContext);
  const items = getChildren(ctx!.page);

  return (
    <table>
      <thead>
        <tr>
          <td>Nome</td>
          {columns?.map((c) => (
            <td key={c.key}>{c.name}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((p, i) => (
          <tr key={i}>
            <td>
              <Link href={p.url_}>{p.title.name}</Link>
            </td>
            {columns?.map((c) => (
              <td key={c.key}>
                {c.key === "level" ? (
                  <>{p.title.level}</>
                ) : c.key === "traditions" && "traditions" in p ? (
                  p.traditions?.map((t) => traditionsMap[t] ?? t).join(", ") ??
                  ""
                ) : c.key === "traits" && "traits" in p ? (
                  <Traits className="not-prose" traits={p.traits ?? []} />
                ) : (
                  ""
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const traditionsMap: Record<string, ReactNode> = {
  arcana: "Arcana",
  occulta: "Occulta",
  primeva: "Primeva",
  divina: "Divina",
};
