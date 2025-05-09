import React from "react";
import { Avatar } from "@radix-ui/themes";

interface PrivateChatListProps {
  list: any[];
  setOpenPrivateChat: (chat: any) => void;
  filteredParticipants: any[];
}


const PrivateChatListItem: React.FC<{ item: any , setOpenPrivateChat:( chat:any) => void }> = ({ item , setOpenPrivateChat}) => {
    return (
      <div
        className="flex w-[95%] bg-white my-2 justify-center py-[2%] px-[2%] gap-[5%] rounded-lg shadow-md overflow-y-auto"
        onClick={() => setOpenPrivateChat(item)}
      >
        {item?.profilePhoto ? (
          <Avatar src={item?.profilePhoto} fallback={"?"}></Avatar>
        ) : (
          <span className="flex w-10 h-10 rounded-full bg-black text-white text-center px-2">
            {item?.name && (
              <p className="my-auto">{item.name.substring(0, 1)}</p>
            )}
            {item?.Lname && (
              <p className="my-auto">{item.Lname.substring(0, 1)}</p>
            )}
          </span>
        )}
        <div className="flex flex-col w-full">
          <label className="my-auto text-lg font-medium text-app-blue">
            {item?.fullname || item?.name}
          </label>
          <p className="truncate text-sm font-extralight overflow-hidden max-h-[1.5em] max-w-[80%]">
            {item?.lastMessage?.message}
          </p>
        </div>
      </div>
    );
  };



const PrivateChatList: React.FC<PrivateChatListProps> = ({
  list,
  setOpenPrivateChat,
  filteredParticipants,
}) => {
 

  return (
    <div className="flex flex-col w-96 h-full py-[3%] bg-[#F1F3FF]">
      <div className="flex flex-col w-full h-full py-[3%] bg-[#F1F3FF]">
        {filteredParticipants.map((participant) => (
          <PrivateChatListItem
            key={participant.id}
            item={participant}
            setOpenPrivateChat={setOpenPrivateChat}
          />
        ))}
      </div>
    </div>
  );
};

export default PrivateChatList;
