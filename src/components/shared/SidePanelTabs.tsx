import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import Sidebar from "./Sidebar";
import { IoChevronForward } from "react-icons/io5";
import BackNavigation from "./BackNavigation";

interface Tab {
  id: string;
  label: string;
  icon: ReactNode;
  content: ReactNode;
}

interface SidePanelTabsProps {
  tabs: Tab[];
  title?: string;
  handleTabClick: (slug: string) => void;
  activeTab?: string;
}

const SidePanelTabs: React.FC<SidePanelTabsProps> = ({
  tabs,
  title,
  handleTabClick,
  activeTab,
}) => {
  const router = useRouter();

  const backNavigation = () => {
    router.back();
  };

  return (
    <>
      <div className="my-4  overflow-auto flex items-center">
        <BackNavigation title={title || ""}></BackNavigation>
      </div>
      <Sidebar>
        <div className="flex">
          <div className="w-96 laptop:w-78  bg-white rounded-tr-3xl ">
            <ul className="flex h-full flex-col gap-2 space-y-2 p-4 ">
              {tabs.map((tab) => (
                <li
                  key={tab.id}
                  className={`laptop:p-2 p-2 m-4 rounded-lg cursor-pointer flex justify-between laptop:hover:scale-110 hover:scale-110 mobile:relative mobile:w-8 mobile:h-10 mobile:justify-center   ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-app-blue to-app-purple text-white mobile:text-xs mobile:w-4"
                      : "hover:bg-blue-200"
                  }`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  <div className="flex space-x-2 items-center w-full mobile:relative">
                    <div
                      className={`${
                        activeTab === tab.id ? "bg-white" : "bg-[#E9E0FA]"
                      } rounded-md h-10 w-10  flex justify-center mobile:relative mobile:w-4 mobile:h-4 `}
                    >
                      {tab.icon}
                    </div>
                    <div className="ml-2 text-sm ">{tab.label}</div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-grow" />
                    <div className="mr-2 text-[24px] ">
                      <IoChevronForward></IoChevronForward>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full h-screen mobile:text-sm  overflow-auto px-5 laptop:px-2 laptop:pr-2 pr-20 ">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`${activeTab === tab.id ? "" : "hidden"}`}
              >
                {tab.content}
              </div>
            ))}
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default SidePanelTabs;
