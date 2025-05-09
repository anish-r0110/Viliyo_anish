import { Fragment, ReactNode } from "react";
import { Popover, Transition } from "@headlessui/react";
import { BsChatHeart } from "react-icons/bs";

import { IconType } from "react-icons";

export interface IPopoverMenuItem {
  name: string;
  description: string;
  onClick?: () => void;
  href?: string;
  icon: IconType;
}

interface IPopoverProps {
  title?: string;
  trigger: ReactNode;
  content: ReactNode;
}

export default function PopoverButton({
  trigger,
  title,
  content,
}: IPopoverProps) {
  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
        {title && <span>{title}</span>}
        {trigger}
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute  tablet:pr-0 z-10 mt-5 flex w-screen max-w-max -translate-x-3/4 tablet:-translate-x-3/4 ">
          <div className="max-w-md flex-auto overflow-y-auto rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div>{content}</div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
