import React, { useState } from "react";
import { Shield } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import MasterPasswordInput from "../common/MasterPasswordInput";
import Alert from "../common/Alert";
import { calculatePasswordStrength } from "../../utils/passwordGenerator";
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import "../../styles/register.css";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate(); // ✅ hook for navigation

  const [masterPassword, setMasterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setError("");

    if (masterPassword.length < 8) {
      setError("Master password must be at least 8 characters long.");
      return;
    }

    if (masterPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const strength = calculatePasswordStrength(masterPassword);
    if (strength < 3) {
      setError("Please use a stronger master password.");
      return;
    }

    setIsLoading(true);
    const result = await register(masterPassword);
    setIsLoading(false);

    if (result.success) {
      navigate("/dashboard"); // ✅ redirect after success
    } else {
      setError("Registration failed. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <div className="icon-circle">
            <Shield className="icon" />
          </div>
          <h1 className="title">Create Account</h1>
          <p className="subtitle">Set up your master password</p>
        </div>

        {error && <Alert type="error" message={error} />}

        <div className="form" onKeyPress={handleKeyPress}>
          <div className="form-group">
            <label className="form-label">Master Password</label>
            <MasterPasswordInput
              value={masterPassword}
              onChange={setMasterPassword}
              showStrength={true}
              placeholder="Create a strong master password"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Master Password</label>
            <MasterPasswordInput
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Re-enter your master password"
            />
          </div>

          <div className="warning-box">
            <p>
              <strong>Important:</strong> Your master password cannot be
              recovered if forgotten. Make sure to remember it or store it in a
              safe place.
            </p>
          </div>

          <button
            onClick={handleRegister}
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
