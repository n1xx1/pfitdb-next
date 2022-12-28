import IconBookPile from "assets/icons/book-pile.svg";
import IconCrystalWand from "assets/icons/crystal-wand.svg";
import IconGuardedTower from "assets/icons/guarded-tower.svg";
import IconHood from "assets/icons/hood.svg";
import IconLift from "assets/icons/lift.svg";
import Link from "next/link";
import { ReactNode } from "react";

export function Sidebar() {
  return (
    <nav className="relative lg:text-sm lg:leading-6">
      <ul className="pt-8">
        <SidebarCategory
          name="Stirpi"
          icon={<IconHood className="h-6 w-6 p-1" />}
          href="/stirpi"
        />
        <SidebarCategory
          name="Background"
          icon={<IconGuardedTower className="h-6 w-6 p-1" />}
          href="/background"
        />
        <SidebarCategory
          name="Classi"
          icon={<IconLift className="h-6 w-6 p-1" />}
          href="/classi"
        />
        <SidebarCategory
          name="Regole"
          icon={<IconBookPile className="h-6 w-6 p-1" />}
          href="/regole"
        />
        <SidebarCategory
          name="Incantesimi"
          icon={<IconCrystalWand className="h-6 w-6 p-1" />}
          href="/incantesimi"
        />
      </ul>
    </nav>
  );
}

type SidebarCategoryProps = {
  icon: ReactNode;
  name: string;
  href: string;
};

export function SidebarCategory({ icon, name, href }: SidebarCategoryProps) {
  return (
    <li>
      <Link
        href={href}
        className="group mb-4 flex items-center font-semibold lg:text-sm lg:leading-6"
      >
        <div className="mr-4 rounded-md text-slate-400 shadow-sm ring-1 ring-slate-900/5 group-hover:text-slate-700 group-hover:shadow group-hover:ring-slate-900/10">
          {icon}
        </div>
        {name}
      </Link>
    </li>
  );
}
