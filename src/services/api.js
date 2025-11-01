// API utility functions for connecting to the Django backend

/**
 * Base URL for API requests
 */
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api"

/**
 * Get CSRF token from cookies
 */
const getCSRFToken = () => {
  const name = "csrftoken="
  const decodedCookie = decodeURIComponent(document.cookie)
  const cookieArray = decodedCookie.split(";")

  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].trim()
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length)
    }
  }
  return null
}

/**
 * Generic fetch function with error handling
 */
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`
  const csrfToken = getCSRFToken() // Get CSRF token from cookies directly

  const headers = {
    "Content-Type": "application/json",
    ...(csrfToken && { "X-CSRFToken": csrfToken }), // Include CSRF token if available
    ...options.headers,
  }

  // Add auth token if available
  const authToken = localStorage.getItem("authToken")
  if (authToken) {
    headers["Authorization"] = `Token ${authToken}`
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: "include", // Always include credentials for CSRF
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error?.detail || error?.message || `API error: ${response.status}`)
    }

    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      return await response.json()
    } else {
      return { success: true, status: response.status }
    }
  } catch (err) {
    throw err
  }
}

// Add or update the following function in your api.js
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("authToken", token)
  } else {
    localStorage.removeItem("authToken")
  }
}

// Make sure this is called when your app initializes
const token = localStorage.getItem("authToken")

/**
 * Authentication API calls
 */
export const authAPI = {
  // Get CSRF token before login
  getCSRFToken: async () => {
    try {
      // Make a GET request to a Django endpoint that sets the CSRF cookie
      // Update the URL to match your Django URL configuration
      const response = await fetch(`${API_URL}/accounts/auth/csrf/`, {
        method: "GET",
        credentials: "include", // Important for cookies
      })

      if (!response.ok) {
        throw new Error(`Failed to get CSRF token: ${response.status}`)
      }

      // The CSRF token is now in the cookies
      const csrfToken = getCSRFToken()
      return { success: true, csrfToken }
    } catch (error) {
      throw error
    }
  },

  login: async (usernameOrEmail, password) => {
    const isEmail = usernameOrEmail.includes("@")

    const loginData = isEmail ? { email: usernameOrEmail, password } : { username: usernameOrEmail, password }

    try {
      // Ensure we have a CSRF token
      await authAPI.getCSRFToken()

      // Make the actual API call
      const data = await fetchAPI("/auth/login/", {
        method: "POST",
        body: JSON.stringify(loginData),
        credentials: "include", // Include cookies for CSRF
      })

      // Store the authentication token in localStorage
      if (data.key) {
        localStorage.setItem("authToken", data.key)
      }

      // Return the full response data which includes isAdmin
      return data
    } catch (error) {
      throw error
    }
  },

  logout: async () => {
    try {
      // Ensure we have a CSRF token
      await authAPI.getCSRFToken()

      // Make the logout API call
      const data = await fetchAPI("/auth/logout/", {
        method: "POST",
        credentials: "include",
      })

      // Clear the authentication token
      localStorage.removeItem("authToken")

      return data
    } catch (error) {
      throw error
    }
  },

  register: async (registrationData) => {
    try {
      // Ensure we have a CSRF token
      await authAPI.getCSRFToken()

      // Make the registration API call
      return await fetchAPI("/register/register/", {
        method: "POST",
        body: JSON.stringify(registrationData),
      })
    } catch (error) {
      throw error
    }
  },

  verifyEmail: async (key) => {
    try {
      return await fetchAPI("/register/verify-email/", {
        method: "POST",
        body: JSON.stringify({ key }),
      })
    } catch (error) {
      throw error
    }
  },

  resendEmailVerification: async (email) => {
    try {
      return await fetchAPI("/register/resend-email/", {
        method: "POST",
        body: JSON.stringify({ email }),
      })
    } catch (error) {
      throw error
    }
  },

  getUserDetails: async () => {
    try {
      return await fetchAPI("/accounts/me/")
    } catch (error) {
      throw error
    }
  },

  updateProfile: async (profileData) => {
    try {
      // First, ensure we have a CSRF token
      await authAPI.getCSRFToken()

      return await fetchAPI("/accounts/me/", {
        method: "PATCH",
        body: JSON.stringify(profileData),
      })
    } catch (error) {
      throw error
    }
  },

  getProfile: async () => {
    try {
      return await fetchAPI("/accounts/profile/my_profile/")
    } catch (error) {
      throw error
    }
  },

  updateProfilePicture: async (formData) => {
    try {
      // For file uploads, we need to use FormData and not set Content-Type
      const url = `${API_URL}/accounts/profile/update_picture/`
      const csrfToken = getCSRFToken()
      const authToken = localStorage.getItem("authToken")

      const headers = {
        ...(csrfToken && { "X-CSRFToken": csrfToken }),
        ...(authToken && { Authorization: `Token ${authToken}` }),
      }

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: formData,
        credentials: "include",
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error?.detail || `API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      throw error
    }
  },

  requestPasswordReset: async (email) => {
    try {
      // First, ensure we have a CSRF token
      await authAPI.getCSRFToken()

      return await fetchAPI("/auth/password/reset/", {
        method: "POST",
        body: JSON.stringify({ email }),
      })
    } catch (error) {
      throw error
    }
  },

  validateResetToken: async (uid, token) => {
    try {
      return await fetchAPI(`/auth/password/reset/validate_token/`, {
        method: "POST",
        body: JSON.stringify({ uid, token }),
      })
    } catch (error) {
      throw error
    }
  },

  resetPassword: async (resetData) => {
    try {
      // First, ensure we have a CSRF token
      await authAPI.getCSRFToken()

      return await fetchAPI("/auth/password/reset/confirm/", {
        method: "POST",
        body: JSON.stringify(resetData),
      })
    } catch (error) {
      throw error
    }
  },

  changePassword: async (passwordData) => {
    try {
      // First, ensure we have a CSRF token
      await authAPI.getCSRFToken()

      return await fetchAPI("/auth/password/change/", {
        method: "POST",
        body: JSON.stringify(passwordData),
      })
    } catch (error) {
      throw error
    }
  },
}

/**
 * Products API calls
 */
export const productsAPI = {
  getProducts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return fetchAPI(`/products/products/${queryString ? `?${queryString}` : ""}`)
  },

  getProduct: async (slug) => {
    return fetchAPI(`/products/products/${slug}/`)
  },

  getCategories: async () => {
    return fetchAPI("/products/categories/")
  },

  getProductReviews: async (productSlug) => {
    return fetchAPI(`/products/products/${productSlug}/reviews/`)
  },

  addProductReview: async (productSlug, reviewData) => {
    return fetchAPI(`/products/products/${productSlug}/reviews/`, {
      method: "POST",
      body: JSON.stringify(reviewData),
    })
  },

  // New functions for cross-selling, etc.
  getRelatedProducts: async (productSlug) => {
    return fetchAPI(`/products/products/${productSlug}/related/`)
  },

  getCrossSellProducts: async (productSlug) => {
    return fetchAPI(`/products/products/${productSlug}/cross_sell/`)
  },

  getUpsellProducts: async (productSlug) => {
    return fetchAPI(`/products/products/${productSlug}/upsell/`)
  },

  getProductVariations: async (productSlug) => {
    return fetchAPI(`/products/products/${productSlug}/variations/`)
  },

  // Get product attributes for filtering
  getProductAttributes: async () => {
    return fetchAPI("/products/attributes/")
  },

  getAttributeValues: async (attributeId) => {
    return fetchAPI(`/products/attributes/${attributeId}/values/`)
  },
}

/**
 * Cart API calls
 */
export const cartAPI = {
  getCart: async () => {
    return fetchAPI("/cart/")
  },

  addToCart: async (productData) => {
    // Validate the product data
    if (!productData || !productData.product_id) {
      console.error("Invalid product data:", productData)
      throw new Error("Invalid product data: Missing product_id")
    }

    // Ensure we're only sending what the backend expects
    const payload = {
      product_id: Number.parseInt(productData.product_id, 10),
      quantity: Number.parseInt(productData.quantity || 1, 10),
      // Only include variant if it exists
      ...(productData.variant && { variant: productData.variant }),
    }

    return fetchAPI("/cart/items/", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  },

  updateCartItem: async (itemId, updateData) => {
    // Validate the item ID
    if (!itemId || itemId === "undefined") {
      console.error("Invalid cart item ID:", itemId)
      throw new Error("Invalid cart item ID")
    }

    // Convert to integer if it's a string
    const validItemId = typeof itemId === "string" ? Number.parseInt(itemId, 10) : itemId

    // Check if conversion resulted in a valid number
    if (isNaN(validItemId)) {
      throw new Error("Invalid cart item ID")
    }

    return fetchAPI(`/cart/items/${validItemId}/`, {
      method: "PATCH",
      body: JSON.stringify(updateData),
    })
  },

  removeCartItem: async (itemId) => {
    // Validate the item ID
    if (!itemId || itemId === "undefined") {
      console.error("Invalid cart item ID:", itemId)
      throw new Error("Invalid cart item ID")
    }

    // Convert to integer if it's a string
    const validItemId = typeof itemId === "string" ? Number.parseInt(itemId, 10) : itemId

    // Check if conversion resulted in a valid number
    if (isNaN(validItemId)) {
      throw new Error("Invalid cart item ID")
    }

    return fetchAPI(`/cart/items/${validItemId}/`, {
      method: "DELETE",
    })
  },

  clearCart: async () => {
    return fetchAPI("/cart/clear/", {
      method: "POST",
    })
  },

  applyPromoCode: async (promoCode) => {
    if (!promoCode) {
      throw new Error("Promo code is required.")
    }

    try {
      const response = await fetchAPI("/cart/apply-promo-code/", {
        method: "POST",
        body: JSON.stringify({ promo_code: promoCode }),
      })

      return response // Return the updated cart or response data
    } catch (error) {
      console.error("Failed to apply promo code:", error)
      throw new Error(error?.promo_code || "Failed to apply promo code.")
    }
  },
}

/**
 * Orders API calls
 */
export const ordersAPI = {
  getOrders: async () => {
    return fetchAPI("/orders/orders/my_orders/")
  },

  getOrder: async (orderId) => {
    try {
      const response = await fetchAPI(`/orders/orders/${orderId}/`, {
        method: "GET",
      })
      return response
    } catch (error) {
      throw error
    }
  },

  createOrder: async (orderData) => {
    return fetchAPI("/orders/orders/", {
      method: "POST",
      body: JSON.stringify(orderData),
    })
  },

  cancelOrder: async (orderId) => {
    return fetchAPI(`/orders/orders/${orderId}/cancel/`, {
      method: "POST",
    })
  },
}

/**
 * Addresses API calls
 */
export const addressesAPI = {
  getAddresses: async () => {
    try {
      // Use the correct endpoint for your addresses app
      const response = await fetchAPI("/addresses/addresses/")

      // If it's a paginated response, return the results array
      if (response && response.results) {
        return response.results
      }

      // If it's already an array, return it directly
      if (Array.isArray(response)) {
        return response
      }

      // If we got a response with an 'addresses' property that's a URL string
      if (response && response.addresses && typeof response.addresses === "string") {
        // Fetch the actual addresses from the URL
        const addressesResponse = await fetchAPI(response.addresses.replace(API_URL, ""))
        return Array.isArray(addressesResponse)
          ? addressesResponse
          : addressesResponse && addressesResponse.results
            ? addressesResponse.results
            : []
      }

      // If we got something unexpected, return an empty array
      console.warn("Unexpected addresses response format:", response)
      return []
    } catch (error) {
      throw error
    }
  },

  createAddress: async (addressData) => {
    return fetchAPI("/addresses/addresses/", {
      method: "POST",
      body: JSON.stringify(addressData),
    })
  },

  updateAddress: async (addressId, addressData) => {
    return fetchAPI(`/addresses/addresses/${addressId}/`, {
      method: "PUT",
      body: JSON.stringify(addressData),
    })
  },

  deleteAddress: async (addressId) => {
    return fetchAPI(`/addresses/addresses/${addressId}/`, {
      method: "DELETE",
    })
  },
}

/**
 * Services API calls
 */
export const servicesAPI = {
  getServices: async () => {
    return fetchAPI("/services/services/")
  },

  getService: async (slug) => {
    return fetchAPI(`/services/services/${slug}/`)
  },

  getServiceCategories: async () => {
    return fetchAPI("/services/categories/")
  },

  getServicesByCategory: async (categorySlug) => {
    return fetchAPI(`/services/services/category/${categorySlug}/`)
  },

  bookService: async (bookingData) => {
    return fetchAPI("/services/bookings/", {
      method: "POST",
      body: JSON.stringify(bookingData),
    })
  },

  getMyBookings: async () => {
    return fetchAPI("/services/bookings/my_bookings/")
  },

  getBooking: async (bookingId) => {
    return fetchAPI(`/services/bookings/${bookingId}/`)
  },

  cancelBooking: async (bookingId) => {
    return fetchAPI(`/services/bookings/${bookingId}/cancel/`, {
      method: "POST",
      body: JSON.stringify({ status: "cancelled" }),
    })
  },
}

/**
 * Training API calls
 */
export const trainingAPI = {
  getCourses: async () => {
    return fetchAPI("/training/courses/");
  },

  getCourse: async (slug) => {
    return fetchAPI(`/training/courses/${slug}/`);
  },

  enrollCourse: async (enrollmentData) => {
  return fetchAPI("/training/enrollments/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enrollmentData),
  });
},

  getMyEnrollments: async () => {
    return fetchAPI("/training/enrollments/my_enrollments/");
  },

  getModules: async (courseSlug) => {
    return fetchAPI(`/training/courses/${courseSlug}/modules/`);
  },

  getModule: async (courseId, moduleId) => {
    return fetchAPI(`/training/courses/${courseId}/modules/${moduleId}/`);
  },

  createModule: async (courseId, moduleData) => {
    return fetchAPI(`/training/courses/${courseId}/modules/`, {
      method: "POST",
      body: JSON.stringify(moduleData),
    });
  },

  updateModule: async (courseId, moduleId, moduleData) => {
    return fetchAPI(`/training/courses/${courseId}/modules/${moduleId}/`, {
      method: "PUT",
      body: JSON.stringify(moduleData),
    });
  },

  deleteModule: async (courseId, moduleId) => {
    return fetchAPI(`/training/courses/${courseId}/modules/${moduleId}/`, {
      method: "DELETE",
    });
  },

  // New API call to get pricing details for a course
  getCoursePricing: async (slug) => {
    return fetchAPI(`/training/courses/${slug}/pricing/`);
  },

  // New API call to update pricing for a course
  updateCoursePricing: async (slug, pricingData) => {
    return fetchAPI(`/training/courses/${slug}/pricing/`, {
      method: "PUT",
      body: JSON.stringify(pricingData),
    });
  },

  // New API call to get testimonials
  getTestimonials: async () => {
    return fetchAPI("/training/testimonials/");
  },
};

/**
 * Blog API calls
 */
export const blogAPI = {
  getPosts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return fetchAPI(`/blog/posts/${queryString ? `?${queryString}` : ""}`)
  },

  getPost: async (slug) => {
    return fetchAPI(`/blog/posts/${slug}/`)
  },

  getCategories: async () => {
    return fetchAPI("/blog/categories/")
  },

  getComments: async (postId) => {
    return fetchAPI(`/blog/comments/?post=${postId}`)
  },

  addComment: async (commentData) => {
    return fetchAPI("/blog/comments/", {
      method: "POST",
      body: JSON.stringify(commentData),
    })
  },
}

/**
 * Contact API calls
 */
export const contactAPI = {
  sendContactMessage: async (contactData) => {
    return fetchAPI("/contact/", {
      method: "POST",
      body: JSON.stringify(contactData),
    })
  },
}

export { fetchAPI }
