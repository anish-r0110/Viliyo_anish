import { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

interface PasswordInputVHProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string; // Add the placeholder prop
}

const PasswordInputVH: React.FC<PasswordInputVHProps> = ({
  label,
  value,
  onChange,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative rounded-full shadow-sm">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={handleChange}
          className=" w-full h-12 rounded-xl text-base desktop:text-lg largescreen:text-2xl outline-none border border-app-gray-light px-6 largescreen:h-16"
          placeholder={placeholder || "Enter your password"} // Use the provided placeholder or a default one
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-400"
          onClick={handleTogglePassword}
        >
          {showPassword ? (
            <RiEyeOffFill className="w-6 h-6" />
          ) : (
            <RiEyeFill className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInputVH;
