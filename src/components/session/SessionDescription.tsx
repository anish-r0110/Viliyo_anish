import React from "react";
import { useRouter } from "next/router";


interface SessionDescProps {
  sessionName: string;
  programmeName: string;
  batchName: string;
  date: string;
  overallDuration: string;
  sessionDuration: string;
  totalParticipants: number;
  onlineParticipants: number;
  sessionId: String;
  roomID:string;
}

const SessionDescription = ({
  sessionName,
  programmeName,
  batchName,
  date,
  overallDuration,
  sessionDuration,
  totalParticipants,
  onlineParticipants,
  roomID
}: // onJoin,
SessionDescProps) => {
  const router = useRouter();
  const handleJoin = () => {
    router.push(`/live-session?sessionId=${roomID}`);
  };



  return (
    <div className="bg-zinc-900 text-white p-6 rounded-2xl  space-y-4">
      <div className="grid grid-cols-2">
        <div className="space-y-4 text-sm">
          <div>
            <p className="opacity-75 ">Session</p>
            <p className="font-bold">{sessionName}</p>
          </div>
          <div>
            <p className="opacity-75">Programme</p>
            <p className="font-bold">{programmeName}</p>
          </div>
          <div>
            <p className="opacity-75 ">Batch</p>
            <p className="font-bold">{batchName}</p>
          </div>
        </div>
        <div className="space-y-4 text-sm">
          <div>
            <p className="opacity-75 ">Date</p>
            <p className="font-bold">{date}</p>
          </div>
          <div>
            <p className="opacity-75 ">Overall Duration</p>
            <p className="font-bold">{overallDuration}</p>
          </div>
          <div>
            <p className="opacity-75 ">Session Duration</p>
            <p className="font-bold">{sessionDuration}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-2 px-16">
        <button
          onClick={() => handleJoin()}
          className="flex justify-center align-middle w-56 h-12 bg-app-blue rounded-md text-xl font-bold contrast-100 disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          <span className="flex my-auto">Join</span>
        </button>
        <span className="text-green-800">
          {onlineParticipants}/ {totalParticipants} Participants Online
        </span>
      </div>
    </div>
  );
};

export default SessionDescription;
