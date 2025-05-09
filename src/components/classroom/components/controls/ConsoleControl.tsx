import { VideoControl, AudioControl, SpeakerControl, ShareScreenControl, LogoutControl, ParticipantControl, BadgeControl, ReactionControl, ChatControl, NotepadControl, RaiseHandControl, VisitingCardControl, MenuControl, SperatorControl } from ".";




const ConsoleControlPanel = () => {

  return (
    <div className="flex rounded-tr-3xl rounded-tl-3xl bg-[#312548] h-full w-full text-white p-2 justify-center items-center space-x-4">
      <VideoControl ></VideoControl>
      <AudioControl></AudioControl>
      <SpeakerControl audioSourceUrl="https://samplelib.com/lib/preview/mp3/sample-3s.mp3"></SpeakerControl>
      <ShareScreenControl ></ShareScreenControl>
      <LogoutControl></LogoutControl>
      <SperatorControl></SperatorControl>
      <ParticipantControl></ParticipantControl>
      <BadgeControl></BadgeControl>
      <ReactionControl></ReactionControl>
      <ChatControl></ChatControl>
      <NotepadControl></NotepadControl>
      <RaiseHandControl></RaiseHandControl>
      <VisitingCardControl></VisitingCardControl>
      <MenuControl></MenuControl>
    </div>
  );
};

export default ConsoleControlPanel;
