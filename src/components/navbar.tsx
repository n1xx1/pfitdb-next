import Link from "next/link";
import { IconGithub } from "./icons";

export function Navbar() {
  return (
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
  );
}
