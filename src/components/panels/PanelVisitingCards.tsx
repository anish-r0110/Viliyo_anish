import React, { useState } from "react";
import primaryCardImage from "../../assets/images/primaryCardImage.jpg";
import Image from "next/image";
import { AiOutlineMail } from "react-icons/ai";
import { BiPhone } from "react-icons/bi";
import { CiLinkedin } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";
import { Avatar } from "@radix-ui/themes";

export const PanelThirdCard = ({
  data,
  visitingCardData,
  profilePhoto,
}: any) => {
  const [isFront, setIsFront] = useState(true);

  const handleFlip = () => {
    setIsFront(!isFront);
  };
  return (
    <>
      <div
        className={`relative bg-white mobile:bg-white h-32 shadow-lg rounded-lg  items-center mobile:w-full transition-transform duration-500 transform ${
          isFront ? "" : "rotateY-180"
        }`}
      >
        {isFront ? (
          <div className="bg-gradient-to-tr h-32  from-cyan-900 from-30% via-amber-500 via-40% to-app-blue to-70% shadow-lg rounded-lg grid grid-cols-2  space-x-4  mobile:-space-x-4 mobile:w-full  mobile:p-2">
            <div className="py-1  mobile:p-0  laptop:pl-2  ">
              <div>
                <h4 className=" text-amber-400 truncate">
                  {data?.trainee_name
                    ? data?.trainee_name
                    : data?.name
                    ? data.name
                    : "Your Name"}
                </h4>
                <p className="text-white text-xs truncate">
                  {data?.role
                    ? data?.role
                    : data?.designation
                    ? data?.designation
                    : "Your Role"}
                </p>
              </div>
              <div className="py-0.5 text-xs text-white space-y-1 opacity-75 ">
                <div className="flex space-y-1">
                  <div className="pt-2">
                    <AiOutlineMail />
                  </div>
                  <p className="px-2 truncate">
                    {data?.trainee_email
                      ? data?.trainee_email
                      : data?.email
                      ? data?.email
                      : "Your Mail"}
                  </p>
                </div>
                <div className="flex">
                  <div>
                    <BiPhone />
                  </div>
                  <p className="px-1 truncate">
                    {" "}
                    {data?.phone ? data?.phone : "Your Phone"}
                  </p>
                </div>
                <div className="flex">
                  <div>
                    <CiLinkedin />
                  </div>
                  <p className="px-1 italic truncate">
                    {data?.linkedinLink
                      ? data?.linkedinLink
                      : data?.linkedIn
                      ? data?.linkedIn
                      : "Your link"}
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
            <div className="grid grid-rows-2  space-y-4  laptop:pb-6 laptop:px-0 mobile:p-0 ">
              {data?.profile_photo && (
                <Avatar
                  src={data?.profile_photo}
                  radius="small"
                  className="m-4"
                  fallback="?"
                />
              )}
              {profilePhoto && (
                <Avatar
                  src={profilePhoto}
                  radius="small"
                  className="m-4"
                  fallback="?"
                />
              )}

              <div>
                <button
                  className="bg-app-blue rounded-full  text-xs text-white  py-1  px-0.5 italic opacity-75 hover:scale-105 "
                  onClick={handleFlip}
                >
                  More about me
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className=" bg-white box-content h-32 shadow-lg rounded-lg p-2 grid grid-rows-2 mobile:space-y-3  laptop:space-y-1  desktop:space-y-3 largescreen:space-y-3 ">
            <div className="text-left text-xs">
              <p className="text-app-blue font-bold italic">About me</p>
              <div className="mb-2 w-full">
                <hr className="bg-app-blue h-0.5"></hr>
              </div>
              <p className="text-zinc-600 italic">
                {data?.short_bio
                  ? data?.short_bio
                  : data?.about
                  ? data?.about
                  : "Your Bio Data"}
              </p>
            </div>
            <div className="text-left text-xs">
              <p className="text-app-blue font-bold italic">Area of Interest</p>
              <div className="mb-2 w-full">
                <hr className="bg-app-blue h-0.5"></hr>
              </div>
              <p className="text-zinc-600 italic">
                {data?.hobbies
                  ? data?.hobbies
                  : data?.interest
                  ? data?.interest
                  : "Your Interest"}
              </p>
            </div>
            <div className="flex justify-end">
              <button
                className="text-xs text-white bg-app-blue rounded-full px-4 py-1  opacity-75 italic hover:scale-105"
                onClick={handleFlip}
              >
                Flip
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export const PanelSecondCard = ({ data, profilePhoto }: any) => {
  const [isFront, setIsFront] = useState(true);

  const handleFlip = () => {
    setIsFront(!isFront);
  };

  return (
    <>
      <div
        className={`relative bg-white mobile:bg-white h-32 shadow-lg rounded-lg  items-center mobile:w-full transition-transform duration-500 transform  ${
          isFront ? "" : "rotateY-180"
        }`}
      >
        {isFront ? (
          <div className="absolute w-full h-32  backface-hidden ">
            <div className=" bg-white  shadow-lg rounded-lg grid grid-cols-2  space-x-2 mobile:w-full laptop:h-36   box-content">
              <div className="py-2 mobile:py-0">
                <div className="bg-gradient-to-r from-app-blue to-app-purple border-2 rounded-r-2xl p-2">
                  <h2 className="text-xl laptop:text-sm text-amber-400 truncate font-bold">
                    {data?.trainee_name
                      ? data?.trainee_name
                      : data?.name
                      ? data.name
                      : "Your Name"}
                  </h2>
                  <p className="text-xs text-white truncate">
                    {data?.role
                      ? data?.role
                      : data?.designation
                      ? data?.designation
                      : "Your Role"}
                  </p>
                </div>
                <div className="text-xs px-2 space-y-1 mobile:p-1">
                  <div className="flex space-y-1">
                    <div className="text-gray-500 pt-2">
                      <AiOutlineMail />
                    </div>
                    <p className="px-1 text-app-blue truncate">
                      {data?.trainee_email
                        ? data?.trainee_email
                        : data?.email
                        ? data?.email
                        : "Your Mail"}
                    </p>
                  </div>
                  <div className="flex">
                    <div className="text-gray-500">
                      <BiPhone />
                    </div>
                    <p className="px-1 text-app-blue truncate">
                      {data?.phone ? data?.phone : "Your Phone"}
                    </p>
                  </div>
                  <div className="flex">
                    <div className="text-gray-500 ">
                      <CiLinkedin />
                    </div>
                    <p className="px-1 text-app-blue italic truncate">
                      {data?.linkedinLink
                        ? data?.linkedinLink
                        : data?.linkedIn
                        ? data?.linkedIn
                        : "Your link"}
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
                  {data?.profile_photo && (
                    <img
                      src={data?.profile_photo}
                      className="object-cover w-36 h-36"
                    ></img>
                  )}
                  {profilePhoto && (
                    <img
                      src={profilePhoto}
                      className="object-cover w-36 h-36"
                    ></img>
                  )}
                </div>
                <div className="-mt-12">
                  <button
                    className="bg-app-blue rounded-full text-xs text-white px-0.5 py-1 opacity-75 italic hover:scale-105  laptop:mt-2 "
                    onClick={handleFlip}
                  >
                    More about me
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={`absolute w-full  backface-hidden `}>
            <div className=" bg-blue-950 box-content h-32 shadow-lg rounded-lg px-4 py-2 grid grid-rows-2  mobile:space-y-5  laptop:space-y-1  desktop:space-y-5 largescreen:space-y-5  ">
              <div className="text-left text-xs text-white">
                <p className="italic">About me</p>
                <div className="mb-1 w-full">
                  <hr className="bg-app-gray h-0.25"></hr>
                </div>
                <p className="opacity-75  italic">
                  {data?.short_bio
                    ? data?.short_bio
                    : data?.about
                    ? data?.about
                    : "Your Bio Data"}
                </p>
              </div>
              <div className="text-left text-xs text-white">
                <p className="italic">Area of Interest</p>
                <div className="mb-1 w-full">
                  <hr className="bg-app-gray h-0.25"></hr>
                </div>
                <p className="opacity-75 italic">
                  {data?.hobbies
                    ? data?.hobbies
                    : data?.interest
                    ? data?.interest
                    : "Your Interest"}
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  className="text-xs text-white bg-app-blue rounded-full px-4 py-1  opacity-75 italic hover:scale-105"
                  onClick={handleFlip}
                >
                  Flip
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const PanelFirstCard = ({ data, profilePhoto }: any) => {
  const [isFront, setIsFront] = useState(true);

  const handleFlip = () => {
    setIsFront(!isFront);
  };

  return (
    <>
      <div
        className={`relative bg-white mobile:bg-white h-32 shadow-lg rounded-lg  items-center mobile:w-full transition-transform duration-500 transform ${
          isFront ? "" : "rotateY-180"
        }`}
      >
        {/* Front Side */}
        {isFront ? (
          <div className="absolute w-full h-32  backface-hidden ">
            <div className="bg-white  shadow-lg rounded-lg grid grid-cols-2  space-x-2 mobile:w-full laptop:h-36   box-content">
              <div className="col-span-1 py-4">
                <Image
                  src={primaryCardImage}
                  alt="primaryCardImage"
                  height={100}
                  width={100}
                />
              </div>

              <div className="py-1  col-span-1 flex flex-col">
                <h6 className="text-xs font-bold text-amber-400 mobile:text-xs laptop:text-xs truncate">
                  {data?.trainee_name
                    ? data?.trainee_name
                    : data?.name
                    ? data.name
                    : "Your Name"}
                </h6>
                <div className="text-xs truncate">
                  {data?.role
                    ? data?.role
                    : data?.designation
                    ? data?.designation
                    : "Your Role"}
                </div>
                <div className="space-y-1 laptop:space-y-1">
                  <div className=" text-xs space-y-1">
                    <div className="flex">
                      <div className="text-gray-500 pt-1">
                        <AiOutlineMail />
                      </div>
                      <p className="px-1 text-app-blue truncate">
                        {data?.trainee_email
                          ? data?.trainee_email
                          : data?.email
                          ? data?.email
                          : "Your Mail"}
                      </p>
                    </div>
                    <div className="flex">
                      <div className="text-gray-500 ">
                        <BiPhone />
                      </div>
                      <p className="px-1 text-app-blue truncate">
                        {data?.phone ? data?.phone : "Your Phone"}
                      </p>
                    </div>
                    <div className="flex">
                      <div className="text-gray-500 ">
                        <CiLinkedin />
                      </div>
                      <div className="px-1 text-app-blue italic truncate">
                        {data?.linkedinLink
                          ? data?.linkedinLink
                          : data?.linkedIn
                          ? data?.linkedIn
                          : "Your link"}
                      </div>
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
                  <div className="flex justify-end absolute mobile:justify-start pl-6 laptop:pl-0">
                    <button
                      className="bg-app-blue rounded-full text-xs text-white p-1  opacity-75 italic hover:scale-105"
                      onClick={handleFlip}
                    >
                      More about me
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={`absolute w-full h-full  backface-hidden `}>
            <div className="box-content h-32 bg-gradient-to-br from-40% from-app-blue to-yellow-500 shadow-lg rounded-lg p-2 grid grid-rows-2 mobile:space-y-5  laptop:space-y-1 desktop:space-y-5 largescreen:space-y-5">
              <div className="text-left text-xs text-white italic">
                <p>About me</p>
                <div className="mb-1 w-full">
                  <hr className="bg-app-gray h-0.25"></hr>
                </div>
                <p className="opacity-75">
                  {data?.short_bio
                    ? data?.short_bio
                    : data?.about
                    ? data?.about
                    : "Your Bio Data"}
                </p>
              </div>
              <div className="text-left text-xs text-white italic">
                <p>Area of Interest</p>
                <div className="mb-1 w-full">
                  <hr className="bg-app-gray h-0.25"></hr>
                </div>
                <p className="opacity-75">
                  {data?.hobbies
                    ? data?.hobbies
                    : data?.interest
                    ? data?.interest
                    : "Your Interest"}
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  className="text-xs text-white bg-app-blue rounded-full px-4 py-1 opacity-75 italic hover:scale-105"
                  onClick={handleFlip}
                >
                  Flip
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PanelFirstCard;
