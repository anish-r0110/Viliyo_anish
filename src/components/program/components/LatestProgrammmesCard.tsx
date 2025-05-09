import Link from "next/link";
import StarRating from "@/components/StarRating";
import moment from "moment";
import IProgram from "@/models/Program";

interface IProgramListProps {
  data: IProgram[];
  limit?: number;
}

const LatestProgrammmesCard = ({ data, limit = 3 }: IProgramListProps) => {
  return (
    <div className="w-full grid grid-cols-1 tablet:grid-cols-2 laptop:hidden desktop:hidden largescreen:hidden gap-4">
      {data.slice(0, limit).map((el) => (
        <div
          className="bg-white border border-gray-300 rounded-2xl shadow-xl mt-2 p-2"
          key={el.id}
        >
          <div className="flex flex-row justify-between flex-grow">
            <div className="block text-sm font-bold text-app-gray-medium justify-between text-left w-3/4 p-1">
              {el.name}
            </div>
            <div className="block text-sm font-bold text-purple-800 justify-between text-right w-1/4 p-1">
              <Link className="mr-1" href={"program-detail/" + el.id}>
                View
              </Link>
            </div>
          </div>
          <div className="mt-2 text-xs justify-center p-2 text-app-gray-medium">
            <div className="flex flex-row justify-stretch">
              <span className="font-semibold w-1/2">Programme Name</span>
              <span className="w-1/2 truncate">:&nbsp;{el.name}</span>
            </div>

            <div className="flex flex-row justify-stretch">
              <span className="font-semibold w-1/2">Duration</span>
              <span className="w-1/2 truncate">
                :&nbsp;
                {moment(el.startDate).format("DD MMM YYYY")} -{" "}
                {moment(el.endDate).format("DD MMM YYYY")}
              </span>
            </div>

            <div className="flex flex-row justify-stretch">
              <span className="font-semibold w-1/2">Status</span>
                :&nbsp;{el.status}
            </div>

            <div className="flex flex-row justify-stretch">
              <span className="font-semibold w-1/2">Sessions</span>
              <span className="w-1/2">:&nbsp;{el.sessions?.length}</span>
            </div>
            <div className="flex flex-row justify-stretch">
              <span className="font-semibold w-1/2">Engagement</span>
              <span className="flex w-1/2">:&nbsp;
              {/* el.engagement ?? */}
                {
                  "-"
                  // <StarRating
                  //   outOf={5}
                  //   rating={el.myRating ?? 0}
                  //   size={16}
                  //   disabled
                  // />
                }
              </span>
            </div>

            <div className="flex flex-row justify-stretch">
              <span className="flex font-semibold w-1/2">Group Rating</span>
              <span className="flex  w-1/2">
                :&nbsp;
                {
                  "-"
                  // <StarRating
                  //   outOf={5}
                  //   rating={el.groupRating ?? 0}
                  //   size={16}
                  //   disabled
                  // />
                }
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LatestProgrammmesCard;
