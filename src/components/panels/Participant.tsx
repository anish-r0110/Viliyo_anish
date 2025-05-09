import { Avatar, Text } from "@radix-ui/themes";
import { VscKebabVertical } from "react-icons/vsc";
import { RxGrid } from "react-icons/rx";
import useToogle from "@/hooks/useToggle";
import React, { useState, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { RxPerson } from "react-icons/rx";
import { ParticipantGroupPanel } from "../classroom/components/ParticipantGroupPanel";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const NoParticipantPanel = () => {
  return (
    <>
      <div className="bg-[#96989d] rounded-lg truncate flex justify-center ">
        <div className="text-2xl flex justify-center items-center p-2 text-white">
          <RxPerson />
        </div>
      </div>
    </>
  );
};

const Participant = ({ name, id }: { name?: string; id?: number }) => {
  const lastName = name?.split(" ").pop();
  return (
    <div className="relative p-0.5 flex items-center space-x-2 px-1">
      <Avatar
        radius="large"
        variant="solid"
        fallback={name?.charAt(0) + lastName?.charAt(0)}
        color="gray"
      />

      <VscKebabVertical
        color="white"
        className="absolute right-0 cursor-pointer px-1"
        size={20}
      />
    </div>
  );
};

export const Table = ({ name }: { name: string }) => {
  return (
    <>
      <div className="relative  flex justify-center items-center h-24 bg-purple-100  rounded-lg ">
        <div className=" bg-app-yellow text-app-blue w-full flex justify-around">
          <p className="px-2">{name}</p>
          {/* <div className="py-1">
            <CiMenuKebab />
          </div> */}
        </div>
      </div>
    </>
  );
};

const SeatStructure = ({ tableDetails }: any) => {
  return (
    <div className="flex flex-col space-y-5 w-fit h-full overflow-y-auto ml-8">
      {tableDetails?.map((data: any) => (
        <div key={data.table_name}>
          <div className="flex justify-center pr-4">
            {data.seats.filter((seat: any) => seat.seat_number === 2).length >
            0 ? (
              data.seats
                .filter((seat: any) => seat.seat_number === 2)
                .map((seat: any) => (
                  <div key={seat.participant_name}>
                    <div className="flex w-full my-0.5">
                      <Participant
                        name={seat.participant_name}
                        id={seat.participant_id}
                      />
                    </div>
                  </div>
                ))
            ) : (
              <div className="my-1 mx-0.5">
                <NoParticipantPanel />
              </div>
            )}
            {data.seats.filter((seat: any) => seat.seat_number === 3).length >
            0 ? (
              data.seats
                .filter((seat: any) => seat.seat_number === 3)
                .map((seat: any) => (
                  <div key={seat.participant_name}>
                    <div className="flex w-full my-0.5">
                      <Participant
                        name={seat.participant_name}
                        id={seat.participant_id}
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
          <div className="flex pr-4">
            <div className="flex flex-col">
              {data.seats.filter((seat: any) => seat.seat_number === 5).length >
              0 ? (
                data.seats
                  .filter((seat: any) => seat.seat_number === 5)
                  .map((seat: any) => (
                    <div key={seat.participant_name}>
                      <div className="flex w-full my-0.5">
                        <Participant
                          name={seat.participant_name}
                          id={seat.participant_id}
                        />
                      </div>
                    </div>
                  ))
              ) : (
                <div className="my-0.5 mx-1">
                  <NoParticipantPanel />
                </div>
              )}
              {data.seats.filter((seat: any) => seat.seat_number === 7).length >
              0 ? (
                data.seats
                  .filter((seat: any) => seat.seat_number === 7)
                  .map((seat: any) => (
                    <div key={seat.participant_name}>
                      <div className="flex w-full my-0.5">
                        <Participant
                          name={seat.participant_name}
                          id={seat.participant_id}
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

            <Table name={data.table_name} />

            <div className="flex flex-col">
              {data.seats.filter((seat: any) => seat.seat_number === 6).length >
              0 ? (
                data.seats
                  .filter((seat: any) => seat.seat_number === 6)
                  .map((seat: any) => (
                    <div key={seat.participant_name}>
                      <div className="flex w-full my-0.5">
                        <Participant
                          name={seat.participant_name}
                          id={seat.participant_id}
                        />
                      </div>
                    </div>
                  ))
              ) : (
                <div className="my-0.5 mx-1">
                  <NoParticipantPanel />
                </div>
              )}
              {data.seats.filter((seat: any) => seat.seat_number === 8).length >
              0 ? (
                data.seats
                  .filter((seat: any) => seat.seat_number === 8)
                  .map((seat: any) => (
                    <div key={seat.participant_name}>
                      <div className="flex w-full my-0.5">
                        <Participant
                          name={seat.participant_name}
                          id={seat.participant_id}
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

          {/* Bottom Seats */}

          <div className="flex justify-center pr-4">
            {data.seats.filter((seat: any) => seat.seat_number === 1).length >
            0 ? (
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
                      />
                    </div>
                  </div>
                ))
            ) : (
              <div className="my-1 mx-0.5">
                <NoParticipantPanel />
              </div>
            )}

            {data.seats.filter((seat: any) => seat.seat_number === 4).length >
            0 ? (
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
  );
};

const ParticpantPanel = () => {
  const [isPanelTileViewOn, onFeedPanel] = useToogle();  
  const { trainer , onlineParticipants , batch } = useSelector((state:RootState) => state.live.settings)
  const lastName = trainer?.name?.split(" ").pop();
  const tables = JSON.parse( batch?.sittingStyle[0].table );

  return (
    <div className="flex flex-col min-w-full h-full overflow-y-auto">
      <div className="flex justify-between bg-slate-800 text-white text-center py-[5%] px-[2%] w-full rounded-tl-xl gap-5">
        <Text>
          <span className="tracking-wide px-2">Participant</span>
          <span className="text-app-yellow ">{onlineParticipants}</span>/
          <span>{batch?.participants.length}</span>
        </Text>
        <RxGrid onClick={onFeedPanel} size={25} className="inline " />
      </div>
      <div className="bg-transparent flex justify-center items-center ">
        {isPanelTileViewOn && (
          <div className="bg-purple-950 px-10 py-1 rounded-b-full shadow-md shadow-slate-500">
            <Avatar
              src={trainer?.profilePhoto}
              variant="solid"
              highContrast
              radius="large"
              color="gray"
              size="4"
              fallback={
                trainer?.name?.charAt(0) + lastName?.charAt(0)
              }
            />
          </div>
        )}
        {!isPanelTileViewOn && (
          <div className="bg-purple-950 px-10 py-1 rounded-b-full shadow-md shadow-slate-500">
            <Avatar
              variant="solid"
              highContrast
              radius="large"
              color="gray"
              size="4"
              fallback={
                trainer?.name?.charAt(0) + lastName?.charAt(0)
              }
            />
          </div>
        )}
      </div>
      {!isPanelTileViewOn && (
        <div className="flex flex-col justify-center items-center h-[350px] overflow-y-auto ">
          <SeatStructure tableDetails={tables} />
        </div>
      )}

      {isPanelTileViewOn && (
        <div className="flex flex-col mt-2 h-96 w-full px-[1%] items-center overflow-y-auto">
          {tables.map((item:any) => (
            <ParticipantGroupPanel
               key={item.table_name}
              table_name={item.table_name}
              participants={item.seats}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ParticpantPanel;
