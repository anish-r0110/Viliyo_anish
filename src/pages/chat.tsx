import { AppPage } from "@/layouts/types";
import ChatApplication from "@/widgets/chat-application";




const Chat: AppPage = () => {
  return (
    <div className="flex flex-col w-full h-screen px-[35%] py-[3%] bg-app-blue">
      <ChatApplication />
    </div>
  );
};


export default Chat;

Chat.Layout = "Default";
