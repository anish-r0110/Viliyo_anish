import useSocket from "@/components/classroom/websocket/useSocket";
import { createSocketMessage } from "@/middlewares/transform/chat";
import { IMessage } from "@/models";
import { User } from "@/models/User";
import { uploadImages } from "@/services/aws-upload";
import { AppDispatch, RootState } from "@/store";
import { getChatsUsingRoomId } from "@/store/reducers/chat";
import Picker from "emoji-picker-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AttachmentIcon from "@/assets/icons/attachment.svg";
import EmojiIcon from "@/assets/icons/emoji.svg";
import SendIcon from "@/assets/icons/sendIcon.svg";





type ThreadType = "class" | "individual"



export const ChatApplication = () => {
  const [threadType, setThreadType] = useState<ThreadType>("class");
  const [animationClass, setAnimationClass] = useState("");
  const {  settings  } = useSelector((state:RootState) => state.live );
  const  auth = useSelector((state:RootState) => state.auth );
  const dispatch = useDispatch<AppDispatch>()
  const {socket} = useSocket(); 

  useEffect(() => {
     if( auth.user && settings.roomId ){
        dispatch( getChatsUsingRoomId({ room_id:parseInt(settings.roomId), session_map_id: parseInt(settings.roomId) }))
      }

  } ,[ auth.user , settings.roomId])


  const sendMessage = async (  message:string ) => {

    const payload = createSocketMessage(message , auth?.user as User , threadType , settings.roomId as string ) ;
    socket?.emit( 'message', JSON.stringify(payload) )

   

    // const payload = {
    //   type:room_id.toString().split("_").length == 2 ? "private_chat": "group_chat",
    //   room_id: room_id,
    //   session_map_id: session_map_id,
    //   message_by_id: user?.id,
    //   message_to_id: room_id
    //     .toString()
    //     .split("_")
    //     .filter((value: string | number) => value != user?.id)
    //     .join("_"),
    //   user_message_data: JSON.stringify(messageObject),
    // };

    // const response = await chatSevice.createChat(payload);

    // socket.sendMessage( eventObject );
    // return response;
  };


  const [searchQuery, setSearchQuery] = useState("");


  const handleSearchQueryChange = ( e:ChangeEvent<HTMLInputElement> ) => {
    setSearchQuery(e.target.value);
  };


  useEffect(() => {
    setAnimationClass("animate-fade-in");

    const timeoutId = setTimeout(() => {
      setAnimationClass("");
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [threadType]);

  return (
    <div className="relative flex flex-col h-full bg-white">
      <ChatTypeButton activeType={threadType} onChangeType={setThreadType}/>
      { threadType == "class" && <ChatArea threadType={threadType} animate={animationClass} /> }
      <ChatInputs onMessage={sendMessage} />
    </div>
  );
};


const ChatArea = ({ animate , threadType }: { animate: string , threadType:ThreadType }) => {
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { chats } = useSelector(( state:RootState) => state.live )
  const auth  = useSelector(( state:RootState) => state.auth )
  
  useEffect(() => {
    const scrollToBottom = () => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    };

    scrollToBottom();
  }, [chats.messages]);

  return (
    <div
      className={`flex flex-col h-full py-[5%] bg-[#F1F3FF] overflow-y-auto  ${animate}`}
      ref={containerRef}
    >
      {chats.messages.filter(el => !el.isPrivate)?.map((message, index) => {
            return (
              <MessageCard
                key={index}
                isReceived={message.author.id.toString() != auth.user?.id}
                message={message}
              />
            );
          })
      }
    </div>
  );
};



interface ChatInputsProps {
  onMessage: ( message:string ) => void;
}

const ChatInputs = ({ onMessage }: ChatInputsProps) => {
  const [message, setMessage] = useState("");
  const imageUploader = useRef(null);
  const [showEmojiModal, setShowEmojiModal] = useState(false);



  return (
    <div className="flex flex-col bg-app-gray-medium px-[4%] rounded-t-2xl">
      <div className="flex flex-row justify-between bg-white rounded-xl mx-auto m-1 w-full h-[80%] ">
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
            onMessage( message );
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
              searchDisabled={true}
              className="flex mx-auto"
              skinTonesDisabled={true}
              reactionsDefaultOpen={false}
              onEmojiClick={(el) => { console.log( el ) }}
              width={"100%"}
              height={400}
            />
          </div>
        )}

        <Image
          src={AttachmentIcon}
          alt=""
          width={30}
          onClick={() => {
            // imageUploader.current.click();
          }}
          className="hover:cursor-pointer"
        />
        <input
          ref={imageUploader}
          className="edit_btn_photo hidden"
          type="file"
          // accept={props.activity_id === 1 ? '.mp3' : (props.activity_id === 2 ? 'video/*' : '.doc,.docx,application/msword, application/pdf, .ppt')}
          name="attachment_file"
          onChange={async (event) => {
            if( event.target.files ){
              const file = event.target.files[0];
              const message = await uploadImages(file);
              onMessage( message );
            }
          }}
          style={{
            display: "none",
          }}
        />
      </div>
    </div>
  );
};

const MessageCard = ({
  isReceived,
  message,
}: {
  isReceived: boolean;
  message: IMessage;
}) => {
  return (
    <div className={isReceived ? "flex justify-start" : "flex justify-end"}>
      {message.type == "attachment" ? (
        <div className="flex flex-col bg-white px-[5%] py-[4%] shadow-md max-w-[80%] min-w-[60%] h-fit mx-[2%] my-[0.7%] rounded-lg">
          <Image
            src={message.text}
            alt="messageObject"
            className="w-full max-h-52"
          ></Image>
        </div>
      ) : (
        <div className="flex flex-col bg-white px-[5%] py-[4%] shadow-md max-w-[80%] min-w-[60%] h-fit mx-[2%] my-[0.7%] rounded-lg">
          <div
            className={
              isReceived
                ? "text-[#5F488A] text-base font-medium"
                : "text-[#5B5D6B] text-base font-normal"
            }
          >
            {message.text}
          </div>
          <div
            className={
              isReceived
                ? "flex text-[#5F488A] justify-between w-full border-t pt-[2%] mt-[2%] text-sm font-medium"
                : "flex flex-row-reverse text-[#5B5D6B] justify-between w-full border-t pt-[2%] mt-[2%] text-sm font-normal"
            }
          >
          
            <span className="text-xs">{message.author.name}</span>
            <span className="text-xs">{message.time}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const ChatTypeButton = ({
  activeType,
  onChangeType
}: {
  activeType: ThreadType;
  onChangeType: ( type:ThreadType ) => void;
}) => {
  return (
    <div className="flex w-full bg-black h-[8%] gap-[1%] font-medium  text-sm">
      <button
        className={
          activeType == "class"
            ? "w-[50%] rounded-t-2xl   bg-app-purple-100  text-app-blue animate-fade-in text-sm p-1"
            : "w-[50%] rounded-t-2xl bg-app-blue  text-white text-sm p-1"
        }
        onClick={ () => onChangeType("class")}
      >
        Common Chat
      </button>
      <button
        className={
          activeType != "class"
            ?"w-[50%] rounded-t-2xl   bg-app-purple-100  text-app-blue animate-fade-in text-sm p-1"
            : "w-[50%] rounded-t-2xl bg-app-blue  text-white text-sm p-1"
        }
        onClick={() => onChangeType("individual")}
      >
        Private Chat
      </button>
    </div>
  );
};


export default ChatApplication