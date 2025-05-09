import StandardQueriesPanel from "@/components/panels/StandardQueries";
import { Inset, Popover } from "@radix-ui/themes";
import { IoIosHelpCircleOutline } from "react-icons/io";
import CLASSNAME from "./classname";
import SIZE from "./size";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateLiveStreamSettings } from "@/store/reducers/livestreamSettings";

const RaiseHandControl = () => {
  const settings = useSelector((state: RootState) => state.live.settings);
  const dispatch = useDispatch();

  return (
    <div className="relative group">
      <Popover.Root open={settings.raiseHand}>
        <Popover.Trigger>
          <div
            className={`${CLASSNAME} ${!settings.raiseHand && "bg-white"} `}
            onClick={() =>
              dispatch(
                updateLiveStreamSettings({ raiseHand: !settings.raiseHand })
              )
            }
          >
            <IoIosHelpCircleOutline color="black" size={SIZE} />
          </div>
        </Popover.Trigger>
        <Popover.Content style={{ width: 400 }}>
          <Inset>
            <StandardQueriesPanel
              onSelect={(query) => {
                //Fire the Query to Backend

                dispatch(
                  updateLiveStreamSettings({ raiseHand: !settings.raiseHand })
                );
              }}
            ></StandardQueriesPanel>
          </Inset>
        </Popover.Content>
      </Popover.Root>
      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 max-w-md bg-black text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Queries
      </div>
    </div>
  );
};

export default RaiseHandControl;
