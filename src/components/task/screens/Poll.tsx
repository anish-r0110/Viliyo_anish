import { IPoll, IPollOption } from "@/models/Task";
import React, { useState } from "react";

const Poll: React.FC<IPoll> = ({ question, options }) => {
  console.log(question);
  const [selectedOption, setSelectedOption] = useState<IPollOption | null>(
    null
  );

  const handleOptionChange = (option: IPollOption) => {
    setSelectedOption(option);
  };

  return (
    <div className="w-full  bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-semibold mb-4">{question}</h2>
      <ul>
        {options?.map((option, index) => (
          <li
            key={index}
            className={`py-2 px-4 my-2 cursor-pointer transition duration-300 ${
              selectedOption === option
                ? "bg-app-blue text-white"
                : "hover:bg-gray-100"
            }`}
            onClick={() => handleOptionChange(option)}
          >
            {option.option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Poll;
