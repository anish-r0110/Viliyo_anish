// import { Avatar, Checkbox, Text } from "@radix-ui/themes";
// import { FaSearch } from "react-icons/fa";
// import { IoArrowBackSharp } from "react-icons/io5";
// import React, { useState, useEffect } from "react";
// import axiosInstance from "@/config/axios";

// const Participant = ({
//   participant,
//   isSelected,
//   toggleSelection,
// }: {
//   participant: { firstName: string; lastName: string };
//   isSelected: boolean;
//   toggleSelection: () => void;
// }) => {
//   return (
//     <div className="flex items-center justify-between">
//       <div className="flex items-center space-x-2 ">
//         <div className="bg-slate-700 rounded-full ">
//           <Avatar
//             fallback={
//               participant?.name?.charAt(0) + participant?.Lname?.charAt(0)
//             }
//             color="gray"
//           ></Avatar>
//         </div>
//         <Text className="text-white truncate">{participant?.name}</Text>
//       </div>
//       <Checkbox size="2" checked={isSelected} onChange={toggleSelection} />
//     </div>
//   );
// };

// const ShareVisitingCardPanel = ({ handleChange }: any) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [consoleDetails, setConsoleDetails] = useState();
//   const [participants, setParticipants] = useState();
//   const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
//     []
//   );

//   useEffect(() => {
//     const consoleData = JSON.parse(localStorage.getItem("consoleDetails"));
//     setConsoleDetails(consoleData);
//     setParticipants(consoleDetails?.batch?.participants || []);
//   }, [participants, consoleDetails]);

//   const handleSearch = () => {
//     // Filter participants based on search query
//     const filteredParticipants = participants?.filter((participant) =>
//       `${participant.name} ${participant.Lname}`
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase())
//     );

//     return filteredParticipants;
//   };

//   const toggleParticipantSelection = (participantEmail: string) => {
//     setSelectedParticipants((prevSelected) =>
//       prevSelected.includes(participantEmail)
//         ? prevSelected.filter((email) => email !== participantEmail)
//         : [...prevSelected, participantEmail]
//     );
//   };
//   const shareVisitingCard = async () => {
//     const response = await axiosInstance.post(
//       "trainee/create_collected_visiting_card",
//       {
//         sessionDate: consoleDetails?.session_start_date,
//         emailId: selectedParticipants,
//         sessionId: consoleDetails?.sessionId,
//       }
//     );
//     console.log("successfully send", response);
//   };

//   return (
//     <div className=" text-white rounded-xl h-full">
//       <div className="p-2 border-b-2 border-white  bg-slate-900 rounded-tl-xl">
//         <div className="flex space-x-2">
//           <div className="text-xl text-app-yellow py-1">
//             <IoArrowBackSharp
//               onClick={() => {
//                 handleChange(1);
//                 shareVisitingCard();
//                 // consoleDetails?.sessionId,
//                 //   ["subrat.chowdhary@viliyo.com", "yash.amlani.c@viliyo.com"],
//                 //   consoleDetails?.session_start_date
//               }}
//             />
//           </div>
//           <p>Share Visiting card</p>
//         </div>
//         <p className="text-xs  pl-7">
//           Select participants to share your visiting card
//         </p>
//       </div>
//       <div className="flex p-2 px-4 -space-x-6">
//         <input
//           className="bg-white text-black rounded-md p-1 justify-center shadow-xl"
//           placeholder="Search Participant"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         ></input>

//         <div className="py-1" onClick={handleSearch}>
//           <FaSearch color="purple" />
//         </div>
//       </div>
//       <div className="p-2 flex flex-col space-y-3 overflow-y-scroll ">
//         {handleSearch()?.map((participant, index) => (
//           <Participant
//             key={index}
//             participant={participant}
//             isSelected={selectedParticipants.includes(participant.email)}
//             toggleSelection={() =>
//               toggleParticipantSelection(participant.email)
//             }
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ShareVisitingCardPanel;

import { Avatar, Checkbox, Text } from "@radix-ui/themes";
import { FaSearch } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/config/axios";

const Participant = ({
  participant,
  isSelected,
  toggleSelection,
}: {
  participant: { name: string; Lname: string; email: string };
  isSelected: boolean;
  toggleSelection: () => void;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2 ">
        <div className="bg-slate-700 rounded-full ">
          <Avatar
            fallback={
              participant?.name?.charAt(0) + participant?.Lname?.charAt(0)
            }
            color="gray"
          ></Avatar>
        </div>
        <Text className="text-white truncate">{participant?.name}</Text>
      </div>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={toggleSelection}
      ></input>
      {/* <Checkbox checked={isSelected} onChange={toggleSelection} /> */}
    </div>
  );
};

const ShareVisitingCardPanel = ({ handleChange }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [consoleDetails, setConsoleDetails] = useState<any>();
  const [participants, setParticipants] = useState<any[]>([]);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    []
  );

  useEffect(() => {
    const consoleData = JSON.parse(localStorage.getItem("consoleDetails"));
    setConsoleDetails(consoleData);
    setParticipants(consoleData?.batch?.participants || []);
  }, []);

  const handleSearch = () => {
    // Filter participants based on search query
    return participants.filter((participant) =>
      `${participant.name} ${participant.Lname}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  };

  const toggleParticipantSelection = (participantEmail: string) => {
    setSelectedParticipants((prevSelected) =>
      prevSelected.includes(participantEmail)
        ? prevSelected.filter((email) => email !== participantEmail)
        : [...prevSelected, participantEmail]
    );
  };

  const shareVisitingCard = async () => {
    console.log("Selected Participants:", selectedParticipants);
    const response = await axiosInstance.post(
      "trainee/create_collected_visiting_card",
      {
        // sessionDate: "2024-04-02",
        // emailIds: ["yash.amlani.c@viliyo.com", "subrat.chowdhary@viliyo.com"],
        // sessionId: 3938,
        sessionDate: consoleDetails?.session_start_date,
        emailId: selectedParticipants,
        sessionId: consoleDetails?.sessionId,
      }
    );
    console.log("successfully sent", response);
  };

  // useEffect(() => {
  //   shareVisitingCard();
  //   console.log("console calling");
  // }, []);
  return (
    <div className="text-white rounded-xl">
      <div className="p-2 border-b-2 border-white bg-slate-900 rounded-tl-xl">
        <div className="flex space-x-2">
          <div className="text-xl text-app-yellow py-1">
            <IoArrowBackSharp
              onClick={() => {
                handleChange(1);
                shareVisitingCard();
              }}
            />
          </div>
          <p>Share Visiting card</p>
        </div>
        <p className="text-xs pl-7">
          Select participants to share your visiting card
        </p>
      </div>
      <div className="flex p-2 px-4 -space-x-6">
        <input
          className="bg-white text-black rounded-md p-1 justify-center shadow-xl"
          placeholder="Search Participant"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="py-1" onClick={handleSearch}>
          <FaSearch color="purple" />
        </div>
      </div>
      <div className="p-2 flex flex-col space-y-3 overflow-y-scroll">
        {handleSearch().map((participant, index) => (
          <Participant
            key={index}
            participant={participant}
            isSelected={selectedParticipants.includes(participant.email)}
            toggleSelection={() =>
              toggleParticipantSelection(participant.email)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ShareVisitingCardPanel;
