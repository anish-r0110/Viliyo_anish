import SessionDescription from "@/components/session/SessionDescription";
import CameraMicTest from "./CameraMicTest";
import { useEffect, useState } from "react";
import calculateDurationInMinutes from "@/utils/durationInMinutes";
import { useRouter } from "next/router";
import LiveSessionService from "@/services/LiveSessionService";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchLiveSessionSettings, fetchOnlineParticipants } from "@/store/reducers/livestreamSettings";


interface SessionAcknowdlegementProps {
  onJoin?: () => void;
  sessionId?: string;
}

interface SeatingStyle {
  id: number;
  seating_type: string;
  nos_of_participant_on_table: number;
  nos_of_table: number;
  prefGroupSize: number;
  assign_manually: boolean;
  showSeatOccupied: string;
  allowSwap: boolean;
  allowStand: boolean;
  allowBlock: boolean;
  spclInvitePerSeat: number;
  noOfSpecialSeat: number;
  table: string; // It seems to be an array, but it's represented as a string in the JSON
}

interface Batch {
  id: number;
  batch_name: string;
  audienceType: number;
  participants: any[]; // You may want to replace 'any' with a specific type if possible
  supportTeamList: any[]; // Replace 'any' if possible
  sittingStyle: SeatingStyle[];
  created_on: string; // It's a date in the JSON, you might want to use the 'Date' type
}

interface Program {
  id: number;
  subscriber_id: number;
  program_name: string;
  from_date: string; // It's a date in the JSON, you might want to use the 'Date' type
  to_date: string; // It's a date in the JSON, you might want to use the 'Date' type
  total_batches: number | null; // You might want to replace 'number' with 'null' if applicable
  total_sessions: number | null; // You might want to replace 'number' with 'null' if applicable
  total_participants: number | null; // You might want to replace 'number' with 'null' if applicable
  training_days: number;
  status: string;
  targetAudienceId: number | null; // You might want to replace 'number' with 'null' if applicable
  training_hours: string;
  programMeta: any; // Replace 'any' if possible
  session_link: string;
  passcode_protected: boolean;
  passcode: string | null; // You might want to replace 'string' with 'null' if applicable
  invite_trigger_date: string | null; // It's a date in the JSON, you might want to use the 'Date' type
  invite_trgr_threshld_day: number;
  createdAt: string; // It's a date in the JSON, you might want to use the 'Date' type
  updatedAt: string; // It's a date in the JSON, you might want to use the 'Date' type
  deletedAt: string | null; // It's a date in the JSON, you might want to use the 'Date' type
  program_setup_completed: boolean;
  isCustomAudienceType: boolean;
  custumAudienceName: string | null; // You might want to replace 'string' with 'null' if applicable
  isDomain: boolean;
  domainName: string | null; // You might want to replace 'string' with 'null' if applicable
  isRegistration: boolean;
  linkSettingsSaved: boolean;
  linkType: string;
}

interface Session {
  id: number;
  session_name: string;
  program: Program;
  programId: number;
  forAll: boolean;
  subscriber_id: number;
  last_updated_at: string; // It's a date in the JSON, you might want to use the 'Date' type
}

interface Trainer {
  id: number;
  name: string;
  email: string;
  phone: string; // You might want to replace 'string' with 'null' if applicable
  address: string; // You might want to replace 'string' with 'null' if applicable
  subscriber_id: number;
  createdAt: string; // It's a date in the JSON, you might want to use the 'Date' type
  updatedAt: string; // It's a date in the JSON, you might want to use the 'Date' type
  deletedAt: string | null; // It's a date in the JSON, you might want to use the 'Date' type
}

interface ConsoleDetails {
  id: number;
  session_start_date: string; // It's a date in the JSON, you might want to use the 'Date' type
  session_end_date: string; // It's a date in the JSON, you might want to use the 'Date' type
  sessionId: number;
  session_start_time: string;
  session_end_time: string;
  program_id: number | null; // You might want to replace 'number' with 'null' if applicable
  status: string;
  batchId: number;
  batch: Batch;
  session: Session;
  trainer: Trainer;
  sessionDynamicData: any[]; // Replace 'any' if possible
}






const SessionAcknowdlegement = ({
  sessionId,
  onJoin,
}: SessionAcknowdlegementProps) => {
  
 const { session , onlineParticipants , batch , roomId } = useSelector(( state:RootState) => state.live.settings )
 const dispatch = useDispatch<AppDispatch>()



  useEffect(() => {
    if (sessionId) {
      dispatch( fetchLiveSessionSettings( sessionId) )
      dispatch( fetchOnlineParticipants( sessionId) )
    }
  }, [sessionId]);

  return (
    <>
      <div className="grid grid-cols-2 bg-zinc-600 rounded-2xl p-6 gap-x-4">
        <div>
          <CameraMicTest />
        </div>
        <div className="bg-zinc-900 rounded-2xl p-6">
          {session ? (
            <SessionDescription
              totalParticipants={batch?.participants.length }
              onlineParticipants={onlineParticipants}
              sessionName={session.session_name}
              programmeName={session.program.program_name}
              batchName={batch?.batch_name}
              sessionId={session?.id}
              roomID={ roomId  ?? ''}
              date={session.startDate}
              overallDuration={`${session.startDate} - ${session.endDate}`}
              sessionDuration={
                calculateDurationInMinutes(
                  session.startTime,
                  session.endTime
                ).toString() + " min"
              }
            />
          ) : (
            <span className="text-white">
              Unable to fetch Session Information
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default SessionAcknowdlegement;
