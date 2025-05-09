import { Avatar } from "@radix-ui/themes";
import { StaticImageData } from "next/image";
import React from "react";

interface Props {
  avatarUrl: string | StaticImageData | undefined;
  profileCompletion: number | null; // Value between 0 and 100 representing the profile completion percentage
}

const ProfileProgressBar: React.FC<Props> = ({
  avatarUrl,
  profileCompletion,
}) => {
  const progressBarRadius = 45; // Radius of the circular progress bar
  const progressBarCircumference = 2 * Math.PI * progressBarRadius; // Circumference of the circular progress bar
  let progressBarOffset = 0;
  if (profileCompletion) {
    progressBarOffset =
      progressBarCircumference -
      (profileCompletion / 100) * progressBarCircumference;
  }

  return (
    <div>
      <div>
        {/* <img src={avatarUrl} alt="Avatar" className="w-16 h-16 rounded-full" /> */}
        <div className="mt-2 w-16 h-16">
          <Avatar src={avatarUrl as string} fallback="" size="5"></Avatar>
        </div>
        <div className="my-6">
          <svg
            className="absolute top-6 left-8"
            viewBox="0 0 100 100"
            width="80"
            height="80"
          >
            <circle
              className="text-gray-200"
              r={progressBarRadius}
              cx="50"
              cy="50"
              fill="transparent"
              stroke="#e5e7eb"
              strokeWidth="4"
            />
            <circle
              className="text-app-blue"
              r={progressBarRadius}
              cx="50"
              cy="50"
              fill="transparent"
              stroke="#3B0764"
              strokeWidth="4"
              strokeDasharray={progressBarCircumference}
              strokeDashoffset={progressBarOffset ? progressBarOffset : 0}
              transform={`rotate(-90 ${"50"} ${"50"})`}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProfileProgressBar;
