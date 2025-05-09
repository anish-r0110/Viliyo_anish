// components/KebabMenu.tsx
import React from "react";

interface MenuItem {
  Icon: React.ReactElement;
  Id: number;
  Title: string;
  onClick: () => void;
}

interface KebabMenuProps {
  menus: MenuItem[];
}

const KebabMenu: React.FC<KebabMenuProps> = ({ menus }) => {
  return (
    <div className="relative inline-block text-left">
      {/* Menu items */}
      <div
        className="origin-top-right absolute whitespace-nowrap rounded-xl shadow-xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div className="py-1" role="none">
          {menus.map((menu) => (
            <button
              key={menu.Id}
              onClick={menu.onClick}
              className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <span className="flex mr-2">
                {menu.Icon}
                <span className="ml-2 text-sm text-app-gray-medium">
                  {menu.Title}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KebabMenu;
