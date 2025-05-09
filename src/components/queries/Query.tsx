import IQuery from "@/interfaces/Query";
import formatDateString from "@/utils/formatDateString";
import { Avatar , Text} from "@radix-ui/themes";
import Link from "next/link";
import { RxDotFilled } from "react-icons/rx";

interface QueryProps {
    query: IQuery;
}

const Query = ({ query }: QueryProps) => {
    return (
      <div className="grid grid-cols-12 bg-white rounded-2xl my-2 p-1  tablet:grid-cols-5 mobile:grid-cols-1  shadow-lg  ">
        <div className="col-span-3 mobile:col-span-1 flex justify-start mobile:justify-start items-center space-x-2 mx-4">
          <Avatar
            src={query.raisedBy.profileImage}
            fallback="?"
            size="6"
            width={40}
          ></Avatar>
          <div>
            <p className="block "> {query.raisedBy.name}</p>
            <p className="block text-xs opacity-75">
              {formatDateString(new Date(query.createdAt))}
            </p>
          </div>
        </div>
        <div className="col-span-9 mobile:col-span-2 border-l-2 mobile:border-none  p-4 tablet:col-span-5">
          <div className="flex justify-between">
            <div className="mobile:text-xs space-y-4">
              <p className=" text-app-blue mobile:text-sm font-bold">
                {query.title}
              </p>
              <div>
                <div className=" mobile:block space-x-2">
                  <Text className=" text-zinc-600">Session:</Text>
                  <span className="text-zinc-600 font-bold ">
                    {query.session.name}
                  </span>
                </div>
                <div className=" mobile:block space-x-2 ">
                  <Text className=" text-zinc-600">Programme:</Text>
                  <span className="text-zinc-600 font-bold ">
                    {" "}
                    {query.program.name}
                  </span>
                </div>
              </div>
            </div>
            <div className="py-6">
              <Link
                className=" mobile:text-white mobile:bg-app-blue   rounded-full "
                href={`query-details?query=${query.id}`}
              >
                <p className="px-8 py-1 text-app-blue  text-xl underline font-bold">
                  View
                </p>
                { query.hasNewReplies && <div className="flex px-0">
                  <RxDotFilled size={25} color="green" />
                  <span className="text-green-700">New Replies</span>
                </div> }
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Query;