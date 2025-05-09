import { HiUsers } from "react-icons/hi2";
import CLASSNAME from "./classname";
import SIZE from "./size";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateLiveStreamSettings } from "@/store/reducers/livestreamSettings";

const ParticipantControl = () => {
  const settings = useSelector((state: RootState) => state.live.settings);
  const dispatch = useDispatch();

  return (
    <div className="relative group">
      <div
        className={`${CLASSNAME} ${
          !settings.leftPanel?.includes("participantPanel") && "bg-white"
        } `}
        onClick={() => {
          if (settings.leftPanel?.includes("participantPanel"))
            dispatch(updateLiveStreamSettings({ leftPanel: null }));
          else
            dispatch(
              updateLiveStreamSettings({ leftPanel: "participantPanel" })
            );
        }}
      >
        <HiUsers color="black" size={SIZE} />
      </div>
      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 max-w-md bg-black text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Participants
      </div>
    </div>
  );
};

export default ParticipantControl;
