import { createServerContext } from "@/server-context";
import { DocumentTypes } from "contentlayer/generated";

export type PageContextInstance = {
  page: DocumentTypes;
};

export const PageContext = createServerContext<null | PageContextInstance>(
  "page_context",
  null
);
