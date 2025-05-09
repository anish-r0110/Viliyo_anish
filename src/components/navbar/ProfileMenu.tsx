import Icon from "@/assets/icons";
import logoutConfirmationDailouge from "@/services/Logout";
import { RootState } from "@/store";
import { Box, Popover } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import { useSelector } from "react-redux";
import VERSION from "@/config/version";
import calculateFilledPercentage from "@/utils/calculateFilledPercentage";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import ProfileProgressBar from "./ProfileProgressBar";
import { IconType } from "react-icons";

interface MenuItem {
    name: string;
    href: string;
    description?: string;
    icon: IconType;
    arrow: any;
  }

interface Props {
    menus: MenuItem[];
}


const ProfileMenu: React.FC<Props> = ({ menus }) => {

    const router = useRouter();
  
    const { user } = useSelector(( state:RootState ) => state.auth )
    
    const extraMenus = [
      {
        name: "Terms of Service",
        description: "Terms of Service",
        href: "terms-services",
        icon: HiOutlineClipboardCheck,
        arrow: <MdOutlineArrowForwardIos />,
      },
    ];
  
    
  
  
    const confirmation = () => {
      localStorage.clear();
      router.push("/login");
    }
  
    return (
      <Box className="bg-white h-full">
        <div className="flex m-2 w-42 h-30 space-x-6 px-4">
          {user && (
            <>
              <div className="mx-0">
                <ProfileProgressBar
                  avatarUrl={user.profileImage as string}
                  profileCompletion={calculateFilledPercentage( user) }
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-zinc-600">{user?.name}</h1>
                {user && (
                  <p className="text-app-blue font-medium text-sm">
                    Your profile is {calculateFilledPercentage( user)}% complete
                  </p>
                )}
              </div>
            </>
          )}
        </div>
        <div className="mb-2">
          <hr className="bg-app-gray h-[0.5px]"></hr>
        </div>
        <ul className="space-y-2 px-4">
          {menus.map((menu) => (
            <li key={menu.name}>
              <Popover.Close>
              <Link
                href={menu.href}
                className="flex cursor-pointer hover:scale-105 hover:bg-app-purple p-1.5 rounded-lg items-center justify-between text-right"
              >
                <span className="w-8 h-8  bg-purple-200 rounded p-2 ">
                  <menu.icon className="w-4 h-4"></menu.icon>
                </span>
  
                <div className="w-40 ml-5 text-left">
                  <span className="text-gray-900">{menu.name}</span>
                </div>
  
                <MdOutlineArrowForwardIos />
              </Link>
              </Popover.Close>
            </li>
          ))}
        </ul>
  
        <div className="mb-2">
          <hr className="bg-app-gray h-[0.5px]"></hr>
        </div>
  
        <ul className="space-y-2 px-4">
          {extraMenus.map((menu) => (
            <li
              key={menu.name}
            >
               <Popover.Close>
          <Link className="flex cursor-pointer hover:scale-105 hover:bg-purple-100 p-1.5 rounded-lg items-center justify-between text-right" href={menu.href}>
              <span className="w-8 h-8  bg-purple-200 rounded p-2 ">
                <menu.icon className="w-4 h-4"></menu.icon>
              </span>
             
              <div className="w-40 ml-5 text-left">
                  {menu.name}
              </div>
            
  
              <MdOutlineArrowForwardIos />
                </Link>
                </Popover.Close>
            </li>
          ))}
          <li className="">
          <Popover.Close>
          <Link className="flex cursor-pointer hover:scale-105 hover:bg-app-purple p-1.5 rounded-lg items-center justify-between text-right" href="/about">
            <Image src={Icon.vtt} alt={"About Vtt Icon"}></Image>
           
            <div className="w-40 ml-5 text-left">
                About ( { VERSION } )
            </div>
          
  
            <MdOutlineArrowForwardIos />
              </Link>
            </Popover.Close>
          </li>
        </ul>
  
        <div>
          <div className="my-2">
            <hr className="bg-app-gray h-[0.5px]"></hr>
          </div>
        <Popover.Close>
          <Link className="font-bold text-app-blue px-4 text-base" href="#" onClick={() => logoutConfirmationDailouge( confirmation )}>
            Log out
          </Link>
        </Popover.Close>
        </div>
      </Box>
    );
  };

  export default ProfileMenu