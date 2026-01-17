import React, { useState } from "react";
import { Mail, Lock, User, LogIn, LogOut, Settings } from "lucide-react";

interface AuthProps {
  onAuthChange: (isLoggedIn: boolean, user?: any) => void;
}

export const AuthComponent: React.FC<AuthProps> = ({ onAuthChange }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const response = await fetch(`http://127.0.0.1:8000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setIsLoggedIn(true);
        setUser(data.user);
        onAuthChange(true, data.user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setFormData({ email: "", password: "", name: "" });
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    onAuthChange(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  if (isLoggedIn && user) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-semibold dark:text-white">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {showProfile && (
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded mb-3">
            <p className="text-sm dark:text-gray-300 mb-2">
              <strong>Preferences:</strong>
            </p>
            <ul className="text-sm dark:text-gray-400 space-y-1">
              <li>Temperature: {user.preferences.temperature_unit}</li>
              <li>Wind: {user.preferences.wind_unit}</li>
              <li>Theme: {user.preferences.theme}</li>
            </ul>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded flex items-center justify-center space-x-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow max-w-md">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        {isLogin ? "Login" : "Sign Up"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 mb-1">
              Name
            </label>
            <div className="flex items-center space-x-2 border rounded p-2 dark:bg-gray-700 dark:border-gray-600">
              <User className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                className="flex-1 outline-none dark:bg-gray-700 dark:text-white"
                required={!isLogin}
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium dark:text-gray-300 mb-1">
            Email
          </label>
          <div className="flex items-center space-x-2 border rounded p-2 dark:bg-gray-700 dark:border-gray-600">
            <Mail className="w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="email@example.com"
              className="flex-1 outline-none dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium dark:text-gray-300 mb-1">
            Password
          </label>
          <div className="flex items-center space-x-2 border rounded p-2 dark:bg-gray-700 dark:border-gray-600">
            <Lock className="w-5 h-5 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              className="flex-1 outline-none dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-medium flex items-center justify-center space-x-2"
        >
          <LogIn className="w-4 h-4" />
          <span>{isLogin ? "Login" : "Sign Up"}</span>
        </button>
      </form>

      <button
        onClick={() => setIsLogin(!isLogin)}
        className="w-full mt-4 text-blue-500 hover:text-blue-600 text-sm font-medium"
      >
        {isLogin
          ? "Don't have an account? Sign Up"
          : "Already have an account? Login"}
      </button>
    </div>
  );
};
