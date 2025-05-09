import { ReactElement, useEffect, useState } from "react";
import { IChipButton } from "../buttons/ChipButton";
import Card from "../shared/Card";
import { GroupChipButton } from "../buttons";
import Segment from "./Segment";
import Icon from "@/assets/icons";
import Image from "next/image";
import { MdOutlineCoffee } from "react-icons/md";
import ISession from "@/models/Session";
import { duration } from "moment";
import calculateDurationInMinutes from "@/utils/durationInMinutes";

interface ISegment {
  title: string;
  activityName: string;
  duration: number; // in SMinutes
  Icon: ReactElement;
}

const SessionsPlanDetails = ({ session }: { session: ISession }) => {
  console.log("Segments = " + session.segments["post"]);
  return (
    <div className="border border-purple-900 rounded-3xl p-4 m-2 max-w-[360px]">
      <h1 className="text-purple-900 text-sm font-fold truncate px-4">
        {session.name}
      </h1>
      <p className="text-purple-900 text-sm font-normal px-4">
        {/* Status: {session.status} */}
      </p>
      <div className="grid grid-cols-2 ">
        <div className="flex justify-start">
          <h1 className="text-zinc-600 text-xs font-bold truncate px-4 text-start">
            Duration:
            <span className="text-zinc-500 text-xs truncate px-1">
              {calculateDurationInMinutes(session.startTime, session.endTime)}
              Mins
            </span>
          </h1>
        </div>
        <div className="flex justify-end">
          <h1 className="text-zinc-600 text-xs text-right font-bold truncate px-4">
            Trainer:
            <span className="text-zinc-500 text-xs truncate px-1">
              {session.trainer?.fullName}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

interface ISessionPlan {
  id: number;
  name: string;
  time: string;
  dateLable: string;
  definition: string;
  image: any;
}

interface ISessionPlanProps {
  session: ISession;
}

const SessionPlan = ({ session }: ISessionPlanProps) => {
  const [chipButtonData, setChipButtonData] = useState<IChipButton[]>([
    { id: 1, title: "Pre Work", isActive: true },
    { id: 2, title: "Live Session", isActive: false },
    { id: 3, title: "Post Work", isActive: false },
  ]);

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    setPlans(session?.segments["pre"]);
  }, []);

  const onSelect = (data: IChipButton) => {
    const newData = chipButtonData.map((el) => {
      el.isActive = false;
      if (el === data) {
        el.isActive = true;
      }
      return el;
    });
    setChipButtonData(newData);
    if (data.id == 1 && data.isActive) setPlans(session?.segments["pre"]);
    else if (data.id == 2 && data.isActive) setPlans(session?.segments["live"]);
    else if (data.id == 3 && data.isActive) setPlans(session?.segments["post"]);
  };

  return (
    <>
      <div className="flex flex-col w-[360px] items-center bg-white rounded-lg shadow-2xl">
        <SessionsPlanDetails session={session} />
        <div className="p-1">
          <GroupChipButton
            data={chipButtonData}
            onSelect={onSelect}
            styles="justify-center"
          />
        </div>
        <div>
          {plans?.map((plan: any) => (
            <Segment
              key={plan.id} // Make sure to add a unique key for each segment if the data has a unique identifier (e.g., "id").
              title={plan.title}
              activityName={plan.description}
              duration={plan.duration}
              icon={
                <div className="text-3xl p-1">
                  <MdOutlineCoffee />
                </div>
              }
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SessionPlan;
