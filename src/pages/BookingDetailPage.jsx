"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import {
  Loader,
  AlertTriangle,
  ChevronLeft,
  Calendar,
  Clock,
  Laptop,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  RefreshCw,
  MessageSquare,
  FileText,
} from "lucide-react"
import { servicesAPI } from "../services/api"
import { useAuth } from "../components/auth/AuthContext"
import { useToast } from "../components/ui/use-toast"

// Format date function
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Get status badge component for bookings
const BookingStatusBadge = ({ status }) => {
  switch (status) {
    case "pending":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
          <Clock className="h-4 w-4 mr-2" />
          Pending
        </span>
      )
    case "confirmed":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          <Calendar className="h-4 w-4 mr-2" />
          Confirmed
        </span>
      )
    case "completed":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          <CheckCircle className="h-4 w-4 mr-2" />
          Completed
        </span>
      )
    case "cancelled":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
          <XCircle className="h-4 w-4 mr-2" />
          Cancelled
        </span>
      )
    default:
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
          {status}
        </span>
      )
  }
}

function BookingDetailPage() {
  const { bookingId } = useParams()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cancelling, setCancelling] = useState(false)
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true)
        const data = await servicesAPI.getBooking(bookingId)
        setBooking(data)
        setError(null)
      } catch (err) {
        setError("Failed to load booking details. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated && bookingId) {
      fetchBooking()
    } else {
      setLoading(false)
    }
  }, [isAuthenticated, bookingId])

  const handleGoBack = () => {
    navigate("/account", { state: { activeTab: "bookings" } })
  }

  const handleCancelBooking = async () => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return
    }

    try {
      setCancelling(true)
      await servicesAPI.cancelBooking(bookingId)

      // Refresh booking data
      const updatedBooking = await servicesAPI.getBooking(bookingId)
      setBooking(updatedBooking)

      toast({
        title: "Booking cancelled",
        description: "Your service booking has been cancelled successfully.",
      })
    } catch (err) {
      toast({
        title: "Cancellation failed",
        description: "Failed to cancel your booking. Please try again or contact support.",
        variant: "destructive",
      })
    } finally {
      setCancelling(false)
    }
  }

  const getTimeRangeText = (preferredTime) => {
    switch (preferredTime) {
      case "morning":
        return "Morning (9AM - 12PM)"
      case "afternoon":
        return "Afternoon (12PM - 3PM)"
      case "evening":
        return "Evening (3PM - 6PM)"
      default:
        return preferredTime
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-md mx-auto text-center py-12 border rounded-lg">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-6">Please log in to view booking details.</p>
          <Link
            to={`/login?redirect=account/bookings/${bookingId}`}
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 inline-flex items-center"
          >
            Login
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 flex justify-center items-center min-h-[50vh]">
        <Loader className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

  if (error || !booking) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Error Loading Booking</h1>
          <p className="text-gray-600 mb-6">{error || "Booking not found"}</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 inline-flex items-center"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </button>
            <button
              onClick={handleGoBack}
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 inline-flex items-center"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Bookings
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-6">
        <button onClick={handleGoBack} className="text-black hover:underline flex items-center">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Bookings
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Service Booking #{booking.id}</h1>
            <p className="text-gray-500">Placed on {formatDate(booking.created_at)}</p>
          </div>
          <BookingStatusBadge status={booking.status} />
        </div>

        {/* Service Information */}
        <div className="border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium mb-4 flex items-center">
            <Laptop className="h-5 w-5 mr-2" />
            Service Information
          </h2>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-500">Service Type</div>
              <div className="font-medium">{booking.service_name}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Device Type</div>
              <div className="font-medium">{booking.device_type}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Problem Description</div>
              <div className="font-medium">{booking.problem_description}</div>
            </div>
          </div>
        </div>

        {/* Appointment Information */}
        <div className="border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Appointment Information
          </h2>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-500">Preferred Date</div>
              <div className="font-medium">{formatDate(booking.preferred_date)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Preferred Time</div>
              <div className="font-medium">{getTimeRangeText(booking.preferred_time)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Status</div>
              <div className="font-medium mt-1">
                <BookingStatusBadge status={booking.status} />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium mb-4 flex items-center">
            <Phone className="h-5 w-5 mr-2" />
            Contact Information
          </h2>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-500">Full Name</div>
              <div className="font-medium">{booking.full_name}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Email</div>
              <div className="font-medium flex items-center">
                <Mail className="h-4 w-4 mr-1 text-gray-500" />
                {booking.email}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Phone</div>
              <div className="font-medium flex items-center">
                <Phone className="h-4 w-4 mr-1 text-gray-500" />
                {booking.phone}
              </div>
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="border rounded-lg p-6 mb-8">
          <h2 className="text-lg font-medium mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Booking Status
          </h2>
          <div className="relative">
            <div className="mb-6 flex items-start">
              <div className="flex flex-col items-center mr-4">
                <div className="rounded-full h-8 w-8 flex items-center justify-center bg-black text-white">1</div>
                <div className="h-full w-0.5 bg-gray-200 mt-2"></div>
              </div>
              <div>
                <div className="font-medium">Booking Placed</div>
                <div className="text-sm text-gray-500">{formatDate(booking.created_at)}</div>
                <div className="mt-1 text-sm">Your service booking has been received.</div>
              </div>
            </div>

            <div className="mb-6 flex items-start">
              <div className="flex flex-col items-center mr-4">
                <div
                  className={`rounded-full h-8 w-8 flex items-center justify-center ${
                    booking.status !== "pending" ? "bg-black text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  2
                </div>
                <div className="h-full w-0.5 bg-gray-200 mt-2"></div>
              </div>
              <div>
                <div className="font-medium">Booking Confirmed</div>
                <div className="text-sm text-gray-500">
                  {booking.status !== "pending" ? "Confirmed by our team" : "Awaiting confirmation"}
                </div>
              </div>
            </div>

            <div className="mb-6 flex items-start">
              <div className="flex flex-col items-center mr-4">
                <div
                  className={`rounded-full h-8 w-8 flex items-center justify-center ${
                    booking.status === "completed" ? "bg-black text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  3
                </div>
                <div className="h-full w-0.5 bg-gray-200 mt-2"></div>
              </div>
              <div>
                <div className="font-medium">Service Completed</div>
                <div className="text-sm text-gray-500">
                  {booking.status === "completed" ? "Service has been completed" : "Awaiting service completion"}
                </div>
              </div>
            </div>

            {booking.status === "cancelled" && (
              <div className="flex items-start">
                <div className="flex flex-col items-center mr-4">
                  <div className="rounded-full h-8 w-8 flex items-center justify-center bg-red-500 text-white">
                    <XCircle className="h-4 w-4" />
                  </div>
                </div>
                <div>
                  <div className="font-medium text-red-600">Booking Cancelled</div>
                  <div className="text-sm text-gray-500">This booking has been cancelled.</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex space-x-4">
            <button
              onClick={handleGoBack}
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 inline-flex items-center"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Bookings
            </button>

            {(booking.status === "pending" || booking.status === "confirmed") && (
              <button
                onClick={handleCancelBooking}
                disabled={cancelling}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 inline-flex items-center disabled:opacity-50"
              >
                {cancelling ? (
                  <>
                    <Loader className="animate-spin h-4 w-4 mr-2" />
                    Cancelling...
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 mr-2" />
                    Cancel Booking
                  </>
                )}
              </button>
            )}
          </div>

          <div className="flex space-x-4">
            <Link
              to="/contact"
              className="bg-gray-100 text-gray-800 py-2 px-4 rounded hover:bg-gray-200 inline-flex items-center"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Support
            </Link>
            <button
              onClick={() => {
                // This would typically generate a PDF or print the booking details
                window.print()
              }}
              className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 inline-flex items-center"
            >
              <FileText className="h-4 w-4 mr-2" />
              Print Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingDetailPage
