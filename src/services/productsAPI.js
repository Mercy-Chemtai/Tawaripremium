// src/services/productsAPI.js
// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

export async function fetchProducts() {
  const res = await fetch(`${API_URL}/products/`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch products: ${res.status} ${text}`);
  }
  return res.json();
}

export async function fetchProductDetail(slug) {
  const res = await fetch(`${API_URL}/products/${encodeURIComponent(slug)}/`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch product: ${res.status} ${text}`);
  }
  return res.json();
}
