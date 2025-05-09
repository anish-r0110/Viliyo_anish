import React, { useState, useRef, useEffect } from "react";
import {
  IoPlayBackOutline,
  IoPlayForwardOutline,
  IoPlayOutline,
} from "react-icons/io5";
import { CiPause1, CiVolumeHigh, CiVolumeMute } from "react-icons/ci";
import { BsFullscreen } from "react-icons/bs";
import { HiOutlineCog } from "react-icons/hi";
import Timeline from "../components/Timeline";
import VolumeControl from "../components/VolumeControl";


interface AudioProps {
  audioSource: string;
}

const AudioScreen: React.FC<AudioProps> = ({ audioSource }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // Initial volume is set to maximum (1)

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;

      audio.addEventListener("canplaythrough", () => {
        setDuration(audio.duration);
      });

      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
      });

      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
    }
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      const audio = audioRef.current;
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleBackward = () => {
    if (audioRef.current) {
      const audio = audioRef.current;
      audio.currentTime -= 10;
    }
  };

  const handleForward = () => {
    if (audioRef.current) {
      const audio = audioRef.current;
      audio.currentTime += 10;
    }
  };

  const handleVolumeChange = (volume: number) => {
    if (audioRef.current) {
      const audio = audioRef.current;
      const newVolume = parseFloat(volume.toString());
      audio.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const audio = audioRef.current;
      const newTime = parseFloat(e.target.value);
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="audio-player max-w-lg p-20 bg-purple-200 rounded-md">
      <audio ref={audioRef} src={audioSource}></audio>
      <div className="flex w-full">
        <div className="flex my-4 w-full">
        <Timeline
            currentTime={currentTime}
            duration={duration}
            onTimeChange={(newTime) => {
              if (audioRef.current) {
                audioRef.current.currentTime = newTime;
                setCurrentTime(newTime);
              }
            }}
          />
        </div>
      </div>
      <div className="video-controls w-full flex justify-between space-x-4 bg-[#3e4043db] px-4 py-1 rounded-xl text-white">
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
            <BsFullscreen size={20} />
          </button>
          <button>
            <HiOutlineCog size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioScreen;
