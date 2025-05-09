import React from "react";
import Image from "next/image";
import primaryCardImage from "@/assets/images/collectedCardImage.png"
import collectedCardImage from "../../assets/images/collectedCardImage.png";
import thirdCardImage from "../../assets/images/thirdCardImage.png";
import { BiPhone } from "react-icons/bi";
import { CiLinkedin } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";

export const CollectedCardFirstOutline = ({
  name,
  email,
  phone,
  linkedin,
  website,
  designation,
}: any) => {

  return (
    <div className="grid grid-cols-2 bg-white m-2  shadow-lg rounded-lg w-full">
      <div className="py-14">
        <Image
          src={primaryCardImage}
          alt="primaryCardImage"
          height={400}
          width={400}
        />
      </div>
      <div className="p-2 space-y-6">
        <div>
          <h2 className="font-bold text-amber-400">{name}</h2>
          <p className="font-bold text-sm truncate">{designation}</p>
        </div>

        <div className="py-2 text-sm space-y-1">
          <div className="flex">
            <p className="text-gray-500 pt-1">
              <AiOutlineMail />
            </p>
            <p className="px-1 text-app-blue truncate">{email}</p>
          </div>
          <div className="flex">
            <p className="text-gray-500 ">
              <BiPhone />
            </p>
            <p className="px-1 text-app-blue truncate">{phone}</p>
          </div>
          <div className="flex">
            <p className="text-gray-500 ">
              <CiLinkedin />
            </p>
            <p className="px-1 text-app-blue truncate">{linkedin}</p>
          </div>
          <div className="flex">
            <p className="text-gray-500 ">
              <TbWorld />
            </p>
            <p className="px-1  text-app-blue truncate">{website}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CollectedCardSecondOutline = ({
  name,
  email,
  phone,
  linkedin,
  website,
  designation,
  image,
}: any) => {
  return (
    <div className=" mobile:w-full m-2" id="secondcard">
      <div className="w-full bg-white   shadow-lg rounded-lg  grid grid-cols-2 gap-x-2 mobile:w-full tablet:w-screen laptop:w-full ">
        <div className="col-span-1 space-y-8 mobile-y-4">
          <div className="bg-gradient-to-r  from-app-blue to-app-purple border-2 rounded-r-2xl py-2 mobile:px-0 my-2">
            <h2 className="  text-amber-400">{name}</h2>
            <p className="text-xs text-white">{designation}</p>
          </div>
          <div className="py-2 text-xs p-4 space-y-1">
            <div className="flex space-y-1">
              <p className="text-gray-500 pt-1">
                <AiOutlineMail />
              </p>
              <p className="px-1 text-app-blue truncate">{email}</p>
            </div>
            <div className="flex">
              <p className="text-gray-500 ">
                <BiPhone />
              </p>
              <p className="px-1 text-app-blue truncate">{phone}</p>
            </div>
            <div className="flex">
              <p className="text-gray-500 ">
                <CiLinkedin />
              </p>
              <p className="px-1 text-app-blue truncate">{linkedin}</p>
            </div>
            <div className="flex">
              <p className="text-gray-500 ">
                <TbWorld />
              </p>
              <p className="px-1  text-app-blue truncate">{website}</p>
            </div>
          </div>
        </div>

        <div className="col-span-1  mobile:-space-x-0">
          {image}
          {/* <Image src={SecondaryCardImage} alt="secondaryCardImage" /> */}
        </div>
      </div>
    </div>
  );
};

export const CollectedCardThirdOutline = ({
  name,
  email,
  phone,
  linkedin,
  website,
  designation,
  image,
}: any) => {
  return (
    <div className=" bg-gradient-to-tr max-h-52 from-cyan-900 from-30% via-amber-500 via-40% to-app-blue to-70% shadow-lg rounded-lg grid grid-cols-2 m-2 space-x-2 mobile:-space-x-4 mobile:w-full  justify-end  mobile:p-2">
      <div className="py-8 px-4 mobile:p-0  laptop:pl-2  laptop:py-3">
        <div className="">
          <h2 className=" text-amber-400">{name}</h2>
          <p className="text-white text-xs truncate">{designation}</p>
        </div>
        <div className="py-4 text-xs text-white space-y-1 opacity-75 ">
          <div className="flex space-y-1">
            <div className="pt-2">
              <AiOutlineMail />
            </div>
            <p className="px-2 truncate">{email}</p>
          </div>
          <div className="flex">
            <div>
              <BiPhone />
            </div>
            <p className="px-1 truncate">{phone}</p>
          </div>
          <div className="flex">
            <div>
              <CiLinkedin />
            </div>
            <p className="px-1 italic truncate">{linkedin}</p>
          </div>
          <div className="flex">
            <div>
              <TbWorld />
            </div>
            <p className="px-1 italic truncate">{website}</p>
          </div>
        </div>
      </div>
      <div className="rounded-xl">
        <div className=" grid justify-end">{image}</div>
      </div>
    </div>
  );
};
