 // Import your KebabMenu component
import InvitToChat from "@/assets/icons/inviteToTextChat.svg"; // Import SVG icons
import InviteToVideoChat from "@/assets/icons/inviteToVideoChat.svg"; // Import SVG icons
import BadgeIcon from "@/assets/icons/mergeGroup.svg"; // Import SVG icons
import VisitingCard from "@/assets/icons/visitingCard.svg"; // Import SVG icons
import AskToPresent from "@/assets/icons/askToJoin.svg";
import Image from "next/image"; // Import next/Image component
import { useState } from "react";
import KebabMenu from "../classroom/components/backup/KebabMenu";

const KebabMenuTable = () => {
  const [isMenuVisible, setMenuVisible] = useState(false); // State to manage menu visibility

  // Array of menu items
  const menuItems = [
    {
      Icon: <Image src={InvitToChat} alt="Menu Icon" width={20} height={20} />,
      Id: 1,
      Title: "Invite to chat",
      onClick: () => {
        console.log("Invite to chat Clicked");
      },
    },
    {
      Icon: (
        <Image src={InviteToVideoChat} alt="Menu Icon" width={20} height={20} />
      ),
      Id: 2,
      Title: "Invite to video chat",
      onClick: () => {
        console.log("Invite to chat Clicked");
      },
    },
    {
      Icon: <Image src={BadgeIcon} alt="Menu Icon" width={20} height={20} />,
      Id: 3,
      Title: "Give a Badge",
      onClick: () => {
        console.log("Give a Badge Clicked");
      },
    },
    {
      Icon: <Image src={VisitingCard} alt="Menu Icon" width={20} height={20} />,
      Id: 4,
      Title: "Share visiting card",
      onClick: () => {
        console.log("Share visiting card Clicked");
      },
    },
    {
      Icon: <Image src={VisitingCard} alt="Menu Icon" width={20} height={20} />,
      Id: 4,
      Title: "Request visiting card",
      onClick: () => {
        console.log("Request visiting card Clicked");
      },
    },
    {
      Icon: <Image src={AskToPresent} alt="Menu Icon" width={20} height={20} />,
      Id: 5,
      Title: "Ask to present",
      onClick: () => {
        console.log("Ask to present Clicked");
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
        Participants-Kebab Menu
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
