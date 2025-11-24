// src/services/api.js

/**
 * Base URL for API requests
 */
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

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
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  const csrfToken = getCSRFToken()
  if (csrfToken && ["POST", "PUT", "DELETE", "PATCH"].includes(options.method?.toUpperCase())) {
    headers["X-CSRFToken"] = csrfToken
  }

  try {
    console.log(`🌐 API Call: ${options.method || "GET"} ${url}`, options.body ? { body: options.body } : "")
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: "include", // important for session cookies
    })

    console.log(`🌐 API Response: ${response.status} ${response.statusText}`)

    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      } catch {
        errorData = { error: `HTTP ${response.status}: ${response.statusText}` }
      }
      const errorMessage = errorData.detail || errorData.error || errorData.message || `API error: ${response.status}`
      console.error("🌐 API Error:", errorMessage, errorData)
      throw new Error(errorMessage)
    }

    if (response.status === 204) {
      return { success: true }
    }

    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json()
      console.log("🌐 API Success Data:", data)
      return data
    } else {
      return { success: true, status: response.status }
    }
  } catch (err) {
    console.error("🌐 API Fetch Error:", err)
    throw err
  }
}

/**
 * Authentication API
 */
export const authAPI = {
  getCSRFToken: async () => {
    try {
      await fetch(`${API_URL}/`, { method: "GET", credentials: "include" })
      const csrfToken = getCSRFToken()
      console.log("🔐 CSRF Token:", csrfToken ? "Found" : "Not found")
      return { success: true, csrfToken }
    } catch (err) {
      console.error("🔐 CSRF Token Error:", err)
      throw err
    }
  },

  login: async (usernameOrEmail, password) => {
    await authAPI.getCSRFToken()
    const data = await fetchAPI("/api/auth/login/", {
      method: "POST",
      body: JSON.stringify({ usernameOrEmail, password }),
    })
    if (data.user) localStorage.setItem("user", JSON.stringify(data.user))
    return data
  },

  logout: async () => {
    const data = await fetchAPI("/api/auth/logout/", { method: "POST" })
    localStorage.removeItem("user")
    return data
  },

  register: async (registrationData) => {
    return fetchAPI("/api/auth/register/", { method: "POST", body: JSON.stringify(registrationData) })
  },

  getProfile: async () => fetchAPI("/api/auth/profile/"),

  updateProfile: async (profileData) =>
    fetchAPI("/api/auth/profile/", { method: "PUT", body: JSON.stringify(profileData) }),
}

/**
 * Cart API
 */
export const cartAPI = {
  getCart: async () => {
    try {
      return await fetchAPI("/api/cart/")
    } catch (err) {
      console.error("🛒 Get Cart error:", err)
      return { items: [], total: 0 }
    }
  },

  addToCart: async (productData) => {
    if (!productData?.product_id) throw new Error("Invalid product data: Missing product_id")
    const payload = {
      product_id: parseInt(productData.product_id, 10),
      quantity: parseInt(productData.quantity || 1, 10),
      ...(productData.variant && { variant: productData.variant }),
    }
    return fetchAPI("/api/cart/items/", { method: "POST", body: JSON.stringify(payload) })
  },

  updateCartItem: async (itemId, updateData) => {
    const validItemId = parseInt(itemId, 10)
    if (isNaN(validItemId)) throw new Error("Invalid cart item ID")
    return fetchAPI(`/api/cart/items/${validItemId}/`, { method: "PATCH", body: JSON.stringify(updateData) })
  },

  removeCartItem: async (itemId) => {
    const validItemId = parseInt(itemId, 10)
    if (isNaN(validItemId)) throw new Error("Invalid cart item ID")
    return fetchAPI(`/api/cart/items/${validItemId}/`, { method: "DELETE" })
  },
}

/**
 * Addresses API
 */
export const addressesAPI = {
  getAddresses: () => fetchAPI("/api/addresses/"),
  createAddress: (addressData) => fetchAPI("/api/addresses/", { method: "POST", body: JSON.stringify(addressData) }),
  updateAddress: (id, addressData) => fetchAPI(`/api/addresses/${id}/`, { method: "PUT", body: JSON.stringify(addressData) }),
  deleteAddress: (id) => fetchAPI(`/api/addresses/${id}/`, { method: "DELETE" }),
}

/**
 * Orders API
 */
export const ordersAPI = {
  createOrder: (orderData) => fetchAPI("/api/orders/", { method: "POST", body: JSON.stringify(orderData) }),
  getOrder: (id) => fetchAPI(`/api/orders/${id}/`),
  listOrders: () => fetchAPI("/api/orders/"),
}

// Export main fetch function
export { fetchAPI }
