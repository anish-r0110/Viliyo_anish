import axiosInstance from "@/config/axios";
import { privateList } from "@/middlewares/transform/chat";
import AppStorage from "./AppStorage";

export default class LiveSessionService {

    async fetchConsoleDetails(sessionId : String)
    {
            try {
                const consoleDetails = await axiosInstance.post("/training/console_details", {id : sessionId})
                return consoleDetails;
            }
            catch(error) {
                console.log(error)
            }
    }



    async fetchOnlineParticipants(sessionId : String)
    {
        try{
            const onlineParticipants = await axiosInstance.post('/session/get_online_count',{sessionMapId : sessionId});

            console.log("🚀 ~ LiveSessionService ~ onlineParticipants:", onlineParticipants);

            return onlineParticipants
        }   
        catch(error) {
            console.log('Error',error);
        }     
    }

}
  