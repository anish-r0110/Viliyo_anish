
import ClassRoom from "@/components/classroom";
import { SocketProvider } from "@/components/classroom/context/SocketContext";
import { AppPage } from "@/layouts/types";
import store from "@/store";
import { updateLiveStreamSettings } from "@/store/reducers/livestreamSettings";
import { useSearchParams } from "next/navigation";

const LiveSession: AppPage = () => {
  const searchParams = useSearchParams();
  let roomID = searchParams.get("sessionId");
  store.dispatch( updateLiveStreamSettings({ roomId: roomID as string}));

  return (
    <SocketProvider>
      <ClassRoom></ClassRoom>
    </SocketProvider>
  );

};

export default LiveSession;
LiveSession.Layout = "Console";
