
import React from "react";

interface TimelineProps {
  currentTime: number;
  duration: number;
  onTimeChange: (time: number) => void;
}

const Timeline: React.FC<TimelineProps> = ({
  currentTime,
  duration,
  onTimeChange,
}) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    onTimeChange(newTime);
  };

  return (
    <div className="flex items-center space-x-1 w-full">
      <span className="text-white text-xs text-center">
        {formatTime(currentTime)}
      </span>
      <input
        className="accent-gray-500 w-full"
        type="range"
        value={currentTime}
        max={duration}
        onChange={handleTimeChange}
      />
      <span className="text-xs text-white text-center">
        {formatTime(duration)}
      </span>
    </div>
  );
};



export default Timeline;

