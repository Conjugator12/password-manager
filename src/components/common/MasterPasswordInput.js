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
    <div className="form-group">
      <div className="input-wrapper">
        <Lock className="icon-left" />
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="form-input"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="icon-right"
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>

      {showStrength && <PasswordStrengthIndicator password={value} />}
    </div>
  );
};

export default MasterPasswordInput;
