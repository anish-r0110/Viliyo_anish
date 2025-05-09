import { Avatar, Text } from "@radix-ui/themes";
import { IoMicOutline } from "react-icons/io5";
import { IoMicOffOutline } from "react-icons/io5";
import React, { useEffect, useRef, useState } from "react";
import { CiMenuKebab, CiVideoOn } from "react-icons/ci";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { HiOutlineVideoCameraSlash } from "react-icons/hi2";
import { Popover, Box } from "@radix-ui/themes";
import { SlBadge } from "react-icons/sl";
import { MdOutlineSwapHorizontalCircle } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { Flex, Button, Dialog } from "@radix-ui/themes";
import BadgesExchanged from "@/components/badges/BadgesExchanged";
import BadgeControl from "../controls/Badge";

interface ParticipantProps {
  name: string;
  size: string;
  streamArray?: [];
  id?: number;
  radius: string;
  caseStudyOn?: boolean;
  profilePhoto?: any;
  kebab?: boolean;
  audio?: string;
  video?: string;
}

export const ParticipantInOtherTable = () => {
  const [micOn, setMicOn] = useState(false);
  return (
    <>
      <div className="flex flex-col -space-y-16">
        <div className="flex flex-col -space-y-6 ">
          <div className="text-white bg-gray-600 rounded-xl w-24 h-24 mx-2 text-3xl p-8">
            <HiOutlineUserGroup />
          </div>

          <div className="text-white  px-4 flex justify-end  ">
            {micOn ? (
              <IoMicOutline onClick={() => setMicOn(!micOn)} color="white" />
            ) : (
              <IoMicOffOutline onClick={() => setMicOn(!micOn)} color="white" />
            )}
          </div>

          <Text className="text-app-yellow px-8  text-xs truncate">
            At Table 1
          </Text>
        </div>
        <div className="text-white flex justify-end pr-4">
          <CiMenuKebab />
        </div>
      </div>
      <div className="mt-16">
        <Text className="text-white px-4 py-8 text-xs truncate">
          Trainee Name
        </Text>
      </div>
    </>
  );
};

const Participant: React.FC<ParticipantProps> = ({
  name,
  size,
  radius,
  streamArray,
  id,
  caseStudyOn = false,
  profilePhoto,
  kebab,
  audio,
  video,
}) => {
  const [micOn, setMicOn] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startConsumer = async (consumer) => {
    const stream = new MediaStream();
    stream.addTrack(consumer.track);
    if (stream.getVideoTracks().length) videoRef.current.srcObject = stream;

    videoRef.current?.play();
    // }
  };

  useEffect(() => {
    console.log("Media Soup Integration Steps Starting Here ");
  }, []);

  const startAudio = async (audioTrack) => {
    const audioStream = new MediaStream();
    audioStream.addTrack(audioTrack.track);
    // Set the srcObject of the audio element to the new audio stream
    audioRef.current.srcObject = audioStream;
    // Play the audio
    audioRef.current.play();
  };

  useEffect(() => {
    if (streamArray?.video) {
      startConsumer(streamArray.video);
    }
    if (streamArray?.audio) {
      startAudio(streamArray?.audio);
    }
  }, [streamArray]);

  return (
    <div>
      {kebab && (
        <div className="text-white flex justify-end items-start relative ">
          <div className="-space-y-10 absolute inset-1 -left-2">
            <Popover.Root>
              <Popover.Trigger>
                <span className="py-1 pl-2">
                  <CiMenuKebab />
                </span>
              </Popover.Trigger>

              <Popover.Content>
                <Box grow="1">
                  <Popover.Close>
                    <div>
                      <div className="flex space-x-2">
                        <div className="py-1">
                          <CiVideoOn color="purple" />
                        </div>
                        <p>Invite to Video Chat</p>
                      </div>
                      <div className="flex space-x-2">
                        <div className="py-1">
                          <SlBadge color="purple" />
                        </div>
                        <p onClick={() => <BadgeControl></BadgeControl>}>
                          Give a Badge
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <div className="py-1">
                          <MdOutlineSwapHorizontalCircle color="purple" />
                        </div>
                        <p>Swap Seat</p>
                      </div>
                    </div>
                  </Popover.Close>
                </Box>
              </Popover.Content>
            </Popover.Root>
          </div>
        </div>
      )}

      <div>
        <div className={`-space-y-4 `}>
          <Avatar
            src={profilePhoto}
            fallback={name.charAt(0)}
            size={size}
            radius={radius}
            color="purple"
            className={`
            border border-app-gray
            ${
              caseStudyOn && "shadow-2xl shadow-purple-400 pr-1 bg-purple-300"
            } `}
          />
          {/* ${activeAnotherSeat && "border-4 border-fuchsia-400"}  */}
          {/* <video
            className="flex w-[88px] object-cover h-[102px] rounded-lg aspect-video"
            ref={videoRef}
            autoPlay
            playsInline
          />
          <audio ref={audioRef} controls className="hidden" /> */}

          <div className="flex justify-around">
            <div className="text-white px-2">
              {video === "yes" ? (
                streamArray?.video ? (
                  <HiOutlineVideoCamera
                    onClick={() => setVideoOn(!videoOn)}
                    color="white"
                  />
                ) : (
                  <HiOutlineVideoCameraSlash
                    onClick={() => setVideoOn(!videoOn)}
                    color="white"
                  />
                )
              ) : null}
            </div>
            <div className="text-white  px-4 ">
              {audio === "yes" ? (
                streamArray?.audio ? (
                  <IoMicOutline
                    onClick={() => setMicOn(!micOn)}
                    color="white"
                  />
                ) : (
                  <IoMicOffOutline
                    onClick={() => setMicOn(!micOn)}
                    color="white"
                  />
                )
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <p className="text-white px-1 text-xs truncate overflow-hidden">
            {name.substring(0, 8)}...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Participant;
