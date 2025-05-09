import React, { useState } from "react";

interface ToggleButtonProps {
  activeText?: string;
  inactiveText?: string;
  defaultOn?: boolean;
  onChange?: (isChecked: boolean) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  defaultOn = false,
  activeText = "ON",
  inactiveText = "OFF",
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(defaultOn);

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <button
      type="button"
      className={`relative flex font-medium   mobile:text-sm items-center justify-between border border-purple-950 w-64 h-12 mobile:w-32 mobile:h-10 rounded-full py-2  mobile:py-1 px-6 mobile:px-3 bg-white text-black`}
      onClick={handleToggle}
    >
      <span>{inactiveText}</span>
      <span>{activeText}</span>
      <div
        className={`absolute text-center w-1/2  h-4/5 t-[10%] mobile:t-0 font-bold text-base mobile:text-sm bg-gradient-to-br from-purple-950  to-fuchsia-500 border border-purple-950 rounded-full py-2 mobile:py-0.5 text-white ${
          isChecked ? "right-2 mobile:right-1" : "left-2 mobile:left-1"
        } transform transition-transform ease-in-out duration-300`}
      >
        {isChecked ? activeText : inactiveText}
      </div>
    </button>
  );
};

export default ToggleButton;
