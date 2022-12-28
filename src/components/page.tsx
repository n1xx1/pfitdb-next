import { cx } from "cva";
import { ReactNode } from "react";
import { Breadcrumb, MobileBreadcrumbs } from "./breadcrumbs";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

interface DocumentPageProps {
  content: ReactNode;
  headings?: { depth: number; id?: string; children?: ReactNode }[];
  breadcrumbs: Breadcrumb[];
}

export function DocumentPage({
  content,
  headings,
  breadcrumbs,
}: DocumentPageProps) {
  return (
    <>
      <div className="supports-backdrop-blur:bg-white/60 sticky top-0 z-40 w-full flex-none bg-white/95 backdrop-blur transition-colors duration-500  lg:z-50 lg:border-b lg:border-slate-900/10">
        <div className="mx-auto max-w-8xl">
          <Navbar />
          <MobileBreadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      </div>
      <div className="mx-auto max-w-8xl px-4 sm:px-6 md:px-8">
        <div className="fixed inset-0 top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto z-20 hidden w-[19.5rem] overflow-y-auto px-8 pb-10 lg:block">
          <Sidebar />
        </div>
        <div className="lg:pl-[19.5rem]">
          <div className="mx-auto max-w-3xl pt-10 xl:ml-0 xl:mr-[15.5rem] xl:max-w-none xl:pr-16">
            <div className="relative z-20">{content}</div>
            <div className="fixed top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-45rem))] z-20 hidden w-[19.5rem] overflow-y-auto py-10 xl:block">
              <div className="px-8">
                <ul className="text-sm leading-6 text-slate-700">
                  {headings
                    ?.filter((h) => h.depth <= 3)
                    ?.map((h, i) => (
                      <li
                        key={i}
                        className={
                          ["", "", "ml-4", "ml-8", "ml-12"][h.depth] ?? ""
                        }
                      >
                        <a
                          href={`#${h.id ?? ""}`}
                          className={cx(
                            "block py-1 hover:text-slate-900",
                            h.depth <= 1 && "font-medium"
                          )}
                        >
                          {h.children}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
