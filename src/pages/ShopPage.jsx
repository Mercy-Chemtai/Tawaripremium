"use client";

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Shop page — updated styling per request:
 * - Smooth gray page background, cards with soft shadow and no borders
 * - Medium-sized product cards
 * - Filters moved under the search/sort area as a dropdown bar
 * - Product grid hides extra details; each card shows image, product name and a "View Details" button
 */

const dummyProducts = [
  {
    id: 9,
    name: "iPhone 17 Pro Max",
    slug: "iphone-17-pro-max",
    category_name: "iPhone",
    price: 250000,
    sale_price: 248000,
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
    primary_image: {
      image: "https://www.phoneplacekenya.com/wp-content/uploads/2024/04/13-inch-MacBook-Air-M3.webp",
    },
  },
  {
    id: 3,
    name: "iPad Pro M4 (2024)",
    slug: "ipad-pro-m4",
    category_name: "iPad",
    price: 159999,
    sale_price: 149999,
    primary_image: {
      image:
        "https://noypigeeks.gumlet.io/wp-content/uploads/2024/05/iPad-Pro-M4.jpg?compress=true&quality=80&w=376&dpr=2.6",
    },
  },
  {
    id: 4,
    name: "Apple Watch Ultra 2",
    slug: "apple-watch",
    category_name: "Apple Watch",
    price: 119999,
    sale_price: 114999,
    primary_image: {
      image:
        "https://www.androidauthority.com/wp-content/uploads/2024/09/Apple-Watch-Ultra-2-in-Black-featured-image-scaled.jpg",
    },
  },
  {
    id: 5,
    name: "AirPods Pro (2nd Gen)",
    slug: "airpods-pro-2",
    category_name: "AirPods",
    price: 39999,
    sale_price: 37999,
    primary_image: {
      image: "https://applecenter.co.ke/wp-content/uploads/2023/11/MTJV3.jpeg",
    },
  },
  {
    id: 6,
    name: "Apple Pencil (2nd Gen)",
    slug: "apple-pencil-2",
    category_name: "Accessories",
    price: 19999,
    sale_price: 17999,
    primary_image: {
      image:
        "https://mightyape.co.ke/public/uploads/all/MDhOiqV5A41K6szVExXk199dK4PUU6YFbj2EcWvO.png",
    },
  },
  {
    id: 7,
    name: "MagSafe Charger",
    slug: "magsafe-charger",
    category_name: "Accessories",
    price: 9999,
    sale_price: 8999,
    primary_image: {
      image:
        "https://mac-more.co.ke/wp-content/uploads/2025/07/MagSafe_Charger_1m_Coiled_Screen__USEN.jpg",
    },
  },
  {
    id: 8,
    name: "iPhone 15 Silicone Case with MagSafe",
    slug: "iphone-15-case",
    category_name: "Accessories",
    price: 7999,
    sale_price: 6999,
    primary_image: {
      image: "https://i.ebayimg.com/images/g/I98AAOSwNbNlprtg/s-l1200.jpg",
    },
  },
];

export default function ShopPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("relevance");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;

  const categories = useMemo(() => ["All", ...Array.from(new Set(dummyProducts.map((p) => p.category_name)))], []);

  const filtered = useMemo(() => {
    let result = dummyProducts.slice();

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || (p.description || "").toLowerCase().includes(q));
    }

    if (category !== "All") result = result.filter((p) => p.category_name === category);
    return result;
  }, [query, category, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleOpen = (p) => navigate(`/product/${p.slug}`, { state: { product: p } });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10">
        {/* Header / hero */}
   <section className="w-screen bg-black text-white py-12 md:py-24 lg:py-16 relative left-1/2 right-1/2 -mx-[50vw]">
  <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
    <div className="flex flex-col items-center space-y-4 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
          Shop
        </h1>
        <p className="max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Browse our latest Apple devices and accessories
        </p>
      </div>
    </div>
  </div>
</section>
        <div className="mb-6 lg:items-end flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-end gap-3 w-full sm:w-auto">
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search products, e.g. iPhone"
              className="w-full sm:w-80 px-4 py-2 rounded-md focus:outline-none shadow-sm bg-white"
            />
          </div>
        </div>

        {/* Filters moved under header as a horizontal bar */}
        <div className="mb-6 bg-white rounded-md shadow-sm p-3 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Category:</label>
            <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} className="px-3 py-2 rounded-md bg-gray-50">
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => { setQuery(""); setCategory("All"); setSort("relevance"); setPage(1); }}
              className="px-3 py-2 rounded-md bg-gray-100 text-sm"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Products grid (cards simplified & enlarged) */}
        <main>
          <div className="mb-7 text-sm text-gray-600">Showing {filtered.length} results</div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {pageItems.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-lg overflow-hidden cursor-pointer transform hover:scale-[1.02] transition-all duration-200 shadow-md flex flex-col h-64"
              >
                <div className="p-4 flex items-center justify-center h-40 bg-gray-100">
                  <img src={p.primary_image?.image} alt={p.name} className="max-h-full object-contain" />
                </div>

                <div className="p-4 mt-auto">
                  <div className="text-sm font-medium truncate mb-3">{p.name}</div>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleOpen(p)}
                      className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {pageItems.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">No products found.</div>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">Page {page} of {totalPages}</div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded-md bg-white shadow-sm disabled:opacity-50"
              >
                Prev
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 rounded-md bg-white shadow-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
