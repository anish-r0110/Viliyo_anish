import React, { ReactNode } from "react";
import exitSessionIcon from "../../assets/icons/exit_session.svg";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  whenNo: () => void;
  whenYes: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, whenNo, whenYes, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="flex flex-col items-center relative">
        <div className="w-36 h-36 bg-app-gray-medium opacity-95 rounded-full shadow justify-center absolute -top-20 z-20">
          <div className="flex justify-center h-full p-1">
            <Image
              src={exitSessionIcon}
              alt="Exit Session Icon"
              width={60}
              height={60}
            />
          </div>
        </div>
        <div className="bg-app-gray-medium opacity-90 rounded-2xl shadow p-20 relative">
          <h1 className="text-white text-xl font-bold m-2 text-center">
            {children}
          </h1>

          <div className="mt-4 flex justify-center items-center">
            <button
              className="px-10 py-2 bg-green-600 text-white font-semibold text-[20px] rounded-lg mr-2"
              onClick={whenYes}
            >
              Yes
            </button>
            <button
              className="px-10 py-2 bg-orange-600 text-white font-semibold text-[20px] rounded-lg"
              onClick={whenNo}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
