import ISession from "./Session";

export default interface IEvent {
  id: number;
  title: string;
  programName: string;
  program:{ id: string , name:string}
  trainerName: string;
  date: string;
  startTime: string;
  endTime: string;
  session?: ISession;
  status: string;
  room ?: { sessionId: number , sessionMapId:number  , roomName: string }
}
