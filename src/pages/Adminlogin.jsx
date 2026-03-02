import React, { useState } from "react"
import { Lock, Eye, EyeOff, Shield, AlertCircle } from "lucide-react"

// Simple authentication component
// In production, you'd use proper authentication with backend API
export default function AdminLogin({ onLoginSuccess }) {
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Demo credentials - In production, validate against backend
  const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123" // Change this!
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (
        credentials.username === ADMIN_CREDENTIALS.username &&
        credentials.password === ADMIN_CREDENTIALS.password
      ) {
        // Store auth token (in production, use httpOnly cookies)
        localStorage.setItem("adminAuth", "true")
        localStorage.setItem("adminUser", credentials.username)
        onLoginSuccess()
      } else {
        setError("Invalid username or password")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-lg mb-4">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-blue-200">Daily Posts Manager</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-200" />
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            {/* Username */}
            <div>
              <label className="block text-white font-medium mb-2">Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Enter username"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-white font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
                isLoading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg hover:scale-105"
              }`}>
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Lock className="h-5 w-5" />
                  Login to Admin Panel
                </span>
              )}
            </button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
            <p className="text-yellow-200 text-sm font-medium mb-2">Demo Credentials:</p>
            <p className="text-yellow-100 text-xs">Username: admin</p>
            <p className="text-yellow-100 text-xs">Password: admin123</p>
            <p className="text-yellow-200 text-xs mt-2 italic">⚠️ Change these in production!</p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/60 text-sm mt-6">
          © 2025 Your Business. All rights reserved.
        </p>
      </div>
    </div>
  )
}