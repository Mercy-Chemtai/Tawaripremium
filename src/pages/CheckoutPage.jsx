"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Loader, AlertTriangle, Check, ChevronDown, ChevronUp, Phone } from "lucide-react"
import { cartAPI, ordersAPI, addressesAPI } from "../services/api"
import { useAuth } from "../components/auth/AuthContext"
import { useToast } from "../components/ui/use-toast"

// Get the API base URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

// Helper function to get the full image URL
const getFullImageUrl = (imagePath) => {
  if (!imagePath) return "/placeholder.svg?height=100&width=100"

  // If the image path is already a full URL, return it as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath
  }

  // If the path starts with /api/media, we need to handle it specially
  if (imagePath.startsWith("/api/media/")) {
    // Extract the part after /api/media/ and append it to the API_URL/media/
    const mediaPath = imagePath.replace("/api/media/", "media/")
    return `${API_URL}/${mediaPath}`
  }

  // Otherwise, prepend the API URL
  // Remove any leading slash from the image path to avoid double slashes
  const cleanPath = imagePath.startsWith("/") ? imagePath.substring(1) : imagePath
  return `${API_URL}/${cleanPath}`
}

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()
  const { toast } = useToast()

  // State management
  const [cart, setCart] = useState({ items: [] })
  const [addresses, setAddresses] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [expandedSection, setExpandedSection] = useState("shipping")
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState("mpesa")
  const [showAddressForm, setShowAddressForm] = useState(false)

  // Use refs to track if data has been loaded to prevent infinite loops
  const dataFetchedRef = useRef(false)

  // Form state for new address
  const [addressForm, setAddressForm] = useState({
    full_name: "",
    phone: "",
    street_address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "Kenya",
    is_default: false,
  })

  // Payment form state
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    mpesaPhone: "",
  })

  // Calculate totals
  const subtotal = cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 500 : 0 // KSh 500 shipping fee
  const tax = subtotal > 0 ? Math.round(subtotal * 0.16) : 0 // 16% VAT
  const total = subtotal + shipping + tax

  // Main data fetching effect - runs only once on component mount
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please log in to proceed to checkout.",
        variant: "destructive",
      })
      navigate("/login?redirect=checkout")
      return
    }

    // Only fetch data once
    if (dataFetchedRef.current) return

    // Define an async function to fetch all required data
    const loadCheckoutData = async () => {
      setLoading(true)
      setError(null)

      try {
        // Fetch cart data
        const cartData = await cartAPI.getCart()
        setCart(cartData)

        // Fetch addresses data
        const addressesData = await addressesAPI.getAddresses()
        console.log("Addresses fetched successfully:", addressesData)

        setAddresses(addressesData || [])

        // Set default address if available
        if (addressesData && addressesData.length > 0) {
          const defaultAddress = addressesData.find((addr) => addr.is_default)
          if (defaultAddress) {
            setSelectedAddress(defaultAddress.id)
          } else {
            setSelectedAddress(addressesData[0].id)
          }
        }

        // Mark data as fetched
        dataFetchedRef.current = true
      } catch (err) {
        console.error("Failed to load checkout data:", err)
        setError("Failed to load checkout data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    loadCheckoutData()
  }, [isAuthenticated, navigate, toast])

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  // Handle address selection
  const handleAddressChange = (e) => {
    setSelectedAddress(Number(e.target.value))
  }

  // Handle payment method selection
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value)
  }

  // Handle address form changes
  const handleAddressFormChange = (e) => {
    const { name, value, type, checked } = e.target
    setAddressForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  // Handle payment info changes
  const handlePaymentInfoChange = (e) => {
    const { name, value } = e.target
    setPaymentInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle address form submission
  const handleAddressSubmit = async (e) => {
    e.preventDefault()

    try {
      setSubmitting(true)

      // Create new address
      const newAddress = await addressesAPI.createAddress(addressForm)

      // Update addresses list
      setAddresses((prev) => [...prev, newAddress])

      // Select the new address
      setSelectedAddress(newAddress.id)

      // Hide the form
      setShowAddressForm(false)

      toast({
        title: "Address added",
        description: "Your new address has been added successfully.",
      })

      // Reset form
      setAddressForm({
        full_name: "",
        phone: "",
        street_address: "",
        city: "",
        state: "",
        postal_code: "",
        country: "Kenya",
        is_default: false,
      })
    } catch (err) {
      console.error("Failed to add address:", err)
      toast({
        title: "Failed to add address",
        description: "Please check your information and try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  // Handle order placement
  const handlePlaceOrder = async (e) => {
    e.preventDefault()

    if (!selectedAddress) {
      toast({
        title: "Address required",
        description: "Please select a shipping address.",
        variant: "destructive",
      })
      setExpandedSection("shipping")
      return
    }

    try {
      setSubmitting(true)

      // Create order
      const orderData = {
        shipping_address_id: selectedAddress,
        billing_address_id: selectedAddress, // Using same address for billing
        payment_method: paymentMethod,
        //use_cart: true, // Use the current cart
        total_amount: total,
        items: cart.items.map((item) => ({
          product: cart.id,
          quantity: item.quantity,
          price: item.price,
        })),
      };
      console.log("Order Payload:", orderData);

      const order = await ordersAPI.createOrder(orderData)

      // If payment method is mpesa, process payment
      if (paymentMethod === "mpesa") {
        // In a real app, this would trigger the M-PESA payment flow
        // For demo purposes, we'll simulate a successful payment
        if (ordersAPI.processPayment) {
          await ordersAPI.processPayment(order.id, {
            payment_method: "mpesa",
            amount: order.total_amount,
            transaction_id: `MPESA${Math.floor(Math.random() * 1000000)}`,
          })
        }
      }

      // Navigate to order confirmation
      navigate(`/orders/${order.id}`, {
        state: {
          orderPlaced: true,
          orderNumber: order.order_number,
        },
      })
    } catch (err) {
      console.error("Failed to place order:", err)
      toast({
        title: "Failed to place order",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="h-12 w-12 animate-spin text-gray-500" />
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p className="mt-2">{error}</p>
          <button
            onClick={() => {
              dataFetchedRef.current = false
              window.location.reload()
            }}
            className="mt-4 inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // Empty cart state
  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-6">You need to add items to your cart before checking out.</p>
        <Link to="/shop" className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 inline-flex items-center">
          Go to Shop
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-16 bg-black text-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Checkout</h1>
              <p className="max-w-[700px] text-gray-300 md:text-xl/relaxed">Complete your order</p>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="mb-6">
            <Link to="/cart" className="text-black hover:underline flex items-center">
              <ChevronDown className="h-4 w-4 mr-2 rotate-90" /> Back to Cart
            </Link>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_350px]">
            {/* Checkout Forms */}
            <div className="space-y-8">
              {/* Shipping Information */}
              <div className="border rounded-lg overflow-hidden">
                <button
                  type="button"
                  className="flex items-center justify-between w-full p-4 bg-gray-50 text-left"
                  onClick={() => toggleSection("shipping")}
                >
                  <div className="flex items-center">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-sm mr-3">
                      1
                    </span>
                    <span className="font-medium">Shipping Address</span>
                  </div>
                  {expandedSection === "shipping" ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>

                {expandedSection === "shipping" && (
                  <div className="p-6">
                    {addresses.length > 0 && (
                      <div className="mb-6">
                        <div className="space-y-4">
                          {addresses.map((address) => (
                            <label
                              key={address.id}
                              className="flex items-start space-x-3 p-4 border rounded-md cursor-pointer hover:bg-gray-50"
                            >
                              <input
                                type="radio"
                                name="address"
                                value={address.id}
                                checked={selectedAddress === address.id}
                                onChange={handleAddressChange}
                                className="mt-1"
                              />
                              <div className="flex-1">
                                <div className="font-medium">{address.full_name}</div>
                                <div className="text-sm text-gray-500">
                                  {address.street_address}
                                  <br />
                                  {address.city}, {address.state} {address.postal_code}
                                  <br />
                                  {address.country}
                                  <br />
                                  <span className="flex items-center mt-1">
                                    <Phone className="h-3 w-3 mr-1" /> {address.phone}
                                  </span>
                                </div>
                                {address.is_default && (
                                  <span className="inline-flex items-center mt-2 px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                                    Default Address
                                  </span>
                                )}
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {!showAddressForm ? (
                      <button
                        onClick={() => setShowAddressForm(true)}
                        className="text-black hover:underline flex items-center"
                      >
                        + Add a new address
                      </button>
                    ) : (
                      <form onSubmit={handleAddressSubmit} className="space-y-4 mt-4 border-t pt-4">
                        <h3 className="font-medium">Add New Address</h3>
                        <div className="space-y-2">
                          <label htmlFor="full_name" className="block text-sm font-medium mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="full_name"
                            name="full_name"
                            value={addressForm.full_name}
                            onChange={handleAddressFormChange}
                            className="w-full p-2 border rounded-md"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="phone" className="block text-sm font-medium mb-1">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={addressForm.phone}
                            onChange={handleAddressFormChange}
                            className="w-full p-2 border rounded-md"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="street_address" className="block text-sm font-medium mb-1">
                            Street Address *
                          </label>
                          <input
                            type="text"
                            id="street_address"
                            name="street_address"
                            value={addressForm.street_address}
                            onChange={handleAddressFormChange}
                            className="w-full p-2 border rounded-md"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="city" className="block text-sm font-medium mb-1">
                              City *
                            </label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              value={addressForm.city}
                              onChange={handleAddressFormChange}
                              className="w-full p-2 border rounded-md"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="state" className="block text-sm font-medium mb-1">
                              County/State *
                            </label>
                            <input
                              type="text"
                              id="state"
                              name="state"
                              value={addressForm.state}
                              onChange={handleAddressFormChange}
                              className="w-full p-2 border rounded-md"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="postal_code" className="block text-sm font-medium mb-1">
                              Postal Code *
                            </label>
                            <input
                              type="text"
                              id="postal_code"
                              name="postal_code"
                              value={addressForm.postal_code}
                              onChange={handleAddressFormChange}
                              className="w-full p-2 border rounded-md"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="country" className="block text-sm font-medium mb-1">
                              Country *
                            </label>
                            <select
                              id="country"
                              name="country"
                              value={addressForm.country}
                              onChange={handleAddressFormChange}
                              className="w-full p-2 border rounded-md"
                              required
                            >
                              <option value="Kenya">Kenya</option>
                              <option value="Uganda">Uganda</option>
                              <option value="Tanzania">Tanzania</option>
                              <option value="Rwanda">Rwanda</option>
                              <option value="Ethiopia">Ethiopia</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="is_default"
                            name="is_default"
                            checked={addressForm.is_default}
                            onChange={handleAddressFormChange}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <label htmlFor="is_default" className="text-sm text-gray-600">
                            Set as default address
                          </label>
                        </div>
                        <div className="flex space-x-4">
                          <button
                            type="submit"
                            disabled={submitting}
                            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 inline-flex items-center"
                          >
                            {submitting ? (
                              <>
                                <Loader className="animate-spin h-4 w-4 mr-2" />
                                Saving...
                              </>
                            ) : (
                              "Save Address"
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowAddressForm(false)}
                            className="border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-100"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}

                    <div className="pt-4 flex justify-end">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90"
                        onClick={() => toggleSection("payment")}
                      >
                        Continue to Payment <ChevronDown className="ml-2 h-4 w-4 rotate-270" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="border rounded-lg overflow-hidden">
                <button
                  type="button"
                  className="flex items-center justify-between w-full p-4 bg-gray-50 text-left"
                  onClick={() => toggleSection("payment")}
                >
                  <div className="flex items-center">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-sm mr-3">
                      2
                    </span>
                    <span className="font-medium">Payment Method</span>
                  </div>
                  {expandedSection === "payment" ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>

                {expandedSection === "payment" && (
                  <div className="p-6 space-y-4">
                    <div className="space-y-3">
                        {/* M-PESA Payment Option */}
                      <label className="flex items-start space-x-3 p-4 border rounded-md cursor-not-allowed bg-gray-100">
                        <input
                          type="radio"
                          name="payment"
                          value="mpesa"
                          checked={paymentMethod === "mpesa"}
                          onChange={handlePaymentMethodChange}
                          className="mt-1"
                          disabled // Disable the M-PESA option
                        />
                        <div className="flex-1">
                          <div className="font-medium">M-PESA</div>
                          <div className="text-sm text-gray-500">Pay using M-PESA mobile money</div>
                          {paymentMethod === "mpesa" && (
                            <div className="mt-3">
                              <label htmlFor="mpesaPhone" className="block text-sm font-medium mb-1">
                                M-PESA Phone Number *
                              </label>
                              <input
                                type="tel"
                                id="mpesaPhone"
                                name="mpesaPhone"
                                placeholder="e.g. 254712345678"
                                className="w-full p-2 border rounded-md"
                                value={paymentInfo.mpesaPhone}
                                onChange={handlePaymentInfoChange}
                                required={paymentMethod === "mpesa"}
                                disabled // Disable the input field
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                You will receive a prompt on your phone to complete the payment
                              </p>
                            </div>
                          )}
                        </div>
                      </label>

                      {/* Credit/Debit Card Payment Option */}
                      <label className="flex items-start space-x-3 p-4 border rounded-md cursor-not-allowed bg-gray-100">
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={handlePaymentMethodChange}
                          className="mt-1"
                          disabled // Disable the Card option
                        />
                        <div className="flex-1">
                          <div className="font-medium">Credit/Debit Card</div>
                          <div className="text-sm text-gray-500">Pay using Visa, Mastercard, or other cards</div>
                          {paymentMethod === "card" && (
                            <div className="mt-3 space-y-3">
                              <div className="space-y-2">
                                <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                                  Card Number *
                                </label>
                                <input
                                  id="cardNumber"
                                  name="cardNumber"
                                  type="text"
                                  placeholder="1234 5678 9012 3456"
                                  maxLength={19}
                                  className="w-full p-2 border rounded-md"
                                  value={paymentInfo.cardNumber}
                                  onChange={(e) => {
                                    const formattedValue = formatCardNumber(e.target.value)
                                    setPaymentInfo((prev) => ({ ...prev, cardNumber: formattedValue }))
                                  }}
                                  required={paymentMethod === "card"}
                                  disabled // Disable the input field
                                />
                              </div>
                              <div className="space-y-2">
                                <label htmlFor="cardName" className="block text-sm font-medium mb-1">
                                  Name on Card *
                                </label>
                                <input
                                  id="cardName"
                                  name="cardName"
                                  type="text"
                                  className="w-full p-2 border rounded-md"
                                  value={paymentInfo.cardName}
                                  onChange={handlePaymentInfoChange}
                                  required={paymentMethod === "card"}
                                  disabled // Disable the input field
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">
                                    Expiry Date (MM/YY) *
                                  </label>
                                  <input
                                    id="expiryDate"
                                    name="expiryDate"
                                    type="text"
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    className="w-full p-2 border rounded-md"
                                    value={paymentInfo.expiryDate}
                                    onChange={handlePaymentInfoChange}
                                    required={paymentMethod === "card"}
                                    disabled // Disable the input field
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label htmlFor="cvv" className="block text-sm font-medium mb-1">
                                    CVV *
                                  </label>
                                  <input
                                    id="cvv"
                                    name="cvv"
                                    type="password"
                                    placeholder="123"
                                    maxLength={4}
                                    className="w-full p-2 border rounded-md"
                                    value={paymentInfo.cvv}
                                    onChange={handlePaymentInfoChange}
                                    required={paymentMethod === "card"}
                                    disabled // Disable the input field
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </label>

                      {/* Pay after Order Option */}
                      <label className="flex items-start space-x-3 p-4 border rounded-md cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="payment"
                          value="pad"
                          checked={paymentMethod === "pad"}
                          onChange={handlePaymentMethodChange}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="font-medium">Pay after Order</div>
                          <div className="text-sm text-gray-500">
                            Pay after you have placed your order. Expect instructions on how to pay.
                          </div>
                        </div>
                      </label>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90"
                        onClick={() => toggleSection("review")}
                      >
                        Review Order <ChevronDown className="ml-2 h-4 w-4 rotate-270" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Review */}
              <div className="border rounded-lg overflow-hidden">
                <button
                  type="button"
                  className="flex items-center justify-between w-full p-4 bg-gray-50 text-left"
                  onClick={() => toggleSection("review")}
                >
                  <div className="flex items-center">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-sm mr-3">
                      3
                    </span>
                    <span className="font-medium">Review Order</span>
                  </div>
                  {expandedSection === "review" ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>

                {expandedSection === "review" && (
                  <div className="p-6 space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Items in Your Order</h3>
                      {cart.items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                            <img
                              src={item.image ? getFullImageUrl(item.image) : "/placeholder.svg?height=100&width=100"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            {item.variant && <div className="text-sm text-gray-500">{item.variant}</div>}
                            <div className="text-sm text-gray-500">Quantity: {item.quantity}</div>
                          </div>
                          <div className="text-right font-medium">
                            KSh{(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>

                    {selectedAddress && (
                      <div className="border-t pt-4 space-y-4">
                        <h3 className="font-medium">Shipping Address</h3>
                        <div className="text-sm">
                          {addresses.length > 0 && selectedAddress ? (
                            (() => {
                              const selectedAddr = addresses.find((addr) => addr.id === selectedAddress)
                              if (selectedAddr) {
                                return (
                                  <div>
                                    <p>{selectedAddr.full_name}</p>
                                    <p>{selectedAddr.street_address}</p>
                                    <p>
                                      {selectedAddr.city}, {selectedAddr.state} {selectedAddr.postal_code}
                                    </p>
                                    <p>{selectedAddr.country}</p>
                                    <p className="flex items-center mt-1">
                                      <Phone className="h-3 w-3 mr-1" />
                                      {selectedAddr.phone}
                                    </p>
                                  </div>
                                )
                              }
                              return <p>Selected address not found</p>
                            })()
                          ) : (
                            <p>No address selected</p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="border-t pt-4 space-y-4">
                      <h3 className="font-medium">Payment Method</h3>
                      <div className="text-sm">
                        {paymentMethod === "mpesa" && (
                          <p>M-PESA ({paymentInfo.mpesaPhone || "No phone number provided"})</p>
                        )}
                        {paymentMethod === "card" && (
                          <p>Credit Card ending in {paymentInfo.cardNumber.slice(-4) || "****"}</p>
                        )}
                        {paymentMethod === "pad" && <p>Cash on Delivery</p>}
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        type="button"
                        onClick={handlePlaceOrder}
                        disabled={submitting || !selectedAddress}
                        className="w-full inline-flex items-center justify-center rounded-md bg-black px-4 py-3 text-sm font-medium text-white hover:bg-black/90 disabled:opacity-50"
                      >
                        {submitting ? (
                          <>
                            <Loader className="animate-spin h-4 w-4 mr-2" />
                            Processing Order...
                          </>
                        ) : (
                          <>
                            Place Order - KSh{total.toLocaleString()} <Check className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </button>
                      <p className="text-xs text-gray-500 text-center mt-2">
                        By placing your order, you agree to our{" "}
                        <Link to="/terms" className="underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="underline">
                          Privacy Policy
                        </Link>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg space-y-4 sticky top-6">
                <h2 className="text-xl font-bold">Order Summary</h2>

                <div className="space-y-2">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.quantity} × {item.name}
                      </span>
                      <span>KSh{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>KSh{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>KSh{shipping.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">VAT (16%)</span>
                    <span>KSh{tax.toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-t pt-4 flex justify-between font-bold">
                  <span>Total</span>
                  <span>KSh{total.toLocaleString()}</span>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={submitting || !selectedAddress}
                    className="w-full inline-flex items-center justify-center rounded-md bg-black px-4 py-3 text-sm font-medium text-white hover:bg-black/90 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader className="animate-spin h-4 w-4 mr-2" />
                        Processing Order...
                      </>
                    ) : (
                      <>
                        Place Order <Check className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>

                <div className="text-sm text-gray-500 space-y-2 pt-4">
                  <div className="flex items-center">
                    <svg
                      className="h-4 w-4 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 002-2V9a2 2 0 00-2-2h-1V5a3 3 0 00-3-3H8a3 3 0 00-3 3v2H4a2 2 0 00-2 2v2a2 2 0 002 2h2v6a2 2 0 002 2z"
                      />
                    </svg>
                    Secure Checkout
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="h-4 w-4 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    Multiple Payment Options
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="h-4 w-4 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    Free Shipping on Orders Over KSh10,000
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
