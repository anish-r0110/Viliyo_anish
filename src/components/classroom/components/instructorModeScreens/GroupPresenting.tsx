import React, { useState } from "react";
import Participant from "../backup/Participant";

const GroupPresenting = () => {
  const [participantCount, setParticipantCount] = useState([
    {
      name: "Tuhin",
      image: "",
    },
    {
      name: "Nitin",
      image: "",
    },
    {
      name: "Yash",
      image: "",
    },
    {
      name: "Prathamesh",
      image: "",
    },
    {
      name: "Subrat",
      image: "",
    },
    {
      name: "Geetha",
      image: "",
    },
  ]);
  return (
    <div>
      <div className="bg-gray-600 p-1 rounded-t-2xl">
        <p className="text-white flex justify-center text-sm">Group 2</p>
      </div>
      <div className="grid grid-cols-4">
        {participantCount.map((data) => (
          <Participant key={data.name} name={data.name} size="9" radius="small" />
        ))}
      </div>
      <div className="flex justify-center">
        <button className="bg-green-600 text-white rounded-xl px-2 py-1 border border-white">
          Start Your Presentation
        </button>
      </div>
    </div>
  );
};
export default GroupPresenting;
