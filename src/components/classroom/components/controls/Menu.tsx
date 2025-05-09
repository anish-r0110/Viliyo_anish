import { Inset, Popover } from "@radix-ui/themes";
import CLASSNAME from "./classname";
import SIZE from "./size";
import { MdOutlineClosedCaption } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import useToogle from "@/hooks/useToggle";
import { TfiLayoutMenuSeparated } from "react-icons/tfi";
import { TiBusinessCard } from "react-icons/ti";
import { TbFilters } from "react-icons/tb";

const MenuControl = () => {
  const [isOn, toogleMenu] = useToogle();

  return (
    <div className="relative group">
      <Popover.Root open={isOn}>
        <Popover.Trigger>
          <div
            className={`${CLASSNAME} ${!isOn && "bg-white"} `}
            onClick={toogleMenu}
          >
            <TfiLayoutMenuSeparated color="black" size={SIZE} />
          </div>
        </Popover.Trigger>
        <Popover.Content>
          <Inset>
            <div className="flex flex-col p-2 space-y-4 bg-app-blue">
              <button
                className={`${CLASSNAME} ${"bg-transparent"} `}
                onClick={toogleMenu}
              >
                <IoMdClose size={SIZE} />
              </button>
              <div
                className={`${CLASSNAME} ${"bg-white shadow"} `}
                onClick={toogleMenu}
              >
                <MdOutlineClosedCaption color="#5F488A" size={SIZE} />
              </div>
              <div
                className={`${CLASSNAME} ${"bg-white"} `}
                onClick={toogleMenu}
              >
                <TbFilters color="#5F488A" size={SIZE} />
              </div>
              <div
                className={`${CLASSNAME} ${"bg-white"} `}
                onClick={toogleMenu}
              >
                <TiBusinessCard color="#5F488A" size={SIZE} />
              </div>
            </div>
          </Inset>
        </Popover.Content>
      </Popover.Root>
      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 max-w-full bg-black text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        More
      </div>
    </div>
  );
};

export default MenuControl;
