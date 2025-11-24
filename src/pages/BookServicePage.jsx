"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
// import { servicesAPI } from "../services/api"
import { useAuth } from "../contexts/AuthContext"
import { useToast } from "../components/ui/use-toast"
import { Loader, AlertTriangle, Calendar, ChevronDown, ChevronUp } from "lucide-react"

function BookServicePage() {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()
  const { toast } = useToast()

  // State for form data
  const [formData, setFormData] = useState({
    service: "",
    full_name: "",
    email: "",
    phone: "",
    device_type: "",
    problem_description: "",
    preferred_date: "",
    preferred_time: "morning",
  })

  // State for services and categories
  const [services, setServices] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedService, setSelectedService] = useState(null)
  const [expandedCategory, setExpandedCategory] = useState(null)

  // Loading and error states
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  // Fetch services and categories on component mount
  useEffect(() => {
    const fetchServicesAndCategories = async () => {
      try {
        setLoading(true)
        const [servicesData, categoriesData] = await Promise.all([
          servicesAPI.getServices(),
          servicesAPI.getServiceCategories(),
        ])

        setServices(servicesData.results || servicesData || [])
        setCategories(categoriesData.results || categoriesData || [])

        // If there are categories, expand the first one by default
        if (categoriesData && categoriesData.length > 0) {
          setExpandedCategory(categoriesData[0].id)
        }

        setError(null)
      } catch (err) {
        setError("Failed to load services. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchServicesAndCategories()
  }, [])

  // Pre-fill form with user data if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData((prev) => ({
        ...prev,
        full_name: user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : prev.full_name,
        email: user.email || prev.email,
        phone: user.phone_number || prev.phone,
      }))
    }
  }, [isAuthenticated, user])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // If service is changed, update the selected service
    if (name === "service") {
      const serviceId = Number.parseInt(value, 10)
      const service = services.find((s) => s.id === serviceId)
      setSelectedService(service || null)
    }
  }

  // Toggle category expansion
  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book a service.",
        variant: "destructive",
      })
      navigate("/login", { state: { redirectTo: "/account", redirectTab: "bookings" } })
      return
    }

    try {
      setSubmitting(true)

      // Format the date to YYYY-MM-DD if it's not already
      let formattedDate = formData.preferred_date
      if (formData.preferred_date && formData.preferred_date.includes("/")) {
        const [month, day, year] = formData.preferred_date.split("/")
        formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
      }

      const bookingData = {
        ...formData,
        preferred_date: formattedDate,
        service: Number.parseInt(formData.service, 10),
      }

      await servicesAPI.bookService(bookingData)

      toast({
        title: "Service Booked Successfully",
        description: "We've received your booking request and will contact you shortly.",
      })

      // Redirect to account page with bookings tab active
      navigate("/account", { state: { activeTab: "bookings" } })
    } catch (err) {
      toast({
        title: "Booking Failed",
        description: err.message || "Failed to book service. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  // Get tomorrow's date in YYYY-MM-DD format for min date input
  const getTomorrowDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split("T")[0]
  }

  // Get date 30 days from now for max date input
  const getMaxDate = () => {
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 30)
    return maxDate.toISOString().split("T")[0]
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
          <h1 className="text-2xl font-bold mb-4">Error Loading Services</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 inline-flex items-center"
          >
            <Loader className="h-4 w-4 mr-2" />
            Try Again
          </button>
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
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Book a Service</h1>
              <p className="max-w-[700px] text-gray-300 md:text-xl/relaxed">
                Schedule a repair, maintenance, or consultation with our expert technicians
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
            {/* Service Selection */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Select a Service</h2>

              {categories.length === 0 ? (
                <div className="text-center py-8 border rounded-lg">
                  <p className="text-gray-500">No service categories available</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {categories.map((category) => (
                    <div key={category.id} className="border rounded-lg overflow-hidden">
                      <button
                        type="button"
                        className="flex items-center justify-between w-full p-4 bg-gray-50 text-left"
                        onClick={() => toggleCategory(category.id)}
                      >
                        <span className="font-medium">{category.name}</span>
                        {expandedCategory === category.id ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>

                      {expandedCategory === category.id && (
                        <div className="p-4 space-y-4">
                          {services.filter((service) => service.category === category.id).length === 0 ? (
                            <p className="text-gray-500 text-center py-4">No services available in this category</p>
                          ) : (
                            services
                              .filter((service) => service.category === category.id)
                              .map((service) => (
                                <div key={service.id} className="flex items-start space-x-3 p-4 border rounded-md">
                                  <input
                                    type="radio"
                                    id={`service-${service.id}`}
                                    name="service"
                                    value={service.id}
                                    checked={formData.service === service.id.toString()}
                                    onChange={handleInputChange}
                                    className="mt-1"
                                  />
                                  <label htmlFor={`service-${service.id}`} className="flex-1 cursor-pointer">
                                    <div className="flex justify-between">
                                      <span className="font-medium">{service.name}</span>
                                      <span className="font-bold">KSh{service.price.toLocaleString()}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                                    <div className="text-xs text-gray-500 mt-2">
                                      Duration: {service.duration} minutes
                                    </div>
                                  </label>
                                </div>
                              ))
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {selectedService && (
                <div className="mt-8 p-6 border rounded-lg bg-gray-50">
                  <h3 className="text-lg font-bold mb-2">Selected Service</h3>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{selectedService.name}</p>
                      <p className="text-sm text-gray-600 mt-1">{selectedService.description}</p>
                      <p className="text-sm text-gray-600 mt-2">Duration: {selectedService.duration} minutes</p>
                    </div>
                    <p className="font-bold text-lg">KSh{selectedService.price.toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Booking Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Booking Details</h2>
              <form onSubmit={handleSubmit} className="space-y-6 border rounded-lg p-6">
                <div className="space-y-2">
                  <label htmlFor="full_name" className="block text-sm font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="device_type" className="block text-sm font-medium">
                    Device Type *
                  </label>
                  <input
                    type="text"
                    id="device_type"
                    name="device_type"
                    value={formData.device_type}
                    onChange={handleInputChange}
                    placeholder="e.g. iPhone 13, Dell XPS 15, etc."
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="problem_description" className="block text-sm font-medium">
                    Problem Description *
                  </label>
                  <textarea
                    id="problem_description"
                    name="problem_description"
                    value={formData.problem_description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="preferred_date" className="block text-sm font-medium">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    id="preferred_date"
                    name="preferred_date"
                    value={formData.preferred_date}
                    onChange={handleInputChange}
                    min={getTomorrowDate()}
                    max={getMaxDate()}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                  <p className="text-xs text-gray-500">Please select a date within the next 30 days</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Preferred Time *</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="preferred_time"
                        value="morning"
                        checked={formData.preferred_time === "morning"}
                        onChange={handleInputChange}
                        className="h-4 w-4"
                      />
                      <span>Morning (9AM - 12PM)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="preferred_time"
                        value="afternoon"
                        checked={formData.preferred_time === "afternoon"}
                        onChange={handleInputChange}
                        className="h-4 w-4"
                      />
                      <span>Afternoon (12PM - 3PM)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="preferred_time"
                        value="evening"
                        checked={formData.preferred_time === "evening"}
                        onChange={handleInputChange}
                        className="h-4 w-4"
                      />
                      <span>Evening (3PM - 6PM)</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting || !formData.service}
                  className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {submitting ? (
                    <>
                      <Loader className="animate-spin h-4 w-4 mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Service
                    </>
                  )}
                </button>

                {!formData.service && (
                  <p className="text-sm text-red-500 text-center">Please select a service to continue</p>
                )}

                <p className="text-xs text-gray-500 text-center mt-4">
                  By booking a service, you agree to our{" "}
                  <a href="/terms" className="underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="underline">
                    Privacy Policy
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BookServicePage
