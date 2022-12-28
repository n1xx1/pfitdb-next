import { PhrasingContent, Root, Text } from "mdast";
import { Plugin } from "unified";
import { visit } from "unist-util-visit";

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
        const regexIcon = /:(a|1|aa|2|aaa|3|r|f|g):/g;
        const parts = node.value.split(regexIcon);
        if (parts.length < 3) {
          return "skip";
        }

        const replace: PhrasingContent[] = [];
        for (let i = 0; i < parts.length - 1; i += 2) {
          if (parts[i].length > 0) {
            replace.push({ type: "text", value: parts[i] });
          }
          replace.push({
            type: "mdxJsxTextElement",
            name: iconMap[parts[i + 1]],
            children: [],
            attributes: [],
          });
        }

        if (parts[parts.length - 1].length > 0) {
          replace.push({ type: "text", value: parts[parts.length - 1] });
        }

        parent.children.splice(index!, 1, ...replace);
        return index;
      }
    );
  };
}

export default remarkIcons as Plugin<[{}?] | Array<void>, Root>;
