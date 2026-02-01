import React, { useState } from "react";
import { Lock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import MasterPasswordInput from "./MasterPasswordInput";
import Alert from "../common/Alert";

const UnlockPage = ({ onSuccess }) => {
  const { unlock } = useAuth();
  const [masterPassword, setMasterPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUnlock = async () => {
    setError("");
    setIsLoading(true);

    const result = await unlock(masterPassword);
    setIsLoading(false);

    if (result.success) {
      onSuccess();
    } else {
      setError(result.error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleUnlock();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <Lock className="w-8 h-8 text-gray-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Vault Locked</h1>
          <p className="text-gray-600 mt-2">
            Your vault was locked for security
          </p>
        </div>

        {error && <Alert type="error" message={error} />}

        <div className="space-y-6 mt-6" onKeyPress={handleKeyPress}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Master Password
            </label>
            <MasterPasswordInput
              value={masterPassword}
              onChange={setMasterPassword}
              placeholder="Enter your master password"
            />
          </div>

          <button
            onClick={handleUnlock}
            disabled={isLoading}
            className="w-full bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-900 disabled:bg-gray-400 transition-colors"
          >
            {isLoading ? "Unlocking..." : "Unlock Vault"}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Auto-locked after period of inactivity
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnlockPage;
