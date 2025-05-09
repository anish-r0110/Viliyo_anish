import React, { useState } from "react";
import { TbMasksTheater } from "react-icons/tb";
import { RxCrossCircled } from "react-icons/rx";
import { Avatar, Box, Popover } from "@radix-ui/themes";
import RoleplayPopup from "./RoleplayPopup";

const RoleplaySelectedByVolunteer = () => {
  const [rolePlayVolunteer, setRolePlayVolunteer] = useState(false);
  const [close, setClose] = useState(false);

  const handleClick = () => {
    setRolePlayVolunteer(!rolePlayVolunteer);
  };

  const handleClose = () => {
    setClose(!close);
  };
  return (
    <div className="bg-black w-full h-full flex flex-col justify-center items-center">
      <div className="relative text-white text-6xl border-2 border-white bg-app-yellow p-4 rounded-full -bottom-16 ">
        <div>
          <TbMasksTheater />
        </div>
      </div>
      <div className="text-app-blue relative top-8  left-32 text-xl">
        <RoleplayPopup button={<RxCrossCircled />} />
      </div>

      <div className="bg-blue-50  w-80 flex space-x-4 p-4 rounded-lg">
        <div className="pt-6 flex flex-col justify-center gap-y-2">
          {rolePlayVolunteer ? (
            <p className="text-black  font-medium">
              Great! You have been selected as one of the Role Players!
            </p>
          ) : (
            <p className="text-black text-sm font-medium">
              This is your chance to volunteer as one of the Role Players!
            </p>
          )}

          <div className="flex justify-center">
            <button
              onClick={handleClick}
              className={`text-white text-sm bg-green-600 rounded-2xl py-1 px-4 ${
                rolePlayVolunteer && "hidden"
              }`}
            >
              Yes, I Volunteer!
            </button>
          </div>
          {rolePlayVolunteer ? (
            <p className="text-black text-xs">
              Remember to keep your camera and audio enabled for the best
              outcome & experience
            </p>
          ) : (
            <p className="text-black text-xs">
              You will need to keep your camera and audio enabled for the best
              outcome & experience
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default RoleplaySelectedByVolunteer;
