"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SheetClose } from "./ui/sheet";

interface Item {
  imgURL: string;
  route: string;
  label: string;
}

interface Props {
  item: Item;
  isMobile?: boolean;
}

const SidebarLink = ({ item, isMobile = false }: Props) => {
  const pathName = usePathname();
  const isActive =
    pathName === item.route || item.route !==  "/" && pathName.startsWith(`${item.route}`)
      ? true
      : false;

  return (
    <>
      {isMobile ? (
        <SheetClose asChild>
          <Link
            href={item.route}
            className={cn("mobilenav-sheet_close w-full", {
              "bg-bank-gradient": isActive,
            })}
          >
            <div className="relative size-6">
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={cn({
                  "brightness-[3] invert-0": isActive,
                })}
              />
            </div>
            <p
              className={cn("text-16 font-semibold text-black-2", {
                "text-white": isActive,
              })}
            >
              {item.label}
            </p>
          </Link>
        </SheetClose>
      ) : (
        <Link
          href={item.route}
          className={cn("sidebar-link", { "bg-bank-gradient": isActive })}
        >
          <div className="relative size-6">
            <Image
              src={item.imgURL}
              alt={item.label}
              fill
              className={cn({ "brightness-[3] invert-0": isActive })}
            />
          </div>
          <p className={cn("sidebar-label", { "!text-white": isActive })}>
            {item.label}
          </p>
        </Link>
      )}
    </>
  );
};

export default SidebarLink;
