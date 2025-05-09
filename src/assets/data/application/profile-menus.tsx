import { IPopoverMenuItem } from "@/components/buttons/PopoverButton";
import { BsChatHeart, BsPerson, BsQuestionCircle } from "react-icons/bs";
import { AiOutlineSetting, AiOutlineIdcard } from "react-icons/ai";
import { HiOutlineClipboardCheck, HiOutlineLogout } from "react-icons/hi";
import { MdOutlineArrowForwardIos } from "react-icons/md";

export const profileMenus = [
  {
    name: "Profile",
    description: "Get a better understanding of your traffic",
    href: "/profile",
    icon: BsPerson,
    arrow: <MdOutlineArrowForwardIos />,
  },
  {
    name: "Queries",
    description: "Speak directly to your customers",
    href: "/queries",
    icon: BsQuestionCircle,
    arrow: <MdOutlineArrowForwardIos />,
  },
  {
    name: "Visiting Card",
    description: "Your customers' data will be safe and secure",
    href: "visting-card",
    icon: AiOutlineIdcard,
    arrow: <MdOutlineArrowForwardIos />,
  },
  {
    name: "Settings",
    description: "Connect with third-party tools",
    href: "settings",
    icon: AiOutlineSetting,
    arrow: <MdOutlineArrowForwardIos />,
  },
];
