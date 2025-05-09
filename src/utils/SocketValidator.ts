import { UserInfoMapperSocketHandler } from "./UserInfoMapper";
import { SocketContextType } from "./chatSocketUtils";

export const validateAndCreateSocketIfExist = (
  roomId: string,
  callback: Function,
  socketList: SocketContextType[],
  caller = "default"
) => {
  // @ts-ignore

  let userInfoHandler: UserInfoMapperSocketHandler;


  const connectedSocketList = socketList.filter(
    (item) => item.roomId == roomId?.toString()
  );



  if (connectedSocketList.length === 0) {


    userInfoHandler = new UserInfoMapperSocketHandler();

    
    if (roomId !== null && roomId !== undefined) {
      userInfoHandler.initSocket(roomId, callback);
      socketList.push({
        roomId: roomId?.toString(),
        socketObject: userInfoHandler,
      });
    }
  } else {
    userInfoHandler = connectedSocketList[0].socketObject;
    userInfoHandler.setMessageHandler(callback);
  }
  return userInfoHandler;
};
