import React from "react";
import { Message } from "../interfaces/Chat";

interface MessageCardProps {
  isReceived: boolean;
  messageObject: Message;
  isPrivateChat: boolean;
}

const MessageCard: React.FC<MessageCardProps> = ({
  isReceived,
  messageObject,
  isPrivateChat,
}) => {
  return (
    <div className={isReceived ? "flex justify-start" : "flex justify-end"}>
      {messageObject.message_type === "attachment" ? (
        <div className="flex flex-col bg-white px-[5%] py-[4%] shadow-md max-w-[80%] min-w-[60%] h-fit mx-[2%] my-[0.7%] rounded-lg">
          <img
            src={messageObject.message}
            alt="messageObject"
            className="w-full max-h-52"
          />
        </div>
      ) : (
        <div className="flex flex-col bg-white px-[5%] py-[4%] shadow-md max-w-[80%] min-w-[60%] h-fit mx-[2%] my-[0.7%] rounded-lg">
          <p
            className={
              isReceived
                ? "text-[#5F488A] text-base font-medium"
                : "text-[#5B5D6B] text-base font-normal"
            }
          >
            {messageObject.message}
          </p>
          <p
            className={
              isReceived
                ? "flex text-[#5F488A] justify-between w-full border-t pt-[2%] mt-[2%] text-sm font-medium"
                : "flex flex-row-reverse text-[#5B5D6B] justify-between w-full border-t pt-[2%] mt-[2%] text-sm font-normal"
            }
          >
            {!isPrivateChat ? <span>{messageObject.message_by_name}</span> : <span></span>}
            <span>{messageObject?.message_time}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default MessageCard;
