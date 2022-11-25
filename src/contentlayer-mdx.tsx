import type { MDXComponents } from "mdx/types";
import React from "react";
import ReactDOM from "react-dom";
import { useMDXComponents } from "./mdx/server-provider";

const _jsx_runtime = require("react/jsx-runtime");

type MDXContentProps = {
  [props: string]: unknown;
  components?: MDXComponents;
};

export function getMDXComponent(
  code: string,
  globals: Record<string, unknown> = {}
): React.ComponentType<MDXContentProps> {
  const scope = {
    React: {
      ...React,
    },
    ReactDOM,
    MDXJsReact: { useMDXComponents },
    _jsx_runtime,
    ...globals,
  };

  const fn = new Function(...Object.keys(scope), code);
  return fn(...Object.values(scope))?.default ?? NullComponent;
}

function NullComponent({}: {}) {
  return null;
}
