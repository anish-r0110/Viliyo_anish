import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ReactElement } from "react";

interface IMenuProps {
  title: string;
  icon: string;
  href: string;
}

const Menu = ({ title, icon, href }: IMenuProps): ReactElement => {
  const pathname = usePathname();
  const isActive = pathname?.startsWith(href);

  return (
    <>
      <Link
        id={title.toLowerCase() + "-" + "menu"}
        href={href}
        className={`inline-flex justify-center p-5 content-between flex-col text-white hover:bg-app-purple ${
          isActive ? "bg-blue-950 font-semibold" : ""
        }`}
      >
        <Image className="h-5 w-5 self-center" src={icon} alt="Menu Icon" />
        {title}
      </Link>
    </>
  );
}

export default Menu;
