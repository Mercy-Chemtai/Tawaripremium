"use client"

import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Loader2 } from "lucide-react"
import toast from "react-hot-toast"
import { useAuth } from "../components/auth/AuthContext"

export default function GoogleCallbackPage() {
  const [isProcessing, setIsProcessing] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  const { refreshUser } = useAuth()

  useEffect(() => {
    const processCallback = async () => {
      try {
        // Get the code from the URL
        const searchParams = new URLSearchParams(location.search)
        const code = searchParams.get("code")

        if (!code) {
          throw new Error("No authorization code received from Google")
        }

        // Exchange the code for a token
        const response = await fetch("http://localhost:8000/api/auth/google/callback/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ code }),
        })

        if (!response.ok) {
          throw new Error("Failed to authenticate with Google")
        }

        const data = await response.json()

        // Store the token
        if (data.key) {
          localStorage.setItem("authToken", data.key)

          // Refresh user data
          await refreshUser()

          toast.success("Login successful!")
          navigate("/dashboard")
        } else {
          throw new Error("No authentication token received")
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to authenticate with Google")
        navigate("/login")
      } finally {
        setIsProcessing(false)
      }
    }

    processCallback()
  }, [location.search, navigate, refreshUser])

  return (
    <div className="flex min-h-screen flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin mx-auto text-indigo-600" />
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Completing Google Authentication</h1>
        <p className="mt-2 text-gray-600">Please wait while we complete your login...</p>
      </div>
    </div>
  )
}
