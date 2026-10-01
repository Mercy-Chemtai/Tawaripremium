// src/services/api.js

// ⚠️  VITE_API_URL in your .env must be:  VITE_API_URL=http://localhost:8000
// The /api prefix is appended here — do NOT put /api in the .env value
const API_BASE_URL = (import.meta.env.VITE_API_URL || "https://tawaridigital.co.ke") + "/api";

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

  // NOTE: removed a stray block that used to be here — it referenced
  // isRetry/endpoint/options/fetchAPI, none of which exist in this
  // function's scope, and would throw a ReferenceError whenever the
  // refresh call itself came back 401 (i.e. the refresh token expired).

  if (!response.ok) {
    throw new Error("Failed to refresh token.");
  }

  const data = await response.json();
  localStorage.setItem("accessToken", data.access);
  return data.access;
}

async function fetchAPI(endpoint, options = {}, isRetry = false) {
  const token = options.skipAuth ? null : localStorage.getItem("accessToken");
  const isFormData = options.body instanceof FormData;

  const config = {
    method: options.method || "GET",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  };

  if (options.body && !["GET", "HEAD"].includes(config.method)) {
    config.body = isFormData
      ? options.body
      : typeof options.body === "string"
      ? options.body
      : JSON.stringify(options.body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    // Refresh expired token (except login)
    if (
      response.status === 401 &&
      !isRetry &&
      !endpoint.includes("/auth/login/")
    ) {
      try {
        await refreshAccessToken();
        return fetchAPI(endpoint, options, true);
      } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        throw new Error("Your session has expired. Please log in again.");
      }
    }

    let data = null;
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();

      // Ignore Django HTML pages
      if (
        text &&
        !text.trim().startsWith("<!DOCTYPE") &&
        !text.trim().startsWith("<html")
      ) {
        data = { message: text };
      }
    }

    if (!response.ok) {
      let message = "Something went wrong.";

      switch (response.status) {
        case 400:
          if (data && typeof data === "object") {
            const errors = [];

            Object.entries(data).forEach(([field, value]) => {
              if (Array.isArray(value)) {
                errors.push(value.join(", "));
              } else if (typeof value === "string") {
                errors.push(value);
              }
            });

            message =
              errors.length > 0
                ? errors.join("\n")
                : "Please check your information and try again.";
          } else {
            message = "Please check your information and try again.";
          }
          break;

        case 401:
          message =
            data?.detail ||
            data?.message ||
            "Invalid email or password.";
          break;

        case 403:
          message = "You are not allowed to perform this action.";
          break;

        case 404:
          message = "The requested resource could not be found.";
          break;

        case 500:
          message =
            "Something went wrong on our server. Please try again later.";
          break;

        default:
          message =
            data?.detail ||
            data?.error ||
            data?.message ||
            `Request failed (${response.status})`;
      }

      const error = new Error(message);
      error.status = response.status;
      error.data = data;

      throw error;
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]`, error);
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
// ============================================
const DUMMY_PRODUCTS = [
  { id: 1, name: "Product 1", price: 1000, image: "/placeholder.svg", is_active: true },
  { id: 2, name: "Product 2", price: 2000, image: "/placeholder.svg", is_active: true },
  { id: 3, name: "Product 3", price: 3500, image: "/placeholder.svg", is_active: true },
];

export const productsAPI = {
  // Real backend (public, so no auth header)
  list: () => fetchAPI("/products/", { skipAuth: true }),
  detail: (slug) =>
    fetchAPI(`/products/${encodeURIComponent(slug)}/`, { skipAuth: true }),
  // Old dummy methods: HomePage still uses getProducts
  getProducts: () => Promise.resolve(DUMMY_PRODUCTS),
  getProduct: (id) =>
    Promise.resolve(DUMMY_PRODUCTS.find((p) => p.id === Number(id)) || null),
};

// ============================================
// SERVICES API — dummy data, no backend call
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
// ============================================
export const paymentsAPI = {
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
// Public reads used by BlogPage.jsx / BlogPostPage.jsx, plus admin CRUD
// used by the new BlogAdminPage.jsx (staff only, enforced by the backend).
// ============================================
export const blogAPI = {
  // ---- Public ----
  getPosts: ({ category, exclude, limit } = {}) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (exclude) params.set("exclude", exclude);
    if (limit) params.set("limit", limit);
    const qs = params.toString();
    return fetchAPI(`/blog/posts/${qs ? `?${qs}` : ""}`);
  },

  getPost: (slug) => fetchAPI(`/blog/posts/${slug}/`),

  getCategories: () => fetchAPI("/blog/categories/"),

  getPostsByCategory: (category) => fetchAPI(`/blog/posts/?category=${category}`),

  getComments: (postId) => fetchAPI(`/blog/posts/${postId}/comments/`),

  addComment: ({ post, content }) =>
    fetchAPI(`/blog/posts/${post}/comments/`, {
      method: "POST",
      body: { content },
    }),

  // ---- Admin (staff only — the backend rejects non-staff writes) ----
  adminList: () => fetchAPI("/blog/admin/"),

  adminGet: (id) => fetchAPI(`/blog/admin/${id}/`),

  // fields: { title, excerpt, content, category_name, status }
  // imageFile: optional File object from an <input type="file">
  adminSave: (id, fields, imageFile) => {
    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) => formData.append(key, value ?? ""));
    if (imageFile) formData.append("featured_image", imageFile);

    return fetchAPI(id ? `/blog/admin/${id}/` : "/blog/admin/", {
      method: id ? "PATCH" : "POST",
      body: formData,
    });
  },

  adminDelete: (id) => fetchAPI(`/blog/admin/${id}/`, { method: "DELETE" }),
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
  addressesAPI,
  blogAPI,
};