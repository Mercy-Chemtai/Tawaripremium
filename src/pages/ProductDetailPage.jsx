"use client";

import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * NOTE: this file contains its own `dummyProducts` list so it can work as a standalone page.
 * If you already have `dummyProducts` in another module, remove the local list and import it instead.
 */
const dummyProducts = [
  {
    id: 9,
    name: "iPhone 17 Pro Max",
    slug: "iphone-17-pro-max",
    category_name: "iPhone",
    price: 250000,
    sale_price: 248000,
    colors: ["Natural Titanium", "Black", "White"],
    description:
      "The iPhone 17 Pro Max — powerful A-series chip, pro camera system and a stunning display. Ideal for pro users who want the best Apple has to offer.",
    primary_image: {
      image: "https://www.novelty.co.ke/wp-content/uploads/2025/09/iPhone-17-Pro-2.jpg",
    },
  },
  {
    id: 1,
    name: "iPhone 16 Pro Max",
    slug: "iphone-16-pro-max",
    category_name: "iPhone",
    price: 189999,
    sale_price: 179999,
    colors: ["Natural Titanium", "Space Black", "Silver"],
    description:
      "iPhone 16 Pro Max brings improved battery life, an advanced camera system and the latest iOS features.",
    primary_image: {
      image:
        "https://alephksa.com/cdn/shop/files/iPhone_16_Pro_Max_Natural_Titanium_PDP_Image_Position_1__en-ME_a46d3e5e-dad7-4584-9581-342342e640bc.jpg?v=1750067799",
    },
  },
  {
    id: 2,
    name: "MacBook Air M3 (2024)",
    slug: "macbook-air-m3-2024",
    category_name: "MacBook",
    price: 199999,
    sale_price: 189999,
    colors: ["Silver", "Space Gray"],
    description: "Lightweight MacBook Air with M3 — great performance for everyday and pro workflows.",
    primary_image: {
      image: "https://www.phoneplacekenya.com/wp-content/uploads/2024/04/13-inch-MacBook-Air-M3.webp",
    },
  },
  // add more items as needed
];

function ProductDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  // product may be passed in via state from the shop page; if not, we redirect back (or you'd fetch by slug)
  const product = location.state?.product;

  useEffect(() => {
    if (!product) {
      // If you prefer to fetch by slug when state is missing, implement that here.
      navigate("/", { replace: true });
    }
  }, [product, navigate]);

  if (!product) return null;

  const imgSrc = product.primary_image?.image || "/placeholder.svg?height=600&width=600";

  // WhatsApp purchase link (replace with real business number in international format, without +)
  const BUSINESS_NUMBER = "254700000000"; // <-- replace with your number e.g. 2547XXXXXXXX
  const waMessage = encodeURIComponent(
    `Hi, I'm interested in ${product.name} (KSh${product.sale_price || product.price}). Can you help me purchase this?`,
  );
  const waLink = `https://wa.me/${BUSINESS_NUMBER}?text=${waMessage}`;

  const similar = dummyProducts
    .filter((p) => p.category_name === product.category_name && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container mx-auto py-8 px-4">
      <button onClick={() => navigate(-1)} className="text-sm mb-4 underline">
        ← Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Image column */}
        <div className="bg-white border rounded p-4 flex items-center justify-center">
          <img src={imgSrc} alt={product.name} className="max-h-[480px] object-contain" />
        </div>

        {/* Details column */}
        <div className="p-4 bg-white border rounded">
          <h1 className="text-2xl font-bold">{product.name}</h1>

          <div className="mt-2">
            {product.sale_price ? (
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-red-600">KSh{product.sale_price}</span>
                <span className="text-sm text-gray-400 line-through">KSh{product.price}</span>
              </div>
            ) : (
              <div className="text-2xl font-bold">KSh{product.price}</div>
            )}
          </div>

          <p className="text-sm text-gray-600 mt-4">{product.description}</p>

          {product.colors && product.colors.length > 0 && (
            <div className="mt-4">
              <div className="text-sm font-medium">Available colors</div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {product.colors.map((c) => (
                  <button key={c} className="px-3 py-1 border rounded text-sm">
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <a href={waLink} target="_blank" rel="noreferrer" className="px-4 py-2 bg-green-600 text-white rounded text-sm">
              Buy on WhatsApp
            </a>
            <button
              onClick={() => {
                window.open(waLink, "_blank");
              }}
              className="px-4 py-2 border rounded text-sm"
            >
              Request Purchase
            </button>
          </div>

          {/* Similar */}
          <div className="mt-8">
            <h3 className="font-semibold mb-3">You might also like</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {similar.map((s) => (
                <div
                  key={s.id}
                  className="border rounded p-2 text-xs cursor-pointer"
                  onClick={() => navigate(`/product/${s.slug}`, { state: { product: s } })}
                >
                  <img src={s.primary_image?.image} alt={s.name} className="w-full h-20 object-contain mb-2" />
                  <div className="truncate">{s.name}</div>
                  <div className="text-sm font-bold">KSh{s.sale_price || s.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Default export so `import ProductDetail from "./pages/ProductDetailPage"` works
export default ProductDetail;
