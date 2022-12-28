import { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { Root, Text, PhrasingContent } from "mdast";
import { MdxJsxTextElement } from "mdast-util-mdx";

const regexIcon = /:(a|1|aa|2|aaa|3|r|f|g):/g;

const iconMap: Record<string, string> = {
  a: "A",
  "1": "A",
  aa: "AA",
  "2": "AA",
  aaa: "AAA",
  "3": "AAA",
  r: "R",
  f: "F",
  g: "F",
};

function remarkIcons(options = {}) {
  return (tree: Root) => {
    visit(
      tree as any,
      "text",
      (node: Text, index, parent: { children: PhrasingContent[] }) => {
        const m = node.value.split(regexIcon, 3);
        if (m.length !== 3) {
          return "skip";
        }

        const [before, icon, after] = m;
        const replace: PhrasingContent[] = [];

        if (before.length > 0) {
          replace.push({ type: "text", value: before });
        }
        replace.push({
          type: "mdxJsxTextElement",
          name: iconMap[icon],
          children: [],
          attributes: [],
        });
        if (after.length > 0) {
          replace.push({ type: "text", value: after });
        }
        parent.children.splice(index!, 1, ...replace);
        return index;
      }
    );
  };
}

export default remarkIcons as Plugin<[{}?] | Array<void>, Root>;
