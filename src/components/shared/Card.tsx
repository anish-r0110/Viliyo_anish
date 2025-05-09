import React, { ReactNode } from "react";

interface CardProps {
  imageSrc?: string;
  title?: string;
  children: ReactNode;
  colorScheme?: "default" | "dark" | "blue" | "gradient"; // Define your color schemes here
}

const Card = ({ title, colorScheme = "default", children }: CardProps) => {
  let cardClasses = `w-full h-full max-w-sm rounded-xl  overflow-hidden shadow-lg p-5 `;

  if (colorScheme === "dark") {
    cardClasses += " bg-gray-800 text-white"; // Apply dark color scheme classes
  } else if (colorScheme === "blue") {
    cardClasses += " bg-blue-200"; // Apply blue color scheme classes
  }
  if (colorScheme === "gradient") {
    cardClasses += " bg-gradient-to-r from-primary to-secondary";
  } else {
    cardClasses += " bg-white"; // Default color scheme classes
  }
  // else if (colorScheme === "purpleGradient") {
  //   cardClasses += "bg-gradient-to-br from-purple-950 from-20% to-fuchsia-400";
  // }

  return (
    <div>
      {title && <span className="text-gray-500">{title}</span>}
      <div className={cardClasses}>{children}</div>
    </div>
  );
};

export default Card;
