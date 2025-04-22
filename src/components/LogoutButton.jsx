
import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const LogoutButton = ({ className = "" }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <button
      className={`flex items-center gap-2 bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600 transition-colors ${className}`}
      onClick={handleLogout}
      title="Logout"
    >
      <LogOut size={18} />
      Logout
    </button>
  );
};

export default LogoutButton;
