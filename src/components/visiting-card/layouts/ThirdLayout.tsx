import { Layout } from "@/interfaces/VisitingCard";
import Image from "next/image";
import { AiOutlineMail } from "react-icons/ai";
import { BiPhone } from "react-icons/bi";
import { CiLinkedin } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";
import { User } from "@/models/User";


export const ThirdLayout: Layout = {
  front: (data: User ) => (
    <div className="bg-gradient-to-tr from-cyan-900 from-30% via-amber-500 via-40% to-app-blue to-70% h-52 shadow-lg rounded-lg grid grid-cols-2 mt-2 space-x-2 mobile:-space-x-4 mobile:w-full  justify-end  mobile:p-2">
      <div className="py-8 px-4 mobile:p-0  laptop:pl-2  laptop:py-3">
        <div>
          <h2 className="text-xl text-amber-400">{data.name}</h2>
          <p className="text-white text-xs">{data.designation}</p>
        </div>
        <div className="py-4 text-xs text-white space-y-1 opacity-75 ">
          <div className="flex space-y-1">
            <div className="pt-2">
              <AiOutlineMail />
            </div>
            <p className="px-2 truncate">{data.email}</p>
          </div>
          <div className="flex">
            <div>
              <BiPhone />
            </div>
            <p className="px-1 truncate">{'1234567890'}</p>
          </div>
          <div className="flex">
            <div>
              <CiLinkedin />
            </div>
            <p className="px-1 italic truncate">{data.linkedIn}</p>
          </div>
          <div className="flex">
            <div>
              <TbWorld />
            </div>
            <p className="px-1 italic">{data.website}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-rows-2 px-6 py-4 laptop:px-2 mobile:p-0">
        <div className=" place-self-end">
          <Image
            src={data.profileImage}
            alt="primaryCardImage"
            height={90}
            width={90}
            className="rounded-xl"
          />
        </div>
      </div>
    </div>
  ),
  back: (data: User) => (
    <div className=" bg-white box-content h-44 shadow-lg rounded-lg p-4 grid grid-rows-2 mobile:space-y-3  laptop:space-y-1  desktop:space-y-3 largescreen:space-y-3 ">
      <div className="text-left text-xs">
        <p className="text-app-blue font-bold italic">About me</p>
        <div className="mb-2 w-full">
          <hr className="bg-app-blue h-0.5"></hr>
        </div>
        <p className="text-zinc-600 italic">{data.aboutMe}</p>
      </div>
      <div className="text-left text-xs">
        <p className="text-app-blue font-bold italic">Area of Interest</p>
        <div className="mb-2 w-full">
          <hr className="bg-app-blue h-0.5"></hr>
        </div>
        <p className="text-zinc-600 italic">{data.profileMessage}</p>
      </div>
    </div>
  ),
};