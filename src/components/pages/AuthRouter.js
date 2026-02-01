// src/pages/AuthRouter.js
import React, { useEffect } from "react";
import AuthProvider, { useAuth } from "../context/AuthContext";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";

const AuthRouter = () => {
  const { user } = useAuth();

  useEffect(() => {
    // Optional: add logic here to check auth state or redirect
  }, [user]);

  return <AuthProvider>{user ? <RegisterPage /> : <LoginPage />}</AuthProvider>;
};

export default AuthRouter;
