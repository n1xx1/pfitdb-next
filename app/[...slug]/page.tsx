import { PageContext } from "@/components/mdx/context";
import { PageHeading } from "@/components/page-heading";
import { Traits } from "@/components/traits";
import { allDocuments, DocumentTypes } from "contentlayer/generated";
import { cx } from "cva";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "src/components/button";
import { IconChevronLeft, IconChevronRight } from "src/components/icons";
import { baseComponents, statblockComponents } from "src/components/mdx/base";
import { DocumentPage } from "src/components/page";
import { getMDXComponent } from "src/contentlayer-mdx";
import {
  getNextTraverse,
  getParents,
  getPreviousTraverse,
} from "src/contentlayer-utils";
import { gatherHeadings } from "src/heading-extractor";

// export const dynamicParams = false;

export async function generateStaticParams() {
  return allDocuments.map((doc) => ({
    slug: doc.url_.split(/\//g),
  }));
}

export function documentIsStatblock(doc: DocumentTypes) {
  return doc.type === "Spell";
}

export default function Page({ params, searchParams }: any) {
  const realSlug = params.slug.join("/");
  const page = allDocuments.find((x) => x.url_ === realSlug);

  if (!page) {
    notFound();
  }

  const isStatblock = documentIsStatblock(page);
  const MDXContent = getMDXComponent(page.body.code);

  const headings = gatherHeadings(
    <>
      <PageHeading
        title={page.title}
        id={page.titleSlug}
        isStatblock={isStatblock}
      />
      <PageContext.Provider value={{ page }}>
        <MDXContent
          components={{
            ...baseComponents,
            a: ({ children }) => <>{children}</>,
            TraitList: ({ children }) => <>{children}</>,
          }}
        />
      </PageContext.Provider>
    </>
  );

  const parents = getParents(page).map((p) => ({
    href: p.url_,
    children: p.title.name,
  }));

  return (
    <DocumentPage
      breadcrumbs={[...parents, { href: page.url_, children: page.title.name }]}
      content={
        <>
          <div
            className={cx(
              "relative",
              !isStatblock && "prose prose-slate max-w-none"
            )}
          >
            <PageHeading
              title={page.title}
              id={page.titleSlug}
              isStatblock={isStatblock}
            />
            {"traits" in page && <Traits traits={page.traits ?? []} />}
            {isStatblock && <hr />}
            <PageContext.Provider value={{ page }}>
              <MDXContent
                components={isStatblock ? statblockComponents : baseComponents}
              />
            </PageContext.Provider>
          </div>
          <div className="my-8 flex gap-2">
            <PreviousPageButton doc={page} />
            <NextPageButton doc={page} />
          </div>
        </>
      }
      headings={headings}
    />
  );
}

export function NextPageButton({ doc }: { doc: DocumentTypes }) {
  const nextPage = getNextTraverse(doc);

  return (
    <div className="flex-1">
      {!!nextPage && (
        <Button
          as={Link}
          href={`/${nextPage.url_}`}
          variant="solid"
          className="group !flex flex-col text-right"
        >
          <div className="text-sm font-semibold">Successivo</div>
          <div className="mt-2 flex items-center justify-end text-gray-400 group-hover:text-gray-700">
            {nextPage.title.name ?? "null"}
            <IconChevronRight className="ml-2 h-1.5 w-auto overflow-visible" />
          </div>
        </Button>
      )}
    </div>
  );
}

export function PreviousPageButton({ doc }: { doc: DocumentTypes }) {
  const previousPage = getPreviousTraverse(doc);

  return (
    <div className="flex-1">
      {!!previousPage && (
        <Button
          as={Link}
          href={`/${previousPage.url_}`}
          variant="solid"
          className="group !flex flex-col text-left"
        >
          <div className="text-sm font-semibold">Precedente</div>
          <div className="mt-2 flex items-center justify-start text-gray-400 group-hover:text-gray-700">
            <IconChevronLeft className="mr-2 h-1.5 w-auto overflow-visible" />
            {previousPage.title.name ?? "null"}
          </div>
        </Button>
      )}
    </div>
  );
}
