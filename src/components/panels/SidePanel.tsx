import { useState } from "react";

const SidePanel: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  const getMenuStyles = (menu: string) => {
    if (activeMenu === menu) {
      return "bg-blue-500 text-white";
    } else {
      return "hover:bg-blue-200";
    }
  };

  return (
    <div className="bg-gray-200 w-64 h-screen">
      <ul className="flex flex-col gap-2 p-4">
        <li
          className={`p-2 rounded-lg ${getMenuStyles("dashboard")}`}
          onClick={() => handleMenuClick("dashboard")}
        >
          Dashboard
        </li>
        <li
          className={`p-2 rounded-lg ${getMenuStyles("profile")}`}
          onClick={() => handleMenuClick("profile")}
        >
          Profile
        </li>
        <li
          className={`p-2 rounded-lg ${getMenuStyles("settings")}`}
          onClick={() => handleMenuClick("settings")}
        >
          Settings
        </li>
      </ul>
    </div>
  );
};

export default SidePanel;
