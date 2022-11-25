import { Heading } from "src/components/mdx/heading";
import { DocumentPage } from "src/components/page";

export default function NotFound() {
  return (
    <DocumentPage
      breadcrumbs={[]}
      content={
        <>
          <div className="prose prose-slate relative max-w-none">
            <Heading depth={1}>Not Found</Heading>
          </div>
        </>
      }
      headings={[]}
    />
  );
}
