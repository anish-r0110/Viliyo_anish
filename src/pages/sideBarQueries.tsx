import { useState } from "react";
import IQuery from "@/interfaces/Query";
import formatDateString from "@/utils/formatDateString";
import { Avatar } from "@radix-ui/themes";

interface QueryProps {
  query: IQuery;
  selectedItem: IQuery;
  onClick: (query: any) => void;
  selectedIndex: number;
}

const SideBarQueryList = ({
  query,
  selectedItem,
  selectedIndex,

  onClick,
}: QueryProps) => {
  const [itemColor, setItemColor] = useState(-1);
  let selectedQuery = query.id === selectedItem.id;
  let selectedQueryColor =
    selectedQuery === true ? "bg-yellow-100" : "transparent";
  const onQueryClick = (query: any) => {
    onClick(query);
    setItemColor(selectedIndex);
  };

  return (
    <div>
      {query ? (
        <div
          onClick={onQueryClick}
          className={` ${selectedQueryColor} ${
            itemColor === selectedIndex && "hover:bg-purple-200"
          }  grid grid-cols-12 bg-white rounded-2xl my-4 p-2 tablet:grid-cols-5 mobile:grid-cols-3  shadow space-x-4 mobile:space-x-0 border-2 border-gray-200 `}
        >
          <div className="col-span-1 mobile:col-span-1 flex justify-center mobile:justify-start items-center">
            <Avatar
              src={query.profileImage}
              fallback={query ? query.traineeName.charAt(0) : "?"}
              size="2"
              width={40}
            ></Avatar>
            <div className="hidden  ml-4">
              <span className="block"> {query.traineeName}</span>
              <span className="block text-xs">
                {formatDateString(new Date(query.createdAt))}
              </span>
            </div>
          </div>
          <div className="col-span-10 mobile:col-span-2  mobile:border-none  py-4 tablet:col-span-3">
            <div className=" text-app-blue mobile:text-sm font-bold">
              {query.question}
            </div>
            <hr className="bg-app-gray h-[0.5px] my-1 w-full"></hr>
            <div className="flex space-x-20 mobile:text-xs mobile:space-x-4">
              <div className="font-bold text-gray-500">{query.traineeName}</div>
              <div>{formatDateString(new Date(query.createdAt))}</div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

interface IQueriesTabProps {
  queries: IQuery[];
  selectedItem: IQuery;
  onItemClick: (query: any) => void;
}

const QueriesTabContent = ({
  queries,
  selectedItem,
  onItemClick,
}: IQueriesTabProps) => {
  return (
    <div>
      {queries.map((query, index) => (
        <SideBarQueryList
          key={query.id}
          query={query}
          selectedItem={selectedItem}
          onClick={() => {
            console.log("clicked");
            onItemClick(query);
          }}
          selectedIndex={index}
        ></SideBarQueryList>
      ))}
    </div>
  );
};

export default QueriesTabContent;
