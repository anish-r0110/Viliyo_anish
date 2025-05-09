import React, { useState } from "react";

type RadioOption = "yes" | "no";

interface RadioButtonsProps {
  selectedOption: RadioOption;
  onChange: (option: RadioOption) => void;
}

const RadioButtons: React.FC<RadioButtonsProps> = ({
  selectedOption,
  onChange,
}) => {
  const handleOptionChange = (option: RadioOption) => {
    onChange(option);
  };

  return (
    <div className="flex w-full">
      <div className="flex items-center space-x-2 mx-2">
        <input
          type="radio"
          value="yes"
          className="h-5 w-5"
          checked={selectedOption === "yes"}
          onChange={() => handleOptionChange("yes")}
        />
        <span>Yes</span>
      </div>
      <div className="flex items-center space-x-2 mx-2">
        <input
          type="radio"
          value="no"
          className="h-5 w-5"
          checked={selectedOption === "no"}
          onChange={() => handleOptionChange("no")}
        />
        <span>No</span>
      </div>
    </div>
  );
};

export default RadioButtons;
