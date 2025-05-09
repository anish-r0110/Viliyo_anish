import { IProgressCard, IRatingCard,  IViewCard, } from "@/interfaces/DashboardOverview";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { FiAward, FiBook, FiServer, FiUsers } from "react-icons/fi";
import ProgressCard from "@/components/shared/ProgressCard";
import ViewCard from "@/components/shared/ViewCard";
import { Box } from "@radix-ui/themes";
import launchingsoon from "@/assets/images/launchingsoon.png"
import launchingsoonMobile from "@/assets/images/launchingsoonMobile.png"
import Image from "next/image";
import DashboardService from "@/services/DashboardService";
import StarRating from "@/components/shared/StarRating";
import Skeleton from "@/components/shared/Skeleton";

interface IconMap {
  [key: string]: IconType;
}

const icons: IconMap = {
  FiBook: FiBook,
  FiServer: FiServer,
  FiUsers: FiUsers,
  FiAward: FiAward,
};

function OverviewWidget() {
  const dashboardService = new DashboardService();

  const [viewData, setViewData] = useState<IViewCard[]>([]);
  const [progressData, setProgressData] = useState<IProgressCard[]>([]);
  const [ratingData, setRatingData] = useState<IRatingCard[]>([]);

  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    dashboardService
      .getDashboardData()
      .then(({ viewCard, progressCard, ratingCard }) => {
        setViewData(viewCard); // Clear existing data and set new data
        setRatingData(ratingCard); // Clear existing data and set new data
        setProgressData(progressCard); // Clear existing data and set new data
        setLoading(false);
      }).catch( error => console.log( error));
  }, []);

  const renderViewCards = () => {
    return (
      <div className="grid grid-cols-2 grid-rows-2 gap-2">
        {viewData.map((el, index) => (
          <div
            key={index}
            className="flex bg-transparent p-2 justify-center items-center"
          >
            <ViewCard Icon={icons[el.icon]} title={el.title} value={el.value} />
          </div>
        ))}
      </div>
    );
  };

  const renderProgressCards = () => {
    return (
      <div className="flex space-x-2">
        {progressData.map((el, index) => (
          <ProgressCard
            key={index}
            title={el.title}
            value={el.value}
            incrementValue={el.incrementValue}
          />
        ))}
      </div>
    );
  };

  const renderRatingCards = () => {
    return (
      <div className="flex space-x-2">
        {ratingData.map((el, index) => (
          <div
            key={index}
            className="h-28 w-40 bg-black opacity-60 rounded-lg flex flex-col justify-center space-y-4 p-4 text-white"
          >
            <span className="text-[12px] font-bold">{el.title}</span>
            <StarRating key={index} outOf={el.outOf} rating={el.rating} disabled />
          </div>
        ))}
      </div>
    );
  };

  if (isLoading)
    return (
      <Box className="w-full min-w-fit max-w-fit">
        <span className="text-app-gray-medium font-semibold block">Overview</span>
        <Skeleton width={400} height={200}></Skeleton>
      </Box>
    );

  return (
    <div className="w-full min-w-fit max-w-full">
      <span className="text-app-gray-medium font-bold text-sm">Overview</span>
      <div className="hidden mobile:grid mobile:grid-cols-1 tablet:grid tablet:grid-cols-1 gap-1 p-2 mobile:w-full mobile:-m-1">
        {/* Card 1 Mobile Design */}
        <div className="bg-gradient-to-r from-[#363E70] to-[#EC6AE5] rounded-[16px]">
          <div className="flex flex-col">{renderViewCards()}</div>
          <div className="flex flex-col p-4 mobile:hidden">
          <Image
            src={launchingsoon}
            alt="launchingsoon"
            style={{ width: '100%' }}          
          />
            {/* {renderProgressCards()}
            {renderRatingCards()} */}
          </div>
        </div>
        <div className="hidden mobile:flex flex-col p-4 bg-gradient-to-r from-[#363E70] to-[#EC6AE5] rounded-[16px]">
          <Image
            src={launchingsoonMobile}
            alt="launchingsoon"
            style={{ width: '100%' }}          
          />
            {/* {renderProgressCards()}
            {renderRatingCards()} */}
        </div>
      </div>

      <div className="flex mobile:hidden tablet:hidden">
        {/* Card 2 non Mobile design*/}
        <div className="w-full h-full bg-gradient-to-r from-[#363E70] to-[#EC6AE5] rounded-[16px] p-1">
          <div className="flex flex-row gap-10">
            <div className="flex">{renderViewCards()}</div>
            <div className="flex flex-col p-6">
            <Image
            src={launchingsoon}
            alt="launchingsoon"
            width={280}
            height={160}
            />

              {/* {renderProgressCards()}
              {renderRatingCards()} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewWidget;
