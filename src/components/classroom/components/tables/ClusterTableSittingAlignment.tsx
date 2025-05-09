import React, { useState } from "react";
import { tableTypes } from "@/config/LiveStreamingConstants";



import { RxPerson } from "react-icons/rx";
import ClusterTable from "./ClusterTable";
import Participant from "../backup/Participant";
import ParticipantGridViewTable from "../backup/ParticipantGridViewTable";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const NoParticipantPanel = () => {
  return (
    <>
      <div className="bg-[#96989d] rounded-lg truncate flex justify-center ">
        <div className="text-5xl flex justify-center items-center p-2 text-white">
          <RxPerson />
        </div>
      </div>
      <p className="text-xs truncate">Trainee Name</p>
    </>
  );
};

const ClusterTableSittingAlignment = () => {
  


  const { batch } = useSelector(( state:RootState) => state.live.settings)
  

  const [view, setView] = useState(true);
  const tables = ( batch ) ? JSON.parse( batch?.sittingStyle[0].table ) : []

  return (
    <>
      {view ? (
        <div className="text-white  my-10 ">
          {tables?.map((data:any) => (
            <div key={data?.table_name}>
              <div className="flex justify-center space-x-4 truncate">
                {data?.seats.filter((seat: any) => seat.seat_number === 2)
                  .length > 0 ? (
                  data?.seats
                    .filter((seat: any) => seat.seat_number === 2)
                    .map((seat: any) => (
                      <div key={seat.participant_name}>
                        <div className="flex w-full my-0.5">
                          <Participant
                            name={seat.participant_name}
                            id={seat.participant_id}
                            profilePhoto={seat.profilePhoto}
                            size="5"
                            radius="small"
                            kebab={true}
                            video="yes"
                            audio="yes"
                          />
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="my-1 mx-0.5">
                    <NoParticipantPanel />
                  </div>
                )}
                {data.seats.filter((seat: any) => seat.seat_number === 3)
                  .length > 0 ? (
                  data.seats
                    .filter((seat: any) => seat.seat_number === 3)
                    .map((seat: any) => (
                      <div key={seat.participant_name}>
                        <div className="flex w-full my-0.5">
                          <Participant
                            name={seat.participant_name}
                            id={seat.participant_id}
                            profilePhoto={seat.profilePhoto}
                            size="5"
                            radius="small"
                            kebab={true}
                            video="yes"
                            audio="yes"
                          />
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="my-1 mx-0.5">
                    <NoParticipantPanel />
                  </div>
                )}

              </div>

              <div className="flex justify-center">
                <div className="flex flex-col  space-y-4">
                  {data.seats.filter((seat: any) => seat.seat_number === 5)
                    .length > 0 ? (
                    data.seats
                      .filter((seat: any) => seat.seat_number === 5)
                      .map((seat: any) => (
                        <div key={seat.participant_name}>
                          <div className="flex w-full my-0.5">
                            <Participant
                              name={seat.participant_name}
                              id={seat.participant_id}
                              profilePhoto={seat.profilePhoto}
                              size="5"
                              radius="small"
                              kebab={true}
                              video="yes"
                              audio="yes"
                            />
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="my-0.5 mx-1">
                      <NoParticipantPanel />
                    </div>
                  )}
                  {data.seats.filter((seat: any) => seat.seat_number === 7)
                    .length > 0 ? (
                    data.seats
                      .filter((seat: any) => seat.seat_number === 7)
                      .map((seat: any) => (
                        <div key={seat.participant_name}>
                          <div className="flex w-full my-0.5">
                            <Participant
                              name={seat.participant_name}
                              id={seat.participant_id}
                              profilePhoto={seat.profilePhoto}
                              size="5"
                              radius="small"
                              kebab={true}
                              video="yes"
                              audio="yes"
                            />
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="my-0.5 mx-1">
                      <NoParticipantPanel />
                    </div>
                  )}
                </div>

                <ClusterTable
                  typesOfTable={tableTypes.NETWORKING_MODE}
                  tableName={data?.table_name}
                  setView={setView}
                  view={view}
                />
                <div className="flex flex-col justify-center space-y-4">
                  {data.seats.filter((seat: any) => seat.seat_number === 6)
                    .length > 0 ? (
                    data.seats
                      .filter((seat: any) => seat.seat_number === 6)
                      .map((seat: any) => (
                        <div key={seat.participant_name}>
                          <div className="flex w-full my-0.5">
                            <Participant
                              name={seat.participant_name}
                              id={seat.participant_id}
                              profilePhoto={seat.profilePhoto}
                              size="5"
                              radius="small"
                              kebab={true}
                              video="yes"
                              audio="yes"
                            />
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="my-0.5 mx-1">
                      <NoParticipantPanel />
                    </div>
                  )}
                  {data.seats.filter((seat: any) => seat.seat_number === 8)
                    .length > 0 ? (
                    data.seats
                      .filter((seat: any) => seat.seat_number === 8)
                      .map((seat: any) => (
                        <div key={seat.participant_name}>
                          <div className="flex w-full my-0.5">
                            <Participant
                              name={seat.participant_name}
                              id={seat.participant_id}
                              profilePhoto={seat.profilePhoto}
                              size="5"
                              radius="small"
                              kebab={true}
                              video="yes"
                              audio="yes"
                            />
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="my-0.5 mx-1">
                      <NoParticipantPanel />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-center space-x-4">
                {data.seats.filter((seat: any) => seat.seat_number === 1)
                  .length > 0 ? (
                  data.seats
                    .filter((seat: any) => seat.seat_number === 1)
                    .map((seat: any) => (
                      <div
                        key={seat.participant_name}
                        className={` ${
                          seat.seat_number === 1 && "flex justify-center "
                        }`}
                      >
                        <div className="flex w-full my-0.5">
                          <Participant
                            name={seat.participant_name}
                            id={seat.participant_id}
                            profilePhoto={seat.profilePhoto}
                            size="5"
                            radius="small"
                            kebab={true}
                            video="yes"
                            audio="yes"
                          />
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="my-1 mx-0.5">
                    <NoParticipantPanel />
                  </div>
                )}

                {data.seats.filter((seat: any) => seat.seat_number === 4)
                  .length > 0 ? (
                  data.seats
                    .filter((seat: any) => seat.seat_number === 4)
                    .map((seat: any) => (
                      <div
                        key={seat.participant_name}
                        className={`${
                          seat.seat_number === 4 && "flex justify-center "
                        } `}
                      >
                        <div className="flex w-full my-0.5">
                          <Participant
                            name={seat.participant_name}
                            id={seat.participant_id}
                            profilePhoto={seat.profilePhoto}
                            size="5"
                            radius="small"
                            kebab={true}
                            video="yes"
                            audio="yes"
                          />
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="my-1 mx-0.5">
                    <NoParticipantPanel />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-96 overflow-y-auto">
          <ParticipantGridViewTable
            view={() => setView(!view)}
            tableDetails={tables}
          />
        </div>
      )}
    </>
  );
};

export default ClusterTableSittingAlignment;
