import useToogle from "@/hooks/useToggle";
import { Inset, Popover } from "@radix-ui/themes";
import { GoSmiley } from "react-icons/go";
import CLASSNAME from "./classname";
import SIZE from "./size";
import { ReactionPanel } from "../panels";

const ReactionControl = () => {
  const [isOn, toogleReaction] = useToogle();

  return (
    <div className="relative group">
      <Popover.Root open={isOn}>
        <Popover.Trigger>
          <div
            className={`${CLASSNAME} ${!isOn && "bg-white"} `}
            onClick={toogleReaction}
          >
            <GoSmiley color="black" size={SIZE} />
          </div>
        </Popover.Trigger>
        <Popover.Content style={{ width: 300 }}>
          <Inset>
            <ReactionPanel />
          </Inset>
        </Popover.Content>
      </Popover.Root>
      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 max-w-md bg-black text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Reactions
      </div>
    </div>
  );
};

export default ReactionControl;
