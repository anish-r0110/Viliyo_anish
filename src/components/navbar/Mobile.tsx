import { profileMenus } from "@/assets/data/application/profile-menus";
import Icon from "@/assets/icons";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineCloseCircle, AiOutlineMenu } from "react-icons/ai";
import ProfileMenu from "./ProfileMenu";



const MobileNavBar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
    return (
      <>
        <div className="h-16 w-full flex justify-between px-10">
          <Link href="/" className="flex">
            <span className="sr-only">Viliyo</span>
            <Image priority src={Icon.logo} alt="Viliyo Logo" />
          </Link>
  
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <AiOutlineMenu className="h-6 w-6" />
          </button>
        </div>
  
        <Dialog
          className="relative  z-50"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
  
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full h-full fixed left-0 bg-app-purple-100">
              <ProfileMenu menus={profileMenus}></ProfileMenu>
              <button
                className="h-6 w-6 absolute top-5 right-10"
                onClick={() => setMobileMenuOpen(false)}
              >
                <AiOutlineCloseCircle className="h-12 w-12" />
              </button>
            </Dialog.Panel>
          </div>
        </Dialog>
      </>
    );
  };
  

  export default MobileNavBar