import React from "react";

interface ChatTypeButtonProps {
  activeType: string;
  changeChatType: (type: string) => void;
  setOpenPrivateChat: (chat: any) => void;
}

const ChatTypeButton: React.FC<ChatTypeButtonProps> = ({
  activeType,
  changeChatType,
  setOpenPrivateChat,
}) => {
  return (
    <div className="flex w-full bg-black h-[8%] gap-[1%] font-medium text-sm">
      <button
        className={
          activeType === "common"
            ? "w-[50%] rounded-t-2xl bg-app-blue text-white animate-fade-in text-sm p-1"
            : "w-[50%] rounded-t-2xl bg-app-purple-100 text-app-blue text-sm p-1"
        }
        onClick={() => {
          changeChatType("common");
          setOpenPrivateChat(null);
        }}
      >
        Common Chat
      </button>
      <button
        className={
          activeType !== "common"
            ? "w-[50%] rounded-t-2xl bg-app-blue text-white animate-fade-in text-sm p-1"
            : "w-[50%] rounded-t-2xl bg-app-purple-100 text-app-blue text-sm p-1"
        }
        onClick={() => {
          changeChatType("private");
          setOpenPrivateChat(null);
        }}
      >
        Private Chat
      </button>
    </div>
  );
};

export default ChatTypeButton;
