import React, { createContext, useState, useContext, useEffect } from "react";
import { cryptoUtils } from "../utils/crypto";
import { useAuth } from "./AuthContext";

const PasswordContext = createContext();

export const usePasswords = () => useContext(PasswordContext);

export const PasswordProvider = ({ children }) => {
  const [passwords, setPasswords] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const { encryptionKey } = useAuth();

  const loadPasswords = () => {
    const stored = localStorage.getItem("encrypted_passwords");
    if (stored) {
      setPasswords(JSON.parse(stored));
    }
  };

  const savePasswords = (newPasswords) => {
    localStorage.setItem("encrypted_passwords", JSON.stringify(newPasswords));
  };

  const addPassword = async (website, username, password) => {
    if (!website || !username || !password) {
      throw new Error("All fields are required");
    }

    const encryptedPassword = await cryptoUtils.encrypt(
      password,
      encryptionKey,
    );
    const newEntry = {
      id: Date.now(),
      website,
      username,
      encryptedPassword,
      createdAt: new Date().toISOString(),
    };

    const updatedPasswords = [...passwords, newEntry];
    setPasswords(updatedPasswords);
    savePasswords(updatedPasswords);
  };

  const updatePassword = async (id, website, username, password) => {
    const encryptedPassword = await cryptoUtils.encrypt(
      password,
      encryptionKey,
    );
    const updatedPasswords = passwords.map((p) =>
      p.id === id ? { ...p, website, username, encryptedPassword } : p,
    );

    setPasswords(updatedPasswords);
    savePasswords(updatedPasswords);
  };

  const deletePassword = (id) => {
    const updatedPasswords = passwords.filter((p) => p.id !== id);
    setPasswords(updatedPasswords);
    savePasswords(updatedPasswords);
  };

  const copyPassword = async (entry) => {
    try {
      const decrypted = await cryptoUtils.decrypt(
        entry.encryptedPassword,
        encryptionKey,
      );
      await navigator.clipboard.writeText(decrypted);
      setCopiedId(entry.id);

      // Clear clipboard after 30 seconds
      setTimeout(() => {
        navigator.clipboard.writeText("");
      }, 30000);

      // Clear checkmark after 2 seconds
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error("Failed to decrypt:", error);
      throw new Error("Failed to copy password");
    }
  };

  const startEdit = async (entry) => {
    const decrypted = await cryptoUtils.decrypt(
      entry.encryptedPassword,
      encryptionKey,
    );
    return {
      ...entry,
      password: decrypted,
    };
  };

  useEffect(() => {
    if (encryptionKey) {
      loadPasswords();
    } else {
      setPasswords([]);
    }
  }, [encryptionKey]);

  const value = {
    passwords,
    copiedId,
    addPassword,
    updatePassword,
    deletePassword,
    copyPassword,
    startEdit,
  };

  return (
    <PasswordContext.Provider value={value}>
      {children}
    </PasswordContext.Provider>
  );
};
