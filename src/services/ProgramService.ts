import axiosInstance from "@/config/axios";
import transformProgram from "@/middlewares/transform/program";
import IProgram from "@/models/Program";

export default class ProgramService {
  
   async getLatestPrograms(): Promise<IProgram[]> {
      const url = 'trainee/program_list'; // Replace with your API endpoint
      try {
        
        let response = await axiosInstance.post(url,{latestOnly : true});
        let programs:IProgram[] = response.data.map( (el:any):IProgram =>  transformProgram(el.program) )
        return programs

       } catch (error) {
         return []
       }
    }

    async getAllPrograms(): Promise<IProgram[]> {
      const url = 'trainee/program_list'; // Replace with your API endpoint
      try {
        
        let response = await axiosInstance.post(url);
        let programs:IProgram[] = response.data.map( (el:any):IProgram =>  transformProgram(el.program) )
        return programs

       } catch (error) {
         return []
       }
    }

    async detail(id: string): Promise<IProgram> {
      try {
        let response:any = await axiosInstance.post('trainee/program_details' ,{ id});
        return response.data as IProgram
      } catch (error) {
        console.log( error );
         throw Error('Request Failed')
      }
   }
  
   async getCompletedPrograms(): Promise<IProgram[]> {
      const url = 'trainee/program_list'; // Replace with your API endpoint
      try {
        
        let response = await axiosInstance.post(url,{latestOnly : false});
        let programs:IProgram[] = response.data.map( (el:any):IProgram =>  transformProgram(el.program) )
        programs = programs.filter( ( el :IProgram) =>  {
          if( el.status?.toLowerCase() === 'completed')
          return el 

        })
        return programs

       } catch (error) {
         return []
       }
    }
  }

  



