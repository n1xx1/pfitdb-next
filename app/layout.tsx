import { Inter } from "@next/font/google";
import { cx } from "cva";
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
      className={cx(
        inter.variable,
        "[--scroll-mt:9.875rem] lg:[--scroll-mt:6.3125rem]"
      )}
    >
      <head />
      <body>{children}</body>
    </html>
  );
}
