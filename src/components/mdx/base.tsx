import { MDXComponents } from "mdx/types";
import { Heading } from "./heading";
import { Include } from "./include";
import { A, AA, AAA, R, F } from "./pf2";
import { Resource, ResourceList } from "./resources";
import { SafeLink } from "./safe-link";
import { TraitList } from "./trait-list";

export const baseComponents: MDXComponents = {
  TraitList,
  Include,
  h1: ({ ...props }) => <Heading depth={1} {...props} />,
  h2: ({ ...props }) => <Heading depth={2} {...props} />,
  h3: ({ ...props }) => <Heading depth={3} {...props} />,
  h4: ({ ...props }) => <Heading depth={4} {...props} />,
  h5: ({ ...props }) => <Heading depth={5} {...props} />,
  h6: ({ ...props }) => <Heading depth={6} {...props} />,
  a: ({ ref, ...props }) => <SafeLink {...props} />,
  A,
  AA,
  AAA,
  R,
  F,
  ResourceList,
  Resource,
};

export const statblockComponents: MDXComponents = {
  TraitList,
  Include,
  a: ({ ref, ...props }) => <SafeLink {...props} />,
  p: ({ ...props }) => <p className="my-2" {...props} />,
  hr: ({ ...props }) => <hr className="my-2" {...props} />,
  A,
  AA,
  AAA,
  R,
  F,
};
