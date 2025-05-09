import React from "react";

interface IProgress {
  progress: number;
}

const CircularProgressBar = ({ progress }: IProgress) => {
  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex justify-center">
      <svg className="w-16 h-16">
        <circle
          className="stroke-current text-amber-400"
          strokeWidth="6"
          fill="none"
          r={radius}
          cx="50%"
          cy="50%"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
          }}
        />
        <circle
          className="stroke-current text-amber-400"
          strokeWidth="6"
          fill="black"
          opacity={0.1}
          r={radius}
          cx="50%"
          cy="50%"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: 0,
          }}
        />
      </svg>
    </div>
  );
};

export default CircularProgressBar;
