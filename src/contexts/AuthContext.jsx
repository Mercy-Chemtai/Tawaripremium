// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize user from localStorage on mount
  useEffect(() => {
    const initAuth = () => {
      try {
        const storedUser = localStorage.getItem("user");
        const accessToken = localStorage.getItem("accessToken");
        
        if (storedUser && accessToken) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authAPI.login({ email, password });

      if (data?.tokens?.access && data?.user) {
        localStorage.setItem("accessToken", data.tokens.access);
        localStorage.setItem("refreshToken", data.tokens.refresh);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        setUser(data.user);
        return true;
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(error.message || "Login failed");
    }
  };


const register = async (name, email, password, confirmPassword) => {
  if (password !== confirmPassword) throw new Error("Passwords do not match");

  try {
    const res = await axios.post(
      "http://localhost:8000/api/auth/register/",
      { name, email, password, confirmPassword },
      { headers: { "Content-Type": "application/json" } }
    );
    // You may want to handle the response here, e.g., setUser or return res.data
    return res.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw new Error(error.response?.data?.message || error.message || "Registration failed");
  }
};


  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  const loginWithGoogle = async () => {
    console.warn("Google login not yet implemented");
    // TODO: Implement Google OAuth
  };

  const getProfile = async () => {
    try {
      const data = await authAPI.getProfile();
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Get profile error:", error);
      logout();
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    loginWithGoogle,
    getProfile,
    isAuthenticated: !!user,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};