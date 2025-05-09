import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangePassword = (event: any) => {
    setPassword(event.target.value);
  };

  return (
    <div className="flex items-center">
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={handleChangePassword}
        className="border border-gray-300 rounded-md px-4 py-2 mr-2 w-64"
        placeholder="Enter password"
      />
      <button
        type="button"
        onClick={handleTogglePassword}
        className="bg-gray-300 rounded-md px-4 py-2"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
};

export default PasswordInput;
