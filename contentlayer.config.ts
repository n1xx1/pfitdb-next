import {
  ComputedFields,
  defineDocumentType,
  FieldDefs,
  makeSource,
} from "contentlayer2/source-files";
import * as hast from "hast";
import { toText } from "hast-util-to-text";
import "mdast-util-mdx";
import { MdxJsxFlowElement, MdxJsxTextElement } from "mdast-util-mdx";
import {
  extendedTableHandlers,
  remarkExtendedTable,
} from "remark-extended-table";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import rehypeSlug from "./src/markdown/rehype-plugin-slug";
import remarkIcons from "./src/markdown/remark-plugin-icons";
import { getSlugOrder, parseTitle } from "./src/utils";

function getPageSlugFromFlattenedPath(path: string) {
  const parts = path.split(/\//g);
  if (parts[parts.length - 1] === "_index") {
    parts.splice(parts.length - 1, 1);
  }
  return parts;
}

function defineBaseComputedFields<DefName extends string = string>() {
  return {
    titleSlug: {
      type: "string",
      resolve: (doc) => {
        const titleSlug = (doc._raw as any).titleSlug;
        if (titleSlug) {
          return titleSlug;
        }

        const slug = getPageSlugFromFlattenedPath(doc._raw.flattenedPath);
        return slug[slug.length - 1];
      },
    },
    title: {
      type: "{ name: string; type?: string; level?: string }" as any,
      resolve: (doc) => {
        const title = doc.body.raw.match(/\s*(---[\s\S]*?---\s*)?# (.*)/)?.[2];
        if (title) {
          return parseTitle(title);
        }
        const slug = getPageSlugFromFlattenedPath(doc._raw.flattenedPath);
        return { name: slug[slug.length - 1] };
      },
    },
    headings: {
      type: "ReadonlyArray<{ id: string; depth: number; contents: string }>" as any,
      resolve: (doc) => (doc._raw as any).headings ?? [],
    },
    url_: {
      type: "string",
      resolve: (doc) => {
        if (doc.url) {
          return doc.url;
        }
        const parts = getPageSlugFromFlattenedPath(doc._raw.flattenedPath);
        return parts.map((p) => p.replace(/^\d+-(.*)$/, "$1")).join("/");
      },
    },
    order_: {
      type: "number",
      resolve: (doc) => {
        if (doc.order) {
          return doc.order;
        }
        const parts = getPageSlugFromFlattenedPath(doc._raw.flattenedPath);
        return getSlugOrder(parts[parts.length - 1]);
      },
    },
  } as ComputedFields<DefName>;
}

function defineBaseFields() {
  return {
    url: { type: "string" },
    order: { type: "number" },
    disablePrevious: { type: "boolean", default: false },
    disableNext: { type: "boolean", default: false },
  } as FieldDefs;
}

const Trait = defineDocumentType(() => ({
  name: "Trait",
  filePathPattern: "tratti/[^_]*.md",
  contentType: "mdx",
  fields: {
    ...defineBaseFields(),
    categories: {
      type: "list",
      of: { type: "string" },
    },
  },
  computedFields: {
    ...defineBaseComputedFields(),
  },
}));

const Spell = defineDocumentType(() => ({
  name: "Spell",
  filePathPattern: "incantesimi/[^_]*.md",
  contentType: "mdx",
  fields: {
    ...defineBaseFields(),
    traits: { type: "list", of: { type: "string" } },
    traditions: { type: "list", of: { type: "string" } },
  },
  computedFields: {
    ...defineBaseComputedFields(),
  },
}));

const Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: "**/*.md",
  contentType: "mdx",
  fields: {
    ...defineBaseFields(),
  },
  computedFields: {
    ...defineBaseComputedFields(),
  },
}));

function rehypeRemoveTitle() {
  return (root: hast.Root, vfile: any) => {
    const heading = root.children.find(
      (x): x is hast.Element => x.type === "element" && x.tagName === "h1",
    );
    if (heading) {
      if (vfile.data?.rawDocumentData) {
        vfile.data.rawDocumentData.titleSlug = heading.properties?.id ?? "";
      }
      root.children.splice(root.children.indexOf(heading), 1);
    }
  };
}

function rehypeHeadings() {
  const hs = ["h1", "h2", "h3", "h4", "h5", "h6"];
  return (root: any, vfile: any) => {
    const headingList: any[] = [];
    visit(root, "element", (node: hast.Element) => {
      if (!hs.includes(node.tagName)) return;

      const heading: any = {
        id: node.properties?.id ?? "",
        depth: +node.tagName.substring(1),
        contents: toText(node),
      };
      headingList.push(heading);
    });

    if (vfile.data?.rawDocumentData) {
      vfile.data.rawDocumentData.headings = headingList;
    }
  };
}

function rehypeTransformText(t: string) {
  return parseTitle(t).name.replaceAll("'", " ");
}

function remarkPassJsxContext() {
  return (root: any, vfile: any) => {
    visit(
      root,
      ["mdxJsxFlowElement", "mdxJsxTextElement"],
      (node: MdxJsxFlowElement | MdxJsxTextElement) => {
        node.attributes.push({
          type: "mdxJsxAttribute",
          name: "parentProps",
          value: {
            type: "mdxJsxAttributeValueExpression",
            value: "props",
            data: {
              estree: {
                type: "Program",
                body: [
                  {
                    type: "ExpressionStatement",
                    expression: { type: "Identifier", name: "props" },
                  },
                ],
                sourceType: "module",
                comments: [],
              },
            },
          },
        });
      },
    );
  };
}

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Trait, Spell, Doc],
  onExtraFieldData: "ignore",
  mdx: {
    remarkPlugins: [
      remarkGfm,
      remarkExtendedTable,
      remarkIcons,
      remarkPassJsxContext,
    ],
    rehypePlugins: [
      [rehypeSlug, { transformText: rehypeTransformText }],
      rehypeHeadings,
      rehypeRemoveTitle,
    ],
    mdxOptions: ({ remarkRehypeOptions, ...options }) => ({
      ...options,
      remarkRehypeOptions: {
        ...remarkRehypeOptions,
        handlers: Object.assign(
          remarkRehypeOptions?.handlers ?? {},
          extendedTableHandlers,
        ),
      },
    }),
    esbuildOptions: (options, frontmatter) => ({
      ...options,
      minify: false,
    }),
    globals: {},
  },
});
