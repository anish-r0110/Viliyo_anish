import Tab from "@/interfaces/Tab";
import { AppPage } from "@/layouts/types";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/buttons";
import ResetPassword from "@/components/inputs/ResetPassword";
import Icon from "@/assets/icons";
import Image from "next/image";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { changeLanguage, fetchAllLanguages, fetchPreferredLanguage, updatePreferredLanguage } from "@/store/reducers/language";
import { ITabs, Tabs } from "@/components/tabs";
import { SidePanelTabs } from "@/components/shared";

interface ScreenFeature {
  winWidth: number;
  winHeight?: number;
}

const LanguageScreen = () => {

  const { items:languages , preferredLanguage  } = useSelector((state:RootState) => state.settings.langaguge)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch( fetchAllLanguages() )
    dispatch( fetchPreferredLanguage() )
  }, []);



  const handleUpdatePreferredLanguage = async (languageId: number) => {
      dispatch( updatePreferredLanguage( languageId) );
      toast.success("Language updated successfully");
  };

  const handleLanguageSelection = (languageId: number) => {
     dispatch( changeLanguage( languageId ) );
  };

  return (
    <div>
      <h2 className="text-[#5F488A] text-lg font-semibold leading-6 mobile:text-sm">
        Choose the languages you wish to add to the language selection menu for
        your interface
      </h2>
      <hr className="h-[1px] bg-app-blue mb-6" />
      <div className="grid grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-1 justify-between gap-4">
        {languages.map((language) => (
          <div
            key={language.id}
            className={`flex flex-1 items-center justify-between p-3 rounded-2xl shadow-bottom border border-1
               {language.isLaunching ? "bg-gray-100" : null}
            `}
          >
            <span className="text-left text-sm text-app-gray-medium font-bold space-x-2">
              {language.name}
            </span>
            {language.isLaunching && (
              <span className="text-left text-[8px] text-app-blue">
                Launching Soon
              </span>
            )}

            <input
              type="radio"
              name="language"
              checked={preferredLanguage === language.id}
              onChange={() => handleLanguageSelection(language.id)}
              className={`ml-8 h-5 w-5 rounded border outline-none
              hover:cursor-pointer  text-app-blue`}
              disabled={language.isLaunching}
            />
          </div>
        ))}
      </div>

      <Button
        styles="rounded-full  px-12 bg-gradient-to-r from-fuchsia-800  to-fuchsia-500 shadow-md text-white outline-none mt-4 mobile:px-8 mobile:text-sm"
        onClick={() => handleUpdatePreferredLanguage(preferredLanguage as number)}
      >
        Save
      </Button>
    </div>
  );
};

const PasswordScreen = () => {
  const [password, setPassword] = useState("");

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  return (
    <>
      <ResetPassword />
    </>
  );
};

const SettingPage: AppPage = () => {
  const [activeTab, setActiveTab] = useState("language");
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const [screenWidth, setScreenWidth] = useState<ScreenFeature>({
    winWidth: 0,
    winHeight: 0,
  });

  const windowSize = () => {
    setScreenWidth({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    windowSize();
    window.addEventListener("resize", windowSize);

    return () => {
      window.removeEventListener("resize", windowSize);
    };
  }, []);

  const tabData: ITabs = {
    " Language ": [
      {
        id: 1,

        TabContent: <LanguageScreen></LanguageScreen>,
      },
    ],
    " Change Password ": [
      {
        id: 2,
        TabContent: <PasswordScreen></PasswordScreen>,
      },
    ],
  };

  const sideBarData: Tab[] = [
    {
      id: "language",
      label: "Language",
      icon: <Image src={Icon.language} alt="vCard" width={30} height={30} />,
      content: <LanguageScreen></LanguageScreen>,
    },
    {
      id: "passwords",
      label: "Change Password",
      icon: <Image src={Icon.changePWD} alt="vCard" width={30} height={30} />,
      content: <PasswordScreen></PasswordScreen>,
    },
  ];

  return (
    <div className="h-full">
      {screenWidth.winWidth < 768 || screenWidth.winWidth < 1024 ? (
        <Tabs data={tabData}></Tabs>
      ) : (
        <SidePanelTabs
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabs={sideBarData}
          title="Settings"
        />
      )}
    </div>
  );
};

export default SettingPage;
SettingPage.Layout = "Admin";
