import React, { useEffect, useState } from "react";
import BRILLIANT_EFFORT from "@/assets/icons/badges/brilliant-effort.svg";
import CREATIVE_THINKER from "@/assets/icons/badges/creative-thinker.svg";
import EXEMPLARY_LEADER from "@/assets/icons/badges/exemplary-leader.svg";
import STAR_PARTICIPANT from "@/assets/icons/badges/star-participant.svg";
import TEAM_PLAYER from "@/assets/icons/badges/team-player.svg";
import TOP_CONTRIBUTOR from "@/assets/icons/badges/top-contributor.svg";
import Image from "next/image";
import IBadge from "./interface/Badge";

interface Props {
  badgeData: IBadge[];
}

const Recieved: React.FC<Props> = ({ badgeData }) => {
  const [badgeCounts, setBadgeCounts] = useState<{ [key: string]: number }>({
    "Brilliant Effort": 0,
    "Creative Thinker": 0,
    "Exemplary Leader": 0,
    "Star Participant": 0,
    "Team Player": 0,
    "Top Contributor": 0,
  });
  const [senderNames, setSenderNames] = useState<{ [key: string]: string[] }>({
    "Brilliant Effort": [],
    "Creative Thinker": [],
    "Exemplary Leader": [],
    "Star Participant": [],
    "Team Player": [],
    "Top Contributor": [],
  });


  useEffect(() => {
    // Calculate badge counts and sender names based on badgeData
    const newBadgeCounts: { [key: string]: number } = {};
    const newSenderNames: { [key: string]: string[] } = {};

    badgeData.forEach((badge) => {
      const { achievementName, senderName } = badge;
      if (!newBadgeCounts[achievementName]) {
        newBadgeCounts[achievementName] = 1;
      } else {
        newBadgeCounts[achievementName]++;
      }

      if (!newSenderNames[achievementName]) {
        newSenderNames[achievementName] = [senderName];
      } else {
        newSenderNames[achievementName].push(senderName);
      }
    });

    setBadgeCounts(newBadgeCounts);
    setSenderNames(newSenderNames);
  }, [badgeData]);
  return (
    <>
      <div className="flex mobile:hidden flex-col w-auto h-auto justify-center justify-items-center items-baseline gap-2">
        {/* BRILLIANT_EFFORT */}
        <div className="flex p-2 bg-white rounded-2xl justify-evenly justify-items-center gap-4 h-20 text-xs">
          <Image
            src={BRILLIANT_EFFORT}
            alt="BRILLIANT_EFFORT"
            width={96}
            height={96}
          />

          <div className="flex flex-col w-28 h-16 bg-app-blue rounded-xl ml-4 p-2 text-white justify-center items-center font-semibold">
            <p className="justify-center">Received</p>
            <p className="justify-center">
              {badgeCounts["Brilliant Effort"] ?? 0}
            </p>
          </div>

          <div className="flex flex-grow flex-col bg-app-gray-light w-60 h-16 p-2 rounded-xl justify-start">
            <p className="flex flex-row justify-between mb-0">
              <span className="flex items-start text-[10px]">Shared By</span>
              <span className="flex text-end font-extrabold cursor-pointer">
                {"< >"}
              </span>
            </p>
            <p>
              <hr className="w-full bg-app-gray-medium h-0.5 mt-0"></hr>
            </p>
            <div className="flex text-xs p-1 font-thin">
              {senderNames["Brilliant Effort"] &&
              senderNames["Brilliant Effort"].length > 0 ? (
                <div className="flex text-xs p-1">
                  {senderNames["Brilliant Effort"].join(", ")}
                </div>
              ) : (
                <div className="flex text-xs p-1">No Badges Recieved</div>
              )}
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
            <p className="justify-center">Recieved</p>
            <p className="justify-center">
              {badgeCounts["Creative Thinker"] ?? 0}
            </p>
          </div>

          <div className="flex flex-grow flex-col bg-app-gray-light w-60 h-16 p-2 rounded-xl justify-stretch ">
            <p className="flex flex-row justify-between mb-0">
              <span className="flex items-start text-[10px]">Shared By</span>
              <span className="flex text-end font-extrabold cursor-pointer">
                {"< >"}
              </span>
            </p>
            <p>
              <hr className="w-full bg-app-gray-medium h-0.5 mt-0"></hr>
            </p>
            <div className="flex text-xs p-1 font-thin">
              {senderNames["Creative Thinker"] &&
              senderNames["Creative Thinker"].length > 0 ? (
                <div className="flex text-xs p-1">
                  {senderNames["Creative Thinker"].join(", ")}
                </div>
              ) : (
                <div className="flex text-xs p-1">No Badges Recieved</div>
              )}
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
            <p className="justify-center">Recieved</p>
            <p className="justify-center">
              {badgeCounts["Exemplary Leader"] ?? 0}
            </p>
          </div>

          <div className="flex flex-grow flex-col bg-app-gray-light w-60 h-16 p-2 rounded-xl justify-stretch">
            <p className="flex flex-row justify-between mb-0">
              <span className="flex items-start text-[10px]">Shared By</span>
              <span className="flex text-end font-extrabold cursor-pointer">
                {"< >"}
              </span>
            </p>
            <p>
              <hr className="w-full bg-app-gray-medium h-0.5 mt-0"></hr>
            </p>
            <div className="flex text-xs p-1 font-thin">
              {senderNames["Exemplary Leader"] &&
              senderNames["Exemplary Leader"].length > 0 ? (
                <div className="flex text-xs p-1">
                  {senderNames["Exemplary Leader"].join(", ")}
                </div>
              ) : (
                <div className="flex text-xs p-1">No Badges Recieved</div>
              )}
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
            <p className="justify-center">Recieved</p>
            <p className="justify-center">
              {badgeCounts["Star Participant"] ?? 0}
            </p>
          </div>

          <div className="flex flex-grow flex-col bg-app-gray-light w-60 h-16 p-2 rounded-xl justify-stretch ">
            <p className="flex flex-row justify-between mb-0">
              <span className="flex items-start text-[10px]">Shared By</span>
              <span className="flex text-end font-extrabold cursor-pointer">
                {"< >"}
              </span>
            </p>
            <p>
              <hr className="w-full bg-app-gray-medium h-0.5 mt-0"></hr>
            </p>
            <div className="flex text-xs p-1 font-thin">
              {senderNames["Star Participant"] &&
              senderNames["Star Participant"].length > 0 ? (
                <div className="flex text-xs p-1">
                  {senderNames["Star Participant"].join(", ")}
                </div>
              ) : (
                <div className="flex text-xs p-1">No Badges Recieved</div>
              )}
            </div>
          </div>
        </div>

        {/* TEAM_PLAYER */}
        <div className="flex p-2 bg-white rounded-2xl justify-evenly justify-items-center gap-4 h-20 text-xs">
          <Image src={TEAM_PLAYER} alt="TEAM_PLAYER" width={96} height={96} />

          <div className="flex flex-col w-28 h-16 bg-app-blue rounded-xl ml-4 p-2 text-white justify-center items-center text-xs font-semibold">
            <p className="justify-center text-[12px]">Recieved</p>
            <p className="justify-center text-[12px]">
              {badgeCounts["Team Player"] ?? 0}
            </p>
          </div>

          <div className="flex flex-grow flex-col bg-app-gray-light w-60 h-16 p-2 rounded-xl justify-stretch ">
            <p className="flex flex-row justify-between mb-0">
              <span className="flex items-start text-[10px]">Shared By</span>
              <span className="flex text-end font-extrabold cursor-pointer">
                {"< >"}
              </span>
            </p>
            <p>
              <hr className="w-full bg-app-gray-medium h-0.5 mt-0"></hr>
            </p>
            <div className="flex text-xs p-1 font-thin">
              {senderNames["Team Player"] &&
              senderNames["Team Player"].length > 0 ? (
                <div className="flex text-xs p-1">
                  {senderNames["Team Player"].join(", ")}
                </div>
              ) : (
                <div className="flex text-xs p-1">No Badges Recieved</div>
              )}
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
            <p className="justify-center">Recieved</p>
            <p className="justify-center">
              <p className="justify-center">
                {badgeCounts["Top Contributer"] ?? 0}
              </p>
            </p>
          </div>

          <div className="flex flex-grow flex-col bg-app-gray-light w-60 h-16 p-2 rounded-xl justify-stretch ">
            <p className="flex flex-row justify-between mb-0">
              <span className="flex items-start text-[10px]">Shared By</span>
              <span className="flex text-end font-extrabold cursor-pointer">
                {"< >"}
              </span>
            </p>
            <p>
              <hr className="w-full bg-app-gray-medium h-0.5 mt-0"></hr>
            </p>
            <div className="flex text-xs p-1 font-thin">
              {senderNames["Exemplary Leader"] &&
              senderNames["Exemplary Leader"].length > 0 ? (
                <div className="flex text-xs p-1">
                  {senderNames["Exemplary Leader"].join(", ")}
                </div>
              ) : (
                <div className="flex text-xs p-1">No Badges Recieved</div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Targeting Mobile Device */}
      <div className="hidden mobile:flex mobile:flex-col w-full justify-center items-baseline gap-1">
        {/* BRILLIANT_EFFORT */}
        <div className="flex p-1 bg-white rounded-2xl justify-evenly justify-items-center gap-2 h-18 text-xs">
          <Image
            src={BRILLIANT_EFFORT}
            alt="BRILLIANT_EFFORT"
            width={76}
            height={76}
          />

          <div className="flex flex-col w-16 h-14 bg-app-blue rounded-xl ml-1 p-2 text-white justify-center items-center font-semibold text-[10px]">
            <p className="justify-center">Received</p>
            <p className="justify-center">
              {badgeCounts["Brilliant Effort"] ?? 0}
            </p>
          </div>

          <div className="flex  flex-col flex-grow bg-app-gray-light w-[150px] h-14 p-2 rounded-xl justify-start">
            <p className="flex flex-row justify-between mb-0">
              <span className="flex items-start text-[10px]">Shared By</span>
              <span className="flex text-end font-extrabold cursor-pointer">
                {"< >"}
              </span>
            </p>
            <p>
              <hr className="w-full bg-app-gray-medium h-0.5 mt-0"></hr>
            </p>
            <div className="flex text-xs p-1 font-thin">
              {senderNames["Brilliant Effort"] &&
              senderNames["Brilliant Effort"].length > 0 ? (
                <div className="flex p-1">
                  {senderNames["Brilliant Effort"].join(", ")}
                </div>
              ) : (
                <div className="flex text-xs p-1 whitespace-nowrap">
                  No Badges Recieved
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CREATIVE_THINKER */}
        <div className="flex p-1 bg-white rounded-2xl justify-evenly justify-items-center gap-2 h-18 text-xs">
          <Image
            src={CREATIVE_THINKER}
            alt="CREATIVE_THINKER"
            width={76}
            height={76}
          />

          <div className="flex flex-col w-16 h-14 bg-app-blue rounded-xl ml-1 p-2 text-white justify-center items-center font-semibold text-[10px]">
            <p className="justify-center">Recieved</p>
            <p className="justify-center">
              {badgeCounts["Creative Thinker"] ?? 0}
            </p>
          </div>

          <div className="flex  flex-col flex-grow bg-app-gray-light w-[150px] h-14 p-2 rounded-xl justify-start">
            <p className="flex flex-row justify-between mb-0">
              <span className="flex items-start text-[10px]">Shared By</span>
              <span className="flex text-end font-extrabold cursor-pointer">
                {"< >"}
              </span>
            </p>
            <p>
              <hr className="w-full bg-app-gray-medium h-0.5 mt-0"></hr>
            </p>
            <div className="flex text-xs p-1 font-thin">
              {senderNames["Creative Thinker"] &&
              senderNames["Creative Thinker"].length > 0 ? (
                <div className="flex text-xs p-1">
                  {senderNames["Creative Thinker"].join(", ")}
                </div>
              ) : (
                <div className="flex text-xs p-1">No Badges Recieved</div>
              )}
            </div>
          </div>
        </div>
        {/* EXEMPLARY_LEADER */}
        <div className="flex p-1 bg-white rounded-2xl justify-evenly justify-items-center gap-2 h-18 text-xs">
          <Image
            src={EXEMPLARY_LEADER}
            alt="EXEMPLARY_LEADER"
            width={76}
            height={76}
          />

          <div className="flex flex-col w-16 h-14 bg-app-blue rounded-xl ml-1 p-2 text-white justify-center items-center font-semibold text-[10px]">
            <p className="justify-center">Recieved</p>
            <p className="justify-center">
              {badgeCounts["Exemplary Leader"] ?? 0}
            </p>
          </div>

          <div className="flex flex-grow flex-col bg-app-gray-light w-60 h-16 p-2 rounded-xl justify-stretch">
            <p className="flex flex-row justify-between mb-0">
              <span className="flex items-start text-[10px]">Shared By</span>
              <span className="flex text-end font-extrabold cursor-pointer">
                {"< >"}
              </span>
            </p>
            <p>
              <hr className="w-full bg-app-gray-medium h-0.5 mt-0"></hr>
            </p>
            <div className="flex text-xs p-1 font-thin">
              {senderNames["Exemplary Leader"] &&
              senderNames["Exemplary Leader"].length > 0 ? (
                <div className="flex text-xs p-1">
                  {senderNames["Exemplary Leader"].join(", ")}
                </div>
              ) : (
                <div className="flex text-xs p-1">No Badges Recieved</div>
              )}
            </div>
          </div>
        </div>
        {/* STAR_PARTICIPANT */}
        <div className="flex p-1 bg-white rounded-2xl justify-evenly justify-items-center gap-2 h-18 text-xs">
          <Image
            src={STAR_PARTICIPANT}
            alt="STAR_PARTICIPANT"
            width={76}
            height={76}
          />

          <div className="flex flex-col w-28 h-16 bg-app-blue rounded-xl ml-4 p-2 text-white justify-center items-center font-semibold">
            <p className="justify-center">Recieved</p>
            <p className="justify-center">
              {badgeCounts["Star Participant"] ?? 0}
            </p>
          </div>

          <div className="flex flex-grow flex-col bg-app-gray-light w-60 h-16 p-2 rounded-xl justify-stretch ">
            <p className="flex flex-row justify-between mb-0">
              <span className="flex items-start text-[10px]">Shared By</span>
              <span className="flex text-end font-extrabold cursor-pointer">
                {"< >"}
              </span>
            </p>
            <p>
              <hr className="w-full bg-app-gray-medium h-0.5 mt-0"></hr>
            </p>
            <div className="flex text-xs p-1 font-thin">
              {senderNames["Star Participant"] &&
              senderNames["Star Participant"].length > 0 ? (
                <div className="flex text-xs p-1">
                  {senderNames["Star Participant"].join(", ")}
                </div>
              ) : (
                <div className="flex text-xs p-1">No Badges Recieved</div>
              )}
            </div>
          </div>
        </div>
        {/* TEAM_PLAYER */}
        <div className="flex p-1 bg-white rounded-2xl justify-evenly justify-items-center gap-2 h-18 text-xs">
          <Image src={TEAM_PLAYER} alt="TEAM_PLAYER" width={76} height={76} />

          <div className="flex flex-col w-28 h-16 bg-app-blue rounded-xl ml-4 p-2 text-white justify-center items-center text-xs font-semibold">
            <p className="justify-center text-[12px]">Recieved</p>
            <p className="justify-center text-[12px]">
              {badgeCounts["Team Player"] ?? 0}
            </p>
          </div>

          <div className="flex flex-grow flex-col bg-app-gray-light w-60 h-16 p-2 rounded-xl justify-stretch ">
            <p className="flex flex-row justify-between mb-0">
              <span className="flex items-start text-[10px]">Shared By</span>
              <span className="flex text-end font-extrabold cursor-pointer">
                {"< >"}
              </span>
            </p>
            <p>
              <hr className="w-full bg-app-gray-medium h-0.5 mt-0"></hr>
            </p>
            <div className="flex text-xs p-1 font-thin">
              {senderNames["Team Player"] &&
              senderNames["Team Player"].length > 0 ? (
                <div className="flex text-xs p-1">
                  {senderNames["Team Player"].join(", ")}
                </div>
              ) : (
                <div className="flex text-xs p-1">No Badges Recieved</div>
              )}
            </div>
          </div>
        </div>
        {/* TOP_CONTRIBUTOR */}
        <div className="flex p-1 bg-white rounded-2xl justify-evenly justify-items-center gap-2 h-18 text-xs">
          <Image
            src={EXEMPLARY_LEADER}
            alt="TOP_CONTRIBUTOR"
            width={76}
            height={76}
          />

          <div className="flex flex-col w-28 h-16 bg-app-blue rounded-xl ml-4 p-2 text-white justify-center items-center font-semibold">
            <p className="justify-center">Recieved</p>
            <p className="justify-center">
              <p className="justify-center">
                {badgeCounts["Exemplary Leader"] ?? 0}
              </p>
            </p>
          </div>

          <div className="flex flex-grow flex-col bg-app-gray-light w-60 h-16 p-2 rounded-xl justify-stretch ">
            <p className="flex flex-row justify-between mb-0">
              <span className="flex items-start text-[10px]">Shared By</span>
              <span className="flex text-end font-extrabold cursor-pointer">
                {"< >"}
              </span>
            </p>
            <p>
              <hr className="w-full bg-app-gray-medium h-0.5 mt-0"></hr>
            </p>
            <div className="flex text-xs p-1 font-thin">
              {senderNames["Exemplary Leader"] &&
              senderNames["Exemplary Leader"].length > 0 ? (
                <div className="flex text-xs p-1">
                  {senderNames["Exemplary Leader"].join(", ")}
                </div>
              ) : (
                <div className="flex text-xs p-1">No Badges Recieved</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recieved;
