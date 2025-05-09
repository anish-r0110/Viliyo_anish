import React, { useEffect, useState } from "react";
import Trainer from "../../backup/Trainer";
import { SquareShapeParticipant } from "../../backup/OneToOneVideoChat";
import p20 from "../../../../../assets/images/p20.jpg";

const OpenClassInteraction = () => {
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes converted to seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          // Handle timeout here
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: any) => {
    return time < 10 ? `0${time}` : time;
  };
  const participantArray = [
    { participant: <SquareShapeParticipant name="Shakthi" image={p20} /> },
    { participant: <SquareShapeParticipant name="Shakthi" image={p20} /> },
    { participant: <SquareShapeParticipant name="Shakthi" image={p20} /> },
    { participant: <SquareShapeParticipant name="Shakthi" image={p20} /> },
    { participant: <SquareShapeParticipant name="Shakthi" image={p20} /> },
    { participant: <SquareShapeParticipant name="Shakthi" image={p20} /> },
    { participant: <SquareShapeParticipant name="Shakthi" image={p20} /> },
    { participant: <SquareShapeParticipant name="Shakthi" image={p20} /> },
    { participant: <SquareShapeParticipant name="Shakthi" image={p20} /> },
    { participant: <SquareShapeParticipant name="Shakthi" image={p20} /> },
    { participant: <SquareShapeParticipant name="Shakthi" image={p20} /> },
    { participant: <SquareShapeParticipant name="Shakthi" image={p20} /> },
    { participant: <SquareShapeParticipant name="Shakthi" image={p20} /> },
    { participant: <SquareShapeParticipant name="Shakthi" image={p20} /> },
  ];
  return (
    <div>
      <div className="flex justify-center py-4">
        <Trainer name="Tuhin" trainerTableName="null" />
      </div>
      <div className="flex justify-end text-white px-2">
        <div>
          <p className="p-2 bg-gray-500 rounded-md">
            {formatTime(minutes)}:{formatTime(seconds)}
            <span className="text-xs"> Remaining</span>
          </p>
        </div>
      </div>
      <div className="h-80 w-full grid grid-cols-4 overflow-y-auto">
        {participantArray.map((data) => data.participant)}
        <SquareShapeParticipant name="Shakthi" image={p20} />
      </div>
    </div>
  );
};

export default OpenClassInteraction;
