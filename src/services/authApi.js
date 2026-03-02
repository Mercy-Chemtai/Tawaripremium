// ============================================
// src/services/authApi.js
// ============================================
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

class AuthAPI {
  // Register new user
  async register(name, email, password, confirmPassword) {
    const response = await fetch(`${API_BASE_URL}/auth/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirm_password: confirmPassword,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.error || data.message || 'Registration failed';
      throw new Error(errorMessage);
    }

    return data;
  }

  // Login user
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.error || data.message || 'Login failed';
      throw new Error(errorMessage);
    }

    return data;
  }

  // Google authentication
  async googleAuth(token) {
    const response = await fetch(`${API_BASE_URL}/auth/google/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.error || data.message || 'Google authentication failed';
      throw new Error(errorMessage);
    }

    return data;
  }

  // Get user profile
  async getProfile(accessToken) {
    const response = await fetch(`${API_BASE_URL}/auth/profile/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    return data;
  }

  // Logout user
  async logout(refreshToken) {
    const response = await fetch(`${API_BASE_URL}/auth/logout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh: refreshToken,
      }),
    });

    if (!response.ok) {
      console.warn('Logout failed on server, but clearing local storage');
    }

    return true;
  }

  // Refresh access token
  async refreshToken(refreshToken) {
    const response = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh: refreshToken,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    return data;
  }
}

const authApiInstance = new AuthAPI();
export { authApiInstance as authApi };


// ============================================
// src/contexts/AuthContext.jsx
// ============================================
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import authApi from '../services/authApi';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState(() => {
    const savedTokens = localStorage.getItem('tokens');
    return savedTokens ? JSON.parse(savedTokens) : null;
  });

  // Load user from tokens on mount
  useEffect(() => {
    const loadUser = async () => {
      if (tokens?.access) {
        try {
          const userData = await authApi.getProfile(tokens.access);
          setUser(userData);
        } catch (error) {
          console.error('Failed to load user:', error);
          // Try to refresh token
          if (tokens?.refresh) {
            try {
              const newTokens = await authApi.refreshToken(tokens.refresh);
              saveTokens(newTokens);
              const userData = await authApi.getProfile(newTokens.access);
              setUser(userData);
            } catch (refreshError) {
              // Token refresh failed, logout
              logout();
            }
          }
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const saveTokens = (newTokens) => {
    setTokens(newTokens);
    localStorage.setItem('tokens', JSON.stringify(newTokens));
  };

  const register = async (name, email, password) => {
    try {
      const response = await authApi.register(name, email, password, password);
      setUser(response.user);
      saveTokens(response.tokens);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authApi.login(email, password);
      setUser(response.user);
      saveTokens(response.tokens);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await authApi.googleAuth(tokenResponse.access_token);
        setUser(response.user);
        saveTokens(response.tokens);
      } catch (error) {
        console.error('Google login failed:', error);
        throw error;
      }
    },
    onError: (error) => {
      console.error('Google login error:', error);
      throw new Error('Google login failed');
    },
  });

  const logout = async () => {
    try {
      if (tokens?.refresh) {
        await authApi.logout(tokens.refresh);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setTokens(null);
      localStorage.removeItem('tokens');
    }
  };

  const value = {
    user,
    tokens,
    loading,
    register,
    login,
    loginWithGoogle,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


// ============================================
// src/App.js (Update to include GoogleOAuthProvider)
// ============================================
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// ... other imports

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* ... other routes */}
          </Routes>
        </AuthProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;


// ============================================
// src/components/ProtectedRoute.jsx
// ============================================
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  return children;
};


// ============================================
// Example: Protected Checkout Page
// ============================================
/*
import { ProtectedRoute } from './components/ProtectedRoute';

// In your Routes:
<Route 
  path="/checkout" 
  element={
    <ProtectedRoute>
      <CheckoutPage />
    </ProtectedRoute>
  } 
/>
*/