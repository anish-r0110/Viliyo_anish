import { Layout } from "@/interfaces/VisitingCard";
import primaryCardImage from "@/assets/images/primaryCardImage.jpg";
import Image from "next/image";
import { AiOutlineMail } from "react-icons/ai";
import { BiPhone } from "react-icons/bi";
import { CiLinkedin } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";
import { User } from "@/models/User";

export const PrimaryLayout: Layout = {

  front : (data: User) => (
    <div className=" bg-white mobile:bg-white h-52 shadow-lg rounded-lg grid grid-cols-2 items-center mt-2 mobile:w-full">
      <div>
        <Image
          src={primaryCardImage}
          alt="primaryCardImage"
          width={200}
          height={200}
        />
      </div>

      <div className="p-3 mobile:p-1">
        <h2 className="text-xl font-bold text-amber-400 mobile:text-base laptop:text-base truncate">
          {data.name}
        </h2>
        <p className="font-bold text-xs">{data.designation}</p>
        <div className="space-y-4 laptop:space-y-1">
          <div className="py-2 text-xs space-y-1">
            <div className="flex">
              <div className="text-gray-500 pt-1">
                <AiOutlineMail />
              </div>
              <p className="px-1 text-app-blue truncate">{data.email}</p>
            </div>
            <div className="flex">
              <div className="text-gray-500 ">
                <BiPhone />
              </div>
              <p className="px-1 text-app-blue truncate">{'1234567890'}</p>
            </div>
            <div className="flex">
              <div className="text-gray-500 ">
                <CiLinkedin />
              </div>
              <div className="px-1 text-app-blue italic truncate">
              {data.linkedIn}
              </div>
            </div>
            <div className="flex">
              <div className="text-gray-500 ">
                <TbWorld />
              </div>
              <p className="px-1  text-app-blue italic">{data.website}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  back: (data: User) => (
    <div className="bg-gradient-to-br box-content h-44 from-40% from-app-blue to-yellow-500 shadow-lg rounded-lg p-4 grid grid-rows-2 mobile:space-y-5  laptop:space-y-1 desktop:space-y-5 largescreen:space-y-5">
      <div className="text-left text-xs text-white italic">
        <p>About me</p>
        <div className="mb-1 w-full">
          <hr className="bg-app-gray h-0.25"></hr>
        </div>
        <p className="opacity-75">{data.aboutMe}</p>
      </div>
      <div className="text-left text-xs text-white italic">
        <p>Area of Interest</p>
        <div className="mb-1 w-full">
          <hr className="bg-app-gray h-0.25"></hr>
        </div>
        <p className="opacity-75">{data.profileMessage}</p>
      </div>
    </div>
  ),


};