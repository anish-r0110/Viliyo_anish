import { SocketConstants } from "@/config/SocketConstants";
import SocketService from "@/services/SocketService";
import io, { Socket } from "socket.io-client";

export class UserInfoMapperSocketHandler {
  private SERVER_URL: string = SocketConstants.SOCKET_CHAT_URL;
  private socketObj;

  initSocket = (room: string, onMessageCallBack: Function) => {
    // let roomString = `room=${room}`;
    const socketOptions = {
      query: { room: room },
      secure: true, // Set secure option to true
    };
    this.socketObj = io(SocketConstants.SOCKET_CHAT_URL, socketOptions);

    if (room) {
      // Connect to room once
      this.socketObj.on("message", (msg: any) => {
        onMessageCallBack(msg);
      });
    }
  };

  sendMessage = async (message) => {
    const data = JSON.parse(message);
    data["timestamp"] = new Date().getMilliseconds();
    console.log("Sending message now", data);

    const socketEventVo = {
      eventType: data.sub_type || data.type,
      message: JSON.stringify(data),
      sessionId: data.room_id,
      source: "system",
      timestamp: Date.now().toString(),
    };

    try {
      const response = await SocketService.logSocketEvent(socketEventVo);
      const responseData = await response.json();
      console.log(responseData);
    } catch (err) {
      console.log("Error while capturing event details");
    }

    this.socketObj?.emit("message", JSON.stringify(data));
  };

  setMessageHandler = (newOnMessageCallBack: Function) => {
    this.socketObj.on("message", (msg: any) => {
      console.log(
        "🚀 ~ UserInfoMapperSocketHandler ~ this.socketObj.on ~ msg:",
        msg
      );

      newOnMessageCallBack(msg);
    });
  };
}
