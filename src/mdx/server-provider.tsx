import { MDXComponents } from "mdx/types";
import { createServerContext, ReactNode, useContext, useMemo } from "react";

export const MDXContext = createServerContext("MDXContext", {});

export function useMDXComponents(
  components?: MDXComponents | ((base: MDXComponents) => MDXComponents)
) {
  const contextComponents = useContext(MDXContext);
  // Memoize to avoid unnecessary top-level context changes
  return useMemo(() => {
    // Custom merge via a function prop
    if (typeof components === "function") {
      return components(contextComponents);
    }

    return { ...contextComponents, ...components };
  }, [contextComponents, components]);
}

interface MDXProviderProps {
  components?: MDXComponents | undefined;
  disableParentContext?: boolean | undefined;
  children?: ReactNode;
}

export function MDXProvider({
  components,
  children,
  disableParentContext,
}: MDXProviderProps) {
  let allComponents = useMDXComponents(components);

  if (disableParentContext) {
    allComponents = components || {};
  }

  return (
    <MDXContext.Provider value={allComponents}>{children}</MDXContext.Provider>
  );
}
