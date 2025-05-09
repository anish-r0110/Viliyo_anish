import transformSession from "./session";


export default function transformBatch( data:any , sessionsData:any ): Batch {

    const transformedBatch: Batch = {
        id: data.id,
        name: data.batch_name,
        sessions: sessionsData.map(transformSession),
        createdAt: new Date(data.created_on),
    };
  
    return transformedBatch;
  }