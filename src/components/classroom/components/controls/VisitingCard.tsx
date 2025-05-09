import { useDispatch, useSelector } from "react-redux";
import CLASSNAME from "./classname";
import { updateLiveStreamSettings } from "@/store/reducers/livestreamSettings";
import { TiBusinessCard } from "react-icons/ti";
import { RootState } from "@/store";
import SIZE from "./size";

const VisitingCardControl = () => {
  const settings = useSelector((state: RootState) => state.live.settings);
  const dispatch = useDispatch();

  return (
    <div className="relative group">
      <div
        className={`mobile:hidden ${CLASSNAME} ${
          !settings.leftPanel?.includes("visitingCardPanel") && "bg-white"
        } `}
        onClick={() => {
          if (settings.leftPanel?.includes("visitingCardPanel"))
            dispatch(updateLiveStreamSettings({ leftPanel: null }));
          else
            dispatch(
              updateLiveStreamSettings({ leftPanel: "visitingCardPanel" })
            );
        }}
      >
        <TiBusinessCard color="black" size={SIZE} />
      </div>
      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 max-w-md bg-black text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Visiting Card
      </div>
    </div>
  );
};

export default VisitingCardControl;
