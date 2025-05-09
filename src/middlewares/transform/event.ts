import IEvent from "@/models/Event";

const transformEvent = (data: any): IEvent => {
  return {
    id: data.session_map_id,
    title: data.session.event_name,
    programName: data.session.program_name,
    program:{ id: data.session.programId, name: data.session.program_name },
    trainerName: data.trainerName,
    startTime: new Date( data.session_start_date + "T" + data.session_start_time).toString(),
    endTime:  new Date( data.session_end_date + "T" + data.session_end_time).toString(),
    date: new Date(data.session_start_date).toString(),
    status: data.status,
    room: { sessionId:data.session.session_id ,  sessionMapId:data.session_map_id , roomName:'' }
  };
};

export default transformEvent;
