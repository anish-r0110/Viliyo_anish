import React from "react";
import Image from "next/image";
import Link from "next/link";

interface VideoCardProps {
  video: {
    id: number;
    file: string;
    duration: string;
    title: string;
    author?: string;
    created_at: string;
  };
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <Link href={`/viliyo-tutorials/${video.id}`}>
      <div className="flex flex-col mb-8">
        <div className="relative h-48 md:h-40 md:rounded-t-xl overflow-hidden">
          <Image
            className="h-full w-full object-cover"
            src={video.file}
            alt="thumbnail"
            width={300}
            height={200}
          />
          {video.duration && <span className="duration">{video.duration}</span>}
        </div>
        <div className="flex">
          <div className="flex text-app-blue mt-3">
            <div className="flex flex-col ml-3 overflow-hidden">
              <span className="text-sm font-bold line-clamp-2">
                {video.title}
              </span>
              <span className="text-[12px] font-semibold mt-2 text-app-blue/[0.7] flex items-center">
                {video?.author}
              </span>
              <div className="flex text-[12px] font-semibold text-black/[0.7] truncate overflow-hidden">
                <span className="truncate">{video?.created_at}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
