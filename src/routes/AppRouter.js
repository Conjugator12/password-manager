import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../components/auth/LoginPage";
import RegisterPage from "../components/auth/RegisterPage";
import UnlockPage from "../components/auth/UnlockPage";
import Dashboard from "../components/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <Routes>
      {/* Default route → login */}
      <Route path="/" element={<LoginPage />} />

      {/* Register page */}
      <Route path="/register" element={<RegisterPage />} />

      {/* Unlock vault */}
      <Route path="/unlock" element={<UnlockPage />} />

      {/* Protected dashboard - ONLY ONE TIME */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch-all → redirect to login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
