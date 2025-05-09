import React from "react";
import Image from "next/image";
import Router from "next/router";

const handleViewClick = () => {
  const pagePath = "/help/viliyo-tutorials";

  Router.push(pagePath);
};

interface CardCarouselProps {
  videos: Video[];
}

interface Video {
  id: number;
  thumbnail: string;
  title: string;
  duration: string;
}

const CardCarousel: React.FC<CardCarouselProps> = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative">
      <div className="flex space-x-3 overflow-x-auto">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={`flex-shrink-0 w-[320px] h-[200px] flex flex-col shadow-2xl ${
              index === currentIndex ? "opacity-100" : "opacity-50"
            }`}
          >
            <Image
              src={video.thumbnail}
              alt="Video Thumbnail"
              className="h-1/2 rounded-t-xl"
              width={500}
              height={300}
            />
            <div className="flex p-4 h-full bg-white items-start flex-col justify-evenly rounded-b-xl">
              <p className="text-app-blue text-[16px] font-bold">
                {video.title}
              </p>
              <p className="font-bold text-[16px] text-app-blue">
                Duration: <span className="font-normal">{video.duration}</span>
              </p>
              <button
                className="bg-app-yellow rounded-full h-8 w-24"
                onClick={handleViewClick}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 right-0">
        <button
          className="bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center"
          onClick={handlePrev}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a.75.75 0 0 0-.75.75v12.5a.75.75 0 0 0 1.2.6l6.25-4.5a.75.75 0 0 0 0-1.2l-6.25-4.5A.75.75 0 0 0 10 3z"
            />
          </svg>
        </button>
        <button
          className="bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center"
          onClick={handleNext}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-1.2.6l-6.25-4.5a.75.75 0 0 1 0-1.2l6.25-4.5A.75.75 0 0 1 10 3z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CardCarousel;
