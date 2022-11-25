import clsx from "clsx";
import { allDocuments } from "contentlayer/generated";
import Link from "next/link";
import { Fragment } from "react";
import { IconChevronLeft, IconChevronRight } from "src/components/icons";
import { baseComponents } from "src/components/mdx/base";
import { Heading } from "src/components/mdx/heading";
import { getMDXComponent } from "src/contentlayer-mdx";
import { getNextTraverse, getPreviousTraverse } from "src/contentlayer-utils";
import { gatherHeadings } from "src/heading-extractor";

export async function generateStaticParams() {
  return allDocuments.map((doc) => ({
    slug: doc.url_.split(/\//g),
  }));
}

export default function Page({ params, searchParams }: any) {
  const realSlug = params.slug.join("/");
  const doc = allDocuments.find((x) => x.url_ === realSlug);

  if (!doc) {
    return <>Not found</>;
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
  const previousPage = getPreviousTraverse(doc);
  const nextPage = getNextTraverse(doc);

  return (
    <div className="mx-auto max-w-3xl pt-10 xl:ml-0 xl:mr-[15.5rem] xl:max-w-none xl:pr-16">
      <div className="relative z-20">
        <div className="prose prose-slate relative max-w-none">
          <Heading depth={1} id={doc.titleSlug}>
            {doc.title.name}
          </Heading>
          <MDXContent components={baseComponents} />
        </div>
        <div className="my-8 flex gap-2">
          <div className="flex-1">
            {!!previousPage && (
              <Link
                href={`/${previousPage.url_}`}
                className="group block rounded-md border-2 border-slate-400 p-3 text-left hover:border-slate-600"
              >
                <div className="text-sm font-semibold text-slate-400  group-hover:text-slate-600">
                  Precedente
                </div>
                <div className="flex items-center justify-start text-slate-400  group-hover:text-slate-600">
                  <IconChevronLeft className="mr-2 h-1.5 w-auto overflow-visible text-slate-400 group-hover:text-slate-600" />
                  {previousPage.title.name ?? "null"}
                </div>
              </Link>
            )}
          </div>
          <div className="flex-1">
            {!!nextPage && (
              <Link
                href={`/${nextPage.url_}`}
                className="group block rounded-md border-2 border-slate-400 p-3 text-right hover:border-slate-600"
              >
                <div className="text-sm font-semibold text-slate-400  group-hover:text-slate-600">
                  Successivo
                </div>
                <div className="flex items-center justify-end text-slate-400  group-hover:text-slate-600">
                  {nextPage.title.name ?? "null"}
                  <IconChevronRight className="ml-2 h-1.5 w-auto overflow-visible" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="fixed top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-45rem))] z-20 hidden w-[19.5rem] overflow-y-auto py-10 xl:block">
        <div className="px-8">
          <ul className="text-sm leading-6 text-slate-700">
            {headings
              .filter((h) => h.depth <= 3)
              .map((h, i) => (
                <li
                  key={i}
                  className={["", "", "ml-4", "ml-8", "ml-12"][h.depth] ?? ""}
                >
                  <a
                    href={`#${h.id}`}
                    className={clsx("block py-1 hover:text-slate-900", {
                      "font-medium": h.depth <= 1,
                    })}
                  >
                    {h.children}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
