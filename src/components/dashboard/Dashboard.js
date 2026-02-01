import React from "react";
import { Shield, Zap, Search, Plus, Lock, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../styles/Dashboard.css";

const Dashboard = () => {
  const { logout, lock } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLock = () => {
    lock();
    navigate("/");
  };

  return (
    <div className="dashboard">
      <div className="container dashboard-content">
        {/* Header */}
        <header className="dashboard-header">
          <div className="dashboard-header-content">
            <div className="dashboard-title-section">
              <Shield className="dashboard-icon" />
              <div>
                <h1 className="dashboard-title">Password Manager</h1>
                <p className="dashboard-subtitle">Secure password storage</p>
              </div>
            </div>

            <div className="dashboard-header-actions">
              <button onClick={handleLock} className="btn btn-outline">
                <Lock size={18} />
                <span>Lock</span>
              </button>
              <button onClick={handleLogout} className="btn btn-primary">
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Search and Add Button */}
          <div className="dashboard-search-section">
            <div className="dashboard-search-container">
              <Search className="dashboard-search-icon" size={20} />
              <input
                type="text"
                placeholder="Search passwords..."
                className="dashboard-search-input"
              />
            </div>
            <button className="dashboard-add-button">
              <Plus size={20} />
              <span>Add Password</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main>
          {/* Empty State */}
          <div className="dashboard-empty-state">
            <Shield className="dashboard-empty-icon" />
            <h2 className="dashboard-empty-title">No Passwords Yet</h2>
            <p className="dashboard-empty-description">
              Get started by adding your first password
            </p>
            <button className="dashboard-add-first-button">
              <Plus size={20} />
              <span>Add Your First Password</span>
            </button>
          </div>

          {/* Stats Card */}
          <div className="dashboard-stats-card">
            <div className="dashboard-stats-content">
              <div>
                <p className="dashboard-stats-label">Total Passwords</p>
                <p className="dashboard-stats-number">0</p>
              </div>
              <Zap className="dashboard-stats-icon" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
