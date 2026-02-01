import React, { useState } from "react";
import { Shield } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import MasterPasswordInput from "./MasterPasswordInput";
import Alert from "../common/Alert";
import { calculatePasswordStrength } from "../../utils/passwordGenerator";

const RegisterPage = ({ onSuccess }) => {
  const { register } = useAuth();
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
      onSuccess();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-600 mt-2">Set up your master password</p>
        </div>

        {error && <Alert type="error" message={error} />}

        <div className="space-y-4 mt-6" onKeyPress={handleKeyPress}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Master Password
            </label>
            <MasterPasswordInput
              value={masterPassword}
              onChange={setMasterPassword}
              showStrength={true}
              placeholder="Create a strong master password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Master Password
            </label>
            <MasterPasswordInput
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Re-enter your master password"
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-xs text-yellow-800">
              <strong>Important:</strong> Your master password cannot be
              recovered if forgotten. Make sure to remember it or store it in a
              safe place.
            </p>
          </div>

          <button
            onClick={handleRegister}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
