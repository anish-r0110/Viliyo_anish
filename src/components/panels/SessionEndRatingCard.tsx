import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import StarRating from "../shared/StarRating";
const SessionEndRatingCard = () => {
  const [starRating, setStarRating] = useState(0);
  return (
    <>
      <div className="bg-black flex justify-center items-center py-2">
        <div className="h-42 w-96 rounded-xl bg-gray-200">
          <div className="flex justify-end p-2">
            <IoMdClose />
          </div>
          <div className="flex justify-center">
            <p className=" font-medium text-sm p-2">
              Before you leave, please rate this live session based on your
              overall learning experience
            </p>
          </div>
          <div>
            <StarRating
              outOf={5}
              onRatingChange={(value) => setStarRating(value)}
              disabled={false}
              rating={starRating}
            />
          </div>
          <div className="flex justify-center p-4">
            <button className="bg-gradient-to-br from-40% from-app-blue to-app-purple px-4 py-1 text-white rounded-2xl">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SessionEndRatingCard;
