import { Layout, VisitingCard } from "@/interfaces/VisitingCard";
import { AiOutlineMail } from "react-icons/ai";
import { BiPhone } from "react-icons/bi";
import { CiLinkedin } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";

export const SecondaryLayout: Layout = {
  front: (data: VisitingCard) => (
    <div
      className={`relative bg-white mobile:bg-white h-32 shadow-lg rounded-lg  items-center mobile:w-full transition-transform duration-500 transform`}
    >
      <div className="absolute w-full h-32  backface-hidden">
        <div className=" bg-white  shadow-lg rounded-lg grid grid-cols-2  space-x-2 mobile:w-full laptop:h-36  box-content">
          <div className="py-2 mobile:py-0">
            <div className="bg-gradient-to-r from-app-blue to-app-purple border-2 rounded-r-2xl p-2">
              <h2 className="text-xl laptop:text-sm text-amber-400 truncate font-bold">
                {data?.trainee_name ? data?.trainee_name : "Your Name"}
              </h2>
              <p className="text-xs text-white truncate">
                {data?.role ? data?.role : "Your Role"}
              </p>
            </div>
            <div className="text-xs px-2 space-y-1 mobile:p-1">
              <div className="flex space-y-1">
                <div className="text-gray-500 pt-2">
                  <AiOutlineMail />
                </div>
                <p className="px-1 text-app-blue truncate">
                  {data?.trainee_email ? data?.trainee_email : "Your Mail"}
                </p>
              </div>
              <div className="flex">
                <div className="text-gray-500">
                  <BiPhone />
                </div>
                <p className="px-1 text-app-blue truncate">Your Phone</p>
              </div>
              <div className="flex">
                <div className="text-gray-500 ">
                  <CiLinkedin />
                </div>
                <p className="px-1 text-app-blue italic truncate">
                  {data?.linkedinLink ? data?.linkedinLink : "Your link"}
                </p>
              </div>
              <div className="flex">
                <div className="text-gray-500 ">
                  <TbWorld />
                </div>
                <p className="px-1  text-app-blue italic truncate">
                  {data?.website ? data?.website : "Your website"}
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-1 object-cover w-fit h-fit flex flex-col">
            <div>
              <img
                src={data?.profile_photo}
                className="object-cover w-36 h-36"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
