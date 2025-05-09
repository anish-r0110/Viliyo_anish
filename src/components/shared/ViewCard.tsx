import React from "react";
import { IconType } from "react-icons";

interface ViewCardProps {
  title: string;
  Icon: IconType;
  value: number;
}

function ViewCard({ title, Icon, value }: ViewCardProps) {
  return (
    <div className="flex flex-col text-white p-4 mobile:p-1 mobile:items-center">
      <p className="font-bold text-2xl text-white">{value}</p>
      <Icon className="text-[#E9BE50] w-8 h-8" />
      <p className="whitespace-nowrap text-sm">{title}</p>
    </div>
  );
}
export default ViewCard;
