import io, { Socket } from "socket.io-client";
import { SocketConstants } from "@/config/SocketConstants";
import SocketService from "@/services/SocketService";
import { UserInfoMapperSocketHandler } from "./UserInfoMapper";
let socketObj:  Socket | null = null;
export type SocketContextType = {
    roomId: string | number;
    socketObject: UserInfoMapperSocketHandler
  };