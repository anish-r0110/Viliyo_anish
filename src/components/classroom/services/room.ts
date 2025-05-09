import TestRoomClient from "@/streaming/TestRoomClient";

export const connectRoom = ( traineeDetails:any ,  consoleDetails:any  , sessionId:string , socketList:any) => {

    return new TestRoomClient({
      roomId: sessionId as String,
      peerId: traineeDetails?.id,
      displayName: traineeDetails?.name,
      strUserId: traineeDetails?.email,
      device: null,
      handlerName: null,
      useSimulcast: true,
      useSharingSimulcast: true,
      forceTcp: true,
      produce: true,
      consume: true,
      forceH264: false,
      forceVP9: false,
      svc: false,
      datachannel: true,
      externalVideo: false,
      e2eKey: null,
      socketList,
      displayImage: traineeDetails.profileImage,
      bgImage: traineeDetails.profileImage,
      traineeEmail: traineeDetails.email,
    });

}
