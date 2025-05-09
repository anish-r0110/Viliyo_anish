import CircularProgressBar from "../shared/CircularProgress";
import StarRating from "../shared/StarRating";

interface EngagementCardProps {
  myEngagementScore: number;
  batchEngagementScore: number;
  myRating: number;
  groupRating: number;
}

const EngagementCard = ({
  myEngagementScore,
  batchEngagementScore,
  myRating,
  groupRating,
}: EngagementCardProps) => {
  return (
    <div className="flex p-0">
      <div className="flex mobile:flex-col justify-around text-center items-center tablet:px-20 gap-2 tablet:bg-gradient-to-br from-app-blue from-30% to-app-purple laptop:bg-gradient-to-br desktop:bg-gradient-to-br largescreen:bg-gradient-to-br rounded-xl shadow-lg w-screen">
        <div className="flex mobile:w-full flex-col justify-center mobile:bg-gradient-to-br from-app-blue from-30% to-app-purple rounded-xl p-2">
          <p className="text-xs text-white">My Engagement Score</p>
          <p className="p-1">
            <CircularProgressBar progress={myEngagementScore} />
          </p>
          <div className="flex text-xs flex-col text-white text-center">
            <p className="">My Rating</p>
            <StarRating outOf={5} rating={myRating} disabled />
          </div>
        </div>
        <div className="flex mobile:w-full flex-col justify-center mobile:bg-gradient-to-br from-app-blue from-30% to-app-purple rounded-xl p-3">
          <p className="text-xs text-white">Batch Engagement Score</p>
          <div className="p-1">
            <CircularProgressBar progress={batchEngagementScore} />
          </div>
          <div className="text-xs text-white text-center">
            <p className="">Group Rating</p>
            <StarRating outOf={5} rating={groupRating} disabled />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementCard;
