import { AppPage } from "@/layouts/types";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/buttons";

import Video from "@/interfaces/Video";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import { BackNavigation } from "@/components/shared";

interface Tab {
  title: string;
  videos: Video[];
}

interface SidebarProps {
  tabs: Tab[];
  onTaskClick: (video: Video) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ tabs, onTaskClick }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTask, setSelectedTask] = useState<Video | null>(null);

  const handleTaskClick = (video: Video) => {
    setSelectedTask(video);
    onTaskClick(video);
  };

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <div className="flex-col mobile:hidden">
      <div className="sidebar mt-2 bg-white h-screen w-full rounded-tr-3xl px-4 py-2">
        <div className="tabs flex">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`tab ${
                selectedTab === index
                  ? "bg-white text-app-blue border-b-4 border-app-blue font-bold"
                  : ""
              } px-6 pt-2 cursor-pointer`}
              onClick={() => handleTabClick(index)}
            >
              {tab.title}
            </div>
          ))}
        </div>
        <div className="mb-2">
          <hr className="bg-app-blue h-0.5"></hr>
        </div>
        <ul className="task-list p-4">
          {tabs[selectedTab].videos.map((video) => (
            <li
              key={video.id}
              className={`cursor-pointer hover:bg-gray-300 bg-white w-72 h-30 border-2 py-2 px-4 mt-2 rounded-lg shadow-lg ${
                selectedTask?.id === video.id
                  ? "bg-purple-300 border-1 border-app-blue"
                  : ""
              }`}
              onClick={() => handleTaskClick(video)}
            >
              <div className="grid grid-cols-2">
                <div className="text-app-blue font-bold">
                  <img src={video.thumbnail} alt="Image" width={100} />
                </div>

                <div className="flex pt-2">
                  <p>
                    <h1 className="text-zinc-600 font-bold text">
                      {video.title}
                    </h1>
                    <h5 className="text-zinc-600 font-bold text-[12px]">
                      Duration:{video.duration} mins
                    </h5>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

interface ContentProps {
  video: Video | null;
}

const VideoContainer: React.FC<ContentProps> = ({ video }) => {
  return (
    <div className="content">
      {video ? (
        <div className="mt-10 mr-4">
          <div>{video && <VideoContent video={video} />}</div>
        </div>
      ) : (
        <p className="text-gray-500">Select a video from a sidebar.</p>
      )}
    </div>
  );
};

interface VideoContentProps {
  video: Video;
}

const VideoContent: React.FC<VideoContentProps> = ({ video }) => {
  return (
    <div className="w-full flex  mobile:flex-col-reverse  justify-between ">
      <div className="bg-white mx-2 h-full rounded-lg p-6 w-1/2 mobile:w-full justify-between">
        <div className="flex">
          <p className="text-app-blue font-bold">
            Duration: {video.duration} mins
          </p>
        </div>
        <p className="py-2 border-b-2 border-app-blue">{video.description}</p>
        <div className="p-2">
          <Button>Download </Button>
        </div>
      </div>
      <div className="h-full mx-2 rounded-lg p-6 w-1/2 mobile:w-full bg-gradient-to-br  from-app-blue to-app-purple items-center">
        <iframe
          width="100%"
          height="100%"
          src={video.url}
          title="Viliyo video player"
        ></iframe>
      </div>
    </div>
  );
};

const ViliyoTutorialsPage: AppPage = () => {
  const [selectedTask, setSelectedTask] = useState<Video | null>(null);
  const router = useRouter();

  useEffect(() => {
    const { video: videoId } = router.query;

    const videoIndex = videos.findIndex(
      (el) => el.id === parseInt(videoId as string)
    );
    const selectedVideo = videos[videoIndex];
    setSelectedTask(selectedVideo);
  }, []);

  const videos = useSelector((state: RootState) => state.tutorials.videos);

  const tabs: Tab[] = [
    {
      title: "All Tutorials",
      videos: videos,
    },
    {
      title: "Recently Added",
      videos: videos,
    },
  ];

  const handleTaskClick = (video: Video) => {
    setSelectedTask(video);
  };

  return (
    <>
      <BackNavigation title={selectedTask?.title || "Viliyo Tutorial"} />
      <div className="h-full w-full">
        <VideoContainer video={selectedTask} />
      </div>
    </>
  );
};

export default ViliyoTutorialsPage;

ViliyoTutorialsPage.Layout = "Admin";
