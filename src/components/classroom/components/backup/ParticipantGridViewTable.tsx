import React from "react";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import Participant from "./Participant";


const ParticipantGridViewTable = ({ view, tableDetails }: any) => {
  return (
    <div className="mx-2">
      <div className="text-2xl text-white flex justify-start m-2 ">
        <div className="bg-gray-600 p-2 rounded-lg opacity-50">
          <AiOutlineFullscreenExit onClick={view} />
        </div>
      </div>
      {tableDetails.map((data: any) => (
        <>
          <div className="bg-gray-600 p-1 rounded-t-2xl mx-2">
            <p className="text-white flex justify-center text-sm">
              {data.table_name}
            </p>
          </div>
          <div className="grid grid-cols-4 justify-center text-white gap-8 m-2">
            {data.seats.map((seat: any) => (
              <Participant
                key={seat.participant_name}
                name={seat.participant_name}
                id={seat.participant_id}
                profilePhoto={seat.profilePhoto}
                size="9"
                radius="small"
              />
            ))}
          </div>
        </>
      ))}

      {/* <div className="flex justify-center">
        {activeAnotherSeat && (
          <button className="bg-orange-600 border-2 border-white rounded-3xl text-white px-2 py-1">
            Leave Group
          </button>
        )}
      </div> */}
    </div>
  );
};
export default ParticipantGridViewTable;
