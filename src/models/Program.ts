import Batch from "./Batch";
import Session from "./Session";



  type ProgramCategory = 'behavioural' | 'functional' | 'technical' | 'compliance' | 'other';
  type ProgramMode =  'virtual' | 'inperson' | 'hybrid';

  type Currency = 'inr' | 'usd' 
  type BillPer = 'hr' | 'day'


  interface IProgramFees {
    currency: Currency
    per : BillPer
    rate:number
    unit:number
  }
 
  export default interface IProgram {
    id: number;
    batchName : string;
    name: string;
    sessions?: Session[];
    batch?:Batch
    category:string;
    mode: ProgramMode;
    fees?:IProgramFees
    description?:string;
    status?:string
    myRating?: number,
    groupRating?:number,
    engagement?:number,
    startDate?:string,
    endDate?:string,
  }



  
 