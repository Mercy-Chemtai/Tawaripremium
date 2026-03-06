"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate, useLocation } from "react-router-dom"
import {
  Loader,
  RefreshCw,
  AlertTriangle,
  ChevronLeft,
  MapPin,
  User,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
} from "lucide-react"
import { ordersAPI } from "../services/api"
import { useAuth } from "../components/auth/AuthContext"
import { useToast } from "../components/ui/use-toast"

// Format date function
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Get status badge component
const StatusBadge = ({ status }) => {
  switch (status) {
    case "pending":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
          <Clock className="h-4 w-4 mr-2" />
          Pending
        </span>
      )
    case "processing":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          <RefreshCw className="h-4 w-4 mr-2" />
          Processing
        </span>
      )
    case "shipped":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
          <Truck className="h-4 w-4 mr-2" />
          Shipped
        </span>
      )
    case "delivered":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          <CheckCircle className="h-4 w-4 mr-2" />
          Delivered
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

// Calculate totals function
const calculateTotals = (order) => {
  const subtotal = (order?.items || []).reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 500 : 0 // KSh 500 shipping fee
  const tax = subtotal > 0 ? Math.round(subtotal * 0.16) : 0 // 16% VAT
  const total = subtotal + shipping + tax - (order?.discount || 0)

  return { subtotal, shipping, tax, total }
}

function OrderDetailPage() {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cancelling, setCancelling] = useState(false)
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { toast } = useToast()

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true)
        const data = await ordersAPI.getOrder(orderId)
        setOrder(data)
        setError(null)
      } catch (err) {
        setError(err.message || "Failed to load order details. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated && orderId) {
      fetchOrder()
    } else {
      setLoading(false)
    }
  }, [isAuthenticated, orderId])

  const handleGoBack = () => {
    navigate("/account", { state: { activeTab: "orders" } })
  }

  const handleCancelOrder = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return
    }

    try {
      setCancelling(true)
      await ordersAPI.cancelOrder(orderId)

      // Refresh order data
      const updatedOrder = await ordersAPI.getOrder(orderId)
      setOrder(updatedOrder)

      toast({
        title: "Order cancelled",
        description: "Your order has been cancelled successfully.",
      })
    } catch (err) {
      toast({
        title: "Cancellation failed",
        description: "Failed to cancel your order. Please try again or contact support.",
        variant: "destructive",
      })
    } finally {
      setCancelling(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-md mx-auto text-center py-12 border rounded-lg">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-6">Please log in to view order details.</p>
          <Link
            to={`/login?redirect=orders/${orderId}`}
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

  if (error || !order) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Error Loading Order</h1>
          <p className="text-gray-600 mb-6">{error || "Order not found"}</p>
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
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Calculate totals
  const { subtotal, shipping, tax, total } = calculateTotals(order)
  const discount = order?.discount || 0;

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-6">
        {/* Update the button text to always say "Back to Account" */}
        <button onClick={handleGoBack} className="text-black hover:underline flex items-center">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Account
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Order #{order.order_number}</h1>
            <p className="text-gray-500">Placed on {formatDate(order.created_at)}</p>
          </div>
          <StatusBadge status={order.status} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Shipping Information */}
          <div className="border rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Shipping Information
            </h2>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-500">Name</div>
                <div className="font-medium">{order.full_name || "N/A"}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Address</div>
                <div className="font-medium">
                  Address ID: {order.address || "N/A"}
                  {/* If you need to fetch the full address details, you can make an additional API call */}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Phone</div>
                <div className="font-medium">Phone number not provided in the response</div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="border rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Payment Information
            </h2>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-500">Payment Method</div>
                <div className="font-medium">{order.payment_method}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Payment Status</div>
                <div className="font-medium">
                  {order.payment_status === "paid" ? (
                    <span className="text-green-600 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Paid
                    </span>
                  ) : (
                    <span className="text-yellow-600 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {order.payment_status}
                    </span>
                  )}
                </div>
              </div>
              {order.payment_details && (
                <div>
                  <div className="text-sm text-gray-500">Payment Details</div>
                  <div className="font-medium">{order.payment_details}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="border rounded-lg overflow-hidden mb-8">
          <h2 className="text-lg font-medium p-6 bg-gray-50 border-b">Order Items</h2>
          <div className="divide-y">
            {order.items.map((item) => (
              <div key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mr-4">
                    <img
                      src={item.product_image || "/placeholder.svg?height=100&width=100"}
                      alt={item.product_name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{item.product_name}</div>
                    {item.variant && <div className="text-sm text-gray-500">{item.variant}</div>}
                    <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">KSh{item.price.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">
                    Subtotal: KSh{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="border rounded-lg overflow-hidden mb-8">
          <h2 className="text-lg font-medium p-6 bg-gray-50 border-b">Order Summary</h2>
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>KSh{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">VAT (16%)</span>
                <span>KSh{tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>KSh{shipping.toLocaleString()}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-KSh{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>KSh{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Timeline */}
        {order.timeline && order.timeline.length > 0 && (
          <div className="border rounded-lg overflow-hidden mb-8">
            <h2 className="text-lg font-medium p-6 bg-gray-50 border-b">Order Timeline</h2>
            <div className="p-6">
              <div className="relative">
                {order.timeline.map((event, index) => (
                  <div key={index} className="mb-8 flex items-start last:mb-0">
                    <div className="flex flex-col items-center mr-4">
                      <div className="rounded-full h-8 w-8 flex items-center justify-center bg-black text-white">
                        {index + 1}
                      </div>
                      {index < order.timeline.length - 1 && <div className="h-full w-0.5 bg-gray-200 mt-2"></div>}
                    </div>
                    <div>
                      <div className="font-medium">{event.status}</div>
                      <div className="text-sm text-gray-500">{formatDate(event.timestamp)}</div>
                      {event.note && <div className="mt-1 text-sm">{event.note}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Update the Actions section at the bottom */}
        <div className="flex justify-between">
          <button
            onClick={handleGoBack}
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 inline-flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Account
          </button>

          {order.status === "pending" && (
            <button
              onClick={handleCancelOrder}
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
                  Cancel Order
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderDetailPage
