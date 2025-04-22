import React, { useState } from "react";
import RoleSelector from "../components/RoleSelector";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";

export default function Login() {
  const [role, setRole] = useState("patient");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e) => {
    e.preventDefault();
    // For demo, just set role and token, then navigate
    localStorage.setItem("token", "demo-token");
    localStorage.setItem("userRole", role);
    toast({ title: "Login", description: `Logged in as ${role}` });
    navigate("/" + role);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-background">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-900 shadow p-8 rounded w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <RoleSelector selectedRole={role} onSelect={setRole} />
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input className="w-full border rounded px-3 py-2" type="email" required />
        </div>
        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input className="w-full border rounded px-3 py-2" type="password" required />
        </div>
        <button
          type="submit"
          className="w-full bg-clinic-600 hover:bg-clinic-700 text-white py-2 rounded font-semibold transition-colors"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
