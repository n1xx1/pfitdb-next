import {
  ComputedFields,
  defineDocumentType,
  FieldDefs,
  makeSource,
} from "contentlayer/source-files";
import * as hast from "hast";
import "mdast-util-mdx";
import rehypeSlug, {
  type Options as RehypeSlugOptions,
} from "./src/remark/remark-plugin-slug";
import {
  extendedTableHandlers,
  remarkExtendedTable,
} from "remark-extended-table";
import remarkGfm from "remark-gfm";
import { getSlugOrder, parseTitle } from "./src/utils";

function getPageSlugFromFlattenedPath(path: string) {
  const parts = path.split(/\//g);
  if (parts[parts.length - 1] === "_") {
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
  filePathPattern: "tratti/*.md",
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
      (x): x is hast.Element => x.type === "element" && x.tagName === "h1"
    );
    if (heading) {
      if (vfile.data?.rawDocumentData) {
        vfile.data.rawDocumentData.titleSlug = heading.properties?.id ?? "";
      }
      root.children.splice(root.children.indexOf(heading), 1);
    }
  };
}

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Trait, Doc],
  onExtraFieldData: "ignore",
  mdx: {
    remarkPlugins: [remarkGfm, remarkExtendedTable],
    rehypePlugins: [
      [
        rehypeSlug,
        {
          transformText(t) {
            const { name } = parseTitle(t);
            return name.replaceAll("'", " ");
          },
        } as RehypeSlugOptions,
      ],
      rehypeRemoveTitle,
    ],
    mdxOptions: ({ remarkRehypeOptions, ...options }) => ({
      ...options,
      remarkRehypeOptions: {
        ...remarkRehypeOptions,
        handlers: Object.assign(
          remarkRehypeOptions?.handlers ?? {},
          extendedTableHandlers
        ),
      },
      providerImportSource: "@mdx-js/react",
    }),
    globals: {
      "@mdx-js/react": {
        varName: "MDXJsReact",
        type: "cjs",
      },
    },
  },
});
