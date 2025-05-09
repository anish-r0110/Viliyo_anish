import IProgram from "@/models/Program"
import transformSession from "./session"



const transformProgram = (data:any):IProgram => {

    return {
        id: data.id ,
        name:data.program_name,
        batchName : data.programBatch[0].batch_name,
        category:(data && data.programMeta && data.programMeta.nature_name) ? String(data.programMeta.nature_name).toLowerCase() : 'other' ,
        sessions: data.sessionList.map( (el:any) =>  transformSession(el) ),
        batch:{id: data.programBatch[0].id  , name: data.programBatch[0].batch_name},
        myRating:1,
        groupRating:4,
        engagement:0,
        mode:'virtual',
        startDate: data.from_date,
        endDate:data.to_date,
        status: data.status ?? 'Not available',
    }
}


export default transformProgram