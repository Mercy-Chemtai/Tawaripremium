"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useNavigate, Link } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { useAuth } from "../components/auth/AuthContext"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({
    usernameOrEmail: "",
    password: "",
  })

  const { login, isAuthenticated } = useAuth()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const redirectTo = location.state?.redirectTo || searchParams.get("redirect") || "/"

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo.startsWith("/") ? redirectTo : `/${redirectTo}`)
    }
  }, [isAuthenticated, navigate, redirectTo])

  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await login(loginData.usernameOrEmail, loginData.password)
      if (result.success) {
        navigate(redirectTo)
      } else {
        setError(result.error || "Login failed. Please check your credentials.")
      }
    } catch (err) {
      setError("Invalid username/email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-16 bg-black text-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Sign In</h1>
            <p className="max-w-[700px] text-gray-300 md:text-xl/relaxed">
              Sign in to your account to manage orders and access your profile
            </p>
          </div>
        </div>
      </section>

      {/* Login Form */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="w-full max-w-md space-y-8">
              {/* Error message */}
              {error && <div className="p-4 text-red-600 bg-red-50 rounded-md">{error}</div>}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label htmlFor="usernameOrEmail" className="text-sm font-medium">
                    Username or Email
                  </label>
                  <input
                    id="usernameOrEmail"
                    name="usernameOrEmail"
                    type="text"
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={loginData.usernameOrEmail}
                    onChange={handleLoginChange}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm pr-10"
                      value={loginData.password}
                      onChange={handleLoginChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </Link>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center justify-center w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90 disabled:opacity-50"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              <p className="mt-4 text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
