
// interface IQuery {
//   id: number;
//   type: string;
//   reversedComments?: IComment[];
//   question: string;
//   queryHeading: string;
//   sessionName: string;
//   programName: string;
//   traineeName: string;
//   profileImage?: string;
//   comments?: IComment[];
//   createdAt: Date;
//   trainer_data: {
//     trainerResponse: string;
//     trainerName: string;
//     trainerResponseDate: string;
//     trainerProfilePic: string;
//   };
//   raised_by: {
//     id: number;
//     profile_photo: string;
//   };
// }

import { IProgram, ISession } from "@/models";
import { User } from "@/models/User";


export interface IComment {
  id:number , 
  auth:Partial<User> , 
  message:string,
  createdAt:string
}

export interface IReply { id:number , avatar:string , name:string , message:string , isTrainerResponse:boolean , comments:IComment[] , createdAt:string }

interface IQuery {
  id:number,
  title:string,
  query:string,
  replies:IReply[]
  raisedBy: Partial<User>,
  type:'public' | 'private'
  program:Partial<IProgram>,
  session:Partial<ISession>,
  createdAt:Date,
  hasNewReplies:boolean
}

export default IQuery;
