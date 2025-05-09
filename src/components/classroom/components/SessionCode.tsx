import SessionAcknowdlegement from "@/components/classroom/components/SessionAcknowdlegement";
import { AppPage } from "@/layouts/types";
import { setSession } from "@/store/reducers/live-session";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import protooClient from "protoo-client";

const SessionCode = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const sessionId = searchParams.get("sessionId");

  useEffect(() => {
    const transport = new protooClient.WebSocketTransport(
      'wss://openvidustream.akashkumarshukla.in/protoo/?roomId=2752&peerId="nitin.singh.c@viliyo.com"'
    );
    dispatch(setSession("234", sessionId as string, "some-room"));
    const peer = new protooClient.Peer(transport);
    console.log(peer);
  }, [sessionId]);

  // <SessionAcknowdlegement
  //   sessionId={sessionId as string}
  //   onJoin={() => router.push("/live-session")}
  // />;
  // const handleClick = () => {
  //   router.push("/session-acknowledgement", { sessionId });
  // };

  return (
    <div className="bg-zinc-600 rounded-2xl p-6">
      <div className="flex justify-between p-2 text-xl">
        <div className="text-app-yellow px-28 font-medium ">Join Session</div>
        <div className="text-white">x</div>
      </div>
      <div className="text-white py-2">
        You need a session code to join this live session!
      </div>
      <div>
        <input
          placeholder="Enter Session Code"
          className="bg-white p-4 rounded-2xl w-full"
        ></input>
      </div>
      <div className="flex justify-center py-4">
        <button
          // onClick={() => handleClick(sessionId)}
          className="bg-app-blue text-white shadow-2xl shadow-white px-8 py-2 font-medium rounded"
        >
          Enter Session
        </button>
      </div>
    </div>
  );
};
export default SessionCode;
