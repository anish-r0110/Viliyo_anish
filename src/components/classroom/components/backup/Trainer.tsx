import { Avatar, Text } from "@radix-ui/themes";
import { IoMicOutline } from "react-icons/io5";
import { IoMicOffOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { HiOutlineVideoCameraSlash } from "react-icons/hi2";
import Image from "next/image";
import p1 from "@/assets/images/p1.png";

interface ParticipantProps {
  name: string;
  trainerTableName: string | null;
}

const Trainer: React.FC<ParticipantProps> = ({ name, trainerTableName }) => {
  const [micOn, setMicOn] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const [trainerAnAnotherTable, setTrainerAnAnotherTable] = useState(false);
  let i = 1;
  useEffect(() => {
    console.log("Rerender Trainer", i);
    i++;
  }, []);

  return (
    <div className="flex flex-col bg-app-blue p-[0.6%] text-center w-fit mx-auto rounded-b-3xl h-fit">
      <div className="relative flex mx-auto w-full">
        <Image
          src={p1}
          alt="Trainee Card"
          width={180}
          height={130}
          className={`object-cover rounded ${
            trainerAnAnotherTable && "opacity-25"
          }`}
        ></Image>
        <div className="absolute bottom-0 flex w-full justify-between">
          <div className="text-white px-2">
            {videoOn ? (
              <HiOutlineVideoCamera
               
                color="white"
              />
            ) : (
              <HiOutlineVideoCameraSlash
               
                color="white"
              />
            )}
          </div>
          <div className="text-white px-2 ">
            {micOn ? (
              <IoMicOutline color="white" />
            ) : (
              <IoMicOffOutline color="white" />
            )}
          </div>
        </div>
      </div>
      <Text className="text-white text-xs">{name}</Text>
    </div>
  );
};

export default Trainer;
