import Session from "@/models/Session";




export default function transformSession( data:any ): Session {
    const transformedSession: Session = {
        id: data.id,
        date: (data && data.sessionMappings && data.sessionMappings[0].session_start_date)? data.sessionMappings[0].session_start_date  : 'Not Available' ,
        startTime: (data && data.sessionMappings && data.sessionMappings[0].session_start_time)? data.sessionMappings[0].session_start_time :  '00:00',
        endTime: (data && data.sessionMappings && data.sessionMappings[0].session_end_time)? data.sessionMappings[0].session_end_time :  '00:00',
        trainer: {
            fullName: (data && data.sessionMappings && data.sessionMappings[0].trainer)? data.sessionMappings[0].trainer.name :  'NA',
            email:(data && data.sessionMappings && data.sessionMappings[0].trainer)? data.sessionMappings[0].trainer.email :  'NA'
        },
        name: data.session_name,
        segments:(data && data.sessionSegment)? data.sessionSegment :  [],
        status: (data && data.sessionMappings && data.sessionMappings[0].status)? data.sessionMappings[0].status :  'Not Applicable'
    };
  
    return transformedSession;
  }