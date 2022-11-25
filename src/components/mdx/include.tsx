import { allDocuments } from "contentlayer/generated";
import { Context, useContext } from "react";
import { getMDXComponent } from "../../contentlayer-mdx";
import { createServerContext } from "../../server-context";
import { baseComponents } from "./base";
import { Heading } from "./heading";

export const IncludedContext: Context<{ depth: number }> = createServerContext(
  "IncludedContext",
  { depth: 0 }
);

export interface IncludeProps {
  path: string;
}

export function Include({ path }: IncludeProps) {
  const doc = allDocuments.find(
    (x) => x.url_ === path || x._raw.flattenedPath === path
  );
  if (!doc) {
    return (
      <div className="my-4 bg-red-400 p-2">
        <div className="font-bold">Not Found!</div>
        <div className="font-mono">{path}</div>
      </div>
    );
  }

  const ctx = useContext(IncludedContext);
  const depth = (ctx?.depth ?? 0) + 1;
  const MDXContent = getMDXComponent(doc.body.code);
  return (
    <IncludedContext.Provider value={{ depth: depth }}>
      <Heading depth={1} id={doc.titleSlug}>
        {doc.title.name}
      </Heading>
      <MDXContent components={baseComponents} />
    </IncludedContext.Provider>
  );
}
