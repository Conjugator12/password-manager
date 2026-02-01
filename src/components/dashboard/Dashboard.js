import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { usePasswords } from "../../context/PasswordContext";
import PasswordList from "./PasswordList";
import PasswordForm from "../password/PasswordForm";
import Header from "../common/Header";
import { Plus, Key } from "lucide-react";

const Dashboard = () => {
  const [view, setView] = useState("dashboard");
  const [editingEntry, setEditingEntry] = useState(null);

  const { isLoggedIn, handleLogout } = useAuth();
  const { passwords } = usePasswords();

  if (!isLoggedIn) {
    return null;
  }

  const styles = {
    dashboard: {
      minHeight: "100vh",
      background: "#ecf0f1",
    },
    content: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "2rem 1rem 4rem",
    },
    addButton: {
      width: "100%",
      background: "#3498db",
      color: "#ffffff",
      padding: "1rem",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      marginBottom: "2rem",
    },
    emptyState: {
      background: "#ffffff",
      borderRadius: "12px",
      padding: "4rem 2rem",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    },
    emptyIcon: {
      fontSize: "4rem",
      color: "#ecf0f1",
      marginBottom: "1.5rem",
    },
    emptyTitle: {
      color: "#2c3e50",
      fontSize: "1.5rem",
      fontWeight: "600",
      marginBottom: "0.5rem",
    },
    emptyDescription: {
      color: "#95a5a6",
    },
  };

  return (
    <div style={styles.dashboard}>
      {/* Header */}
      <Header
        title="My Vault"
        subtitle={`${passwords.length} passwords stored`}
        onLogout={handleLogout}
      />

      <div style={styles.content}>
        {view === "dashboard" ? (
          <>
            {/* Add Password Button */}
            <button
              onClick={() => {
                setView("add");
                setEditingEntry(null);
              }}
              style={styles.addButton}
            >
              <Plus size={20} />
              <span>Add New Password</span>
            </button>

            {/* Password List or Empty State */}
            {passwords.length === 0 ? (
              <div style={styles.emptyState}>
                <Key size={64} style={styles.emptyIcon} />
                <h3 style={styles.emptyTitle}>No passwords yet</h3>
                <p style={styles.emptyDescription}>
                  Click "Add New Password" to get started
                </p>
              </div>
            ) : (
              <PasswordList
                onEdit={(entry) => {
                  setEditingEntry(entry);
                  setView("edit");
                }}
              />
            )}
          </>
        ) : (
          <PasswordForm
            mode={view === "add" ? "add" : "edit"}
            initialData={editingEntry}
            onCancel={() => {
              setView("dashboard");
              setEditingEntry(null);
            }}
            onSuccess={() => {
              setView("dashboard");
              setEditingEntry(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
