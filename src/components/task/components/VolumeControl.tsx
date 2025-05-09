// VolumeControl.tsx
import React, { useState } from "react";
import { BsVolumeUp, BsVolumeMute, BsFillVolumeMuteFill } from "react-icons/bs";

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
  onToggleMute: (isMuted: boolean) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  onVolumeChange,
  onToggleMute,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setMute] = useState<boolean>(Boolean(volume));

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    onVolumeChange(newVolume);
  };

  const toggleMute = () => {
    setMute((value) => !value);
    onToggleMute(isMuted);
  };

  return (
    <div
      className="flex hover:py-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <input
          className="w-12 cursor-pointer transform -rotate-90 "
          type="range"
          value={volume}
          min={0}
          max={1}
          step={0.01}
          onChange={handleVolumeChange}
        />
      )}
      {volume > 0 ? (
        <BsVolumeUp size={30} onClick={toggleMute} />
      ) : volume >= 0 ? (
        <BsVolumeMute size={30} onClick={toggleMute} />
      ) : (
        <BsFillVolumeMuteFill size={30} onClick={toggleMute} />
      )}
    </div>
  );
};

export default VolumeControl;
