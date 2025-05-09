import axiosInstance from "@/config/axios";

interface socketEventVo {eventType: string; message: string; sessionId: string; source: string; timestamp: string;}


export default class SocketService {


    async logSocketEvent(data : socketEventVo){
        try{
            const response = await axiosInstance.post("session/log_socket_event", data);
           return response;
        }
        catch(error){
            console.log(error)
            }
    }

    async fetchConsoleDetails(data : {id : string})
    {
        try{
            const response = await axiosInstance.post("training/console_details", data);
           return response;
        }
        catch(error){
            console.log(error)
            }

    }

}
  