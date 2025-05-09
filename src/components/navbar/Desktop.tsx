import { profileMenus } from "@/assets/data/application/profile-menus";
import Icon from "@/assets/icons";
import { RootState } from "@/store";
import { Avatar, Popover } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import ProfileMenu from "./ProfileMenu";
import Menu from "./Menu";
import SearchBar from "./SearchBar";
import { BsBell } from "react-icons/bs";
import Notifications from "../notifications/Notification";

const DesktopNavBar = () => {
 
    const { user } = useSelector((state:RootState) => state.auth)
    const { totalUnread } = useSelector((state:RootState)=> state.notification)
      
    return (
      <div className="h-16 w-full flex px-10">
        <div className="w-full flex space-x-16">
          <Link href="/" className="flex">
            <span className="sr-only">Viliyo</span>
            <Image priority src={Icon.logo} alt="Viliyo Logo" />
          </Link>
          <div className="flex space-x-8">
            <Menu href="/dashboard" title="Dashboard" icon={Icon.dashboard} />
            <Menu href="/calendar" title="Calendar" icon={Icon.calendar} />
            <Menu href="/history" title="History" icon={Icon.clock} />
          </div>
        </div>
        <div className="w-full flex flex-row-reverse items-center my-auto space-x-8 space-x-reverse">
          <Popover.Root>
            <Popover.Trigger>
              <div className="w-fit h-fit cursor-pointer">
                <Avatar variant="solid" color="iris" src={user?.profileImage} size="3" fallback={(user?.firstName ? user.firstName.charAt(0) : '') + (user?.lastName ? user.lastName.charAt(0) : '')} ></Avatar>
              </div>
            </Popover.Trigger>
            <Popover.Content style={{ width: 360 }} className="p-0">
              <ProfileMenu menus={profileMenus} />
            </Popover.Content>
          </Popover.Root>
  
          <Popover.Root>
            <Popover.Trigger>
              <div className="flex -space-x-4">
                <BsBell color="white" className={`h-8 w-8`}></BsBell>
                {totalUnread > 0 ? (
                  <div
                    className={`bg-red-600 flex justify-center items-center rounded-full text-xs border border-white  text-white h-5 w-5`}
                  >
                    { totalUnread }
                  </div>
                ) : (
                  <div></div>
                )}
              </div>            
            </Popover.Trigger>
            <Popover.Content style={{ width: 360 }} className="p-0 min-h-[400px] mr-16">
              <Notifications />            
            </Popover.Content>          
          </Popover.Root>
  
          <Link className="text-white" href="../help">
            Help
          </Link>
          <SearchBar />
        </div>
      </div>
    );
  };


export default DesktopNavBar;