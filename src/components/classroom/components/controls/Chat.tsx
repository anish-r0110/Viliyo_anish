import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import CLASSNAME from "./classname";
import { updateLiveStreamSettings } from "@/store/reducers/livestreamSettings";
import { CiChat1 } from "react-icons/ci";
import SIZE from "./size";

const ChatControl = () => {
  const settings = useSelector((state: RootState) => state.live.settings);
  const dispatch = useDispatch();

  return (
    <div className="relative group">
      <div
        className={`mobile:hidden ${CLASSNAME} ${
          !settings.leftPanel?.includes("chatPanel") && "bg-white"
        } `}
        onClick={() => {
          if (settings.leftPanel?.includes("chatPanel"))
            dispatch(updateLiveStreamSettings({ leftPanel: null }));
          else dispatch(updateLiveStreamSettings({ leftPanel: "chatPanel" }));
        }}
      >
        <CiChat1 color="black" size={SIZE} />
      </div>
      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 max-w-md bg-black text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Chat
      </div>
    </div>
  );
};

export default ChatControl;
