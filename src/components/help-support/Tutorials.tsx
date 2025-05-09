import Image from "next/image";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import help from "@/assets/images/help-center2.png";
import store, { RootState, useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import { fetchTutorials } from "@/store/reducers/tutorials";
import Video from "@/interfaces/Video";
import UnderLineTitle from "../shared/UnderlineTitle";

interface VideoTileProps {
  video: Video;
}

const VideoTile: React.FC<VideoTileProps> = ({ video }) => {
  const router = useRouter();

  return (
    <div className="rounded-xl max-w-[320px]  bg-white flex  flex-col shadow-2xl m-4">
      <Image
        src={video.thumbnail}
        alt="Video Thumbnail"
        className="rounded-t-xl h-1/2"
        style={{ objectFit: "cover" }}
        width={500}
        height={500}
      />
      <div className="h-1/2 px-3 py-1">
        <p className="text-app-blue   text-base font-bold">{video.title}</p>
        <p className="font-bold text-sm text-app-blue">
          Duration: <span className="font-normal">{video.duration}</span>
        </p>
        <button
          className="bg-app-yellow rounded-full py-2 px-6 "
          onClick={() => router.push("help/viliyo-tutorials?video=" + video.id)}
        >
          View
        </button>
      </div>
    </div>
  );
};

interface VideoListProps {
  videos: Video[];
}

const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {videos.map((video) => (
        <VideoTile key={video.id} video={video} />
      ))}
    </div>
  );
};

const Section = ({ videos, title }: { videos: Video[]; title: string }) => {
  return (
    <div>
      <UnderLineTitle title={title} />
      <VideoList videos={videos} />
    </div>
  );
};

const Tutorials = () => {
  const dispatch = useAppDispatch();
  const { isLoading , error , videos } = useSelector((state: RootState) => state.tutorials);


  useEffect(() => {
    store.dispatch(fetchTutorials());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="flex p-4 justify-between items-center rounded-xl bg-app-blue text-white">
          <div>
            <span className="font-bold text-xl text-app-yellow text-left">
              Fastest way to master Viliiyo!
            </span>
            <p className="w-3/4 text-white font-light text-sm text-left whitespace-normal break-words">
              Viliyo tutorials help you master the art of setting up and
              conducting highly engaging virtual training sessions and more.
            </p>
          </div>
          <Image alt="Help Image" src={help} width={75} height={50} />
        </div>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-4rem)]">
        
      {/* Recently Added video grid */}
      <div>
        <Section title="Recently Added" videos={videos} />
      </div>
      {/* All Tutorials video grid */}
      <div>
        <Section title="All Tutorials" videos={videos} />
      </div>
      </div>
    </div>
  );
};

export default Tutorials;
