import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../styles/register.css"; // reuse styles

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // TODO: validate password
    navigate("/register");
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

          <button className="submit-button" onClick={handleLogin}>
            Unlock Vault
          </button>

          <p
            className="subtitle"
            style={{ marginTop: "1rem", textAlign: "center" }}
          >
            Don’t have an account?{" "}
            <span
              style={{ color: "#2563eb", cursor: "pointer", fontWeight: "500" }}
              onClick={() => navigate("/register")}
            >
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
