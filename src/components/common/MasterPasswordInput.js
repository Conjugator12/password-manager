import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import PasswordStrengthIndicator from "../common/PasswordStrengthIndicator";

const MasterPasswordInput = ({
  value,
  onChange,
  showStrength = false,
  placeholder = "Enter master password",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>
      {showStrength && <PasswordStrengthIndicator password={value} />}
    </div>
  );
};

export default MasterPasswordInput;
