import React, { useState } from "react";
import Image from "next/image";
import p3 from "@/assets/images/p3.jpg";
import { IoMicOffOutline, IoMicOutline } from "react-icons/io5";
import { VscKebabVertical } from "react-icons/vsc";

const OtherGroupsTraineeView = () => {
  const [micOn, setMicOn] = useState(false);

  return (
    <div className="p-6">
      <Image src={p3} alt="" className="w-full h-full"></Image>
      <div className=" space-y-4">
        <div className="flex justify-center">
          <p className="text-white px-2 ">Trainer Name</p>
        </div>
        <div className="flex justify-center">
          <button className="bg-red-600 text-white rounded-xl px-2 py-1 border border-white">
            End Presentation
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtherGroupsTraineeView;
