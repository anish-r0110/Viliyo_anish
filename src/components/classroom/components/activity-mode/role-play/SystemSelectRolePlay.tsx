import React, { useState, useEffect } from "react";
import { TbMasksTheater } from "react-icons/tb";
import { RxCrossCircled } from "react-icons/rx";

const SystemSelectRolePlay = () => {
  const [rolePlayVolunteer, setRolePlayVolunteer] = useState(3);
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      setRolePlayVolunteer(3);
    }
  }, [seconds]);

  const handleClick = (screenNumber: number) => {
    setRolePlayVolunteer(screenNumber);
  };
  return (
    <div className="bg-black w-full h-full flex flex-col justify-center items-center">
      <div className="relative text-white text-6xl border-2 border-white bg-app-yellow p-4 rounded-full -bottom-16 ">
        <div>
          <TbMasksTheater />
        </div>
      </div>
      {rolePlayVolunteer === 1 ? (
        <div className="text-app-blue relative top-8  left-28 gap-x-2 text-xl flex p-1">
          {rolePlayVolunteer === 1 && (
            <p className="text-xs text-red-600">closes in {seconds}s</p>
          )}
          <span>
            <RxCrossCircled />
          </span>
        </div>
      ) : (
        <div className="text-app-blue relative top-8  left-32 gap-x-2 text-xl ">
          <RxCrossCircled />
        </div>
      )}

      <div className="bg-blue-50  w-80 flex space-x-4 p-4 rounded-lg">
        <div className="pt-6 flex flex-col justify-center gap-y-2">
          {rolePlayVolunteer === 2 ? (
            <p className="text-black  font-medium">
              Great! You are one of the Role Players!
            </p>
          ) : rolePlayVolunteer === 1 ? (
            <p className="text-black text-sm font-medium">
              Hey! You have been selected as one of the Role Players!
            </p>
          ) : (
            <p className="text-black text-sm font-medium">
              Hey! You have been nominated by the trainer as one of the Role
              Players!
            </p>
          )}

          <div className="flex justify-center gap-x-4">
            {rolePlayVolunteer === 1 ? (
              <>
                <button
                  onClick={() => handleClick(3)}
                  className={`text-white text-sm bg-green-600 rounded-2xl py-1 px-4 `}
                >
                  Let's start!
                </button>
                <button
                  onClick={() => handleClick(2)}
                  className={`text-white text-sm bg-red-600 rounded-2xl py-1 px-4 `}
                >
                  I decline
                </button>
              </>
            ) : rolePlayVolunteer === 2 ? (
              <div></div>
            ) : (
              <button
                onClick={() => handleClick(3)}
                className={`text-white text-sm bg-green-600 rounded-2xl py-1 px-4 `}
              >
                Let's start!
              </button>
            )}
          </div>
          {rolePlayVolunteer === 2 ? (
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
export default SystemSelectRolePlay;
