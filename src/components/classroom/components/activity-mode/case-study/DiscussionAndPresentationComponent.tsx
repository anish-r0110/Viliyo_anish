import React, { useState, useEffect } from "react";
import { TbMasksTheater } from "react-icons/tb";
import { RxCrossCircled } from "react-icons/rx";
import { GiRoundTable } from "react-icons/gi";
import { IoEyeOutline } from "react-icons/io5";
import { ImSearch } from "react-icons/im";

const DiscussionAndPresentationComponent = ({
  image,
  content,
  buttonName,
}: any) => {
  return (
    <div className="bg-black w-full h-full flex flex-col justify-center items-center">
      <div className="relative text-6xl flex justify-center items-center  -bottom-16">
        <div className="text-white bg-app-yellow rounded-full p-4 border border-white">
          {image}
        </div>
      </div>

      <div className="text-app-blue relative top-8  left-32 gap-x-2 text-xl ">
        <RxCrossCircled />
      </div>

      <div className="bg-blue-50  w-80 flex space-x-4 p-8 rounded-lg">
        <div className="pt-6 flex flex-col justify-center gap-y-2">
          <p className="text-black text-sm font-medium px-4">{content}</p>

          <div className="flex justify-center ">
            <button
              className={`text-white text-sm bg-green-600 rounded-2xl py-1 px-4 `}
            >
              {buttonName}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionAndPresentationComponent;
