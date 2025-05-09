import { AppPage } from "@/layouts/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Tab from "@/interfaces/Tab";
import Icon from "@/assets/icons";
import Image from "next/image";
import { SidePanelTabs } from "@/components/shared";
import { FAQ, FeatureRequest, HelpCenter, Tutorials , ContactSupport , QueriesFeedBack } from "@/components/help-support";
import { ITabs, Tabs } from "@/components/tabs";

interface ScreenFeature {
  winWidth: number;
  winHeight?: number;
}

const HelpPage: AppPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("help-center");

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

  useEffect(() => {
    const { tab } = router.query;
    if (tab && typeof tab === 'string') {
      setActiveTab(tab);
    }
  }, [router.query]);

  const tabData: ITabs = {
    "Help Center": [
      {
        id: 1,
        TabContent: <HelpCenter setActive={handleTabClick} />,
      },
    ],
    "Viliyo Tutorials": [
      {
        id: 2,
        TabContent: <Tutorials />,
      },
    ],
    "FAQs": [
      {
        id: 3,
        TabContent: <FAQ />,
      },
    ],
    "Queries & Feedback": [
      {
        id: 4,
        TabContent: <QueriesFeedBack />,
      },
    ],
    "Feature Request": [
      {
        id: 5,
        TabContent: <FeatureRequest />,
      },
    ],
    "Contact Support": [
      {
        id: 6,
        TabContent: <ContactSupport />,
      },
    ],
  };

  const sidebarData: Tab[] = [
    {
      id: "help-center",
      label: "Help Center",
      icon: <Image src={Icon.helpCenter} alt="helpCenter" width={15} height={15} />,
      content: <HelpCenter setActive={handleTabClick} />,
    },
    {
      id: "viliyo-tutorials",
      label: "Viliyo Tutorials",
      icon: <Image src={Icon.vtIcon} alt="Tutorials" width={30} height={30} />,
      content: <Tutorials />,
    },
    {
      id: "faq",
      label: "FAQs",
      icon: <Image src={Icon.faqIcon} alt="FAQ" width={30} height={30} />, //faqIcon
      content: <FAQ />,
    },
    {
      id: "queries-feedback",
      label: "Queries & Feedback",
      icon: <Image src={Icon.QnFeedbackIcon} alt="queries" width={25} height={25} />, //queriesIcon
      content: <QueriesFeedBack />,
    },
    {
      id: "feature-request",
      label: "Feature Request",
      icon: <Image src={Icon.FRequestIcon} alt="Feature" width={30} height={30} />,
      content: <FeatureRequest />,
    },
    {
      id: "contact-support",
      label: "Contact Support",
      icon: <Image src={Icon.ContSupportIcon} alt="Contact" width={30} height={30} />,
      content: <ContactSupport />,
    },
  ];

  return (
    <div className="w-full">
      {screenWidth.winWidth < 768 ? (
        <Tabs data={tabData} />
      ) : (
        <SidePanelTabs
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabs={sidebarData}
          title="Help & Support"
          
        />
      )}
    </div>
  );
};

export default HelpPage;
HelpPage.Layout = "Admin";