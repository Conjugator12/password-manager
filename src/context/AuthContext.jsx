// src/context/AuthContext.js
import React, { createContext, useContext, useState, useMemo } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [masterPassword, setMasterPassword] = useState(null);

  // Create encryptionKey from master password (simplified for demo)
  const encryptionKey = useMemo(() => {
    if (!masterPassword) return null;
    // In a real app, you'd use proper key derivation here
    return masterPassword;
  }, [masterPassword]);

  const login = async (password) => {
    // In a real app, you'd verify the password properly
    setMasterPassword(password);
    setUser({ name: "Demo User" });
    return { success: true };
  };

  const register = async (password) => {
    setMasterPassword(password);
    setUser({ name: "New User" });
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setMasterPassword(null);
  };

  const lock = () => {
    // Keep master password for unlocking, but clear user session
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        encryptionKey, // Add this
        login,
        register,
        logout,
        lock,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
