import React, { useState } from "react";
import RadioButtons from "../buttons/RadioButtonYesNo";
import NumberInput from "../inputs/NumberInput";

interface CallBackRequestProps {
  phoneNumberChanged: () => void;
}

const CallBackRequest: React.FC<CallBackRequestProps> = ({
  phoneNumberChanged,
}) => {
  const [selectedOption, setSelectedOption] = useState<"yes" | "no">("no");

  const handleOptionChange = (option: "yes" | "no") => {
    setSelectedOption(option);
  };

  const handlePhoneNumberChange = () => {
    phoneNumberChanged();
  };

  return (
    <>
      <div className="w-full flex mobile:flex-col items-center space-y-4">
        <div className="flex mx-2 mt-4 text-sm">I need a call back from Viliyo</div>
        <div>
          <RadioButtons
            selectedOption={selectedOption}
            onChange={handleOptionChange as (option: "yes" | "no") => void}
          />
        </div>
      </div>
      <div className="w-full">
        {selectedOption === "yes" && (
          <div className="flex ml-2 col-span-2 mt-4">
            <label className="text-sm mr-8 whitespace-nowrap mt-2 flex col-span-1">
              Phone
            </label>
            <NumberInput
              onChange={handlePhoneNumberChange}
              placeholder="Enter contact number"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default CallBackRequest;
