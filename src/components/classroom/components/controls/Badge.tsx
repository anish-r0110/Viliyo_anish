import { SlBadge } from "react-icons/sl";
import CLASSNAME from "./classname";
import SIZE from "./size";
import * as Popover from "@radix-ui/react-popover";
import BRILLIANT_EFFORT from "../../../../assets/icons/badges/brilliant-effort.svg";
import CREATIVE_THINKER from "../../../../assets/icons/badges/creative-thinker.svg";
import EXEMPLARY_LEADER from "../../../../assets/icons/badges/exemplary-leader.svg";
import STAR_PARTICIPANT from "../../../../assets/icons/badges/star-participant.svg";
import TEAM_PLAYER from "../../../../assets/icons/badges/team-player.svg";
import TOP_CONTRIBUTOR from "../../../../assets/icons/badges/top-contributor.svg";
import { TiArrowForwardOutline } from "react-icons/ti";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import ShareBadge from "./ShareBadge";
import { useDispatch, useSelector } from "react-redux";
import { updateLiveStreamSettings } from "@/store/reducers/livestreamSettings";
import { RootState } from "@/store";

const BadgeControl = () => {
  const settings = useSelector((state: RootState) => state.live.settings);
  const dispatch = useDispatch();

  const [togglePage, setTogglePage] = useState(false);
  const [sharedBadge, setSharedBadge] = useState<string | null>(null);

  const badgeArray = [
    {
      badge: <Image src={CREATIVE_THINKER} alt="CREATIVE THINKER" />,
      receivedCount: "03",
      senderName: [
        "Tuhin",
        "Prathamesh",
        "Geetha Nagarajan",
        "Yash Amlani",
        "Nitin Singh",
        "Subrat Chowdhary",
      ],
    },
    {
      badge: <Image src={BRILLIANT_EFFORT} alt="BRILLIANT EFFORT" />,
      receivedCount: "03",
      senderName: [
        "Tuhin",
        "Prathamesh",
        "Geetha Nagarajan",
        "Yash Amlani",
        "Nitin Singh",
        "Subrat Chowdhary",
      ],
    },
    {
      badge: <Image src={EXEMPLARY_LEADER} alt="EXEMPLARY LEADER" />,
      receivedCount: "03",
      senderName: [
        "Tuhin",
        "Prathamesh",
        "Geetha Nagarajan",
        "Yash Amlani",
        "Nitin Singh",
        "Subrat Chowdhary",
      ],
    },
    {
      badge: <Image src={STAR_PARTICIPANT} alt="STAR PARTICIPANT" />,
      receivedCount: "03",
      senderName: [
        "Tuhin",
        "Prathamesh",
        "Geetha Nagarajan",
        "Yash Amlani",
        "Nitin Singh",
        "Subrat Chowdhary",
      ],
    },
    {
      badge: <Image src={TEAM_PLAYER} alt="TEAM PLAYER" />,
      receivedCount: "03",
      senderName: [
        "Tuhin",
        "Prathamesh",
        "Geetha Nagarajan",
        "Yash Amlani",
        "Nitin Singh",
        "Subrat Chowdhary",
      ],
    },
    {
      badge: <Image src={TOP_CONTRIBUTOR} alt="TOP CONTRIBUTOR" />,
      receivedCount: "03",
      senderName: [
        "Tuhin",
        "Prathamesh",
        "Geetha Nagarajan",
        "Yash Amlani",
        "Nitin Singh",
        "Subrat Chowdhary",
      ],
    },
  ];

  return (
    <div className="relative group">
      <div
        className={`${CLASSNAME} ${!settings.badgesPanel && "bg-white"}`}
        onClick={() => {
          dispatch(
            updateLiveStreamSettings({ badgesPanel: !settings.badgesPanel })
          );
        }}
      >
        <Popover.Root>
          <Popover.Trigger asChild>
            <button>
              <SlBadge color="black" size={SIZE} />
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              className="bg-zinc-600 p-6 rounded-2xl space-y-4"
              sideOffset={5}
            >
              {!togglePage ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-6">
                    {badgeArray.map((badgeData, index) => (
                      <div key={index}>
                        {badgeData.badge}
                        <button
                          className="bg-white text-app-blue rounded text-xs px-2 py-1 flex mx-12"
                          onClick={() =>
                            setSharedBadge(badgeData.badge.props.alt)
                          }
                        >
                          <span className="pr-1 pt-0.5">
                            <TiArrowForwardOutline />
                          </span>
                          <ShareBadge
                            badge={badgeData.badge.props.alt}
                            traineeName={sharedBadge}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="text-white bg-app-blue p-2 shadow-2xl shadow-white rounded-lg"
                      onClick={() => {
                        setTogglePage(true);
                      }}
                    >
                      View Badges You Received
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex space-x-2 text-2xl text-white">
                    <div className="py-0.5">
                      <AiOutlineArrowLeft
                        onClick={() => {
                          setTogglePage(false);
                        }}
                      />
                    </div>
                    <span>Badges You Received</span>
                  </div>
                  <div className="h-96 overflow-y-auto">
                    {badgeArray.map((data, index) => (
                      <div key={index} className="my-2">
                        <div className="bg-violet-100 rounded-lg grid grid-cols-2 h-38 overflow-y-auto">
                          <div className="flex p-4 border-r-4 border-app-yellow">
                            <div>{data.badge}</div>
                            <div className="text-app-blue items-center justify-center py-8">
                              <span className="">Received</span>
                              <div className="text-3xl font-bold px-4">
                                {data.receivedCount}
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="bg-app-blue rounded-tr-lg p-4 text-base text-white">
                              Shared by
                            </div>
                            <div className="h-28 overflow-y-auto">
                              {data.senderName.map((name, nameIndex) => (
                                <div key={nameIndex} className="p-1 flex">
                                  {name}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <Popover.Arrow className="text-white text-xl" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 max-w-md bg-black text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Badges
      </div>
    </div>
  );
};

export default BadgeControl;
