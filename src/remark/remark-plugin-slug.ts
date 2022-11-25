import Slugger from "github-slugger";
import { hasProperty } from "hast-util-has-property";
import { headingRank } from "hast-util-heading-rank";
import { toString } from "hast-util-to-string";
import { visit } from "unist-util-visit";
import { Plugin } from "unified";
import { Root } from "hast";

export interface Options {
  prefix?: string;
  transformSlug?: (s: string) => string;
  transformText?: (s: string) => string;
}

const slugs = new Slugger();

function rehypeSlug(options: Options = {}) {
  const prefix = options.prefix || "";

  return (tree: Root) => {
    slugs.reset();

    visit(tree, "element", (node) => {
      if (headingRank(node) && node.properties && !hasProperty(node, "id")) {
        let text = toString(node);
        if (typeof options.transformText === "function") {
          text = options.transformText(text);
        }
        let slug = slugs.slug(text);
        if (typeof options.transformSlug === "function") {
          slug = options.transformSlug(slug);
        }
        node.properties.id = prefix + slug;
      }
    });
  };
}

export default rehypeSlug as Plugin<[Options?] | Array<void>, Root>;
