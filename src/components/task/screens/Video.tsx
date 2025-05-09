
import React, { useEffect, useRef, useState } from "react";
import { BsFullscreen } from "react-icons/bs";
import { CiPause1, CiVolumeHigh, CiVolumeMute } from "react-icons/ci";
import { HiOutlineCog } from "react-icons/hi";
import {
  IoPlayBackOutline,
  IoPlayForwardOutline,
  IoPlayOutline,
} from "react-icons/io5";
import Timeline from "../components/Timeline";
import VolumeControl from "../components/VolumeControl";




interface VideoProps {
  videoSource: string;
}

const VideoScreen: React.FC<VideoProps> = ({ videoSource }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // Initial volume is set to maximum (1)

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      video.addEventListener("canplaythrough", () => {
        setDuration(video.duration);
      });

      video.addEventListener("timeupdate", () => {
        setCurrentTime(video.currentTime);
      });

      video.addEventListener("ended", () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
    }
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleBackward = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.currentTime -= 10;
    }
  };

  const handleForward = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.currentTime += 10;
    }
  };

  const handleFullScreen = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
      // else if (video.mozRequestFullScreen) {
      //   video.mozRequestFullScreen();
      // } else if (video.webkitRequestFullscreen) {
      //   video.webkitRequestFullscreen();
      // }
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const video = videoRef.current;
      const newTime = parseFloat(e.target.value);
      video.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (volume: number) => {
    if (videoRef.current) {
      const video = videoRef.current;
      const newVolume = parseFloat(volume.toString());
      video.volume = newVolume;
      setVolume(newVolume);
    }
  };

  return (
    <div className="video-player relative max-w-xl">
      <video className="rounded-md" width={"100%"} ref={videoRef}>
        <source src={videoSource} type="video/mp4" />
      </video>
      <div className="relative">
        <div className="flex absolute w-3/4 top-[-90px] right-20 ">
          <div className="flex items-center space-x-1 w-full">
            <Timeline
              currentTime={currentTime}
              duration={duration}
              onTimeChange={(newTime) => {
                if (videoRef.current) {
                  videoRef.current.currentTime = newTime;
                  setCurrentTime(newTime);
                }
              }}
            />

          </div>

        </div>

        <div className="video-controls absolute top-[-60px] w-3/4 right-20  flex justify-between space-x-4 bg-[#3e4043db] px-5 py-1 rounded-xl text-white">
          <div className="flex justify-start items-center">
            <VolumeControl
              volume={volume}
              onVolumeChange={(volume) => {
                handleVolumeChange(volume);
              }}
              onToggleMute={(isMuted) => {
                isMuted ? handleVolumeChange(0) : handleVolumeChange(1);
              }}
            />
          </div>
          <div className="flex justify-center space-x-1">
            <button onClick={handleBackward}>
              <IoPlayBackOutline size={30} />
            </button>
            <button onClick={handlePlayPause}>
              {isPlaying ? <CiPause1 size={35} /> : <IoPlayOutline size={35} />}
            </button>
            <button onClick={handleForward}>
              <IoPlayForwardOutline size={30} />
            </button>
          </div>

          <div className="flex justify-end space-x-2">
            <button>
              <BsFullscreen onClick={handleFullScreen} size={20} />
            </button>
            <button>
              <HiOutlineCog size={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoScreen;
