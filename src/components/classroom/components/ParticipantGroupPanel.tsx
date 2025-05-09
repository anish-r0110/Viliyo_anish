import { Avatar } from "@radix-ui/themes";
import Image from "next/image";
import { RxPerson } from "react-icons/rx";

export const ParticipantGroupPanel = ({ table_name, participants }) => {
  console.log("🚀 ~ ParticipantGroupPanel ~ participants:", participants);

  return (
    <div className="flex flex-col w-full overflow-x-clip">
      <div className="flex text-app-blue p-[1px] bg-app-yellow mx-1">
        <label>{table_name}</label>
      </div>
      <div className=" w-full my-1 gap-x-1 gap-y-1">
        <ParticipantTile
          // profilePhoto={participant.profilePhoto}
          // name={participant.participant_name}
          participants={participants}
          radius={"none"}
          size={undefined} //   size={7}
        />
      </div>
    </div>
  );
};
export const ParticipantTile = ({
  participants,
  profilePhoto,
  name,
  radius,
  size,
  showKebabMenu = false,
}: any) => {
  return (
    <div className="grid grid-cols-2  w-full h-[60%]">
      {participants.filter((seat: any) => seat.seat_number === 1).length > 0 ? (
        participants
          .filter((seat: any) => seat.seat_number === 1)
          .map((seat: any) => (
            <div key={seat.participant_name}>
              <div className="flex w-full my-0.5">
                {seat.profilePhoto ? (
                  <Participant
                    profilePhoto={seat.profilePhoto}
                    name={seat.participant_name}
                  />
                ) : (
                  <NoProfilePhoto name={seat.participant_name} />
                )}
              </div>
            </div>
          ))
      ) : (
        <div className="my-1 mx-1">
          <NoParticipant />
        </div>
      )}
      {participants.filter((seat: any) => seat.seat_number === 2).length > 0 ? (
        participants
          .filter((seat: any) => seat.seat_number === 2)
          .map((seat: any) => (
            <div key={seat.participant_name}>
              <div className="flex w-full my-0.5">
                {seat.profilePhoto ? (
                  <Participant
                    profilePhoto={seat.profilePhoto}
                    name={seat.participant_name}
                  />
                ) : (
                  <NoProfilePhoto name={seat.participant_name} />
                )}
              </div>
            </div>
          ))
      ) : (
        <div className="my-1 mx-1">
          <NoParticipant />
        </div>
      )}
      {participants.filter((seat: any) => seat.seat_number === 3).length > 0 ? (
        participants
          .filter((seat: any) => seat.seat_number === 3)
          .map((seat: any) => (
            <div key={seat.participant_name}>
              <div className="flex w-full my-0.5">
                {seat.profilePhoto ? (
                  <Participant
                    profilePhoto={seat.profilePhoto}
                    name={seat.participant_name}
                  />
                ) : (
                  <NoProfilePhoto name={seat.participant_name} />
                )}
              </div>
            </div>
          ))
      ) : (
        <div className="my-1 mx-1">
          <NoParticipant />
        </div>
      )}
      {participants.filter((seat: any) => seat.seat_number === 4).length > 0 ? (
        participants
          .filter((seat: any) => seat.seat_number === 4)
          .map((seat: any) => (
            <div key={seat.participant_name}>
              <div className="flex w-full my-0.5">
                {seat.profilePhoto ? (
                  <Participant
                    profilePhoto={seat.profilePhoto}
                    name={seat.participant_name}
                  />
                ) : (
                  <NoProfilePhoto name={seat.participant_name} />
                )}
              </div>
            </div>
          ))
      ) : (
        <div className="my-1 mx-1">
          <NoParticipant />
        </div>
      )}
      {participants.filter((seat: any) => seat.seat_number === 5).length > 0 ? (
        participants
          .filter((seat: any) => seat.seat_number === 5)
          .map((seat: any) => (
            <div key={seat.participant_name}>
              <div className="flex w-full my-0.5">
                {seat.profilePhoto ? (
                  <Participant
                    profilePhoto={seat.profilePhoto}
                    name={seat.participant_name}
                  />
                ) : (
                  <NoProfilePhoto name={seat.participant_name} />
                )}
              </div>
            </div>
          ))
      ) : (
        <div className="my-1 mx-1">
          <NoParticipant />
        </div>
      )}
      {participants.filter((seat: any) => seat.seat_number === 6).length > 0 ? (
        participants
          .filter((seat: any) => seat.seat_number === 6)
          .map((seat: any) => (
            <div key={seat.participant_name}>
              <div className="flex w-full my-0.5">
                {seat.profilePhoto ? (
                  <Participant
                    profilePhoto={seat.profilePhoto}
                    name={seat.participant_name}
                  />
                ) : (
                  <NoProfilePhoto name={seat.participant_name} />
                )}
              </div>
            </div>
          ))
      ) : (
        <div className="my-1 mx-1">
          <NoParticipant />
        </div>
      )}
      {participants.filter((seat: any) => seat.seat_number === 7).length > 0 ? (
        participants
          .filter((seat: any) => seat.seat_number === 7)
          .map((seat: any) => (
            <div key={seat.participant_name}>
              <div className="flex w-full my-0.5">
                {seat.profilePhoto ? (
                  <Participant
                    profilePhoto={seat.profilePhoto}
                    name={seat.participant_name}
                  />
                ) : (
                  <NoProfilePhoto name={seat.participant_name} />
                )}
              </div>
            </div>
          ))
      ) : (
        <div className="my-1 mx-1">
          <NoParticipant />
        </div>
      )}
      {participants.filter((seat: any) => seat.seat_number === 8).length > 0 ? (
        participants
          .filter((seat: any) => seat.seat_number === 8)
          .map((seat: any) => (
            <div key={seat.participant_name}>
              <div className="flex w-full my-0.5">
                {seat.profilePhoto ? (
                  <Participant
                    profilePhoto={seat.profilePhoto}
                    name={seat.participant_name}
                  />
                ) : (
                  <NoProfilePhoto name={seat.participant_name} />
                )}
              </div>
            </div>
          ))
      ) : (
        <div className="my-1 mx-1 ">
          <NoParticipant />
        </div>
      )}
    </div>
  );
};

const Participant = ({ profilePhoto, name }: any) => {
  return (
    <div className="flex flex-col mx-1">
      <div className="flex flex-col ">
        <Avatar src={profilePhoto} fallback="?" radius="none" size="7" />

        {/* <img src={profilePhoto} alt="a" className="flex w-full object-cover " /> */}
      </div>
      {name.length <= 8 ? (
        <p className="text-xs px-4 text-white ">{name}</p>
      ) : (
        <p className="text-xs px-4 text-white ">{name.slice(0, 8)}..</p>
      )}
    </div>
  );
};

const NoProfilePhoto = ({ name }: any) => {
  const lastName = name?.split(" ").pop();
  return (
    <div className="p-0.5 flex flex-col">
      {/* <div className="text-4xl flex flex-col justify-center p-8  bg-app-blue border border-app-yellow">
        {(name?.charAt(0) + lastName?.charAt(0)).toUpperCase()}
      </div> */}
      <div className="mx-1">
        <Avatar
          fallback={(name?.charAt(0) + lastName?.charAt(0)).toUpperCase()}
          size="7"
          radius="none"
          color="lime"
        />
      </div>
      {name.length <= 11 ? (
        <p className="text-xs px-6 text-white ">{name}</p>
      ) : (
        <p className="text-xs px-4 text-white ">{name.slice(0, 9)}..</p>
      )}
    </div>
  );
};
const NoParticipant = () => {
  return (
    <div>
      <div className="flex text-8xl bg-[#96989d] text-white  ">
        <RxPerson className="flex mx-auto my-auto" />
      </div>
      <p className="text-white text-xs flex justify-center">Trainee Name</p>
    </div>
  );
};
