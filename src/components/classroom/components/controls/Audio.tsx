import CLASSNAME from "./classname";
import SIZE from "./size";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleAudio } from "@/store/reducers/livestreamSettings";
import { RootState } from "@/store";

const AudioControl = () => {
  const settings = useSelector((state: RootState) => state.live.settings);
  const dispatch = useDispatch();

  return (
    <div className="relative group">
      <div
        className={`${CLASSNAME} ${
          !settings.audio ? "bg-red-600" : ""
        } p-2 rounded cursor-pointer`}
        onClick={() => dispatch(toggleAudio())}
      >
        {settings.audio ? (
          <FaMicrophone color="black" size={SIZE} />
        ) : (
          <FaMicrophoneSlash color="black" size={SIZE} />
        )}
      </div>
      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-max bg-black text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Audio
      </div>
    </div>
  );
};

export default AudioControl;
