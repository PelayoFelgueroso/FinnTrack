import Image from "next/image";
import Link from "next/link";

const LogoLink = () => {
  return (
    <Link href="/" className="md:mb-12 cursor-pointer flex items-center gap-1 md:gap-2 px-4 md:px-0">
      <Image
        src="/icons/logo.svg"
        width={34}
        height={34}
        alt="FinnTrack Logo"
        className="max-md:size-[24px] max-xl:size-14"
      />
      <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1 sidebar-logo">
        FinnTrack
      </h1>
    </Link>
  );
};

export default LogoLink;
