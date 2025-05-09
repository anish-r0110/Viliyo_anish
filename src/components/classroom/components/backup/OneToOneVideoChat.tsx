import React, { useState } from "react";
import { Avatar, Text } from "@radix-ui/themes";
import { IoMicOutline } from "react-icons/io5";
import { IoMicOffOutline } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { HiOutlineVideoCameraSlash } from "react-icons/hi2";
import p6 from "../../../assets/images/p6.jpg";
import p4 from "../../../assets/images/p4.jpg";
import Image from "next/image";

interface ParticipantProps {
  name: string;
  image: any;
}

export const SquareShapeParticipant: React.FC<ParticipantProps> = ({
  name,
  image,
}) => {
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
          <Image src={image} alt={"person"}></Image>

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
          <Text className="text-white  text-xs truncate">{name}</Text>
        </div>
      </div>
    </div>
  );
};

const OneToOneVideoChat = () => {
  return (
    <>
      <div className="columns-2">
        <div className="w-full aspect-video">
          <SquareShapeParticipant name="Revanth" image={p6} />
        </div>
        <div className="w-full aspect-video py-0.5">
          <SquareShapeParticipant name="Sneha" image={p4} />
        </div>
      </div>
      <div className="flex justify-center">
        <button className="bg-orange-600 rounded-full px-6 py-1 text-white border border-white">
          End Video Chat
        </button>
      </div>
    </>
  );
};

export default OneToOneVideoChat;
