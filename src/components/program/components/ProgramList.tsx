import Link from "next/link";
import StarRating from "@/components/StarRating";
import moment from "moment";
import IProgram from "@/models/Program";

interface IProgramListProps {
  data: IProgram[];
  limit?: number;
}

const ProgramList = ({ data, limit = 3 }: IProgramListProps) => {
  return (
    <div className="mt-2">
      <table className="min-w-full font-normal sty text-app-gray-medium">
        <thead className="">
          <tr className="text-xs mobile:text-xs">
            <th></th>
            <th className="text-left">Programme Name</th>
            <th className=" text-center">Sessions</th>
            <th className=" text-center">Engagement</th>
            <th className=" text-center">Status</th>
            <th className=" text-center">Duration</th>
            <th className=" text-center">My Rating</th>
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

              <td className="px-4 rounded-l-2xl bg-white text-left text-xs ">
                {el.name}
              </td>
              <td className="bg-white text-center text-xs ">
                {el.sessions?.length}
              </td>
              <td className="bg-white text-center text-xs ">{el.engagement}</td>
              <td className="bg-white text-center text-xs ">
                {  el.status}
              </td>
              <td className="bg-white text-center text-xs ">
                {moment(el.startDate).format("DD MMM YYYY") +
                  "  -  " +
                  moment(el.endDate).format("DD MMM YYYY")}
              </td>
              <td className="bg-white text-center text-sm">
                
                -
              </td>
              <td className="bg-white text-center text-sm">
                
               -
              </td>
              <td className="rounded-r-2xl text-purple-800 bg-white font-bold  text-center text-xs mobile:text-xs pr-2">
                <Link href={"program-detail/" + el.id}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProgramList;
