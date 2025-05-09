import { useEffect } from "react";
import calculateDurationInMinutes from "@/utils/durationInMinutes";

interface ISessionInformationCard {
  title: string;
  status: string;
  dateTime: string;
  duration: any;
  trainerName: string;
}

export const SessionInformation = ({
  title,
  status,
  dateTime,
  duration,
  trainerName,
}: ISessionInformationCard) => {
  useEffect(() => {
    const duration = calculateDurationInMinutes("13.00", "16.30");
    console.log("Duration", duration);
  }, []);

  return (
    <>
    <div className="flex justify-around gap-2 bg-white rounded-lg shadow-lg">
      <div className="text-xs mobile:text-xs p-4 laptop:p-7 desktop:p-8 largescreen:p-7 mt-2 mb-2">
        <div className="grid grid-cols-2">
          <div className="text-zinc-500">Title</div>
          <div className="text-app-blue truncate">: {title}</div>
          <div className="text-zinc-500">Status</div>
          <div className="text-app-blue">: {status}</div>
          <div className="text-zinc-500">Date & Time</div>
          <div className="text-app-blue">: {dateTime}</div>
          <div className="text-zinc-500">Duration</div>
          <div className="text-app-blue">: {duration} Minutes</div>
          <div className="text-zinc-500">Trainer</div>
          <div className="text-app-blue">: {trainerName}</div>
        </div>
      </div>
    </div>
    </>
  );
};
