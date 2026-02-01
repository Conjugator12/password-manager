import React, { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  Shield,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../styles/register.css"; // Reuse the same styles

const UnlockPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleUnlock = async () => {
    setError("");
    const result = await login(password);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError("Incorrect master password.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <div className="icon-circle">
            <Lock className="icon" />
          </div>
          <h1 className="title">Welcome Back</h1>
          <p className="subtitle">Enter your master password</p>
        </div>

        {error && (
          <div className="alert alert-danger">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <div className="form">
          <div className="form-group">
            <label className="form-label">Master Password</label>
            <div className="input-wrapper">
              <Lock className="icon-left" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your master password"
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
          </div>

          <button className="submit-button" onClick={handleUnlock}>
            Unlock Vault
          </button>

          <p
            className="subtitle"
            style={{ marginTop: "1rem", textAlign: "center" }}
          >
            Don't have an account?{" "}
            <span
              style={{ color: "#2563eb", cursor: "pointer", fontWeight: "500" }}
              onClick={() => navigate("/register")}
            >
              Create one
            </span>
          </p>
        </div>

        {/* Security Features Section */}
        <div
          className="security-features"
          style={{
            background: "rgba(52, 152, 219, 0.05)",
            borderRadius: "var(--radius-sm)",
            padding: "1.5rem",
            border: "1px solid rgba(52, 152, 219, 0.1)",
            marginTop: "2rem",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              Secure Login
            </h3>
          </div>

          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>End-to-end encryption</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Zero-knowledge architecture</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Your data never leaves your device</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UnlockPage;
