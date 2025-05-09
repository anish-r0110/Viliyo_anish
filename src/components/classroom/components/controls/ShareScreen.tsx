import SIZE from "./size";
import { FaLongArrowAltUp } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import CLASSNAME from "./classname";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleScreenPresentation } from "@/store/reducers/livestreamSettings";

const ShareScreenControl = () => {
  const settings = useSelector((state: RootState) => state.live.settings);
  const dispatch = useDispatch();

  return (
    <div className="relative group">
      <div
        className={`${CLASSNAME} ${
          !settings.isScreenPresented && "bg-white-600"
        } `}
        onClick={() => {
          dispatch(toggleScreenPresentation());
        }}
      >
        {!settings.isScreenPresented ? (
          <FaLongArrowAltUp color="black" size={SIZE} />
        ) : (
          <IoMdCloseCircleOutline color="black" size={SIZE} />
        )}
      </div>
      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 max-w-md bg-black text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Share Screen
      </div>
    </div>
  );
};

export default ShareScreenControl;
