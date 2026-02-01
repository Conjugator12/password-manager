import React from "react";
import { usePasswords } from "../../context/PasswordContext";
import { Copy, Edit2, Trash2, CheckCircle } from "lucide-react";

const PasswordCard = ({ entry, onEdit }) => {
  const { copiedId, copyPassword, deletePassword } = usePasswords();
  const isCopied = copiedId === entry.id;

  const handleCopy = async (e) => {
    e.stopPropagation();
    await copyPassword(entry);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this password?")) {
      deletePassword(entry.id);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const styles = {
    passwordItem: {
      background: "#ffffff",
      borderRadius: "12px",
      padding: "1.5rem",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease",
      borderLeft: "4px solid transparent",
      cursor: "pointer",
      marginBottom: "1rem",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem",
    },
    title: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#2c3e50",
      margin: 0,
    },
    meta: {
      color: "#95a5a6",
      fontSize: "0.875rem",
      margin: "0.25rem 0",
    },
    date: {
      color: "#95a5a6",
      fontSize: "0.75rem",
      marginTop: "0.25rem",
    },
    actions: {
      display: "flex",
      gap: "0.5rem",
    },
    actionButton: {
      width: "2.5rem",
      height: "2.5rem",
      padding: "0",
      borderRadius: "50%",
      background: "none",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#95a5a6",
    },
  };

  return (
    <div style={styles.passwordItem}>
      <div style={styles.header}>
        <div>
          <h3 style={styles.title}>{entry.website}</h3>
          <p style={styles.meta}>{entry.username}</p>
          <p style={styles.date}>Added {formatDate(entry.createdAt)}</p>
        </div>
        <div style={styles.actions}>
          <button
            onClick={handleCopy}
            style={styles.actionButton}
            title="Copy password"
          >
            {isCopied ? (
              <CheckCircle size={20} color="#27ae60" />
            ) : (
              <Copy size={20} />
            )}
          </button>
          <button
            onClick={() => onEdit(entry)}
            style={styles.actionButton}
            title="Edit"
          >
            <Edit2 size={20} />
          </button>
          <button
            onClick={handleDelete}
            style={styles.actionButton}
            title="Delete"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordCard;
