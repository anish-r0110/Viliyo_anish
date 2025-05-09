import React from "react";

export const DeclineRequest = () => {
  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-2xl p-4 flex  space-x-1 w-96 ">
        <p className="text-black font-medium text-sm">
          Trainee Name is requesting to talk to your group?
        </p>
        <button className="bg-app-blue text-white rounded px-2 py-1 text-xs">
          Request Again
        </button>
      </div>
    </div>
  );
};

const TalkToRequestPopup = () => {
  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-2xl p-4 flex  space-x-1 w-96 ">
        <p className="text-black font-medium text-sm">
          Trainee Name is requesting to talk to your group?
        </p>
        <div className="flex space-x-1 text-xs">
          <button className="bg-green-600 text-white rounded px-2 py-1">
            Accept
          </button>
          <button className="bg-red-600 text-white rounded px-2 py-1">
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};
export default TalkToRequestPopup;
