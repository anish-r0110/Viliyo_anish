import { Layout, VisitingCard } from "@/interfaces/VisitingCard";
import primaryCardImage from "../../../assets/images/primaryCardImage.jpg";
import Image from "next/image";
import { AiOutlineMail } from "react-icons/ai";
import { BiPhone } from "react-icons/bi";
import { CiLinkedin } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";
import { IoRadioButtonOffSharp, IoRadioButtonOn } from "react-icons/io5";

export const PrimaryLayout: Layout = {
  front: (
    data: VisitingCard,
    { handleSelect, selectCard, isDefault, setDefault }: any
  ) => (
    <>
      <div
        className={`relative bg-white mobile:bg-white h-32 shadow-lg rounded-lg  items-center mobile:w-full transition-transform duration-500 transform`}
      >
        <div className="absolute w-full h-32 backface-hidden space-y-4">
          <div className="bg-white shadow-lg rounded-lg grid grid-cols-2  space-x-2 mobile:w-full laptop:h-36 box-content">
            <div className="col-span-1 py-4">
              <Image
                src={primaryCardImage}
                alt="primaryCardImage"
                height={200}
                width={200}
              />
            </div>

            <div className="py-1 col-span-1 flex flex-col">
              <div className="py-2">
                <h2 className=" font-bold text-amber-400 mobile:text-xs  truncate">
                  {data?.trainee_name ? data?.trainee_name : "Your Name"}
                </h2>
                <p className="text-xs truncate">
                  {data?.role ? data?.role : "Your Role"}
                </p>
              </div>
              <div className="space-y-1 laptop:space-y-1">
                <div className=" text-xs space-y-1">
                  <div className="flex">
                    <div className="text-gray-500 pt-1">
                      <AiOutlineMail />
                    </div>
                    <p className="px-1 text-app-blue truncate">
                      {data?.trainee_email ? data?.trainee_email : "Your Mail"}
                    </p>
                  </div>
                  <div className="flex">
                    <div className="text-gray-500 ">
                      <BiPhone />
                    </div>
                    <p className="px-1 text-app-blue truncate">
                      Your Phone Number
                    </p>
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
            </div>
          </div>
        </div>
      </div>
    </>
  ),
};
