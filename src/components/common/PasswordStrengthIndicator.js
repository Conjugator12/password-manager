import React from "react";

const PasswordStrengthIndicator = ({ strength }) => {
  if (!strength) return null;

  const styles = {
    container: {
      marginTop: "0.75rem",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "0.5rem",
    },
    label: {
      fontSize: "0.875rem",
      color: "#95a5a6",
    },
    level: {
      fontSize: "0.875rem",
      fontWeight: "600",
    },
    progressBar: {
      width: "100%",
      height: "6px",
      background: "#ecf0f1",
      borderRadius: "3px",
      overflow: "hidden",
      margin: "0.5rem 0",
    },
    progressFill: {
      height: "100%",
      borderRadius: "3px",
      transition: "width 0.3s ease",
    },
    hint: {
      fontSize: "0.75rem",
      color: "#95a5a6",
      marginTop: "0.5rem",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.label}>Password Strength:</span>
        <span style={{ ...styles.level, color: strength.color }}>
          {strength.level}
        </span>
      </div>
      <div style={styles.progressBar}>
        <div
          style={{
            ...styles.progressFill,
            width: `${(strength.score / 6) * 100}%`,
            backgroundColor: strength.color,
          }}
        ></div>
      </div>
      <div style={styles.hint}>
        {strength.score <= 2 &&
          "Add more characters and mix letters, numbers, and symbols"}
        {strength.score === 3 && "Good start, add more complexity"}
        {strength.score === 4 && "Almost there, add special characters"}
        {strength.score >= 5 && "Excellent password!"}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
