import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Picker from "emoji-picker-react";
import { validateAndCreateSocketIfExist } from "@/utils/SocketValidator";
import EmojiIcon from "../assets/icons/emoji.svg";
import AttachmentIcon from "../assets/icons/attachment.svg";
import SendIcon from "../assets/icons/sendIcon.svg";
import { socketContextType } from "@/interfaces/Socket";

interface ChatInputsProps {
  session_id: string;
  room_id: string;
  sendMessage: Function;
  handleOnMessage: Function;
  socketList: socketContextType[];
  isPrivateChat?: boolean;
  handleAttachment: Function;
}

const ChatInputs: React.FC<ChatInputsProps> = ({
  session_id,
  room_id,
  sendMessage,
  handleOnMessage,
  socketList,
  isPrivateChat = true,
  handleAttachment,
}) => {
  const [message, setMessage] = useState("");
  const userInfoHandler = useRef<any>(null);
  const imageUploader = useRef<HTMLInputElement>(null);
  const [showEmojiModal, setShowEmojiModal] = useState(false);
  const eventObject = {
    type: "chat_message",
    room_id: room_id,
    sub_type: isPrivateChat ? "individual" : "class",
    chat_box_id: session_id,
  };

  const onEmojiClick = (event: any, emojiObject: any) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  useEffect(() => {
    userInfoHandler.current = validateAndCreateSocketIfExist(
      room_id,
      handleOnMessage,
      socketList
    );
  }, [room_id, handleOnMessage, socketList]);

  return (
    <div className="flex flex-col bg-app-gray-medium px-[4%] rounded-t-2xl">
      <div className="flex flex-row justify-between bg-white rounded-xl mx-auto m-1 w-full h-[80%]">
        <input
          type="text"
          className="border-none rounded-xl h-full w-full p-2 outline-none"
          placeholder="Write here....."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Image
          src={SendIcon}
          alt=""
          width={36}
          onClick={() => {
            sendMessage(
              room_id,
              session_id,
              message,
              userInfoHandler.current,
              eventObject
            );
            setMessage("");
          }}
        />
      </div>
      <div className="flex relative w-full justify-end py-[2%] gap-[5%]">
        <Image
          src={EmojiIcon}
          alt=""
          onClick={() => setShowEmojiModal(!showEmojiModal)}
          width={30}
          className="hover:cursor-pointer"
        />
        {showEmojiModal && (
          <div className="absolute w-full max-h-40 mx-auto -top-[450px] pt-5">
            <Picker
              searchDisabled
              className="flex mx-auto"
              skinTonesDisabled
              reactionsDefaultOpen={false}
              onEmojiClick={onEmojiClick}
              width="100%"
              height={400}
              pickerStyle={{
                width: "500px",
                height: "200px",
                zIndex: "99",
              }}
            />
          </div>
        )}
        <Image
          src={AttachmentIcon}
          alt=""
          width={30}
          onClick={() => {
            imageUploader.current?.click();
          }}
          className="hover:cursor-pointer"
        />
        <input
          ref={imageUploader}
          className="edit_btn_photo hidden"
          type="file"
          name="attachment_file"
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (file) {
              const message = await handleAttachment(file);
              sendMessage(
                room_id,
                session_id,
                message,
                userInfoHandler.current,
                eventObject,
                true
              );
            }
          }}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default ChatInputs;
