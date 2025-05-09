import { RootState } from "@/store";
import React  from "react";
import { useSelector } from "react-redux";

const InstructorModeMainScreen = () => {

   const { trainer } = useSelector((state:RootState) => state.live.settings)
  

  return (
    <div className="relative flex w-full bg-black min-h-full">
    
      {/* <VideoComponent peerId={"trainer@vtt"} /> */}
      <div className="absolute bottom-0 flex w-full bg-black h-10 px-[3%] bg-opacity-50 rounded-t-3xl justify-between">
        <p className="text-white px-2 my-auto">
         { trainer?.name }
        </p>
        {/* <AudioComponent peerId="trainer@vtt" /> */}
      </div>
    </div>
  );
};

export default InstructorModeMainScreen;
