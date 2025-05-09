import React, { useState, useEffect } from "react";
import { AppPage } from "@/layouts/types";
import Tab from "@/interfaces/Tab";
import Image from "next/image";
import Icon from "@/assets/icons";
import CollectedCardList from "@/components/visiting-card/CollectedCardList";
import { useRouter } from "next/router";
import VistingCardPanel from "@/components/visiting-card/VisitingCardPanel";
import { ITabs, Tabs } from "@/components/tabs";
import { SidePanelTabs } from "@/components/shared";

export const CollectedVisitingCards: AppPage = () => {
  const router = useRouter();
  const name = router.query.name;
  const date = router.query.date;
  const count = router.query.count;
  const profileImage = router.query.profileImage;

  const sessionList = router.query.sessionList
    ? JSON.parse(router.query.sessionList as string)
    : null;
  const [activeTab, setActiveTab] = useState("collected-card");

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };


  const [screenWidth, setScreenWidth] = useState({});

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
    "Your Visiting Card ": [
      {
        id: 1,

        TabContent: <VistingCardPanel></VistingCardPanel>,
      },
    ],
    "Collected Visiting Cards": [
      {
        id: 2,
        TabContent: (
          <CollectedCardList
            sessionList={JSON.parse(sessionList)}
            name={name}
            date={date}
            count={count}
            profileImage={profileImage}
          />
        ),
      },
    ],
  };

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
      content: (
        <CollectedCardList
          sessionList={JSON.parse(sessionList)}
          name={name}
          date={date}
          count={count}
          profileImage={profileImage}
        />
      ),
    },
  ];

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

export default CollectedVisitingCards;
CollectedVisitingCards.Layout = "Admin";