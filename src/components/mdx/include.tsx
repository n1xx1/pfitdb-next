import { allDocuments } from "contentlayer2/generated";
import { getMDXComponent } from "../../contentlayer-mdx";
import { baseComponents } from "./base";
import { Heading } from "./heading";
import { MDXComponents } from "mdx/types";

export interface IncludeProps {
  path: string;
  parentProps: Record<string, unknown>;
}

export function Include({ path, parentProps }: IncludeProps) {
  const doc = allDocuments.find(
    (x) => x.url_ === path || x._raw.flattenedPath === path,
  );
  if (!doc) {
    return (
      <div className="my-4 bg-red-400 p-2">
        <div className="font-bold">Not Found!</div>
        <div className="font-mono">{path}</div>
      </div>
    );
  }

  const depth = (parentProps.depth as number) ?? 0;
  const MDXContent = getMDXComponent(doc.body.code);

  return (
    <>
      <Heading depth={1} id={doc.titleSlug}>
        {doc.title.name}
      </Heading>
      <MDXContent
        components={{
          ...(parentProps.components as MDXComponents),
          ...baseComponents,
        }}
        depth={depth + 1}
      />
    </>
  );
}
