import { Inter } from "@next/font/google";
import clsx from "clsx";
import Link from "next/link";
import { IconGithub } from "src/components/icons";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(
        inter.variable,
        "[--scroll-mt:9.875rem] lg:[--scroll-mt:6.3125rem]"
      )}
    >
      <head />
      <body>
        <div>
          <div className="supports-backdrop-blur:bg-white/60 sticky top-0 z-40 w-full flex-none bg-white/95 backdrop-blur transition-colors duration-500  lg:z-50 lg:border-b lg:border-slate-900/10">
            <div className="mx-auto max-w-8xl">
              <div className="mx-4 border-b border-slate-900/10 py-4  lg:mx-0 lg:border-0 lg:px-8">
                <div className="relative flex items-center">
                  <Link href="/" className="font-medium hover:text-sky-500">
                    PFDBIT
                  </Link>
                  <div className="relative ml-auto hidden items-center lg:flex">
                    <a
                      href="https://github.com/tailwindlabs/tailwindcss"
                      className="ml-6 block text-slate-400 hover:text-slate-500"
                    >
                      <span className="sr-only">PFITDB on GitHub</span>
                      <IconGithub className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-8xl px-4 sm:px-6 md:px-8">
            <div className="fixed inset-0 top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto z-20 hidden w-[19.5rem] overflow-y-auto px-8 pb-10 lg:block"></div>
            <div className="lg:pl-[19.5rem]">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
