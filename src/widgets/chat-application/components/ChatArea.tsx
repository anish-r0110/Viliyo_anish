import React, { useEffect, useRef } from "react";
import MessageCard from "./MessageCard";
import { Message } from "../interfaces/Chat";

interface ChatAreaProps {
  animate: string;
  room_id: string;
  getChat: (roomId: string) => void;
  messageList: Message[];
  traineeId: number;
  isPrivateChat: boolean;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  animate,
  room_id,
  getChat,
  messageList,
  traineeId,
  isPrivateChat,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPrivateChat) getChat(room_id);
  }, [isPrivateChat, room_id, getChat]);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <div
      className={`flex flex-col h-96 py-[5%] bg-[#F1F3FF] overflow-y-auto ${animate}`}
      ref={containerRef}
    >
      {messageList?.length
        ? messageList.map((message) => (
            <MessageCard
              key={message.id}
              isReceived={message.message_by_id !== traineeId}
              messageObject={JSON.parse(message.user_message_data)}
              isPrivateChat={message.message_to_id !== room_id}
            />
          ))
        : ""}
    </div>
  );
};

export default ChatArea;
