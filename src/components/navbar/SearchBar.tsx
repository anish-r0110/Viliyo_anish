// components/SearchBar.tsx
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

import Search from "../inputs/Search";


const SearchBar: React.FC = () => {
  const [searchVisible, setSearchVisible] = useState(false);


  const toggleSearchVisibility = () => {
    setSearchVisible(!searchVisible);
  };

  const closeSearchPopup = () => {
    setSearchVisible(false);
  };

  return (
    <div className="flex">
      <BsSearch
        className="cursor-pointer text-white items-center"
        size={24}
        onClick={toggleSearchVisibility}
      />
      {searchVisible && <Search trainee={true} closePop={closeSearchPopup}/>}
    </div>
  );
};

export default SearchBar;
