import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Lock, Eye, EyeOff, Shield, AlertCircle } from "lucide-react";
import "./LoginPage.css";

const LoginPage = () => {
  const [masterPassword, setMasterPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { handleLogin } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await handleLogin(masterPassword);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card card-lg">
        {/* Lock Icon */}
        <div className="login-icon">
          <Lock size={48} />
        </div>

        <h1 className="login-title">Password Vault</h1>
        <p className="login-subtitle">
          Secure your passwords with AES-256 encryption
        </p>

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger mb-4">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Password Input */}
        <form onSubmit={onSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Master Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                value={masterPassword}
                onChange={(e) => setMasterPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && onSubmit(e)}
                placeholder="Enter your master password"
                className="form-control"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="input-icon"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="form-hint">Must be at least 8 characters long</p>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-full"
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                <span>Unlocking...</span>
              </>
            ) : (
              "Unlock Vault"
            )}
          </button>
        </form>

        {/* Security Features */}
        <div className="security-features">
          <div className="flex-start gap-2">
            <Shield size={20} className="security-icon" />
            <div className="security-content">
              <p className="security-title">Security Features:</p>
              <ul className="security-list">
                <li>AES-256 GCM encryption</li>
                <li>PBKDF2 key derivation (100,000 iterations)</li>
                <li>Auto-lock after 5 minutes of inactivity</li>
                <li>Clipboard auto-clear (30 seconds)</li>
                <li>Passwords never leave your device</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
