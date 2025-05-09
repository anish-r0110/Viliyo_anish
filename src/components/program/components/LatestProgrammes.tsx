import IProgram from "@/models/Program";
import moment from "moment";
import Link from "next/link";

interface IProgramListProps {
  data: IProgram[];
  limit?: number;
}

const LatestProgrammes = ({ data, limit = 3 }: IProgramListProps) => {
  return (
    <div className=" w-full">
      <table className="font-normal text-app-gray-medium w-full">
        <thead className="my-4">
          <tr className="text-xs">
            <th></th>
            <th className="text-left">Programme Name</th>
            <th className=" text-center">Duration</th>
            <th className=" text-center">Status</th>
            <th className=" text-center">Sessions</th>
            <th className=" text-center">Engagement</th>
            <th className=" text-center">Group Rating</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, limit).map((el) => (
            <tr
              className="h-14 text-xs hover:bg-app-purple shadow-sm rounded divide-y-8 divide-app-purple-100 mb-5"
              key={el.id}
            >
              <td></td>

              <td className="px-4 rounded-l-2xl bg-white text-left text-xs">
                {el.name}
              </td>
              <td className="bg-white text-center text-xs ">
                {/* {el.status} */}
                {moment(el.startDate).format("DD MMM YYYY") +
                  "  -  " +
                  moment(el.endDate).format("DD MMM YYYY")}
              </td>
              <td className="bg-white text-center text-xs">
                {/* {moment().isAfter(el.startDate) && moment().isBefore(el.endDate)
                  ? "On Going"
                  : moment().isBefore(el.startDate)
                  ? "Scheduled"
                  : "Status Needed"} */}
                  {el.status}
              </td>
              <td className="bg-white text-center text-xs">
                {el.sessions?.length}
              </td>

              <td className="bg-white text-center text-sm">
                { "-"
                  // <StarRating
                  // outOf={5}
                  // rating={el.myRating ?? 0}
                  // size={16}
                  // disabled
                  // />                  
                }
              </td>
              <td className="bg-white text-center text-sm">
                {
                  "-"
                  // <StarRating
                  //   outOf={5}
                  //   rating={el.groupRating ?? 0}
                  //   size={16}
                  //   disabled
                  // />
                }
              </td>
              <td className="rounded-r-2xl text-purple-800 bg-white font-bold  text-center text-xs">
                <Link href={"program-detail/" + el.id}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LatestProgrammes;