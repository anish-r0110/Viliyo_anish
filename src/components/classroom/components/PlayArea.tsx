"use client";
import { InstructorModeMainScreen } from "./backup/instructorModeScreens";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ActivityMode from "./activity-mode";
import BreakingMode from "./breaking-mode";





 const PlayArea = () => {
  const settings = useSelector((state: RootState ) => state.live.settings);
  return (
    <div className="flex flex-col h-full bg-[#212025]">
      {!settings.mode || settings.mode.toLowerCase() == 'break/networking mode' &&  <BreakingMode /> }
      {settings.mode.toLowerCase() == "instructor mode" && <InstructorModeMainScreen /> }
      {settings.mode.toLowerCase() == "activity mode" && <ActivityMode /> }
    </div>
  );
};


export default PlayArea