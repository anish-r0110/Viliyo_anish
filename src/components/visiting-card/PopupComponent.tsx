import React, { useState } from "react";

const PopupComponent = ({ onClose, onSavePng, onSaveTxt }) => {
  return (
    <div className="popup bg-white w-full ">
      {/* <p>Select Save Option:</p> */}
      <button onClick={onSavePng} className="text-black p-4">
        Save as .png
      </button>
      <button onClick={onSaveTxt} className="text-black p-4">
        Save as .txt
      </button>
      <button onClick={onClose} className="text-black p-4">
        Close
      </button>
    </div>
  );
};

export default PopupComponent;
