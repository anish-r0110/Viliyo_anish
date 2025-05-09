// src/CameraMicTest.tsx
import React from "react";
import classNames from "classnames";

import Image from "next/image";
import {
  BsCameraVideo,
  BsMic,
  BsCameraVideoOff,
  BsMicMute,
} from "react-icons/bs";
import useMediaStream from "@/hooks/useMediaStream";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleAudio, toggleVideo } from "@/store/reducers/livestreamSettings";

const CameraMicTest: React.FC = () => {



  const [videoRef ] =  useMediaStream();
  const auth = useSelector(( state:RootState ) =>  state.auth.user );
  const settings = useSelector(( state:RootState) => state.live.settings)
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        {settings.video ? (
          <video
            ref={videoRef}
            className={classNames("w-full max-h-64 rounded-2xl", {
              hidden: !settings.isCameraAccessGranted,
            })}
            autoPlay
            playsInline
            muted
          />
        ) : (
          <div className="border-2 border-white rounded-xl">
            <Image
              className="w-full max-h-64 rounded-2xl border-2 border-white "
              src={auth?.profileImage as string}
              alt=""
              width={100}
              height={100}
            />
          </div>
        )}

        {!settings.isCameraAccessGranted && (
          <p className="text-red-600 text-xs">Camera access is not granted.</p>
        )}
      </div>
      <div className="flex justify-center p-4 space-x-16">
        <div>
          <button
            onClick={()=> dispatch( toggleVideo())}
            className={classNames(
              "p-4  bg-app-yellow text-black font-bold text-xl rounded-lg",
              {
                hidden: !settings.isCameraAccessGranted,
                "bg-red-500  font-bold": !settings.video,
              }
            )}
            disabled={!settings.isCameraAccessGranted}
          >
            {settings.video ? <BsCameraVideo /> : <BsCameraVideoOff />}
          </button>
          {!settings.isCameraAccessGranted && (
            <p className="text-red-600 text-xs">
              Camera access is not granted.
            </p>
          )}
        </div>
        <div className="mb-4">
          <button
            onClick={() => dispatch( toggleAudio())}
            className={classNames(
              "p-4 bg-app-yellow text-black font-bold text-xl rounded-lg",
              {
                hidden: !settings.isMicAccessGranted,
                "bg-red-500 font-bold": !settings.audio,
              }
            )}
            disabled={!settings.isCameraAccessGranted}
          >
            {settings.audio ? <BsMic /> : <BsMicMute />}
          </button>
          {!settings.isMicAccessGranted && (
            <p className="text-red-600 text-xs">
              Microphone access is not granted.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CameraMicTest;
