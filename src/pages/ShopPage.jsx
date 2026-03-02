"use client";

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/cart/CartContext";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

export const dummyProducts = [
  {
    id: 9,
    name: "iPhone 17 Pro Max",
    slug: "iphone-17-pro-max",
    category_name: "iPhone",
    price: 250000,
    sale_price: 210000,
    primary_image: {
      image:
        "/Images/iPhone-17-Pro-Max.png",
    },
    colors: [
      {
        name: "Orange Titanium",
        hex: "#8B7355",
        images: [
          "/Images/iPhone-17-Pro-Max.png",
        ],
      },
      {
        name: "Blue Titanium",
        hex: "#1a1a1a",
        images: [
          "/Images/iPhone-17-Pro-Max-Titanium.png",
        ],
      },
      {
        name: "White Titanium",
        hex: "#f5f5f5",
        images: [
          "/Images/iPhone-17-Pro-Max-White.png",
        ],
      },
    ],
    description:
      "The iPhone 17 Pro Max — powerful A-series chip, pro camera system and a stunning display.",
    highlights: ["ProMotion 120Hz", "Always-On", "A19 Pro performance"],
    specifications: {
      Display: "6.9-inch Super Retina XDR display with ProMotion",
      Chip: "A19 Pro chip with 6-core CPU",
      Camera: "48MP Main | 48MP Ultra Wide | 12MP Telephoto (5x optical zoom)",
      Battery: "Up to 29 hours video playback",
      Storage: "256GB, 512GB, 1TB",
      Material: "Titanium design with Ceramic Shield front",
      Connectivity: "5G, Wi-Fi 7, Bluetooth 5.3",
      "Water Resistance": "IP68 (max 6m up to 30 minutes)",
    },
    features: [
      "Action button",
      "Dynamic Island",
      "Always-On display",
      "Face ID",
      "Emergency SOS via satellite",
      "Crash Detection",
    ],
    gallery: [
      "/Images/iPhone-17-Pro-Max.png",
    ],
    availability: "In Stock",
    rating: 4.9,
    reviews_count: 120,
    storage_options: ["256GB", "512GB", "1TB"],
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
        "/Images/iPhone-16-Pro-Max.png",
    },
    colors: [
      {
        name: "Natural Titanium",
        hex: "#8B7355",
        images: [
          "/Images/iPhone-16-Pro-Max.png",
        ],
      },
      {
        name: "Blue Titanium",
        hex: "#4A5A6A",
        images: [
          "/Images/iPhone-16-Pro-Max-Blue.png",
        ],
      },
      {
        name: "Black Titanium",
        hex: "#2C2C2C",
        images: [
          "/Images/iPhone-16-Pro-Max-Black.png",
        ],
      },
    ],
    description:
      "The iPhone 16 Pro Max combines cutting-edge performance, a new titanium build, and Apple's most advanced camera system.",
    highlights: [
      "6.9-inch Super Retina XDR display with ProMotion",
      "A18 Pro chip (3-nm)",
      "48MP Pro camera system",
      "All-day battery life",
      "iOS 18",
    ],
    specifications: {
      Display: "6.9-inch Super Retina XDR OLED, 120Hz ProMotion",
      Processor: "Apple A18 Pro chip",
      Camera: "48MP Main + 12MP Ultra-Wide + 12MP Telephoto",
      "Front Camera": "12MP TrueDepth",
      Battery: "Up to 29 hours video playback",
      OS: "iOS 18",
      Connectivity: "5G, Wi-Fi 7, Bluetooth 5.3, USB-C",
      Materials: "Titanium frame, Ceramic Shield front",
    },
    features: [
      "Always-On Display",
      "Dynamic Island",
      "ProRAW & ProRes",
      "Crash Detection",
      "Face ID",
    ],
    availability: "In Stock",
    rating: 4.9,
    reviews_count: 327,
    storage_options: ["256GB", "512GB", "1TB"],
  },

  {
    id: 2,
    name: "MacBook Air M3 (2024) 15-inch",
    slug: "macbook-air-m3-2024",
    category_name: "MacBook",
    price: 164000,
    sale_price: 155000,
    primary_image: {
      image:
        "/Images/MacBook-Air-M3.png",
    },
    colors: [
      {
        name: "Midnight",
        hex: "#191E29",
        images: [
          "/Images/MacBook-Air-M3.png",
        ],
      },
      {
        name: "Starlight",
        hex: "#F2E9DC",
        images: ["/Images/MacBook-Air-M3-Starlight.png"],
      },
    ],
    description:
      "The MacBook Air M3 redefines lightweight performance with the M3 chip.",
    specifications: {
      Display: "13.6-inch Liquid Retina (2560×1664)",
      Processor: "Apple M3",
      Memory: "8GB unified (configurable)",
      Storage: "256GB (configurable up to 2TB)",
      Battery: "Up to 18 hours",
      OS: "macOS Sonoma",
    },
    features: ["Touch ID", "1080p FaceTime HD", "MagSafe 3", "Wi-Fi 6E"],
    gallery: [
      "/Images/MacBook-Air-M3-Starlight.png",
    ],
    availability: "In Stock",
    rating: 4.8,
    reviews_count: 191,
    storage_options: ["256GB", "512GB", "1TB", "2TB"],
  },

  {
    id: 3,
    name: "iPad Pro M4 (2024) 13-inch",
    slug: "ipad-pro-m4",
    category_name: "iPad",
    price: 160000,
    sale_price: 149999,
    primary_image: {
      image:
        "/Images/iPad-Pro-M4.png",
    },
    description: "iPad Pro M4 — power and portability with the M4 chip.",
    specifications: {
      Display: "13-inch Ultra Retina XDR OLED 120Hz",
      Processor: "Apple M4",
      Camera: "12MP Wide, LiDAR",
      OS: "iPadOS 18",
      Connectivity: "Wi-Fi 6E, 5G, Thunderbolt USB-C",
      Battery: "Up to 10 hours",
    },
    features: ["Apple Pencil Pro support", "ProMotion 120Hz"],
    gallery: [
      "/Images/iPad-Pro-M4.png",
    ],
    availability: "In Stock",
    rating: 4.9,
    reviews_count: 245,
    storage_options: ["256GB", "512GB", "1TB", "2TB"],
  },

  {
    id: 4,
    name: "Apple Watch Ultra 2",
    slug: "apple-watch-ultra-2",
    category_name: "Apple Watch",
    price: 149000,
    sale_price: 116000,
    primary_image: {
      image:
        "/Images/Apple-Watch-Ultra-2.png",
    },
    description: "Engineered for endurance athletes and adventurers.",
    specifications: {
      Display: "49mm Always-On Retina, 3000 nits",
      Processor: "S9 SiP",
      Battery: "36 hours typical, 72 hours Low Power",
      OS: "watchOS 11",
      Sensors: "HR, ECG, SpO2, depth",
    },
    features: ["Action Button", "Dual-frequency GPS", "Dive-ready"],
    gallery: [
      "/Images/Apple-Watch-Ultra-2.png",
    ],
    availability: "In Stock",
    rating: 4.9,
    reviews_count: 411,
  },

  {
    id: 5,
    name: "AirPods Pro (2nd Gen)",
    slug: "airpods-pro-2",
    category_name: "AirPods",
    price: 28000,
    sale_price: 26000,
    primary_image: {
      image: "/Images/AirPods-Pro-2.png",
    },
    description: "AirPods Pro (2nd Gen) with Adaptive Audio and ANC.",
    specifications: {
      Chip: "Apple H2",
      Battery: "Up to 30 hours with MagSafe case",
      Connectivity: "Bluetooth 5.3",
    },
    features: ["Active Noise Cancellation", "Adaptive Transparency"],
    gallery: [
      "/Images/AirPods-Pro-2.png",
    ],
    availability: "In Stock",
    rating: 4.8,
    reviews_count: 540,
  },

  {
    id: 6,
    name: "Apple Pencil (2nd Gen)",
    slug: "apple-pencil-2",
    category_name: "Accessories",
    price: 18500,
    sale_price: 17500,
    primary_image: {
      image: "/Images/Apple-Pencil-2.png",
    },
    description: "Apple Pencil (2nd Gen) for precision input.",
    specifications: {
      Compatibility: "iPad Pro, iPad Air (selected models)",
      Battery: "Rechargeable",
    },
    features: ["Magnetic charging", "Double-tap gesture"],
    availability: "In Stock",
    rating: 4.7,
    reviews_count: 320,
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
        "/Images/MagSafe-Charger.png",
    },
    description: "MagSafe Charger — magnetic wireless charging up to 15W.",
    specifications: {
      ChargingPower: "Up to 15W",
      Connector: "USB-C",
      CableLength: "1m",
    },
    features: ["Magnetic snap-on alignment", "Qi compatible"],
    availability: "In Stock",
    rating: 4.6,
    reviews_count: 212,
  },
  {
    id: 8,
    name: "iPhone 15 Silicone Case with MagSafe",
    slug: "iphone-15-case",
    category_name: "Accessories",
    price: 7999,
    sale_price: 6999,
    primary_image: {
      image: "/Images/iPhone-15-Silicone-Case.png",
    },
    description: "Silicone Case with MagSafe for iPhone 15.",
    specifications: {
      Material: "Silicone",
      Compatibility: "iPhone 15",
      MagSafeSupport: "Yes",
    },
    features: ["Microfiber lining", "Built-in magnets"],
    availability: "In Stock",
    rating: 4.8,
    reviews_count: 154,
  },
  {
  id: 9,
  name: "Mac mini (M2, 2023)",
  slug: "mac-mini-m2",
  category_name: "mac mini",
  price: 99999,
  sale_price: 94999,
  primary_image: {
    image: "/Images/Mac-mini-M2.png",
  },
  description: "Apple Mac mini powered by the M2 chip delivers impressive performance in a compact design, perfect for work, creativity, and everyday use.",
  specifications: {
    Processor: "Apple M2 chip",
    CPU: "8-core CPU",
    GPU: "10-core GPU",
    Memory: "8GB Unified Memory",
    Storage: "256GB SSD",
    Connectivity: "Wi-Fi 6E, Bluetooth 5.3, Ethernet",
    Ports: "2x Thunderbolt 4, HDMI, 2x USB-A, Ethernet, Headphone jack",
    OperatingSystem: "macOS",
  },
  features: [
    "Compact aluminum design",
    "Energy efficient performance",
    "Support for up to two displays",
    "High-speed SSD storage",
  ],
  availability: "In Stock",
  rating: 4.9,
  reviews_count: 312,
},

  {
    id: 10,
    name: "Magic Keyboard for iPad 10th Generation",
    slug: "magic-keyboard-ipad-10th-gen",
    category_name: "Accessories",
    price: 38000,
    sale_price: 38000,
    primary_image: {
      image:
        "/Images/Magic-Keyboard-iPad-10th-Gen.png",
    },
    description: "Magic Keyboard with trackpad for iPad 10th generation.",
    specifications: { Compatibility: "iPad 10th Gen", Trackpad: "Yes" },
    features: ["Backlit keys", "Magnetic attachment", "Smooth typing"],
    availability: "In Stock",
    rating: 4.6,
    reviews_count: 64,
  },

  {
    id: 13,
    name: "iPad 10th Generation 256GB 11-inch with Magic Keyboard",
    slug: "ipad-10th-gen-256gb-magic-keyboard",
    category_name: "iMac",
    price: 98000,
    sale_price: 98000,
    primary_image: {
      image:
        "/Images/iPad-10th-Gen-Magic-Keyboard.png",
    },
    description:
      "11-inch iPad 10th gen with 256GB storage bundled with Magic Keyboard.",
    specifications: {
      Storage: "256GB",
      Display: "11-inch Liquid Retina",
      Included: "Magic Keyboard",
    },
    features: ["Large display", "Keyboard + trackpad", "Fast performance"],
    availability: "In Stock",
    rating: 4.7,
    reviews_count: 73,
  },
  {
    id: 11,
    name: "iPhone 15 128GB",
    slug: "iphone-15-128gb",
    category_name: "iPhone",
    price: 75000,
    sale_price: 75000,
    primary_image: {
      image:
        "/Images/iPhone-15-128GB.png",
    },
    description: "iPhone 15 with A16 Bionic chip and 128GB storage.",
    specifications: {
      Storage: "128GB",
      Display: "6.1-inch OLED",
      Connectivity: "5G",
    },
    features: ["Face ID", "Fast charging", "48MP camera"],
    availability: "In Stock",
    rating: 4.9,
    reviews_count: 211,
  },

  {
    id: 12,
    name: "iPhone 14 128GB",
    slug: "iphone-14-128gb",
    category_name: "iPhone",
    price: 58000,
    sale_price: 58000,
    primary_image: {
      image:
        "/Images/iPhone-14-128GB.png",
    },
    description:
      "iPhone 14 with advanced safety features and great performance.",
    specifications: {
      Storage: "128GB",
      Display: "6.1-inch OLED",
      Connectivity: "5G",
    },
    features: ["Crash detection", "Face ID", "All-day battery life"],
    availability: "In Stock",
    rating: 4.8,
    reviews_count: 187,
  },
  {
  id: 14,
  name: "Apple 30W USB-C Power Adapter Charger",
  slug: "apple-30w-usb-c-power-adapter charger",
  category_name: "Accessories",
  price: 7499,
  sale_price: 5999,
  primary_image: {
    image: "/Images/Apple-30W-USB-C-Power-Adapter.png",
  },
  description: "Apple 30W USB-C Power Adapter for fast, efficient charging of compatible Apple devices like iPhone, iPad, and MacBook Air.",
  specifications: {
    PowerOutput: "30W",
    PortType: "USB-C (1 port)",
    Compatibility: "iPhone, iPad, MacBook Air and other USB-C devices",
    ChargingTechnology: "USB Power Delivery (PD)",
    InputVoltage: "100–240 V AC",
    CableIncluded: "No",
  },
  features: [
    "Compact, portable design",
    "Fast charging with USB Power Delivery",
    "Built-in safety protections (over-voltage, over-current, temperature)",
    "Minimalist Apple aesthetic",
  ],
  availability: "In Stock",
  rating: 4.7,
  reviews_count: 86,
},
{
  id: 15,
  name: "Apple Magic Mouse 2",
  slug: "apple-magic-mouse-2",
  category_name: "Accessories",
  price: 10999,
  sale_price: 9999,
  primary_image: {
    image: "/Images/Apple-Magic-Mouse-2.png",
  },
  description: "The Apple Magic Mouse 2 is a wireless, rechargeable mouse with a sleek design and multi-touch surface for intuitive navigation.",
  specifications: {
    Connectivity: "Bluetooth 4.0",
    Charging: "Lightning cable (included)",
    Compatibility: "Mac, iPad (Bluetooth supported devices)",
    Battery: "Built-in rechargeable battery",
    ColorOptions: "Silver / Space Gray / White",
    Weight: "99 grams approx.",
  },
  features: [
    "Multi-touch surface for swipe and gesture controls",
    "No need for batteries — rechargeable",
    "Lightweight ergonomic design",
    "Pairs automatically with your device",
  ],
  availability: "In Stock",
  rating: 4.6,
  reviews_count: 228,
}
];

export default function ShopPage() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("relevance");
  const [addedNotification, setAddedNotification] = useState(null);

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(dummyProducts.map((p) => p.category_name))),
    ],
    []
  );

  const filtered = useMemo(() => {
    let result = dummyProducts.slice();

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q)
      );
    }

    if (category !== "All")
      result = result.filter((p) => p.category_name === category);
    return result;
  }, [query, category, sort]);

  const handleOpen = (p) =>
    navigate(`/product/${p.slug}`, { state: { product: p } });

  const handleQuickAdd = (product, e) => {
    e.stopPropagation();
    addItem(product, 1);
    setAddedNotification(product.name);
    setTimeout(() => setAddedNotification(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 min-w-full">
      {/* Added to Cart Notification */}
      {addedNotification && (
        <div className="fixed top-24 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          ✓ {addedNotification} added to cart
        </div>
      )}

      <div className="container mx-auto px-12 py-0">
        {/* Hero/Header */}
        <section className="w-screen bg-black text-white py-8 md:py-12 lg:py-10 relative left-1/2 right-1/2 -mx-[50vw]">
          <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 text-center">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">Shop</h1>
            <p className="max-w-[700px] mx-auto text-gray-300 mt-2 md:text-lg">
              Browse our latest Apple devices and accessories
            </p>
          </div>
        </section>

        <motion.section
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  viewport={{ once: true }}
  className="mt-8 mb-10 relative overflow-hidden rounded-2xl 
  bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-800 
  text-white shadow-xl border border-white/10"
>
  {/* floating glows */}
  <motion.div
    animate={{ x: [0, 40, 0], y: [0, -30, 0], opacity: [0.15, 0.3, 0.15] }}
    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
    className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl"
  />
  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10" />

  <div className="relative z-10 px-8 py-8 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* 🔁 Circular moving badge */}
      <div className="relative w-28 h-12 mb-3">
        <motion.span
  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
  inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 
  text-x text-green-400 font-semibold whitespace-nowrap"
>
  ♻️ Trade-In
</motion.span>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold">
        Trade in your old Apple device. Save instantly.
      </h2>

      <p className="mt-2 text-white/70 text-sm max-w-xl">
        Get instant credit for your iPhone, iPad, MacBook or Watch and upgrade today.
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.35, duration: 0.6 }}
      viewport={{ once: true }}
      className="flex gap-3"
    >
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/contact")}
        className="px-6 py-3 rounded-xl bg-white text-black font-semibold shadow-lg"
      >
        Start Trade-In
      </motion.button>
    </motion.div>

  </div>
</motion.section>

        {/* Search + Filters */}
        <div className="mt-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, e.g. iPhone"
            className="w-full sm:w-80 px-4 py-2 rounded-md focus:outline-none shadow-sm bg-white"
          />

          <div className="flex items-center gap-3 bg-white rounded-md shadow-sm p-3">
            <label className="text-sm text-gray-600">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 rounded-md bg-gray-50"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setQuery("");
                setCategory("All");
                setSort("relevance");
              }}
              className="px-3 py-2 rounded-md bg-gray-100 text-sm"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Products grid */}
        <main>
          <div className="mb-6 text-sm text-gray-600">
            Showing {filtered.length} results
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-lg overflow-hidden cursor-pointer transform hover:scale-[1.02] transition-all duration-200 shadow-md flex flex-col"
              >
                <div
                  onClick={() => handleOpen(p)}
                  className="p-4 flex items-center justify-center h-64 bg-gray-100"
                >
                  <img
                    src={p.primary_image?.image}
                    alt={p.name}
                    className="max-h-full object-contain"
                  />
                </div>
                <div className="p-4 mt-auto">
                  <div className="text-sm font-medium truncate mb-2">
                    {p.name}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpen(p)}
                      className="flex-1 px-3 py-2 rounded-md bg-gray-100 text-gray-800 text-sm hover:bg-gray-300 transition"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                No products found.
              </div>
            )}
          </div>
        </main>

        {/* Testimonials Section */}
        <section className="mt-16 bg-white py-12 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-center mb-8">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
            <div className="p-6 bg-gray-50 rounded-lg shadow">
              <p className="text-gray-700 italic">
                "I had an amazing experience at Tawari Digital. Their
                technicians are highly skilled and professional, they diagnosed
                my iPhone issue quickly and fixed it perfectly. The repair was
                done on time, and my phone now works like brand new. I also
                appreciated their honesty, affordable pricing, and great
                customer service. Highly recommend Tawari Digital for anyone
                looking for reliable and efficient Apple phone repairs!"
              </p>
              <p className="mt-3 font-medium text-sm text-gray-600">
                ~ Collins Onyango
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow">
              <p className="text-gray-700 italic">
                "I recently got my MacBook pro battery replacement at tawari
                Digital located at westlands commercial center and I want to
                share my experience! If you are looking for a reliable and
                professional and straight forward Apple service centre. Then
                this is it!"
              </p>
              <p className="mt-3 font-medium text-sm text-gray-600">
                ~ Sadiqahmed Jilaow
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow">
              <p className="text-gray-700 italic">
                "I had a fantastic experience at Tawari digital limited.I came
                in to purchase a new iPhone and I was welcomed and greeted by a
                staff member who was incredibly knowledgeable . They helped me
                choose the right model and explained all the features in details
                . The store was clean and organized, making my visit enjoyable .
                I also appreciated the promotion on accessories . I highly
                recommend visiting tawari digital limited for you tech needs!!"
              </p>
              <p className="mt-3 font-medium text-sm text-gray-600">
                ~ Peter Mwaura
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
