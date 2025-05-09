import React from "react";
import { RxPerson } from "react-icons/rx";

const NoParticipant = () => {
  return (
    <div className="mt-2">
      <div className="bg-gray-500  truncate flex justify-center ">
        <div className="text-7xl m-1 text-white">
          <RxPerson />
        </div>
      </div>
      <p className="text-white text-xs truncate flex justify-center">
        Trainee Name
      </p>
    </div>
  );
};

export default NoParticipant;
