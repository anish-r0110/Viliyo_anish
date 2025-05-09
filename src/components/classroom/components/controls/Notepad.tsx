import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import CLASSNAME from "./classname";
import { updateLiveStreamSettings } from "@/store/reducers/livestreamSettings";
import SIZE from "./size";
import { CgNotes } from "react-icons/cg";

const NotepadControl = () => {
  const settings = useSelector((state: RootState) => state.live.settings);
  const dispatch = useDispatch();

  return (
    <div className="relative group">
      <div
        className={`mobile:hidden ${CLASSNAME} ${
          !settings.leftPanel?.includes("notepadPanel") && "bg-white"
        } `}
        onClick={() => {
          if (settings.leftPanel?.includes("notepadPanel"))
            dispatch(updateLiveStreamSettings({ leftPanel: null }));
          else
            dispatch(updateLiveStreamSettings({ leftPanel: "notepadPanel" }));
        }}
      >
        <CgNotes color="black" size={SIZE} />
      </div>
      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 max-w-md bg-black text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Notepad
      </div>
    </div>
  );
};

export default NotepadControl;
