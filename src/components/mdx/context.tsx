import { DocumentTypes } from "contentlayer/generated";
import { createServerContext } from "react";

export type PageContextInstance = {
  page: DocumentTypes;
};

export const PageContext = createServerContext<null | PageContextInstance>(
  "page_context",
  null
);
