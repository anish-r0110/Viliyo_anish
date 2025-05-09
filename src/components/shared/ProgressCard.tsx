import React from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import CircularProgressBar from "./CircularProgress";

interface ProgressCardProps {
  title?: string;
  incrementValue?: number;
  value: number;
}

function ProgressCard({ title, incrementValue = 0, value }: ProgressCardProps) {
  const ArrowIcon = incrementValue > 0 ? AiOutlineArrowUp : AiOutlineArrowDown;

  return (
    <div className="flex bg-black opacity-60 rounded-lg h-28 w-40 flex-col mb-2 mobile:text-xs">
      <div className="flex text-white font-bold p-1">
        <p className="text-[12px] font-bold">{title}</p>
      </div>
      <div className="flex flex-row">
        <div className="p-1">
          <CircularProgressBar progress={value} />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex text-white font-bold">
            {incrementValue !== 0 && (
              <span className="mr-1">
                <ArrowIcon />
              </span>
            )}
            {incrementValue}%
          </div>
          <div className="text-white font-bold" style={{ marginTop: "auto" }}>
            <span className="text-[24px]">{value}</span>
            <span className="text-[12px]">%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressCard;
