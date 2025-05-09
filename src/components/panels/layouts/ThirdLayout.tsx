import { Layout, VisitingCard } from "@/interfaces/VisitingCard";
import { AiOutlineMail } from "react-icons/ai";
import { BiPhone } from "react-icons/bi";
import { CiLinkedin } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";
import { Avatar } from "@radix-ui/themes";

export const ThirdLayout: Layout = {
  front: (data: VisitingCard) => (
    <div
      className={`relative bg-white mobile:bg-white h-32 shadow-lg rounded-lg  items-center mobile:w-full transition-transform duration-500 transform`}
    >
      <div className="bg-gradient-to-tr  from-cyan-900 from-30% via-amber-500 via-40% to-app-blue to-70%  h-32 my-2 shadow-lg rounded-lg grid grid-cols-3 justify-end">
        <div className="pl-4 mobile:p-0 laptop:pl-2 col-span-2">
          <div>
            <p className="text-amber-400 truncate font-medium">
              {data?.trainee_name ? data?.trainee_name : "Your Name"}
            </p>
            <p className="text-white text-xs truncate">
              {data?.role ? data?.role : "Your Role"}
            </p>
          </div>
          <div className=" py-1 text-xs text-white space-y-1 opacity-75 ">
            <div className="flex space-y-1">
              <div className="pt-2">
                <AiOutlineMail />
              </div>
              <p className="px-2 truncate">
                {data?.trainee_email ? data?.trainee_email : "Your Mail"}
              </p>
            </div>
            <div className="flex">
              <div>
                <BiPhone />
              </div>
              <p className="px-1 truncate">Your Contact</p>
            </div>
            <div className="flex">
              <div>
                <CiLinkedin />
              </div>
              <p className="px-1 italic truncate">
                {data?.linkedinLink ? data?.linkedinLink : "Your link"}
              </p>
            </div>
            <div className="flex">
              <div>
                <TbWorld />
              </div>
              <p className="px-1 italic truncate">
                {data?.website ? data?.website : "Your website"}
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-rows-2  space-y-2 laptop:pb-6 laptop:px-0 mobile:p-0 ">
          <Avatar
            src={data?.profile_photo}
            radius="small"
            className="m-4"
            fallback="?"
          />
        </div>
      </div>
    </div>
  ),
};
