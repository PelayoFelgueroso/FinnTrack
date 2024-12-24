import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import SidebarLink from "./SidebarLink";
import { sidebarLinks } from "@/constants";
import LogoLink from "./LogoLink";
import Footer from "./Footer";

const MobileNavbar = ({ user }: MobileNavProps) => {
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white">
          
          <LogoLink />

          <div className="mobilenav-sheet">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((item) => (
                  <SidebarLink key={item.label} item={item} isMobile={true} />
                ))}
                USER
              </nav>
            </SheetClose>
            <Footer user={user} type="mobile" />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNavbar;
