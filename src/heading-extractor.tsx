import { HTMLAttributes, ReactNode, useContext } from "react";
import { createServerContext } from "./server-context";

interface ExtractedHeading extends HTMLAttributes<HTMLHeadingElement> {
  depth: number;
}

const HeaderExtractor = createServerContext<{
  headings: ExtractedHeading[] | null;
}>("HeaderExtractor", { headings: null });

export function useIsExtractingHeaders() {
  return useContext(HeaderExtractor).headings !== null;
}

export function useHeader(heading: ExtractedHeading) {
  const { headings } = useContext(HeaderExtractor);
  headings?.push(heading);
}

export function gatherHeadings(page: ReactNode) {
  const headings: ExtractedHeading[] = [];
  const { renderToStaticNodeStream } = require("react-dom/server");
  renderToStaticNodeStream(
    <HeaderExtractor.Provider value={{ headings }}>
      {page}
    </HeaderExtractor.Provider>
  );
  return headings;
}
