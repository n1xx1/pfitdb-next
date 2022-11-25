import { Inter } from "@next/font/google";
import clsx from "clsx";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
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
        <div>{children}</div>
      </body>
    </html>
  );
}
