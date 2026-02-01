import { Routes, Route } from "react-router-dom";
import UnlockPage from "./components/auth/UnlockPage";
import RegisterPage from "./components/auth/RegisterPage";
import Dashboard from "./components/dashboard/Dashboard";
import AuthProvider from "./context/AuthContext"; // Import AuthProvider

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Wrap everything with AuthProvider */}
      <Routes>
        <Route path="/" element={<UnlockPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
