import Link from "next/link";
import StarRating from "@/components/StarRating";
import moment from "moment";
import IProgram from "@/models/Program";

interface IProgramListProps {
  data: IProgram[];
  limit?: number;
}

const ProgramListCard = ({ data, limit = 3 }: IProgramListProps) => {
  // Function to calculate the status based on start and end dates
  const getStatus = (startDate: string, endDate: string): string => {
    const currentDate = moment();
    const start = moment(startDate);
    const end = moment(endDate);

    if (start.isAfter(currentDate)) {
      return "Scheduled";
    } else if (start.isBefore(currentDate) && end.isAfter(currentDate)) {
      return "On Going";
    } else {
      return "Completed";
    }
  };

  return (
    <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:hidden desktop:hidden largescreen:hidden gap-4">
      {data.slice(0, limit).map((el) => (
        <div
          className="bg-white border border-gray-300 rounded-2xl shadow-xl mt-2 p-2"
          key={el.id}
        >
          <div className="flex flex-row justify-between">
            <div className="block font-bold text-app-gray-medium justify-between text-left w-3/4 p-1 text-sm">
              {el.name}
            </div>
            <div className="block text-lg font-bold text-purple-800 justify-between text-right w-1/4 p-1">
              <Link className="mr-1 text-sm" href={"program-detail/" + el.id}>
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
              <span className="font-semibold w-1/2">Sessions</span>
              <span className="w-1/2">:&nbsp;{el.sessions?.length}</span>
            </div>
            <div className="flex flex-row justify-stretch">
              <span className="font-semibold w-1/2">Engagement</span>
              <span className="w-1/2">:&nbsp;{el.engagement}</span>
            </div>
            <div className="flex flex-row justify-stretch">
              <span className="font-semibold w-1/2">Status</span>
              <span className="w-1/2">
                :&nbsp; {el.status}
              </span>
            </div>
            <div className="flex flex-row justify-stretch">
              <span className="font-semibold w-1/2">Duration</span>
              <span className="w-1/2">
                :&nbsp;
                {moment(el.startDate).format("DD MMM YYYY")} -{" "}
                {moment(el.endDate).format("DD MMM YYYY")}
              </span>
            </div>
            <div className="flex flex-row justify-stretch">
              <div className="flex font-semibold w-1/2">My Rating</div>
              <div className="flex w-1/2">
                :&nbsp;
               -
              </div>
            </div>
            <div className="flex flex-row justify-stretch">
              <span className="flex font-semibold w-1/2">Group Rating</span>
              <span className="flex  w-1/2">
                :&nbsp;
                -
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgramListCard;
