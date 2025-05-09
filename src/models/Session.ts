export default interface ISession {
    id?: number;
    name: string;
    date: Date;
    startTime:string;
    endTime:string;
    trainer?:Trainer
    participant?:Participant[]
    status?: string;
    segments?: any;
    // Additional session properties
  }
  



  export interface ISessionPlan{

  }


interface Participant extends Person{
    joinTime?: Date;
    leaveTime?: Date;
    videoCallLink?: string;
}