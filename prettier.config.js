module.exports = {
  tabWidth: 2,
  useTabs: false,
  printWidth: 80,
  proseWrap: "always",
  overrides: [{ files: "*.md", options: { parser: "mdx" } }],
  plugins: [require("prettier-plugin-tailwindcss")],
};
