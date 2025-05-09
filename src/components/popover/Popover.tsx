import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { AiFillCloseCircle } from "react-icons/ai";

interface PopoverProps {
  content: React.ReactNode;
  children: React.ReactNode;
  additionalClassNames?: string;
}

const Popover: React.FC<PopoverProps> = ({
  content,
  children,
  additionalClassNames = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block  ${additionalClassNames}`}>
      <div className="cursor-pointer" onClick={handleOpen}>
        {children}
      </div>

      <Transition
        show={isOpen}
        as={React.Fragment}
        enter="transition duration-100 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition duration-75 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="absolute z-10">
          <div className="bg-white rounded-lg shadow-md py-2 px-6">
            {content}
            <div
              onClick={handleClose}
              className="cursor-pointer absolute top-2 right-2"
            >
              <AiFillCloseCircle></AiFillCloseCircle>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default Popover;
