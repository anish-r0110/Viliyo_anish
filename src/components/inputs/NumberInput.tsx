import React from "react";

interface INumberInputProps {
  placeholder?: string;
  onChange: (number: number) => void;
}

const NumberInput = ({ placeholder, onChange }: INumberInputProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10); // Parse as integer with base 10
    if (!isNaN(value)) {
      onChange(value);
    }
  };

  return (
    <div className="flex w-full">
      <input
        className="h-[40px] w-full rounded-xl px-5 border bg-gray-50 outline-app-blue"
        type="text"
        placeholder={placeholder}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberInput;
