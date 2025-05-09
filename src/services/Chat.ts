import axiosInstance from "@/config/axios";
import { privateList } from "@/middlewares/transform/chat";
import AppStorage from "./AppStorage";

export default class ChatService {

    async createChat(payloadObject)
    {
            try{
                const createChat = await axiosInstance.post("session/create_chat",payloadObject )
                return createChat;
            }
            catch(error){
                console.log(error)
            }
    }

    async getChatsUsingRoomId(room_id: number,session_map_id : Number = 2889) {
      try {
        const appStorage = new AppStorage();
        const userData = appStorage.getItem("userData");
        const response = await axiosInstance.post("session/read_chat", {
            room_id: room_id,
            session_map_id: session_map_id
        })

        return {data : response.data,traineeId : userData.id};
      } catch (error) {
        console.log(error)
      }
    }

    async getTraineeChats(session_map_id : Number = 2889){
        try{
            const appStorage = new AppStorage();
            const userData:any = appStorage.getItem("userData");
            const response1 = await axiosInstance.post("session/get_chat_user_trainee", {
            traineeId:userData.id,
            session_map_id: session_map_id
           });
           localStorage.setItem(userData.id,userData.name);
           return privateList(response1.data,userData);
        }
        catch(error){
            console.log(error)
            }
    }

}
  