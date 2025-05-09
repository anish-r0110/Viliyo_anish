import React, { useState } from "react";
import Modal from "./Modal"; // Import the Modal component
import { useRouter } from "next/router";

const ExitSession = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputText, setInputText] = useState(""); // State to hold the input text value

  const router = useRouter();
  const handleNo = () => {
    console.log("handleClose called");
    setIsModalOpen(false);
  };

  const handleYes = () => {
    const pagePath = "/login";
    console.log("handle Yes called");
    router.push(pagePath);
  };

  return (
    <div className="flex justify-center">
      <input
        type="text"
        id="txtYesNoMessage"
        placeholder="Enter msg for (Y/N)modal"
        className="rounded-full border-0 text-[16px] mr-2 p-2"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)} // Update inputText state
      />
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        onClick={() => setIsModalOpen(true)}
      >
        ModalComponent
      </button>
      <Modal
        onClose={handleNo}
        isOpen={isModalOpen}
        whenNo={handleNo}
        whenYes={handleYes}
      >
        {inputText} {/* Pass the inputText value as children */}
      </Modal>
    </div>
  );
};

export default ExitSession;
