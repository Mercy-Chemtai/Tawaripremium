"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Loader, RefreshCw, AlertTriangle, Package, ChevronRight, Clock, CheckCircle, XCircle } from "lucide-react"
// import { ordersAPI } from "../services/api"
import { useAuth } from "../contexts/AuthContext"

// Format date function
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Get status badge component
const StatusBadge = ({ status }) => {
  switch (status) {
    case "pending":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </span>
      )
    case "processing":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <RefreshCw className="h-3 w-3 mr-1" />
          Processing
        </span>
      )
    case "shipped":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
          <Package className="h-3 w-3 mr-1" />
          Shipped
        </span>
      )
    case "delivered":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Delivered
        </span>
      )
    case "cancelled":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="h-3 w-3 mr-1" />
          Cancelled
        </span>
      )
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {status}
        </span>
      )
  }
}

function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isAuthenticated, user } = useAuth()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const data = await ordersAPI.getOrders()
        setOrders(data.results || [])
        setError(null)
      } catch (err) {
        setError("Failed to load your orders. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      fetchOrders()
    } else {
      setLoading(false)
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-md mx-auto text-center py-12 border rounded-lg">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-6">Please log in to view your orders.</p>
          <Link
            to="/login?redirect=orders"
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

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Error Loading Orders</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 inline-flex items-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-medium mb-4">No orders yet</h2>
          <p className="text-gray-500 mb-8">You haven't placed any orders yet.</p>
          <Link to="/shop" className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 inline-flex items-center">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-sm text-gray-500">Order #{order.order_number}</div>
                  <div className="font-medium">{formatDate(order.created_at)}</div>
                </div>
                <div className="mt-2 md:mt-0 flex items-center space-x-4">
                  <StatusBadge status={order.status} />
                  <Link
                    to={`/orders/${order.id}`}
                    className="text-black hover:text-gray-700 font-medium flex items-center"
                  >
                    View Details <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-500 mb-1">Items</div>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mr-3">
                            <img
                              src={item.product_image || "/placeholder.svg?height=50&width=50"}
                              alt={item.product_name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div>
                            <div className="text-sm font-medium">
                              {item.product_name} {item.variant && `(${item.variant})`}
                            </div>
                            <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                          </div>
                        </div>
                        <div className="text-sm font-medium">KSh{item.price.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t pt-4 flex justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-500">Total Amount</div>
                    <div className="text-lg font-bold">KSh{order.total_amount.toLocaleString()}</div>
                    {order.discount > 0 && (
                      <div className="text-sm text-green-600">
                        Discount Applied: -KSh{order.discount.toLocaleString()}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-500">Payment Method</div>
                    <div>{order.payment_method}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrdersPage
