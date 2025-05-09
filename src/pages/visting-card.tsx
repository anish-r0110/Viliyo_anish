import Icon from "@/assets/icons";
import Tab from "@/interfaces/Tab";
import { AppPage } from "@/layouts/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import CollectedVisitingCardScreen from "../components/visiting-card/CollectedVisitingCardScreen";
import VistingCardPanel from "../components/visiting-card/VisitingCardPanel";
import { ITabs, Tabs } from "@/components/tabs";
import { SidePanelTabs } from "@/components/shared";

interface ScreenFeature {
  winWidth: number;
  winHeight?: number;
}

const VisitingCardPage: AppPage = () => {
  const [activeTab, setActiveTab] = useState("visiting-card");
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

  const sideBarData: Tab[] = [
    {
      id: "visiting-card",
      label: "Your Visiting Card ",
      icon: <Image src={Icon.yourCard} alt="vCard" width={30} height={30} />,
      content: <VistingCardPanel></VistingCardPanel>,
    },
    {
      id: "collected-card",
      label: "Collected Visiting Cards",
      icon: (
        <Image src={Icon.collectedCard} alt="vCard" width={30} height={30} />
      ),
      content: <CollectedVisitingCardScreen></CollectedVisitingCardScreen>,
    },
  ];

  const tabData: ITabs = {
    "Your Visiting Card ": [
      {
        id: 1,
        TabContent: <VistingCardPanel></VistingCardPanel>,
      },
    ],
    "Collected Visiting Cards": [
      {
        id: 2,
        TabContent: <CollectedVisitingCardScreen></CollectedVisitingCardScreen>,
      },
    ],
  };

  return (
    <>
      <div className="h-full">
        {screenWidth.winWidth < 768 ? (
          <Tabs data={tabData}></Tabs>
        ) : (
          <SidePanelTabs
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tabs={sideBarData}
            title="Visiting Card"
          />
        )}
      </div>
    </>
  );
};

export default VisitingCardPage;
VisitingCardPage.Layout = "Admin";
