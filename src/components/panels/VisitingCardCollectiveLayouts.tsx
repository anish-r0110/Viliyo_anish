import React, { useState } from "react";
import { IoRadioButtonOffSharp, IoRadioButtonOn } from "react-icons/io5";

const VisitingCardCollectiveLayouts = ({
  layout,
  data,
  isDefault,
  setDefault,
  handleSelect,
  selectCard,
}: any) => {
  return (
    <div className="flex flex-col mt-14">
      <div className="flex justify-end right-2 z-50 -my-8 relative">
        {isDefault ? (
          <div className="text-app-yellow text-xl">
            <IoRadioButtonOn />
          </div>
        ) : (
          <div className="text-app-yellow text-xl">
            <IoRadioButtonOffSharp onClick={() => setDefault(data.id)} />
          </div>
        )}
      </div>
      <div className="relative">
        {layout.front(data, isDefault, setDefault, handleSelect, selectCard)}
      </div>
    </div>
  );
};

export default VisitingCardCollectiveLayouts;
