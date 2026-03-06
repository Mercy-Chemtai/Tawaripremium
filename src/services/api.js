// src/services/api.js

// ⚠️  VITE_API_URL in your .env must be:  VITE_API_URL=http://localhost:8000
// The /api prefix is appended here — do NOT put /api in the .env value
const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000") + "/api";

// ============================================
// Core fetch wrapper with auto token refresh
// ============================================

// Attempt to get a new access token using the refresh token
async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token available.");

  const response = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!response.ok) {
    // Refresh token itself is expired — force user to log in again
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.location.href = "/login";
    throw new Error("Session expired. Please log in again.");
  }

  const data = await response.json();
  localStorage.setItem("accessToken", data.access);
  return data.access;
}

async function fetchAPI(endpoint, options = {}, isRetry = false) {
  const token = localStorage.getItem("accessToken");

  const config = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  };

  if (options.body && !["GET", "HEAD"].includes(config.method)) {
    config.body =
      typeof options.body === "string"
        ? options.body
        : JSON.stringify(options.body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    // ── Auto-refresh on 401 ──────────────────────────────────────────────
    // If the access token is expired and we haven't already retried,
    // get a fresh token and try the request one more time automatically.
    if (response.status === 401 && !isRetry) {
      try {
        await refreshAccessToken();
        return fetchAPI(endpoint, options, true); // retry once with new token
      } catch {
        throw new Error("Session expired. Please log in again.");
      }
    }

    let data = null;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = { message: text };
        }
      }
    }

    if (!response.ok) {
      const errorMessage =
        data?.error ||
        data?.detail ||
        data?.message ||
        `Request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

// ============================================
// AUTH API
// ============================================
export const authAPI = {
  login: (credentials) =>
    fetchAPI("/auth/login/", { method: "POST", body: credentials }),

  register: (userData) =>
    fetchAPI("/auth/register/", { method: "POST", body: userData }),

  getProfile: () => fetchAPI("/auth/profile/"),

  updateProfile: (profileData) =>
    fetchAPI("/auth/profile/", { method: "PATCH", body: profileData }),

  forgotPassword: (payload) =>
    fetchAPI("/auth/forgot-password/", { method: "POST", body: payload }),

  resetPassword: (payload) =>
    fetchAPI("/auth/reset-password/", { method: "POST", body: payload }),

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  },
};

// ============================================
// PRODUCTS API — dummy data, no backend call
// Replace the items array with your real products
// ============================================
const DUMMY_PRODUCTS = [
  { id: 1, name: "Product 1", price: 1000, image: "/placeholder.svg", is_active: true },
  { id: 2, name: "Product 2", price: 2000, image: "/placeholder.svg", is_active: true },
  { id: 3, name: "Product 3", price: 3500, image: "/placeholder.svg", is_active: true },
];

export const productsAPI = {
  getProducts: () => Promise.resolve(DUMMY_PRODUCTS),
  getProduct: (id) =>
    Promise.resolve(DUMMY_PRODUCTS.find((p) => p.id === Number(id)) || null),
};

// ============================================
// SERVICES API — dummy data, no backend call
// Replace the items array with your real services
// ============================================
const DUMMY_SERVICES = [
  { id: 1, name: "Service 1", description: "Description here", price: 500, is_active: true },
  { id: 2, name: "Service 2", description: "Description here", price: 1500, is_active: true },
];

export const servicesAPI = {
  getServices: () => Promise.resolve(DUMMY_SERVICES),
  getService: (id) =>
    Promise.resolve(DUMMY_SERVICES.find((s) => s.id === Number(id)) || null),
};

// ============================================
// ORDERS API
// ============================================
export const ordersAPI = {
  createOrder: (orderData) =>
    fetchAPI("/orders/", { method: "POST", body: orderData }),

  getUserOrders: () => fetchAPI("/orders/"),

  getOrderById: (orderId) => fetchAPI(`/orders/${orderId}/`),

  updateOrderStatus: (orderId, status) =>
    fetchAPI(`/orders/${orderId}/`, { method: "PATCH", body: { status } }),

  cancelOrder: (orderId) =>
    fetchAPI(`/orders/${orderId}/cancel/`, { method: "POST" }),
};

// ============================================
// PAYMENTS API (M-Pesa)
// Matches Django:  api/mpesa/stk-push/
//                  api/mpesa/status/<id>/
//                  api/mpesa/callback/
// ============================================
export const paymentsAPI = {
  // Initiate STK Push
  initiateMpesa: ({ phone, amount, accountRef, description, orderId }) =>
    fetchAPI("/mpesa/stk-push/", {
      method: "POST",
      body: {
        phone,
        amount,
        account_ref: accountRef || `ORDER-${orderId}`,
        description: description || `Payment for Order #${orderId}`,
      },
    }),

  // Poll payment status using the transaction ID returned by initiateMpesa
  checkMpesaStatus: (transactionId) =>
    fetchAPI(`/mpesa/status/${transactionId}/`),
};

// ============================================
// CONTACT API
// ============================================
export const contactAPI = {
  sendContactMessage: (messageData) =>
    fetchAPI("/contact/send/", { method: "POST", body: messageData }),

  getContactMessages: () => fetchAPI("/contact/messages/"),
};

// ============================================
// TRAINING API
// ============================================
export const trainingAPI = {
  getCourses: () => fetchAPI("/training/courses/"),

  getCourse: (slug) => fetchAPI(`/training/courses/${slug}/`),

  enrollCourse: (enrollmentData) =>
    fetchAPI("/training/enroll/", { method: "POST", body: enrollmentData }),

  getUserEnrollments: () => fetchAPI("/training/my-enrollments/"),
};

// ============================================
// USERS API
// ============================================
export const usersAPI = {
  list: () => fetchAPI("/users/"),
  get: (id) => fetchAPI(`/users/${id}/`),
  create: (payload) => fetchAPI("/users/", { method: "POST", body: payload }),
  update: (id, payload) =>
    fetchAPI(`/users/${id}/`, { method: "PUT", body: payload }),
  delete: (id) => fetchAPI(`/users/${id}/`, { method: "DELETE" }),
};

// ============================================
// NEWSLETTER API
// ============================================
export const newsletterAPI = {
  subscribe: (email) =>
    fetchAPI("/newsletter/subscribe/", { method: "POST", body: { email } }),
};

// ============================================
// Default export
// ============================================
export default {
  authAPI,
  productsAPI,
  servicesAPI,
  ordersAPI,
  paymentsAPI,
  contactAPI,
  trainingAPI,
  usersAPI,
  newsletterAPI,
};
// ============================================
// ADDRESSES API
// ============================================
export const addressesAPI = {
  getAddresses: () => fetchAPI("/addresses/"),
  addAddress: (addressData) =>
    fetchAPI("/addresses/", { method: "POST", body: addressData }),
  updateAddress: (id, addressData) =>
    fetchAPI(`/addresses/${id}/`, { method: "PUT", body: addressData }),
  deleteAddress: (id) =>
    fetchAPI(`/addresses/${id}/`, { method: "DELETE" }),
  setDefault: (id) =>
    fetchAPI(`/addresses/${id}/set-default/`, { method: "POST" }),
};

// ============================================
// BLOG API
// ============================================
export const blogAPI = {
  getPosts: () => fetchAPI("/blog/posts/"),
  getPost: (slug) => fetchAPI(`/blog/posts/${slug}/`),
  getCategories: () => fetchAPI("/blog/categories/"),
  getPostsByCategory: (category) => fetchAPI(`/blog/posts/?category=${category}`),
};
