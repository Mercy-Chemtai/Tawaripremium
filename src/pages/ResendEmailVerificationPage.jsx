import { useState } from "react"
import { useToast } from "../components/ui/use-toast"
import { authAPI } from "../services/api"

export default function ResendEmailVerificationPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleResend = async () => {
    setIsLoading(true)
    try {
      await authAPI.resendEmailVerification(email)
      toast({
        title: "Verification email sent!",
        description: "Please check your email for the verification link.",
        status: "success",
      })
    } catch (error) {
      toast({
        title: "Resend failed",
        description: error.message || "Unable to resend verification email.",
        status: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Resend Verification Email</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-4 p-2 border rounded"
      />
      <button
        onClick={handleResend}
        disabled={isLoading}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {isLoading ? "Sending..." : "Resend Email"}
      </button>
    </div>
  )
}