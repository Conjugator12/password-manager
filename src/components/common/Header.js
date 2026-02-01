import React from "react";
import { LogOut } from "lucide-react";

const Header = ({ title, subtitle, onLogout }) => {
  const styles = {
    header: {
      background: "#ffffff",
      padding: "1rem 0",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      marginBottom: "2rem",
      position: "sticky",
      top: 0,
      zIndex: 100,
    },
    content: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#2c3e50",
      margin: 0,
    },
    subtitle: {
      color: "#95a5a6",
      fontSize: "0.875rem",
      margin: "0.25rem 0 0 0",
    },
    logoutButton: {
      background: "transparent",
      border: "2px solid #3498db",
      color: "#3498db",
      padding: "0.5rem 1rem",
      borderRadius: "8px",
      fontSize: "0.875rem",
      fontWeight: "600",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.content}>
        <div>
          <h1 style={styles.title}>{title}</h1>
          {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
        </div>
        <button onClick={onLogout} style={styles.logoutButton}>
          <LogOut size={18} />
          <span>Lock Vault</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
