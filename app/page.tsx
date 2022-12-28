import { A, AA, AAA, F, R } from "@/components/mdx/pf2";
import { Heading } from "src/components/mdx/heading";
import { DocumentPage } from "src/components/page";

export default function NotFound() {
  return (
    <DocumentPage
      breadcrumbs={[]}
      headings={[]}
      content={
        <>
          <div className="prose prose-slate relative max-w-none">
            <Heading depth={1}>PFITDB</Heading>
            <p>
              <b>
                Lancio <A className="bg-red-500 " /> verbale
              </b>
            </p>
            <p>
              <b>
                Lancio <AA className="bg-red-500 " /> somatico, verbale
              </b>
            </p>
            <p>
              <b>
                Lancio <AAA className="bg-red-500 " /> somatico, verbale
              </b>
            </p>
            <p>
              <b>
                Lancio <F className="bg-red-500 " /> somatico, verbale
              </b>
            </p>
            <p>
              <b>
                Lancio <R className="bg-red-500 " /> somatico, verbale
              </b>
            </p>
          </div>
        </>
      }
    />
  );
}
