import { toggleVideo } from "@/store/reducers/livestreamSettings";
import { IoVideocamOffOutline, IoVideocamOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import CLASSNAME from "./classname";
import SIZE from "./size";
import { RootState } from "@/store";

const VideoControl = () => {
  const settings = useSelector((state: RootState) => state.live.settings);
  const dispatch = useDispatch();

  return (
    <div className="relative group">
      <div
        className={`${CLASSNAME} ${!settings.video && "bg-red-600"} `}
        onClick={() => {
          dispatch(toggleVideo());
        }}
      >
        {settings.video ? (
          <IoVideocamOutline color="black" size={SIZE} />
        ) : (
          <IoVideocamOffOutline color="black" size={SIZE} />
        )}
      </div>
      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 max-w-full bg-black text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Video
      </div>
    </div>
  );
};

export default VideoControl;
