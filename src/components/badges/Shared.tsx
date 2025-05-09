
import React from "react";
import BRILLIANT_EFFORT from "@/assets/icons/badges/brilliant-effort.svg";
import CREATIVE_THINKER from "@/assets/icons/badges/creative-thinker.svg";
import EXEMPLARY_LEADER from "@/assets/icons/badges/exemplary-leader.svg";
import STAR_PARTICIPANT from "@/assets/icons/badges/star-participant.svg";
import TEAM_PLAYER from "@/assets/icons/badges/team-player.svg";
import TOP_CONTRIBUTOR from "@/assets/icons/badges/top-contributor.svg";
import Image from "next/image";


interface Props{
   sessionId:number
}


const Shared = ({ sessionId }: Props) => {
 

  return (
    <>
      <div className="flex flex-col w-auto h-auto justify-center gap-2">
        {/* Brilliant Effort */}
        <div className="flex p-2 bg-white rounded-2xl justify-evenly justify-items-center gap-4 h-20 text-xs">
          <Image
            src={BRILLIANT_EFFORT}
            alt="BRILLIANT EFFORT"
            width={96}
            height={96}
          />

          <div className="flex flex-col w-28 h-16 bg-app-blue rounded-xl ml-4 p-2 text-white justify-center items-center font-semibold">
            <p className="justify-center">Shared</p>
            <p className="justify-center">{sessionId}</p>
          </div>

          <div className="flex flex-grow flex-col bg-app-gray-light w-36 h-16 p-2 rounded-xl justify-stretch">
            <p className="flex flex-row justify-between mb-0">
              <span className="flex items-start text-[10px]">Shared To</span>
              <span className="flex text-end font-extrabold cursor-pointer">
                {"< >"}
              </span>
            </p>
            <hr className="bg-app-gray-medium h-0.5 mt-0"></hr>
            <div className="flex text-xs p-1 font-thin">
              {"No Badges Shared"}
            </div>
          </div>
        </div>

        {/* CREATIVE_THINKER */}
        <div className="flex p-2 bg-white rounded-2xl justify-evenly justify-items-center gap-4 h-20 text-xs">
          <Image
            src={CREATIVE_THINKER}
            alt="CREATIVE_THINKER"
            width={96}
            height={96}
          />

          <div className="flex flex-col w-28 h-16 bg-app-blue rounded-xl ml-4 p-2 text-white justify-center items-center font-semibold">
            <p className="justify-center">Shared</p>
            <p className="justify-center">{sessionId}</p>
          </div>

          <div className="flex flex-grow flex-col bg-app-gray-light w-36 h-16 p-2 rounded-xl justify-stretch">
            <p className="flex flex-row justify-between mb-0">
              <span className="flex items-start text-[10px]">Shared To</span>
              <span className="flex text-end font-extrabold cursor-pointer">
                {"< >"}
              </span>
            </p>
            <hr className="w-full bg-app-gray-medium h-0.5 mt-0"></hr>
            <div className="flex text-xs p-1 font-thin">
              {"No Badges Shared"}
            </div>
          </div>
        </div>

        {/* EXEMPLARY_LEADER */}
        <div className="flex p-2 bg-white rounded-2xl justify-evenly justify-items-center gap-4 h-20 text-xs">
          <Image
            src={EXEMPLARY_LEADER}
            alt="EXEMPLARY_LEADER"
            width={96}
            height={96}
          />

          <div className="flex flex-col w-28 h-16 bg-app-blue rounded-xl ml-4 p-2 text-white justify-center items-center font-semibold">
            <p className="justify-center">Shared</p>
            <p className="justify-center">{sessionId}</p>
          </div>

          <div className="flex flex-grow flex-col bg-app-gray-light w-36 h-16 p-2 rounded-xl justify-stretch">
            <p className="flex flex-row justify-between mb-0">
              <span className="flex items-start text-[10px]">Shared To</span>
              <span className="flex text-end font-extrabold cursor-pointer">
                {"< >"}
              </span>
            </p>
            <hr className="w-full bg-app-gray-medium h-0.5 mt-0"></hr>
            <div className="flex text-xs p-1 font-thin">
              {"No Badges Shared"}
            </div>
          </div>
        </div>

        {/* STAR_PARTICIPANT */}
        <div className="flex p-2 bg-white rounded-2xl justify-evenly justify-items-center gap-4 h-20 text-xs">
          <Image
            src={STAR_PARTICIPANT}
            alt="STAR_PARTICIPANT"
            width={96}
            height={96}
          />

          <div className="flex flex-col w-28 h-16 bg-app-blue rounded-xl ml-4 p-2 text-white justify-center items-center font-semibold">
            <p className="justify-center">Shared</p>
            <p className="justify-center">{sessionId}</p>
          </div>

          <div className="flex flex-grow flex-col bg-app-gray-light w-36 h-16 p-2 rounded-xl justify-stretch">
            <p className="flex flex-row justify-between mb-0">
              <span className="flex items-start text-[10px]">Shared To</span>
              <span className="flex text-end font-extrabold cursor-pointer">
                {"< >"}
              </span>
            </p>
            <hr className="w-full bg-app-gray-medium h-0.5 mt-0"></hr>
            <div className="flex text-xs p-1 font-thin">
              {"No Badges Shared"}
            </div>
          </div>
        </div>

        {/* TEAM_PLAYER */}
        <div className="flex p-2 bg-white rounded-2xl justify-evenly justify-items-center gap-4 h-20 text-xs">
          <Image src={TEAM_PLAYER} alt="TEAM_PLAYER" width={96} height={96} />

          <div className="flex flex-col w-28 h-16 bg-app-blue rounded-xl ml-4 p-2 text-white justify-center items-center font-semibold">
            <p className="justify-center">Shared</p>
            <p className="justify-center">{sessionId}</p>
          </div>

          <div className="flex flex-grow flex-col bg-app-gray-light w-36 h-16 p-2 rounded-xl justify-stretch">
            <p className="flex flex-row justify-between mb-0">
              <span className="flex items-start text-[10px]">Shared To</span>
              <span className="flex text-end font-extrabold cursor-pointer">
                {"< >"}
              </span>
            </p>
            <hr className="w-full bg-app-gray-medium h-0.5 mt-0"></hr>
            <div className="flex text-xs p-1 font-thin">
              {"No Badges Shared"}
            </div>
          </div>
        </div>

        {/* TOP_CONTRIBUTOR */}
        <div className="flex p-2 bg-white rounded-2xl justify-evenly justify-items-center gap-4 h-20 text-xs">
          <Image
            src={TOP_CONTRIBUTOR}
            alt="TOP_CONTRIBUTOR"
            width={96}
            height={96}
          />

          <div className="flex flex-col w-28 h-16 bg-app-blue rounded-xl ml-4 p-2 text-white justify-center items-center font-semibold">
            <p className="justify-center">Shared</p>
            <p className="justify-center">{sessionId}</p>
          </div>

          <div className="flex flex-grow flex-col bg-app-gray-light w-36 h-16 p-2 rounded-xl justify-stretch">
            <p className="flex flex-row justify-between mb-0">
              <span className="flex items-start text-[10px]">
                Shared To is changing here
              </span>
              <span className="flex text-end font-extrabold cursor-pointer">
                {"< >"}
              </span>
            </p>
            <hr className="w-full bg-app-gray-medium h-0.5 mt-0"></hr>
            {/* Adjusted styling here */}
            <div className="flex text-xs p-1 font-thin">
              {"No Badges Shared"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shared;
