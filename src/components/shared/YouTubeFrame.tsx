import React from "react";

const YouTubeFrame: React.FC = () => {
  return (
    <div className="flex w-full h-full justify-center items-center p-4 bg-app-blue rounded-2xl">
      <iframe
        className="rounded-2xl shadow-lg w-full h-full"
        src="https://www.youtube.com/embed/mZAPOEBi9wk?autoplay=1&mute=1"
        title="Viliyo video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeFrame;
