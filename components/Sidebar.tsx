import { sidebarLinks } from "@/constants";
import SidebarLink from "./SidebarLink";
import LogoLink from "./LogoLink";
import Footer from "./Footer";

const Sidebar = ({ user }: SiderbarProps) => {
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <LogoLink />
        {sidebarLinks.map((item) => (
          <SidebarLink key={item.label} item={item} />
        ))}
        USER
      </nav>
      <Footer user={user} />
    </section>
  );
};

export default Sidebar;
