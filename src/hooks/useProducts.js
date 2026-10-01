import { useCallback, useEffect, useState } from "react";
import { productsAPI } from "../services/api";

// Converts the Django response into the shape the existing components read:
//   legacy `price`      = original ("was") price
//   legacy `sale_price` = current selling price
export function normalizeProduct(p) {
  const current = Number(p.price);
  const original = p.original_price != null ? Number(p.original_price) : current;
  return {
    ...p,
    price: original,
    sale_price: current,
    rating: Number(p.rating) || 0,
    colors: p.colors || [],
    gallery: p.gallery || [],
    highlights: p.highlights || [],
    features: p.features || [],
    specifications: p.specifications || {},
    storage_options: p.storage_options || [],
  };
}

const unwrap = (data) => (Array.isArray(data) ? data : data?.results ?? []);

export async function fetchProducts() {
  return unwrap(await productsAPI.list()).map(normalizeProduct);
}

export async function fetchProduct(slug) {
  return normalizeProduct(await productsAPI.detail(slug));
}

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchProducts()
      .then((list) => !cancelled && setProducts(list))
      .catch((e) => !cancelled && setError(e))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => load(), [load]);

  return { products, loading, error, refetch: load };
}

export function useProduct(slug) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchProduct(slug)
      .then((p) => !cancelled && setProduct(p))
      .catch((e) => !cancelled && setError(e))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { product, loading, error };
}
