import React, { useState } from "react";

const PopupModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    // Perform search logic here
    console.log("Searching for:", searchText);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        <img src="/src/assets/icons/cPad.svg" alt="Magnifying Glass" />
      </button>

      {isOpen && (
        <div className="modal">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      )}
    </div>
  );
};

export default PopupModal;
