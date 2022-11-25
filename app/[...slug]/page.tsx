import { allDocuments, DocumentTypes } from "contentlayer/generated";
import Link from "next/link";
import { Fragment } from "react";
import { Button } from "src/components/button";
import { IconChevronLeft, IconChevronRight } from "src/components/icons";
import { baseComponents } from "src/components/mdx/base";
import { Heading } from "src/components/mdx/heading";
import { DocumentPage } from "src/components/page";
import { getMDXComponent } from "src/contentlayer-mdx";
import {
  getNextTraverse,
  getParents,
  getPreviousTraverse,
} from "src/contentlayer-utils";
import { gatherHeadings } from "src/heading-extractor";
import { notFound } from "next/navigation";

// export const dynamicParams = false;

export async function generateStaticParams() {
  return allDocuments.map((doc) => ({
    slug: doc.url_.split(/\//g),
  }));
}

export default function Page({ params, searchParams }: any) {
  const realSlug = params.slug.join("/");
  const doc = allDocuments.find((x) => x.url_ === realSlug);

  if (!doc) {
    notFound();
  }

  const MDXContent = getMDXComponent(doc.body.code);

  const headings = gatherHeadings(
    <>
      <Heading depth={1} id={doc.titleSlug}>
        {doc.title.name}
      </Heading>
      <MDXContent
        components={{
          ...baseComponents,
          a: Fragment,
          TraitList: Fragment,
        }}
      />
    </>
  );

  const parents = getParents(doc).map((p) => ({
    href: p.url_,
    children: p.title.name,
  }));

  return (
    <DocumentPage
      breadcrumbs={[...parents, { href: doc.url_, children: doc.title.name }]}
      content={
        <>
          <div className="prose prose-slate relative max-w-none">
            <Heading depth={1} id={doc.titleSlug}>
              {doc.title.name}
            </Heading>
            <MDXContent components={baseComponents} />
          </div>
          <div className="my-8 flex gap-2">
            <PreviousPageButton doc={doc} />
            <NextPageButton doc={doc} />
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
