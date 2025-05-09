import ParticpantPanel from "../../panels/Participant";
import NotePadApplication from "../../notepad/index";
import ShowSidePanelVisitingCard from "../../panels/ShowSidePanelVisitingCard";
import { useState } from "react";
import ShareVisitingCardPanel from "../../panels/ShareVisiting";
import ChangeVisitingCard from "../../panels/ChangeVisitingCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ChatApplication from "@/widgets/chat-application";

 const LeftPanel = () => {
  const settings = useSelector( (state: RootState) => state.live.settings );
  const [shareVisitingScreen, setShareVitingScreen] = useState(1);

  const handleChange = (screenNumber: number) => {
    setShareVitingScreen(screenNumber);
  };

  switch (settings.leftPanel) {
    case "participantPanel":
      return <ParticpantPanel />;
    case "chatPanel":
      return (
          <ChatApplication />
      );
    case "notepadPanel":
      return (
      
          <NotePadApplication />
      );
    case "visitingCardPanel":
      return (
        <div className="h-full w-full overflow-y-auto">
          {shareVisitingScreen === 1 ? (
            <ShowSidePanelVisitingCard handleChange={handleChange} />
          ) : shareVisitingScreen === 2 ? (
            <ShareVisitingCardPanel handleChange={handleChange} />
          ) : (
            <ChangeVisitingCard handleChange={handleChange} />
          )}
        </div>
      );

    default:
      return null;
  }
};

export default LeftPanel
