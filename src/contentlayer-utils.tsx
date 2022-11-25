import { allDocuments, DocumentTypes } from "contentlayer/generated";
import orderBy from "lodash-es/orderBy";
import { getSlugOrder } from "./utils";

class Tree {
  slug: string;
  page: DocumentTypes | null;
  parent: Tree | null;
  children?: Map<string, Tree>;

  constructor(slug: string, parent: Tree | null, page: DocumentTypes | null) {
    this.slug = slug;
    this.parent = parent;
    this.page = page;
  }

  get hasChildren() {
    return !!this.children;
  }

  get sortedChildren() {
    return orderBy(
      [...(this.children?.values() ?? [])].filter((s) => !!s.page),
      [(s) => s.page!.order, (s) => s.page!.title.name],
      ["asc", "asc"]
    );
  }

  get allSortedChildren() {
    return orderBy(
      [...(this.children?.values() ?? [])],
      [(s) => s.page?.order_ ?? 0, (s) => s.page?.title?.name ?? s.slug],
      ["asc", "asc"]
    );
  }

  get previous(): Tree | null {
    const siblings = this.parent?.sortedChildren ?? [];
    return siblings[siblings.indexOf(this) - 1] ?? null;
  }

  get next(): Tree | null {
    const siblings = this.parent?.sortedChildren ?? [];
    return siblings[siblings.indexOf(this) + 1] ?? null;
  }

  get previousAll(): Tree | null {
    const siblings = this.parent?.allSortedChildren ?? [];
    return siblings[siblings.indexOf(this) - 1] ?? null;
  }

  get nextAll(): Tree | null {
    const siblings = this.parent?.allSortedChildren ?? [];
    return siblings[siblings.indexOf(this) + 1] ?? null;
  }

  set(slug: string[], page: DocumentTypes) {
    if (slug.length === 0) {
      this.page = page;
      return;
    }
    let child = this.getChild(slug[0]) ?? this.addChild(slug[0]);
    child.set(slug.slice(1), page);
  }

  get(slug: string[]): Tree | null {
    if (slug.length === 0) return this;
    const subTree = this.children?.get(slug[0]);
    if (subTree) {
      return subTree.get(slug.slice(1));
    }
    return null;
  }

  getChild(s: string) {
    return this.children?.get(s) ?? null;
  }

  addChild(s: string, page?: DocumentTypes) {
    const tree = new Tree(s, this, page ?? null);
    (this.children ??= new Map<string, Tree>()).set(s, tree);
    return tree;
  }
}

function produceTree() {
  const root = new Tree("", null, null);
  for (const page of allDocuments) {
    const slug = page.url_.split("/");
    root.set(slug, page);
  }
  return root;
}

export const root = produceTree();

export function getSiblings(doc: DocumentTypes) {
  const page = root.get(doc.url_.split("/"));
  return page?.parent?.sortedChildren?.map((c) => c.page) ?? [];
}

export function getChildren(doc: DocumentTypes) {
  const page = root.get(doc.url_.split("/"));
  return page?.sortedChildren?.map((c) => c.page) ?? [];
}

export function getParent(doc: DocumentTypes) {
  const page = root.get(doc.url_.split("/"));
  return page?.parent?.page ?? null;
}

export function getNext(doc: DocumentTypes) {
  const page = root.get(doc.url_.split("/"));
  return page?.next?.page ?? null;
}

export function getPrevious(doc: DocumentTypes) {
  const page = root.get(doc.url_.split("/"));
  return page?.previous?.page ?? null;
}

function findFirstChildrenWithPage(page: Tree): Tree | null {
  const children = page.allSortedChildren;
  for (const child of children) {
    if (child.page) {
      return child;
    }
    if (child.hasChildren) {
      const found = findFirstChildrenWithPage(child);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

function pageGetNextTraverse(page: Tree, allowChildren = true): Tree | null {
  let next: Tree | null = page;
  while (next) {
    if (allowChildren) {
      const child = findFirstChildrenWithPage(next);
      if (child) {
        return child;
      }
    }
    next = next.nextAll;
    if (next?.page) {
      return next;
    }
  }

  if (page?.parent && !page.parent.page?.disableNext) {
    return pageGetNextTraverse(page.parent, false);
  }
  return null;
}

// find the first page with contents either in this page children or in the next sibilings
export function getNextTraverse(doc: DocumentTypes) {
  const page = root.get(doc.url_.split("/"));
  if (!page) return null;
  return pageGetNextTraverse(page)?.page ?? null;
}

function findLastChildrenWithPage(page: Tree): Tree | null {
  const children = page.allSortedChildren.reverse();
  for (const child of children) {
    if (child.hasChildren) {
      const found = findLastChildrenWithPage(child);
      if (found) {
        return found;
      }
    }
    if (child.page) {
      return child;
    }
  }
  return null;
}

function pageGetPreviousTraverse(page: Tree): Tree | null {
  if (page.page?.disablePrevious) {
    return null;
  }
  let prev = page.previousAll;
  while (prev) {
    const child = findLastChildrenWithPage(prev);
    if (child) {
      return child;
    }
    if (prev.page) {
      return prev;
    }
    page = prev;
    prev = prev.previousAll;
  }
  if (page.parent) {
    if (page.parent.page) {
      return page.parent;
    }
    return page.parent.page
      ? page.parent
      : pageGetPreviousTraverse(page.parent);
  }
  return null;
}

export function getPreviousTraverse(doc: DocumentTypes) {
  const page = root.get(doc.url_.split("/"));
  if (!page) return null;
  return pageGetPreviousTraverse(page)?.page ?? null;
}

export function getParents(doc: DocumentTypes) {
  let page = root.get(doc.url_.split("/"));
  page = page?.parent ?? null;
  const parents: DocumentTypes[] = [];
  while (page) {
    if (page.page) {
      parents.unshift(page.page);
    }
    page = page.parent;
  }
  return parents;
}
