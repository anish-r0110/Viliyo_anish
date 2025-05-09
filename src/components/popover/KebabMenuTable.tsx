// Import your KebabMenu component
import JoinGroupIcon from "@/assets/icons/joinGroup.svg"; // Import SVG icons
import BadgeIcon from "@/assets/icons/badge.svg"; // Import SVG icons
import MergeGroupIcon from "@/assets/icons/mergeGroup.svg"; // Import SVG icons
import AskToJoin from "@/assets/icons/askToJoin.svg"; // Import SVG icons
import SpotlightGroup from "@/assets/icons/spolightGroup.svg";
import Image from "next/image"; // Import next/Image component
import { useState } from "react";
import KebabMenu from "../classroom/components/backup/KebabMenu";

const KebabMenuTable = () => {
  const [isMenuVisible, setMenuVisible] = useState(false); // State to manage menu visibility

  // Array of menu items
  const menuItems = [
    {
      Icon: (
        <Image src={JoinGroupIcon} alt="Menu Icon" width={20} height={20} />
      ),
      Id: 1,
      Title: "Join Group",
      onClick: () => {
        console.log("Join Group Clicked");
      },
    },
    {
      Icon: <Image src={BadgeIcon} alt="Menu Icon" width={20} height={20} />,
      Id: 2,
      Title: "Give a Badge",
      onClick: () => {
        console.log("Give a Badge Clicked");
      },
    },
    {
      Icon: (
        <Image src={SpotlightGroup} alt="Menu Icon" width={20} height={20} />
      ),
      Id: 3,
      Title: "Spotlight Group",
      onClick: () => {
        console.log("Spotlight Group Clicked");
      },
    },
    {
      Icon: (
        <Image src={MergeGroupIcon} alt="Menu Icon" width={20} height={20} />
      ),
      Id: 4,
      Title: "Merge Groups",
      onClick: () => {
        console.log("Merge Groups Clicked");
      },
    },
    {
      Icon: <Image src={AskToJoin} alt="Menu Icon" width={20} height={20} />,
      Id: 5,
      Title: "Ask Group to present",
      onClick: () => {
        console.log("Ask Group to present Clicked");
      },
    },
    // Add more menu items here
  ];

  return (
    <div className="flex flex-col max-w-min whitespace-nowrap">
      <button
        onClick={() => setMenuVisible(!isMenuVisible)}
        className="px-2 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Table-Kebab Menu
      </button>

      {/* Display KebabMenu component if isMenuVisible is true */}
      {isMenuVisible && (
        <div className="mt-0">
          <KebabMenu menus={menuItems} />
        </div>
      )}
    </div>
  );
};

export default KebabMenuTable;
