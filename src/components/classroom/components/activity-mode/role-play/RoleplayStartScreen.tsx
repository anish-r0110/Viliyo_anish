import React, { useState } from "react";
import { TbMasksTheater } from "react-icons/tb";

const RoleplayStartScreen = () => {
  const [rolePlayEnd, setRolePlayEnd] = useState(false);
  return (
    <div className="bg-black w-full h-full flex justify-center items-center">
      <div className="border border-white  w-80 flex space-x-4 p-4 rounded-lg">
        <div className="text-white text-6xl">
          <TbMasksTheater />
        </div>
        <div className="py-2">
          {rolePlayEnd ? (
            <div>
              <p className="text-white text-xs">Roleplay has ended.</p>
              <p className="text-white ">
                Standby for further instructions from Trainer
              </p>
            </div>
          ) : (
            <div>
              <p className="text-white text-xs">
                Roleplay setup in progress....
              </p>
              <p className="text-white ">Role Players being selected</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default RoleplayStartScreen;
