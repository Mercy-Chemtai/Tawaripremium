"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Mail, AlertCircle, Loader2 } from "lucide-react"
import { authAPI } from "../services/api" // Import the real authAPI

export default function VerifyEmailPage() {
  const [verificationStatus, setVerificationStatus] = useState("loading") // "loading" | "success" | "error" | "already-verified" | "no-key"
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    // Extract verification key from URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const verificationKey = urlParams.get("key")

    if (!verificationKey) {
      setVerificationStatus("no-key")
      return
    }

    // Automatically verify email
    const verifyEmail = async () => {
      try {
        const response = await authAPI.verifyEmail(verificationKey) // Use the real API
        if (response.detail === "Email verified successfully.") {
          setVerificationStatus("success")
        } else if (response.detail === "Email is already verified.") {
          setVerificationStatus("already-verified")
        }
      } catch (error) {
        setVerificationStatus("error")
        setErrorMessage(error.response?.data?.detail || "Verification failed")
      }
    }

    verifyEmail()
  }, [])

  const handleGoToLogin = () => {
    // Redirect to the login page
    window.location.href = "/login"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <AnimatePresence mode="wait">
          {verificationStatus === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin mx-auto" />
              <p>Verifying your email...</p>
            </motion.div>
          )}

          {verificationStatus === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <CheckCircle className="h-10 w-10 text-green-500 mx-auto" />
              <h1 className="text-xl font-bold">Email Verified!</h1>
              <p>Your email has been successfully verified. You can now log in to your account.</p>
              <button
                onClick={handleGoToLogin}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Go to Login
              </button>
            </motion.div>
          )}

          {verificationStatus === "already-verified" && (
            <motion.div
              key="already-verified"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <Mail className="h-10 w-10 text-yellow-500 mx-auto" />
              <h1 className="text-xl font-bold">Email Already Verified</h1>
              <p>Your email is already verified. You can log in to your account.</p>
              <button
                onClick={handleGoToLogin}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Go to Login
              </button>
            </motion.div>
          )}

          {verificationStatus === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <AlertCircle className="h-10 w-10 text-red-500 mx-auto" />
              <h1 className="text-xl font-bold">Verification Failed</h1>
              <p>{errorMessage}</p>
            </motion.div>
          )}

          {verificationStatus === "no-key" && (
            <motion.div
              key="no-key"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <Mail className="h-10 w-10 text-yellow-500 mx-auto" />
              <h1 className="text-xl font-bold">No Verification Key</h1>
              <p>Please use the verification link sent to your email.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
