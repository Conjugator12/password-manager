import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { cryptoUtils } from "../utils/crypto"; // ✅ named import

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [encryptionKey, setEncryptionKey] = useState(null);
  const [autoLockTimer, setAutoLockTimer] = useState(null);
  const [userSalt, setUserSalt] = useState(null);

  // Initialize user salt
  useEffect(() => {
    const storedSalt = localStorage.getItem("user_salt");
    if (storedSalt) {
      setUserSalt(new Uint8Array(JSON.parse(storedSalt)));
    } else {
      const newSalt = cryptoUtils.generateSalt();
      localStorage.setItem("user_salt", JSON.stringify(Array.from(newSalt)));
      setUserSalt(newSalt);
    }
  }, []);

  // Logout handler
  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setEncryptionKey(null);
    if (autoLockTimer) clearTimeout(autoLockTimer);
    setAutoLockTimer(null);
  }, [autoLockTimer]);

  // Auto-lock system
  const resetAutoLock = useCallback(() => {
    if (autoLockTimer) clearTimeout(autoLockTimer);
    const timer = setTimeout(() => {
      handleLogout();
    }, 300000); // 5 minutes
    setAutoLockTimer(timer);
  }, [autoLockTimer, handleLogout]);

  useEffect(() => {
    if (isLoggedIn) {
      resetAutoLock();
      window.addEventListener("mousemove", resetAutoLock);
      window.addEventListener("keypress", resetAutoLock);
      window.addEventListener("click", resetAutoLock);

      return () => {
        window.removeEventListener("mousemove", resetAutoLock);
        window.removeEventListener("keypress", resetAutoLock);
        window.removeEventListener("click", resetAutoLock);
        if (autoLockTimer) clearTimeout(autoLockTimer);
        setAutoLockTimer(null);
      };
    }
  }, [isLoggedIn, resetAutoLock, autoLockTimer]);

  // Login handler
  const handleLogin = async (masterPassword) => {
    if (!masterPassword || masterPassword.length < 8) {
      throw new Error("Master password must be at least 8 characters");
    }

    try {
      const key = await cryptoUtils.deriveKey(masterPassword, userSalt);
      setEncryptionKey(key);
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      throw new Error("Failed to initialize encryption");
    }
  };

  const value = {
    isLoggedIn,
    encryptionKey,
    handleLogin,
    handleLogout,
    resetAutoLock,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
