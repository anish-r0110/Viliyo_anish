import { Layout, VisitingCard } from "@/interfaces/VisitingCard";
import SecondaryCardImage from "../../../assets/images/secondaryCardImage.png";
import Image from "next/image";
import { AiOutlineMail } from "react-icons/ai";
import { BiPhone } from "react-icons/bi";
import { CiLinkedin } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";

export const SecondaryLayout: Layout = {
  front: (data: User) => (
    <div className=" bg-white h-52 shadow-lg rounded-lg grid grid-cols-2 mt-2 space-x-8 mobile:w-full  ">
      <div className="py-4 mobile:py-0">
        <div className="bg-gradient-to-r from-app-blue to-app-purple border-2 rounded-r-2xl p-2">
          <h2 className="text-xl laptop:text-sm text-amber-400">{data.name}</h2>
          <p className="text-xs text-white">{data.designation}</p>
        </div>
        <div className="text-xs p-4 space-y-1">
          <div className="flex space-y-1">
            <div className="text-gray-500 pt-2">
              <AiOutlineMail />
            </div>
            <p className="px-1 text-app-blue truncate">{data.email}</p>
          </div>
          <div className="flex">
            <div className="text-gray-500">
              <BiPhone />
            </div>
            <p className="px-1 text-app-blue">{'1234567890'}</p>
          </div>
          <div className="flex">
            <div className="text-gray-500 ">
              <CiLinkedin />
            </div>
            <p className="px-1 text-app-blue italic truncate">
              {data.linkedIn}
            </p>
          </div>
          <div className="flex">
            <div className="text-gray-500 ">
              <TbWorld />
            </div>
            <p className="px-1  text-app-blue italic">{data.website}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center   -space-x-40 ">
        <div>
          <Image
            src={data.profileImage}
            alt="collectedCardImage"
            className="rounded-r-lg h-52"
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  ),
  back: (data: User) => (
    <div className=" bg-blue-950 box-content h-44 shadow-lg rounded-lg p-4 grid grid-rows-2  mobile:space-y-5  laptop:space-y-1  desktop:space-y-5 largescreen:space-y-5  ">
      <div className="text-left text-xs text-white">
        <p className="italic">About me</p>
        <div className="mb-1 w-full">
          <hr className="bg-app-gray h-0.25"></hr>
        </div>
        <p className="opacity-75  italic">{data.aboutMe}</p>
      </div>
      <div className="text-left text-xs text-white">
        <p className="italic">Area of Interest</p>
        <div className="mb-1 w-full">
          <hr className="bg-app-gray h-0.25"></hr>
        </div>
        <p className="opacity-75 italic">{data.profileMessage}</p>
      </div>
    </div>
  ),
};