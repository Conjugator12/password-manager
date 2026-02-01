import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { PasswordProvider } from "./context/PasswordContext";
import AppRouter from "./routes/AppRouter";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <PasswordProvider>
        <AppRouter />
      </PasswordProvider>
    </AuthProvider>
  );
}

export default App;
