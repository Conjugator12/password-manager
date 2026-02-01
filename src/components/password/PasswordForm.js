import React, { useState, useEffect } from "react";
import { usePasswords } from "../../context/PasswordContext";
import { cryptoUtils } from "../../utils/crypto";
import PasswordStrengthIndicator from "../common/PasswordStrengthIndicator";
import { Eye, EyeOff, RefreshCw, X } from "lucide-react";

const PasswordForm = ({ mode, initialData, onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    website: "",
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { addPassword, updatePassword } = usePasswords();

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        website: initialData.website,
        username: initialData.username,
        password: initialData.password,
      });
    }
  }, [mode, initialData]);

  useEffect(() => {
    if (formData.password) {
      setPasswordStrength(cryptoUtils.checkStrength(formData.password));
    } else {
      setPasswordStrength(null);
    }
  }, [formData.password]);

  const handleGeneratePassword = () => {
    const generated = cryptoUtils.generatePassword(16);
    setFormData({ ...formData, password: generated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "add") {
        await addPassword(
          formData.website,
          formData.username,
          formData.password,
        );
      } else {
        await updatePassword(
          initialData.id,
          formData.website,
          formData.username,
          formData.password,
        );
      }
      onSuccess();
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    form: {
      maxWidth: "600px",
      margin: "0 auto",
      background: "#ffffff",
      borderRadius: "12px",
      padding: "2rem",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "2rem",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "600",
      color: "#2c3e50",
      margin: 0,
    },
    closeButton: {
      width: "2.5rem",
      height: "2.5rem",
      padding: 0,
      borderRadius: "50%",
      background: "transparent",
      border: "2px solid #3498db",
      color: "#3498db",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    errorAlert: {
      background: "rgba(231, 76, 60, 0.1)",
      border: "1px solid #e74c3c",
      color: "#e74c3c",
      padding: "1rem",
      borderRadius: "8px",
      marginBottom: "1rem",
    },
    formGroup: {
      marginBottom: "1.5rem",
    },
    label: {
      display: "block",
      marginBottom: "0.5rem",
      fontWeight: "500",
      color: "#2c3e50",
    },
    inputGroup: {
      position: "relative",
    },
    input: {
      width: "100%",
      padding: "0.875rem 1rem",
      border: "2px solid #ecf0f1",
      borderRadius: "8px",
      fontSize: "1rem",
      background: "#ffffff",
      boxSizing: "border-box",
    },
    inputActions: {
      position: "absolute",
      right: "0.5rem",
      top: "50%",
      transform: "translateY(-50%)",
      display: "flex",
      gap: "0.5rem",
    },
    actionButton: {
      background: "none",
      border: "none",
      padding: "0.5rem",
      borderRadius: "8px",
      cursor: "pointer",
      color: "#95a5a6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    submitButton: {
      width: "100%",
      background: "#3498db",
      color: "#ffffff",
      padding: "0.75rem",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
    },
    spinner: {
      display: "inline-block",
      width: "1.5rem",
      height: "1.5rem",
      border: "2px solid rgba(255, 255, 255, 0.3)",
      borderTopColor: "#ffffff",
      borderRadius: "50%",
      animation: "spin 0.6s linear infinite",
    },
  };

  const spinnerStyle = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;

  return (
    <div style={styles.form}>
      <style>{spinnerStyle}</style>
      <div style={styles.header}>
        <h2 style={styles.title}>
          {mode === "add" ? "Add New Password" : "Edit Password"}
        </h2>
        <button onClick={onCancel} style={styles.closeButton}>
          <X size={20} />
        </button>
      </div>

      {error && <div style={styles.errorAlert}>{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Website Input */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Website/App Name</label>
          <input
            type="text"
            value={formData.website}
            onChange={(e) =>
              setFormData({ ...formData, website: e.target.value })
            }
            placeholder="e.g., Facebook, Gmail"
            style={{ ...styles.input, paddingRight: "1rem" }}
            required
          />
        </div>

        {/* Username/Email Input */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Username/Email</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            placeholder="your@email.com"
            style={{ ...styles.input, paddingRight: "1rem" }}
            required
          />
        </div>

        {/* Password Input */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <div style={styles.inputGroup}>
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Enter password"
              style={{ ...styles.input, paddingRight: "6rem" }}
              required
            />
            <div style={styles.inputActions}>
              <button
                type="button"
                onClick={handleGeneratePassword}
                style={styles.actionButton}
                title="Generate strong password"
              >
                <RefreshCw size={20} />
              </button>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.actionButton}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Password Strength Indicator */}
          {passwordStrength && (
            <PasswordStrengthIndicator strength={passwordStrength} />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.submitButton,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? (
            <>
              <div style={styles.spinner}></div>
              <span>Saving...</span>
            </>
          ) : mode === "add" ? (
            "Save Password"
          ) : (
            "Update Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default PasswordForm;
