import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SidebarLink from "./SidebarLink";

const Sidebar = ({ user }: SiderbarProps) => {
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="FinnTrack Logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">FinnTrack</h1>
        </Link>
        {sidebarLinks.map((item) => (
          <SidebarLink key={item.label} item={item} />
        ))}
        USER
      </nav>
      FOOTER
    </section>
  );
};

export default Sidebar;
