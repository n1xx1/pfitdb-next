import { DocumentTypes } from "contentlayer2/generated";
import { cache, createServerContext } from "react";

const pageContext = cache(() => ({ page: null as null | DocumentTypes }));

export function useCurrentPage(): null | DocumentTypes {
  return pageContext().page;
}

export function useSetCurrentPage(page: DocumentTypes): void {
  pageContext().page = page;
}
