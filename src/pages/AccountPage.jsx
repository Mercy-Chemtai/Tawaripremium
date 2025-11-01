"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import {
  User,
  Package,
  MapPin,
  LogOut,
  Edit,
  Plus,
  Loader,
  AlertTriangle,
  Home,
  Building,
  Check,
  Trash,
  Calendar,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Laptop,
} from "lucide-react"
import { useToast } from "../components/ui/use-toast"
import { useAuth } from "../components/auth/AuthContext"
import { authAPI, addressesAPI, ordersAPI, servicesAPI } from "../services/api"

// Format date function
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Get status badge component for orders
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

// Get status badge component for bookings
const BookingStatusBadge = ({ status }) => {
  switch (status) {
    case "pending":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </span>
      )
    case "confirmed":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <Calendar className="h-3 w-3 mr-1" />
          Confirmed
        </span>
      )
    case "completed":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Completed
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

export default function AccountPage() {
  const { toast } = useToast()
  const { user, isAuthenticated, logout, addresses, addressesLoading, fetchAddresses } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Get activeTab from location state if available
  const initialTab = location.state?.activeTab || "profile"
  const [activeTab, setActiveTab] = useState(initialTab)

  const [profile, setProfile] = useState(null)
  const [orders, setOrders] = useState([])
  const [bookings, setBookings] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [ordersError, setOrdersError] = useState(null)
  const [bookingsLoading, setBookingsLoading] = useState(false)
  const [bookingsError, setBookingsError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)
  const [submittingAddress, setSubmittingAddress] = useState(false)
  const [deletingAddressId, setDeletingAddressId] = useState(null)

  // Form state for new/edit address
  const [addressForm, setAddressForm] = useState({
    full_name: "",
    phone: "",
    street_address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "Kenya",
    is_default: false,
    address_type: "home",
  })

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        setLoading(true)

        // Fetch profile data
        const profileData = await authAPI.getProfile()
        console.log("Profile data:", profileData)

        // Initialize form data with user info
        if (user) {
          setFormData({
            firstName: user.first_name || "",
            lastName: user.last_name || "",
            email: user.email || "",
            phone: profileData?.phone_number || "",
          })
        }

        setProfile({
          ...profileData,
          firstName: user?.first_name || "",
          lastName: user?.last_name || "",
          email: user?.email || "",
          joinDate: new Date(user?.date_joined || Date.now()).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          }),
        })

        setLoading(false)
      } catch (err) {
        console.error("Error fetching account data:", err)
        setError("Failed to load account data. Please try again later.")
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      fetchAccountData()
    }
  }, [isAuthenticated, user])

  // Fetch orders when the orders tab is selected
  useEffect(() => {
    const fetchOrders = async () => {
      if (activeTab !== "orders" || !isAuthenticated) return

      try {
        setOrdersLoading(true)
        const data = await ordersAPI.getOrders()
        console.log("Orders data:", data)
        setOrders(data.results || [])
        setOrdersError(null)
      } catch (err) {
        console.error("Failed to fetch orders:", err)
        setOrdersError("Failed to load your orders. Please try again.")
      } finally {
        setOrdersLoading(false)
      }
    }

    fetchOrders()
  }, [activeTab, isAuthenticated])

  // Fetch bookings when the bookings tab is selected
  useEffect(() => {
    const fetchBookings = async () => {
      if (activeTab !== "bookings" || !isAuthenticated) return

      try {
        setBookingsLoading(true)
        const data = await servicesAPI.getMyBookings()
        console.log("Bookings data:", data)
        setBookings(data.results || data || [])
        setBookingsError(null)
      } catch (err) {
        console.error("Failed to fetch bookings:", err)
        setBookingsError("Failed to load your bookings. Please try again.")
      } finally {
        setBookingsLoading(false)
      }
    }

    fetchBookings()
  }, [activeTab, isAuthenticated])

  useEffect(() => {
    if (activeTab === "addresses" && isAuthenticated) {
      fetchAddresses()
    }
  }, [activeTab, isAuthenticated, fetchAddresses])

  const handleAddressFormChange = (e) => {
    const { name, value, type, checked } = e.target
    setAddressForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const resetAddressForm = () => {
    setAddressForm({
      full_name: "",
      phone: "",
      street_address: "",
      city: "",
      state: "",
      postal_code: "",
      country: "Kenya",
      is_default: false,
      address_type: "home",
    })
    setEditingAddress(null)
    setShowAddressForm(false)
  }

  const handleEditAddress = (address) => {
    setAddressForm({
      full_name: address.full_name || "",
      phone: address.phone || "",
      street_address: address.street_address || "",
      city: address.city || "",
      state: address.state || "",
      postal_code: address.postal_code || "",
      country: address.country || "Kenya",
      is_default: address.is_default || false,
      address_type: address.address_type || "home",
    })
    setEditingAddress(address.id)
    setShowAddressForm(true)
  }

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        setDeletingAddressId(addressId)
        await addressesAPI.deleteAddress(addressId)

        // Refresh addresses
        fetchAddresses()

        toast({
          title: "Address deleted",
          description: "Your address has been deleted successfully.",
        })
      } catch (err) {
        console.error("Failed to delete address:", err)
        toast({
          title: "Failed to delete address",
          description: "There was an error deleting your address. Please try again.",
          variant: "destructive",
        })
      } finally {
        setDeletingAddressId(null)
      }
    }
  }

  const handleAddressSubmit = async (e) => {
    e.preventDefault()

    try {
      setSubmittingAddress(true)

      if (editingAddress) {
        // Update existing address
        await addressesAPI.updateAddress(editingAddress, addressForm)

        toast({
          title: "Address updated",
          description: "Your address has been updated successfully.",
        })
      } else {
        // Create new address
        await addressesAPI.createAddress(addressForm)

        toast({
          title: "Address added",
          description: "Your new address has been added successfully.",
        })
      }

      // Refresh addresses and reset form
      fetchAddresses()
      resetAddressForm()
    } catch (err) {
      console.error("Failed to save address:", err)
      toast({
        title: editingAddress ? "Failed to update address" : "Failed to add address",
        description: "Please check your information and try again.",
        variant: "destructive",
      })
    } finally {
      setSubmittingAddress(false)
    }
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      // Update user profile
      const updatedProfile = await authAPI.updateProfile({
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone_number: formData.phone,
      })

      // Update local state
      setProfile({
        ...profile,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
      })

      setIsEditing(false)

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      })
    } catch (err) {
      console.error("Error updating profile:", err)
      toast({
        title: "Update Failed",
        description: err.message || "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddAddress = () => {
    setShowAddressForm(true)
  }

  const handleSignOut = async () => {
    try {
      await logout()
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      })
      navigate("/")
    } catch (err) {
      console.error("Error signing out:", err)
      toast({
        title: "Sign Out Failed",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      })
    }
  }

  const renderProfile = () => {
    if (!profile) return null

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            <User className="h-12 w-12" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {profile.firstName} {profile.lastName}
            </h2>
            <p className="text-gray-500">Member since {profile.joinDate}</p>
            <button
              onClick={() =>
                toast({
                  title: "Feature Coming Soon",
                  description: "Profile picture upload will be available soon.",
                })
              }
              className="mt-2 text-sm text-black hover:underline inline-flex items-center"
            >
              Change Profile Picture <Edit className="ml-1 h-3 w-3" />
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Personal Information</h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-sm text-black hover:underline inline-flex items-center"
            >
              {isEditing ? "Cancel" : "Edit"} {!isEditing && <Edit className="ml-1 h-3 w-3" />}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="flex h-10 w-full rounded-md border border-input bg-gray-100 px-3 py-2 text-sm"
                />
                <p className="text-xs text-gray-500">Email address cannot be changed</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium disabled:opacity-50"
                >
                  {loading ? <Loader className="h-4 w-4 animate-spin" /> : "Save Changes"}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">First Name</p>
                  <p>{profile.firstName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Last Name</p>
                  <p>{profile.lastName}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Email Address</p>
                <p>{profile.email}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Phone Number</p>
                <p>{profile.phone || "Not provided"}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Security</h3>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Password</p>
                <p className="text-sm text-gray-500">Last changed: Never</p>
              </div>
              <Link to="/reset-password" className="text-black hover:underline text-sm font-medium">
                Change Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderAddresses = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Addresses</h2>
          {!showAddressForm && (
            <button
              onClick={handleAddAddress}
              className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Address
            </button>
          )}
        </div>

        {showAddressForm && (
          <div className="mb-6 border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">{editingAddress ? "Edit Address" : "Add New Address"}</h3>
            <form onSubmit={handleAddressSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

              <div className="space-y-2">
                <label htmlFor="address_type" className="block text-sm font-medium mb-1">
                  Address Type
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="address_type"
                      value="home"
                      checked={addressForm.address_type === "home"}
                      onChange={handleAddressFormChange}
                      className="h-4 w-4"
                    />
                    <span className="flex items-center">
                      <Home className="h-4 w-4 mr-1" /> Home
                    </span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="address_type"
                      value="work"
                      checked={addressForm.address_type === "work"}
                      onChange={handleAddressFormChange}
                      className="h-4 w-4"
                    />
                    <span className="flex items-center">
                      <Building className="h-4 w-4 mr-1" /> Work
                    </span>
                  </label>
                </div>
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

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={submittingAddress}
                  className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 inline-flex items-center"
                >
                  {submittingAddress ? (
                    <>
                      <Loader className="animate-spin h-4 w-4 mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      {editingAddress ? "Update Address" : "Save Address"}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetAddressForm}
                  className="border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {addressesLoading ? (
          <div className="flex justify-center py-8">
            <Loader className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : addresses.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No addresses yet</h3>
            <p className="text-gray-500 mb-4">Add your first address to make checkout faster</p>
            {!showAddressForm && (
              <button
                onClick={handleAddAddress}
                className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Address
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <div key={address.id} className={`border rounded-lg p-4 ${address.is_default ? "border-black" : ""}`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <span className="font-medium">{address.address_type === "work" ? "Work" : "Home"}</span>
                    {address.is_default && (
                      <span className="ml-2 bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Default</span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleEditAddress(address)} className="text-gray-500 hover:text-black">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(address.id)}
                      className="text-gray-500 hover:text-red-500"
                      disabled={deletingAddressId === address.id}
                    >
                      {deletingAddressId === address.id ? (
                        <Loader className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <p className="font-medium">{address.full_name}</p>
                <p>{address.street_address}</p>
                <p>
                  {address.city}, {address.state} {address.postal_code}
                </p>
                <p>{address.country}</p>
                <p className="mt-1">Phone: {address.phone}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  const renderOrders = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Orders</h2>
        </div>

        {ordersLoading ? (
          <div className="flex justify-center py-8">
            <Loader className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : ordersError ? (
          <div className="text-center py-12 border rounded-lg">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Error Loading Orders</h3>
            <p className="text-gray-500 mb-4">{ordersError}</p>
            <button
              onClick={() => {
                setOrdersLoading(true)
                ordersAPI
                  .getOrders()
                  .then((data) => {
                    setOrders(data.results || [])
                    setOrdersError(null)
                  })
                  .catch((err) => {
                    console.error("Failed to fetch orders:", err)
                    setOrdersError("Failed to load your orders. Please try again.")
                  })
                  .finally(() => setOrdersLoading(false))
              }}
              className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90"
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Try Again
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No orders yet</h3>
            <p className="text-gray-500 mb-4">When you place an order, it will appear here</p>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90"
            >
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
                      state={{ fromAccount: true }}
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

  const renderBookings = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Service Bookings</h2>
          <Link
            to="/book-service"
            className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90"
          >
            <Plus className="mr-2 h-4 w-4" /> Book New Service
          </Link>
        </div>

        {bookingsLoading ? (
          <div className="flex justify-center py-8">
            <Loader className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : bookingsError ? (
          <div className="text-center py-12 border rounded-lg">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Error Loading Bookings</h3>
            <p className="text-gray-500 mb-4">{bookingsError}</p>
            <button
              onClick={() => {
                setBookingsLoading(true)
                servicesAPI
                  .getMyBookings()
                  .then((data) => {
                    setBookings(data.results || data || [])
                    setBookingsError(null)
                  })
                  .catch((err) => {
                    console.error("Failed to fetch bookings:", err)
                    setBookingsError("Failed to load your bookings. Please try again.")
                  })
                  .finally(() => setBookingsLoading(false))
              }}
              className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90"
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Try Again
            </button>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <Laptop className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No service bookings yet</h3>
            <p className="text-gray-500 mb-4">Book a service to get started</p>
            <Link
              to="/book-service"
              className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90"
            >
              Book a Service
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Booking #{booking.id}</div>
                    <div className="font-medium">{booking.service_name}</div>
                  </div>
                  <div className="mt-2 md:mt-0 flex items-center space-x-4">
                    <BookingStatusBadge status={booking.status} />
                    <Link
                      to={`/account/bookings/${booking.id}`}
                      className="text-black hover:text-gray-700 font-medium flex items-center"
                    >
                      View Details <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500 mb-1">Device</div>
                      <div className="font-medium capitalize">{booking.device_type}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500 mb-1">Appointment</div>
                      <div className="font-medium">
                        {formatDate(booking.preferred_date)},{" "}
                        {booking.preferred_time === "morning"
                          ? "Morning (9AM - 12PM)"
                          : booking.preferred_time === "afternoon"
                            ? "Afternoon (12PM - 3PM)"
                            : "Evening (3PM - 6PM)"}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500 mb-1">Created On</div>
                      <div className="font-medium">{formatDate(booking.created_at)}</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="text-sm font-medium text-gray-500 mb-1">Problem Description</div>
                    <p className="text-gray-700">{booking.problem_description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  const renderTraining = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Your Training Courses</h2>
        <p className="text-gray-500">Manage your enrolled training courses here.</p>

        {/* Example content */}
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-bold">Course Name</h3>
          <p className="text-sm text-gray-500">Course description goes here.</p>
          <div className="mt-4">
            <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
              View Course
            </button>
          </div>
        </div>
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
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Account</h1>
              <p className="max-w-[700px] text-gray-300 md:text-xl/relaxed">
                Manage your profile, orders, and preferences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Account Content */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
            {/* Sidebar */}
            <div className="space-y-4">
              <div className="space-y-4">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`flex items-center w-full px-4 py-2 text-left rounded-md ${
                    activeTab === "profile" ? "bg-black text-white" : "hover:bg-gray-100"
                  }`}
                >
                  <User className="mr-2 h-5 w-5" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`flex items-center w-full px-4 py-2 text-left rounded-md ${
                    activeTab === "orders" ? "bg-black text-white" : "hover:bg-gray-100"
                  }`}
                >
                  <Package className="mr-2 h-5 w-5" />
                  <span>Orders</span>
                </button>
                <button
                  onClick={() => setActiveTab("addresses")}
                  className={`flex items-center w-full px-4 py-2 text-left rounded-md ${
                    activeTab === "addresses" ? "bg-black text-white" : "hover:bg-gray-100"
                  }`}
                >
                  <MapPin className="mr-2 h-5 w-5" />
                  <span>Addresses</span>
                </button>
                <button
                  onClick={() => setActiveTab("bookings")}
                  className={`flex items-center w-full px-4 py-2 text-left rounded-md ${
                    activeTab === "bookings" ? "bg-black text-white" : "hover:bg-gray-100"
                  }`}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  <span>My Bookings</span>
                </button>
                <div className="pt-4 mt-4 border-t">
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full px-4 py-2 text-left text-red-600 rounded-md hover:bg-red-50"
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div>
              {activeTab === "profile" && renderProfile()}
              {activeTab === "addresses" && renderAddresses()}
              {activeTab === "orders" && renderOrders()}
              {activeTab === "bookings" && renderBookings()}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
