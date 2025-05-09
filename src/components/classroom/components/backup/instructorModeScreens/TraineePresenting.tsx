import React, { useState } from "react";
import Image from "next/image";
import p4 from "@/assets/images/p4.jpg";
import p3 from "@/assets/images/p3.jpg";
import p6 from "@/assets/images/p6.jpg";
import { IoMicOutline } from "react-icons/io5";
import { IoMicOffOutline } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { HiOutlineVideoCameraSlash } from "react-icons/hi2";

export const SmallSquareShapeParticipant = () => {
  const [micOn, setMicOn] = useState(false);
  const [videoOn, setVideoOn] = useState(false);

  return (
    <div>
      <div className="text-white flex justify-end items-start relative mt-2 object-cover">
        <div className="-space-y-10 absolute inset-2">
          <CiMenuKebab />
        </div>
      </div>
      {/* participhant1 */}
      <div className="px-2">
        <div className="-space-y-6 size-40">
          <Image src={p3} alt="person" />

          <div className="flex justify-center">
            <div className="text-white px-10">
              {videoOn ? (
                <HiOutlineVideoCamera
                  onClick={() => setVideoOn(!videoOn)}
                  color="white"
                />
              ) : (
                <HiOutlineVideoCameraSlash
                  onClick={() => setVideoOn(!videoOn)}
                  color="white"
                />
              )}
            </div>
            <div className="text-white px-10 ">
              {micOn ? (
                <IoMicOutline onClick={() => setMicOn(!micOn)} color="white" />
              ) : (
                <IoMicOffOutline
                  onClick={() => setMicOn(!micOn)}
                  color="white"
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center py-2">
          <p className="text-white  text-xs truncate">Trainee Name</p>
        </div>
      </div>
    </div>
  );
};

const GroupPresenting = () => {
  const [participantCount, setParticipantCount] = useState([
    {
      name: "Tuhin",
      image: "",
    },
    {
      name: "Nitin",
      image: "",
    },
    {
      name: "Yash",
      image: "",
    },
    {
      name: "Prathamesh",
      image: "",
    },
    {
      name: "Subrat",
      image: "",
    },
    {
      name: "Geetha",
      image: "",
    },
  ]);
  return (
    <div className="my-2">
      <div className="bg-gray-600 p-1 rounded-t-2xl">
        <p className="text-white flex justify-center text-sm">
          Group 2: Presenting
        </p>
      </div>
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          <Image src={p4} alt="person" className="w-full h-full" />
        </div>
        <div className="col-span-1">
          <div className="h-80 overflow-y-auto overflow-x-clip">
            <SmallSquareShapeParticipant />
            <SmallSquareShapeParticipant />
            <SmallSquareShapeParticipant />
            <SmallSquareShapeParticipant />
          </div>
        </div>
      </div>
      <div className="flex justify-center py-2">
        <button className="bg-red-600 text-white rounded-xl px-2 py-1 border border-white">
          End Presentation
        </button>
      </div>
    </div>
  );
};
export default GroupPresenting;
