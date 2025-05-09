import { RootState } from "@/store";
import { FaRegHandshake } from "react-icons/fa";
import { useSelector } from "react-redux";
import Mode from "../model/Mode";

const ModeHeading = () => {
  const settings = useSelector((state:RootState) => state.live.settings);

  return (
    <div className="flex justify-center items-center gap-4">
      <div className="border-2 border-app-yellow rounded-3xl  text-white flex gap-4 px-4 py-0.5">
        <div>{settings.mode}</div>
        <div className="text-white text-2xl">
          { settings.mode === Mode.NETWORKING &&  <FaRegHandshake /> }
        </div>
      </div>
    </div>
  );
};

export default ModeHeading;
