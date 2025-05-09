import React, { ReactElement } from "react";

interface SegmentProps {
  title: string;
  activityName: string;
  duration: number; // in Seconds or Minutes
  icon: ReactElement;
}

const Segment: React.FC<SegmentProps> = ({
  title,
  activityName,
  duration,
  icon,
}) => {
  return (
    <div className="my-3 text-sm bg-violet-50 rounded-2xl p-2 grid grid-cols-7">
      <div className="col-span-1">{icon}</div>
      <div className="flex flex-col mx-2 col-span-4 truncate">
        <span className="text-app-blue font-semibold">{title}</span>
        <span>{activityName}</span>
      </div>
      <div className="flex border-l-2 border-app-gray p-1 flex-col col-span-2">
        <span>Duration:</span>
        <span>{duration} Mins</span>
      </div>
    </div>
  );
};

export default Segment;
