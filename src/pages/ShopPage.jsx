"use client";

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/cart/CartContext";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

export const dummyProducts = [
  ,
  // ============================================================
  // NEW APPLE PRODUCTS — 2026
  // KEEP ALL YOUR EXISTING PRODUCTS ABOVE THESE
  // ============================================================
  {
    id: 18,
    name: "iPhone 18 Pro Max",
    slug: "iphone-18-pro-max",
    category_name: "iPhone",
    price: 0,
    sale_price: 0,
    primary_image: {
      image: "/Images/iPhone-18-Pro-Max.png",
    },
    colors: [
      {
        name: "Burgundy",
        hex: "#7A263A",
        images: ["/Images/iPhone-18-Pro-Max.png"],
      },
      {
        name: "Black",
        hex: "#1A1A1A",
        images: ["/Images/iPhone-18-Pro-Max-Black.png"],
      },
      {
        name: "Silver",
        hex: "#D8D8D8",
        images: ["/Images/iPhone-18-Pro-Max-Silver.png"],
      },
      {
        name: "Glacier",
        hex: "#DDE8F0",
        images: ["/Images/iPhone-18-Pro-Max-Glacier.png"],
      },
    ],
    description:
      "iPhone 18 Pro Max combines the A20 Pro chip, advanced Pro camera system, variable-aperture 48MP Fusion Main camera, next-generation display technology and powerful Apple Intelligence features.",
    highlights: [
      "A20 Pro chip",
      "48MP Fusion Main camera with variable aperture",
      "Pro camera controls",
      "Advanced Apple Intelligence",
      "iOS 27",
      "Exceptional battery life",
    ],
    specifications: {
      Display: "Large Super Retina XDR display with ProMotion",
      Chip: "A20 Pro chip",
      Camera: "48MP Fusion camera system with variable-aperture Main camera",
      Battery: "Improved battery life with updated battery design",
      Storage: "256GB, 512GB, 1TB, 2TB",
      Material: "Pro-grade design",
      Connectivity: "5G, Wi-Fi, Bluetooth",
      "Operating System": "iOS 27",
    },
    features: [
      "Dynamic Island",
      "Face ID",
      "Always-On display",
      "Pro camera controls",
      "Apple Intelligence",
      "Emergency SOS",
      "Crash Detection",
    ],
    gallery: [
      "/Images/iPhone-18-Pro-Max.png",
      "/Images/iPhone-18-Pro-Max-Black.png",
      "/Images/iPhone-18-Pro-Max-Silver.png",
    ],
    availability: "In Stock",
    rating: 5.0,
    reviews_count: 0,
    storage_options: ["256GB", "512GB", "1TB", "2TB"],
  },

  {
    id: 19,
    name: "iPhone 18 Pro",
    slug: "iphone-18-pro",
    category_name: "iPhone",
    price: 0,
    sale_price: 0,
    primary_image: {
      image: "/Images/iPhone-18-Pro.png",
    },
    colors: [
      {
        name: "Burgundy",
        hex: "#7A263A",
        images: ["/Images/iPhone-18-Pro.png"],
      },
      {
        name: "Black",
        hex: "#1A1A1A",
        images: ["/Images/iPhone-18-Pro-Black.png"],
      },
      {
        name: "Silver",
        hex: "#D8D8D8",
        images: ["/Images/iPhone-18-Pro-Silver.png"],
      },
      {
        name: "Glacier",
        hex: "#DDE8F0",
        images: ["/Images/iPhone-18-Pro-Glacier.png"],
      },
    ],
    description:
      "iPhone 18 Pro delivers powerful A20 Pro performance, an advanced 48MP Fusion camera system with variable aperture, Pro camera controls and next-generation Apple Intelligence.",
    highlights: [
      "A20 Pro chip",
      "48MP Fusion Main camera",
      "Variable aperture",
      "Pro camera controls",
      "Apple Intelligence",
      "iOS 27",
    ],
    specifications: {
      Display: "Super Retina XDR display with ProMotion",
      Chip: "A20 Pro chip",
      Camera: "48MP Fusion camera system with variable-aperture Main camera",
      Battery: "Updated battery design for improved battery life",
      Storage: "256GB, 512GB, 1TB, 2TB",
      Material: "Pro-grade design",
      Connectivity: "5G, Wi-Fi, Bluetooth",
      "Operating System": "iOS 27",
    },
    features: [
      "Dynamic Island",
      "Face ID",
      "Always-On display",
      "Pro camera controls",
      "Apple Intelligence",
      "Emergency SOS",
      "Crash Detection",
    ],
    gallery: [
      "/Images/iPhone-18-Pro.png",
      "/Images/iPhone-18-Pro-Black.png",
      "/Images/iPhone-18-Pro-Silver.png",
    ],
    availability: "In Stock",
    rating: 5.0,
    reviews_count: 0,
    storage_options: ["256GB", "512GB", "1TB", "2TB"],
  },

  {
    id: 27,
    name: "Apple Watch Ultra 4",
    slug: "apple-watch-ultra-4",
    category_name: "Apple Watch",
    price: 0,
    sale_price: 0,
    primary_image: {
      image: "/Images/Apple-Watch-Ultra-4.png",
    },
    colors: [
      {
        name: "Natural Titanium",
        hex: "#B7B1A5",
        images: ["/Images/Apple-Watch-Ultra-4.png"],
      },
      {
        name: "Black Titanium",
        hex: "#252525",
        images: ["/Images/Apple-Watch-Ultra-4-Black.png"],
      },
    ],
    description:
      "Apple Watch Ultra 4 is designed for demanding sports, outdoor adventures and advanced health and fitness tracking, powered by the S11 chip and new Health Sensing System.",
    highlights: [
      "S11 chip",
      "New Health Sensing System",
      "Up to 50 hours everyday battery life",
      "Up to 45 hours outdoor workout tracking",
      "Readiness score",
      "Siri AI",
    ],
    specifications: {
      Display: "Large Always-On Retina display",
      Chip: "S11 chip",
      Battery: "Up to 50 hours everyday use",
      Workout: "Up to 45 hours outdoor workout tracking",
      Material: "Titanium",
      Connectivity: "GPS, cellular, Wi-Fi, Bluetooth",
      "Water Resistance": "Designed for water and outdoor activities",
    },
    features: [
      "Heart rate sensing",
      "Heart rate variability tracking",
      "Readiness score",
      "Siri AI",
      "Emergency SOS",
      "Fall Detection",
      "Crash Detection",
    ],
    gallery: [
      "/Images/Apple-Watch-Ultra-4.png",
      "/Images/Apple-Watch-Ultra-4-Black.png",
    ],
    availability: "In Stock",
    rating: 5.0,
    reviews_count: 0,
  },

  {
    id: 26,
    name: "Apple Watch Series 12",
    slug: "apple-watch-series-12",
    category_name: "Apple Watch",
    price: 0,
    sale_price: 0,
    primary_image: {
      image: "/Images/Apple-Watch-Series-12.png",
    },
    colors: [
      {
        name: "Dark Bronze",
        hex: "#6F5141",
        images: ["/Images/Apple-Watch-Series-12.png"],
      },
      {
        name: "Black",
        hex: "#1A1A1A",
        images: ["/Images/Apple-Watch-Series-12-Black.png"],
      },
      {
        name: "Light Gold",
        hex: "#D8C6A5",
        images: ["/Images/Apple-Watch-Series-12-Gold.png"],
      },
      {
        name: "Space Gray",
        hex: "#53565A",
        images: ["/Images/Apple-Watch-Series-12-Space-Gray.png"],
      },
    ],
    description:
      "Apple Watch Series 12 combines the new S11 chip, Health Sensing System, advanced health features and faster charging in a versatile everyday smartwatch.",
    highlights: [
      "S11 chip",
      "New Health Sensing System",
      "Up to 24 hours battery life",
      "Faster charging",
      "Readiness score",
      "Siri AI",
    ],
    specifications: {
      Display: "Always-On Retina display",
      Chip: "S11 chip",
      Battery: "Up to 24 hours everyday use",
      Charging: "15 minutes provides up to 12 additional hours",
      Material: "Aluminum, titanium and ceramic options",
      Connectivity: "GPS, cellular, Wi-Fi, Bluetooth",
    },
    features: [
      "Heart rate sensing",
      "HRV measurements",
      "Readiness score",
      "Siri AI",
      "Emergency SOS",
      "Fall Detection",
      "Crash Detection",
    ],
    gallery: [
      "/Images/Apple-Watch-Series-12.png",
      "/Images/Apple-Watch-Series-12-Black.png",
    ],
    availability: "In Stock",
    rating: 5.0,
    reviews_count: 0,
  },

  {
    id: 25,
    name: "AirPods 5",
    slug: "airpods-5",
    category_name: "AirPods",
    price: 0,
    sale_price: 0,
    primary_image: {
      image: "/Images/AirPods-5.png",
    },
    colors: [
      {
        name: "White",
        hex: "#FFFFFF",
        images: ["/Images/AirPods-5.png"],
      },
    ],
    description:
      "AirPods 5 feature an open-ear design, Active Noise Cancellation, Adaptive EQ, improved sound quality and new intelligent features including Siri AI and Live Translation.",
    highlights: [
      "Active Noise Cancellation",
      "Open-ear design",
      "Next-generation Adaptive EQ",
      "Multiport acoustic architecture",
      "Siri AI",
      "Live Translation",
    ],
    specifications: {
      Design: "Open-ear wireless design",
      Audio: "Multiport acoustic architecture",
      "Noise Cancellation": "Active Noise Cancellation",
      "Adaptive EQ": "Next-generation Adaptive EQ",
      Connectivity: "Bluetooth",
      Charging: "Wireless Charging Case option",
    },
    features: [
      "ANC",
      "Transparency mode",
      "Head gesture controls",
      "Volume swipe",
      "Siri AI",
      "Live Translation",
    ],
    gallery: [
      "/Images/AirPods-5.png",
    ],
    availability: "In Stock",
    rating: 5.0,
    reviews_count: 0,
  },

  // =========================================================
  // 2026 — AUGUST
  // =========================================================

  {
    id: 29,
    name: "Mac Studio M5 Ultra",
    slug: "mac-studio-m5-ultra",
    category_name: "Mac",
    price: 0,
    sale_price: 0,
    primary_image: {
      image: "/Images/Mac-Studio-M5-Ultra.png",
    },
    colors: [
      {
        name: "Silver",
        hex: "#B8B8B8",
        images: ["/Images/Mac-Studio-M5-Ultra.png"],
      },
    ],
    description:
      "Mac Studio with M5 Ultra is built for demanding professional workflows including AI research, software development, 3D rendering, scientific computing and high-resolution video production.",
    highlights: [
      "M5 Ultra chip",
      "Up to 80-core GPU",
      "Up to 36-core CPU",
      "Up to 512GB unified memory",
      "Up to 1.2TB/s memory bandwidth",
      "Thunderbolt 5",
    ],
    specifications: {
      Chip: "M5 Ultra",
      CPU: "Up to 36-core CPU",
      GPU: "Up to 80-core GPU",
      Memory: "Up to 512GB unified memory",
      "Memory Bandwidth": "Up to 1.2TB/s",
      Connectivity: "Thunderbolt 5, Wi-Fi 7, Bluetooth 6",
      "Operating System": "macOS 27",
    },
    features: [
      "Apple Intelligence",
      "Advanced AI compute",
      "Professional video workflows",
      "3D rendering",
      "Scientific computing",
      "Thunderbolt 5",
    ],
    gallery: [
      "/Images/Mac-Studio-M5-Ultra.png",
    ],
    availability: "In Stock",
    rating: 5.0,
    reviews_count: 0,
  },

  {
    id: 28,
    name: "Mac mini M6",
    slug: "mac-mini-m6",
    category_name: "Mac",
    price: 0,
    sale_price: 0,
    primary_image: {
      image: "/Images/Mac-mini-M6.png",
    },
    colors: [
      {
        name: "Silver",
        hex: "#B8B8B8",
        images: ["/Images/Mac-mini-M6.png"],
      },
    ],
    description:
      "Mac mini with M6 delivers major performance improvements in a compact desktop design, with powerful CPU, GPU and AI capabilities.",
    highlights: [
      "M6 chip",
      "First Apple 2nm chip",
      "Up to 4x faster AI performance",
      "Up to 2x faster graphics",
      "Up to 2x faster storage",
      "Wi-Fi 7",
    ],
    specifications: {
      Chip: "M6",
      CPU: "12-core CPU",
      GPU: "12-core GPU",
      Memory: "Configurable unified memory",
      "Memory Bandwidth": "Up to 170GB/s",
      Connectivity: "Thunderbolt, Wi-Fi 7, Bluetooth 6",
      "Operating System": "macOS 27",
    },
    features: [
      "Neural Accelerators",
      "Dual 16-core Neural Engine",
      "Apple Intelligence",
      "AI workflows",
      "Compact desktop design",
    ],
    gallery: [
      "/Images/Mac-mini-M6.png",
    ],
    availability: "In Stock",
    rating: 5.0,
    reviews_count: 0,
  },

  {
    id: 23,
    name: "MacBook Pro M5 Max",
    slug: "macbook-pro-m5-max",
    category_name: "MacBook",
    price: 0,
    sale_price: 0,
    primary_image: {
      image: "/Images/MacBook-Pro-M5-Max.png",
    },
    colors: [
      {
        name: "Space Black",
        hex: "#1D1D1F",
        images: ["/Images/MacBook-Pro-M5-Max.png"],
      },
      {
        name: "Silver",
        hex: "#E3E3E3",
        images: ["/Images/MacBook-Pro-M5-Max-Silver.png"],
      },
    ],
    description:
      "MacBook Pro with M5 Max delivers professional-level performance for software development, AI workloads, video production, 3D work and demanding creative applications.",
    highlights: [
      "M5 Max chip",
      "14-inch or 16-inch display options",
      "Professional performance",
      "Advanced Apple Intelligence",
      "Wi-Fi 7",
      "Thunderbolt connectivity",
    ],
    specifications: {
      Display: "Liquid Retina XDR display",
      Chip: "M5 Max",
      Memory: "High-capacity unified memory configurations",
      Storage: "Up to multi-terabyte SSD configurations",
      Connectivity: "Wi-Fi 7, Bluetooth 6, Thunderbolt",
      Material: "Aluminum",
      "Operating System": "macOS",
    },
    features: [
      "Apple Intelligence",
      "ProMotion",
      "Liquid Retina XDR",
      "MagSafe charging",
      "Thunderbolt",
      "Studio-quality microphones",
    ],
    gallery: [
      "/Images/MacBook-Pro-M5-Max.png",
    ],
    availability: "In Stock",
    rating: 5.0,
    reviews_count: 0,
  },

  {
    id: 22,
    name: "MacBook Pro M5 Pro",
    slug: "macbook-pro-m5-pro",
    category_name: "MacBook",
    price: 0,
    sale_price: 0,
    primary_image: {
      image: "/Images/MacBook-Pro-M5-Pro.png",
    },
    colors: [
      {
        name: "Space Black",
        hex: "#1D1D1F",
        images: ["/Images/MacBook-Pro-M5-Pro.png"],
      },
      {
        name: "Silver",
        hex: "#E3E3E3",
        images: ["/Images/MacBook-Pro-M5-Pro-Silver.png"],
      },
    ],
    description:
      "MacBook Pro with M5 Pro combines professional performance with advanced AI capabilities for developers, creators and demanding workflows.",
    highlights: [
      "M5 Pro chip",
      "14-inch or 16-inch display options",
      "Liquid Retina XDR",
      "Apple Intelligence",
      "Wi-Fi 7",
      "Thunderbolt",
    ],
    specifications: {
      Display: "Liquid Retina XDR display",
      Chip: "M5 Pro",
      Memory: "Unified memory",
      Storage: "From 1TB SSD",
      Connectivity: "Wi-Fi 7, Bluetooth 6, Thunderbolt",
      Material: "Aluminum",
      "Operating System": "macOS",
    },
    features: [
      "Apple Intelligence",
      "ProMotion",
      "MagSafe charging",
      "Liquid Retina XDR",
      "Thunderbolt",
    ],
    gallery: [
      "/Images/MacBook-Pro-M5-Pro.png",
    ],
    availability: "In Stock",
    rating: 5.0,
    reviews_count: 0,
  },

  // =========================================================
  // 2026 — MARCH
  // =========================================================

  {
    id: 21,
    name: "MacBook Air M5",
    slug: "macbook-air-m5",
    category_name: "MacBook",
    price: 0,
    sale_price: 0,
    primary_image: {
      image: "/Images/MacBook-Air-M5.png",
    },
    colors: [
      {
        name: "Sky Blue",
        hex: "#A8C7DC",
        images: ["/Images/MacBook-Air-M5.png"],
      },
      {
        name: "Midnight",
        hex: "#1D1D1F",
        images: ["/Images/MacBook-Air-M5-Midnight.png"],
      },
      {
        name: "Starlight",
        hex: "#F0E5D3",
        images: ["/Images/MacBook-Air-M5-Starlight.png"],
      },
      {
        name: "Silver",
        hex: "#E3E3E3",
        images: ["/Images/MacBook-Air-M5-Silver.png"],
      },
    ],
    description:
      "MacBook Air with M5 delivers fast everyday performance, powerful AI capabilities and a thin, fanless design.",
    highlights: [
      "M5 chip",
      "13-inch and 15-inch options",
      "Apple Intelligence",
      "Wi-Fi 7",
      "Bluetooth 6",
      "All-day battery life",
    ],
    specifications: {
      Display: "Liquid Retina display",
      Chip: "M5",
      Storage: "512GB starting configuration",
      Connectivity: "Wi-Fi 7, Bluetooth 6",
      Material: "Aluminum",
      Design: "Thin and fanless",
      "Operating System": "macOS",
    },
    features: [
      "Apple Intelligence",
      "MagSafe charging",
      "Fanless design",
      "1080p camera",
      "Touch ID",
    ],
    gallery: [
      "/Images/MacBook-Air-M5.png",
    ],
    availability: "In Stock",
    rating: 5.0,
    reviews_count: 0,
    storage_options: ["512GB", "1TB", "2TB"],
  },

  {
    id: 20,
    name: "MacBook Neo",
    slug: "macbook-neo",
    category_name: "MacBook",
    price: 0,
    sale_price: 0,
    primary_image: {
      image: "/Images/MacBook-Neo.png",
    },
    colors: [
      {
        name: "Blush",
        hex: "#F2B5B5",
        images: ["/Images/MacBook-Neo.png"],
      },
      {
        name: "Indigo",
        hex: "#4B4E8A",
        images: ["/Images/MacBook-Neo-Indigo.png"],
      },
      {
        name: "Silver",
        hex: "#D8D8D8",
        images: ["/Images/MacBook-Neo-Silver.png"],
      },
      {
        name: "Citrus",
        hex: "#D8D85C",
        images: ["/Images/MacBook-Neo-Citrus.png"],
      },
    ],
    description:
      "MacBook Neo brings the Mac experience to a more accessible notebook with a thin aluminum design, Liquid Retina display and long battery life.",
    highlights: [
      "13-inch Liquid Retina display",
      "Fanless design",
      "1080p FaceTime HD camera",
      "Up to 16 hours battery life",
      "Aluminum enclosure",
    ],
    specifications: {
      Display: "13-inch Liquid Retina display",
      Camera: "1080p FaceTime HD camera",
      Battery: "Up to 16 hours",
      Design: "Fanless aluminum design",
      Microphones: "Dual microphones",
      Connectivity: "Wi-Fi and Bluetooth",
      "Operating System": "macOS",
    },
    features: [
      "1080p camera",
      "Dual microphones",
      "Fanless design",
      "Liquid Retina display",
    ],
    gallery: [
      "/Images/MacBook-Neo.png",
    ],
    availability: "In Stock",
    rating: 4.8,
    reviews_count: 0,
  },

  {
    id: 24,
    name: "iPad Air M4",
    slug: "ipad-air-m4",
    category_name: "iPad",
    price: 0,
    sale_price: 0,
    primary_image: {
      image: "/Images/iPad-Air-M4.png",
    },
    colors: [
      {
        name: "Blue",
        hex: "#7BA7C7",
        images: ["/Images/iPad-Air-M4.png"],
      },
      {
        name: "Purple",
        hex: "#A78BC5",
        images: ["/Images/iPad-Air-M4-Purple.png"],
      },
      {
        name: "Starlight",
        hex: "#E8DCC8",
        images: ["/Images/iPad-Air-M4-Starlight.png"],
      },
      {
        name: "Space Gray",
        hex: "#55565A",
        images: ["/Images/iPad-Air-M4-Space-Gray.png"],
      },
    ],
    description:
      "iPad Air with M4 combines powerful Apple silicon performance with a thin design and support for Apple Pencil Pro and Magic Keyboard.",
    highlights: [
      "M4 chip",
      "11-inch and 13-inch options",
      "Apple Pencil Pro support",
      "Magic Keyboard support",
      "Apple Intelligence",
    ],
    specifications: {
      Display: "Liquid Retina display",
      Chip: "M4",
      Sizes: "11-inch and 13-inch",
      Storage: "Multiple storage configurations",
      Connectivity: "Wi-Fi and cellular options",
      Material: "Aluminum",
    },
    features: [
      "Apple Pencil Pro support",
      "Magic Keyboard support",
      "Apple Intelligence",
      "USB-C",
    ],
    gallery: [
      "/Images/iPad-Air-M4.png",
    ],
    availability: "In Stock",
    rating: 4.9,
    reviews_count: 0,
  },

  {
    id: 17,
    name: "iPhone 17e",
    slug: "iphone-17e",
    category_name: "iPhone",
    price: 0,
    sale_price: 0,
    primary_image: {
      image: "/Images/iPhone-17e.png",
    },
    colors: [
      {
        name: "Black",
        hex: "#1A1A1A",
        images: ["/Images/iPhone-17e.png"],
      },
      {
        name: "White",
        hex: "#F5F5F5",
        images: ["/Images/iPhone-17e-White.png"],
      },
      {
        name: "Soft Pink",
        hex: "#F1C6C8",
        images: ["/Images/iPhone-17e-Pink.png"],
      },
    ],
    description:
      "iPhone 17e combines the A19 chip, a 48MP Fusion camera, a 6.1-inch Super Retina XDR display, Ceramic Shield 2 and MagSafe.",
    highlights: [
      "A19 chip",
      "48MP Fusion camera",
      "6.1-inch Super Retina XDR display",
      "Ceramic Shield 2",
      "MagSafe",
    ],
    specifications: {
      Display: "6.1-inch Super Retina XDR display",
      Chip: "A19",
      Camera: "48MP Fusion camera",
      Storage: "256GB and higher configurations",
      Material: "Ceramic Shield 2 front",
      Connectivity: "5G, Wi-Fi, Bluetooth",
    },
    features: [
      "Face ID",
      "MagSafe",
      "Apple Intelligence",
      "Emergency SOS",
      "Crash Detection",
    ],
    gallery: [
      "/Images/iPhone-17e.png",
    ],
    availability: "In Stock",
    rating: 4.9,
    reviews_count: 0,
    storage_options: ["256GB", "512GB"],
  },

  // =========================================================
  // 2025
  // =========================================================

  {
    id: 9,
    name: "iPhone 17 Pro Max",
    slug: "iphone-17-pro-max",
    category_name: "iPhone",
    price: 250000,
    sale_price: 248000,
    primary_image: {
      image: "/Images/iPhone-17-Pro-Max.png",
    },
    colors: [
      {
        name: "Orange Titanium",
        hex: "#8B7355",
        images: ["/Images/iPhone-17-Pro-Max.png"],
      },
      {
        name: "Black",
        hex: "#1A1A1A",
        images: ["/Images/iPhone-17-Pro-Max-Titanium.png"],
      },
      {
        name: "White",
        hex: "#F5F5F5",
        images: ["/Images/iPhone-17-Pro-Max-White.png"],
      },
    ],
    description:
      "The iPhone 17 Pro Max — powerful A-series chip, pro camera system and a stunning display.",
    highlights: [
      "ProMotion 120Hz",
      "Always-On",
      "A19 Pro performance",
    ],
    specifications: {
      Display: "6.9-inch Super Retina XDR display with ProMotion",
      Chip: "A19 Pro chip",
      Camera: "48MP Fusion camera system",
      Battery: "Long battery life",
      Storage: "256GB, 512GB, 1TB",
      Material: "Titanium design",
      Connectivity: "5G, Wi-Fi, Bluetooth",
      "Water Resistance": "IP68",
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

  // =========================================================
  // OLDER APPLE PRODUCTS
  // =========================================================

  {
    id: 1,
    name: "iPhone 16 Pro Max",
    slug: "iphone-16-pro-max",
    category_name: "iPhone",
    price: 180000,
    sale_price: 175000,
    primary_image: {
      image: "/Images/iPhone-16-Pro-Max.png",
    },
    colors: [
      {
        name: "Natural Titanium",
        hex: "#B8B8B0",
        images: ["/Images/iPhone-16-Pro-Max.png"],
      },
      {
        name: "Black Titanium",
        hex: "#2B2B2B",
        images: ["/Images/iPhone-16-Pro-Max-Black.png"],
      },
    ],
    description:
      "iPhone 16 Pro Max delivers pro performance, advanced cameras and a large Super Retina XDR display.",
    highlights: [
      "A18 Pro chip",
      "ProMotion 120Hz",
      "Pro camera system",
      "Titanium design",
    ],
    specifications: {
      Display: "6.9-inch Super Retina XDR display",
      Chip: "A18 Pro",
      Camera: "48MP Fusion camera system",
      Storage: "256GB, 512GB, 1TB",
      Material: "Titanium",
      Connectivity: "5G, Wi-Fi, Bluetooth",
    },
    features: [
      "Action button",
      "Camera Control",
      "Dynamic Island",
      "Face ID",
      "Apple Intelligence",
    ],
    gallery: [
      "/Images/iPhone-16-Pro-Max.png",
    ],
    availability: "In Stock",
    rating: 4.8,
    reviews_count: 98,
    storage_options: ["256GB", "512GB", "1TB"],
  },

  {
    id: 3,
    name: "iPad Pro M4 (2024) 13-inch",
    slug: "ipad-pro-m4-13-inch",
    category_name: "iPad",
    price: 160000,
    sale_price: 155000,
    primary_image: {
      image: "/Images/iPad-Pro-M4.png",
    },
    colors: [
      {
        name: "Space Black",
        hex: "#1D1D1F",
        images: ["/Images/iPad-Pro-M4.png"],
      },
      {
        name: "Silver",
        hex: "#E3E3E3",
        images: ["/Images/iPad-Pro-M4-Silver.png"],
      },
    ],
    description:
      "The 13-inch iPad Pro with M4 delivers exceptional performance in an incredibly thin design.",
    highlights: [
      "M4 chip",
      "Ultra Retina XDR display",
      "ProMotion 120Hz",
      "Apple Pencil Pro support",
    ],
    specifications: {
      Display: "13-inch Ultra Retina XDR display",
      Chip: "Apple M4",
      Camera: "12MP Wide camera",
      Storage: "256GB and higher",
      Connectivity: "Wi-Fi and cellular options",
      Material: "Aluminum",
    },
    features: [
      "Face ID",
      "Apple Pencil Pro",
      "Magic Keyboard support",
      "Thunderbolt / USB 4",
    ],
    gallery: [
      "/Images/iPad-Pro-M4.png",
    ],
    availability: "In Stock",
    rating: 4.9,
    reviews_count: 75,
  },

  {
    id: 2,
    name: "MacBook Air M3 (2024) 15-inch",
    slug: "macbook-air-m3-15-inch",
    category_name: "MacBook",
    price: 155000,
    sale_price: 150000,
    primary_image: {
      image: "/Images/MacBook-Air-M3.png",
    },
    colors: [
      {
        name: "Midnight",
        hex: "#1D1D1F",
        images: ["/Images/MacBook-Air-M3.png"],
      },
      {
        name: "Starlight",
        hex: "#F0E5D3",
        images: ["/Images/MacBook-Air-M3-Starlight.png"],
      },
    ],
    description:
      "MacBook Air M3 combines powerful performance, long battery life and a thin fanless design.",
    highlights: [
      "Apple M3 chip",
      "15-inch Liquid Retina display",
      "Apple Intelligence support",
      "Long battery life",
    ],
    specifications: {
      Display: "15.3-inch Liquid Retina display",
      Chip: "Apple M3",
      Memory: "8GB and higher",
      Storage: "256GB and higher",
      Connectivity: "Wi-Fi 6E, Bluetooth 5.3",
      Material: "Aluminum",
    },
    features: [
      "MagSafe charging",
      "Touch ID",
      "1080p FaceTime HD camera",
      "Fanless design",
    ],
    gallery: [
      "/Images/MacBook-Air-M3.png",
    ],
    availability: "In Stock",
    rating: 4.8,
    reviews_count: 82,
  },

  {
    id: 4,
    name: "Apple Watch Ultra 2",
    slug: "apple-watch-ultra-2",
    category_name: "Apple Watch",
    price: 95000,
    sale_price: 90000,
    primary_image: {
      image: "/Images/Apple-Watch-Ultra-2.png",
    },
    colors: [
      {
        name: "Titanium",
        hex: "#B7B1A5",
        images: ["/Images/Apple-Watch-Ultra-2.png"],
      },
    ],
    description:
      "Apple Watch Ultra 2 is designed for endurance, outdoor exploration and advanced fitness tracking.",
    highlights: [
      "S9 SiP",
      "49mm titanium case",
      "Double tap",
      "Action button",
    ],
    specifications: {
      Display: "49mm Always-On Retina display",
      Chip: "S9 SiP",
      Battery: "Up to 36 hours",
      Material: "Titanium",
      Connectivity: "GPS, cellular, Wi-Fi, Bluetooth",
      "Water Resistance": "100 meters",
    },
    features: [
      "Action button",
      "Depth app",
      "Double Tap",
      "Precision Finding",
      "Emergency SOS",
    ],
    gallery: [
      "/Images/Apple-Watch-Ultra-2.png",
    ],
    availability: "In Stock",
    rating: 4.8,
    reviews_count: 65,
  },

  {
    id: 5,
    name: "AirPods Pro (2nd Gen)",
    slug: "airpods-pro-2nd-gen",
    category_name: "AirPods",
    price: 35000,
    sale_price: 32000,
    primary_image: {
      image: "/Images/AirPods-Pro-2.png",
    },
    colors: [
      {
        name: "White",
        hex: "#FFFFFF",
        images: ["/Images/AirPods-Pro-2.png"],
      },
    ],
    description:
      "AirPods Pro 2 deliver immersive audio with Active Noise Cancellation and Adaptive Audio.",
    highlights: [
      "Active Noise Cancellation",
      "Adaptive Audio",
      "Transparency mode",
      "USB-C charging",
    ],
    specifications: {
      Chip: "H2 chip",
      Audio: "Personalized Spatial Audio",
      "Noise Cancellation": "Active Noise Cancellation",
      Connectivity: "Bluetooth",
      Charging: "USB-C MagSafe Charging Case",
    },
    features: [
      "Adaptive Audio",
      "Conversation Awareness",
      "Touch controls",
      "Find My",
    ],
    gallery: [
      "/Images/AirPods-Pro-2.png",
    ],
    availability: "In Stock",
    rating: 4.8,
    reviews_count: 110,
  },

  {
    id: 16,
    name: "Mac mini (M2, 2023)",
    slug: "mac-mini-m2-2023",
    category_name: "Mac",
    price: 85000,
    sale_price: 80000,
    primary_image: {
      image: "/Images/Mac-mini-M2.png",
    },
    colors: [
      {
        name: "Silver",
        hex: "#B8B8B8",
        images: ["/Images/Mac-mini-M2.png"],
      },
    ],
    description:
      "Mac mini with M2 delivers compact desktop performance for home, office and professional workflows.",
    highlights: [
      "M2 chip",
      "Compact design",
      "Thunderbolt 4",
      "Excellent desktop performance",
    ],
    specifications: {
      Chip: "Apple M2",
      CPU: "8-core CPU",
      GPU: "10-core GPU",
      Memory: "8GB and higher",
      Storage: "256GB and higher",
      Connectivity: "Wi-Fi 6E, Bluetooth 5.3, Thunderbolt 4",
    },
    features: [
      "Compact desktop",
      "Apple Intelligence support",
      "Multiple displays",
      "Thunderbolt",
    ],
    gallery: [
      "/Images/Mac-mini-M2.png",
    ],
    availability: "In Stock",
    rating: 4.7,
    reviews_count: 54,
  },

  {
    id: 11,
    name: "iPhone 15 128GB",
    slug: "iphone-15-128gb",
    category_name: "iPhone",
    price: 85000,
    sale_price: 80000,
    primary_image: {
      image: "/Images/iPhone-15.png",
    },
    colors: [
      {
        name: "Black",
        hex: "#1A1A1A",
        images: ["/Images/iPhone-15.png"],
      },
      {
        name: "Blue",
        hex: "#B8D4E8",
        images: ["/Images/iPhone-15-Blue.png"],
      },
    ],
    description:
      "iPhone 15 features the A16 Bionic chip, Dynamic Island and a 48MP Main camera.",
    highlights: [
      "A16 Bionic",
      "48MP Main camera",
      "Dynamic Island",
      "USB-C",
    ],
    specifications: {
      Display: "6.1-inch Super Retina XDR",
      Chip: "A16 Bionic",
      Camera: "48MP Main camera",
      Storage: "128GB",
      Connectivity: "5G, Wi-Fi, Bluetooth",
    },
    features: [
      "Dynamic Island",
      "Face ID",
      "USB-C",
      "Emergency SOS",
    ],
    gallery: [
      "/Images/iPhone-15.png",
    ],
    availability: "In Stock",
    rating: 4.7,
    reviews_count: 85,
    storage_options: ["128GB"],
  },

  {
    id: 12,
    name: "iPhone 14 128GB",
    slug: "iphone-14-128gb",
    category_name: "iPhone",
    price: 70000,
    sale_price: 65000,
    primary_image: {
      image: "/Images/iPhone-14.png",
    },
    colors: [
      {
        name: "Midnight",
        hex: "#1D1D1F",
        images: ["/Images/iPhone-14.png"],
      },
      {
        name: "Blue",
        hex: "#A8C7DC",
        images: ["/Images/iPhone-14-Blue.png"],
      },
    ],
    description:
      "iPhone 14 combines reliable performance, an advanced dual-camera system and excellent battery life.",
    highlights: [
      "A15 Bionic",
      "12MP dual-camera system",
      "Super Retina XDR",
      "Emergency SOS",
    ],
    specifications: {
      Display: "6.1-inch Super Retina XDR",
      Chip: "A15 Bionic",
      Camera: "12MP dual-camera system",
      Storage: "128GB",
      Connectivity: "5G, Wi-Fi, Bluetooth",
    },
    features: [
      "Face ID",
      "Emergency SOS",
      "Crash Detection",
      "MagSafe",
    ],
    gallery: [
      "/Images/iPhone-14.png",
    ],
    availability: "In Stock",
    rating: 4.6,
    reviews_count: 70,
    storage_options: ["128GB"],
  },

  {
    id: 13,
    name: "iPad 10th Generation 256GB 11-inch with Magic Keyboard",
    slug: "ipad-10th-generation-256gb-magic-keyboard",
    category_name: "iPad",
    price: 85000,
    sale_price: 80000,
    primary_image: {
      image: "/Images/iPad-10th-Generation.png",
    },
    colors: [
      {
        name: "black",
        hex: "#1A1A1A",
        images: ["/Images/iPad-10th-Generation.png"],
      },
    ],
    description:
      "The 10th-generation iPad offers a colorful all-screen design and includes a Magic Keyboard for productivity.",
    highlights: [
      "10.9-inch Liquid Retina display",
      "A14 Bionic chip",
      "256GB storage",
      "Magic Keyboard support",
    ],
    specifications: {
      Display: "10.9-inch Liquid Retina display",
      Chip: "A14 Bionic",
      Storage: "256GB",
      Camera: "12MP Wide camera",
      Connectivity: "Wi-Fi and cellular options",
    },
    features: [
      "USB-C",
      "Touch ID",
      "Magic Keyboard support",
      "Apple Pencil support",
    ],
    gallery: [
      "/Images/iPad-10th-Generation.png",
    ],
    availability: "In Stock",
    rating: 4.6,
    reviews_count: 48,
    storage_options: ["256GB"],
  },

  {
    id: 10,
    name: "Magic Keyboard for iPad 10th Generation",
    slug: "magic-keyboard-ipad-10th-generation",
    category_name: "Accessories",
    price: 25000,
    sale_price: 23000,
    primary_image: {
      image: "/Images/Magic-Keyboard-iPad.png",
    },
    colors: [
      {
        name: "White",
        hex: "#FFFFFF",
        images: ["/Images/Magic-Keyboard-iPad.png"],
      },
    ],
    description:
      "Magic Keyboard provides a comfortable typing experience and convenient protection for compatible iPad models.",
    highlights: [
      "Comfortable typing",
      "Trackpad",
      "Protective design",
      "iPad compatibility",
    ],
    specifications: {
      Compatibility: "iPad 10th Generation",
      Connection: "Smart Connector",
      Design: "Folio-style keyboard case",
      Color: "White",
    },
    features: [
      "Built-in trackpad",
      "Keyboard",
      "Protective cover",
      "Adjustable viewing angles",
    ],
    gallery: [
      "/Images/Magic-Keyboard-iPad.png",
    ],
    availability: "In Stock",
    rating: 4.6,
    reviews_count: 35,
  },

  {
    id: 15,
    name: "Apple Magic Mouse 2",
    slug: "apple-magic-mouse-2",
    category_name: "Accessories",
    price: 18000,
    sale_price: 16000,
    primary_image: {
      image: "/Images/Apple-Magic-Mouse-2.png",
    },
    colors: [
      {
        name: "White",
        hex: "#F5F5F5",
        images: ["/Images/Apple-Magic-Mouse-2.png"],
      },
    ],
    description:
      "Magic Mouse provides a sleek rechargeable wireless mouse experience with a Multi-Touch surface.",
    highlights: [
      "Multi-Touch surface",
      "Rechargeable battery",
      "Wireless",
      "Sleek design",
    ],
    specifications: {
      Connection: "Bluetooth",
      Battery: "Rechargeable",
      Interface: "Multi-Touch surface",
      Compatibility: "Mac and compatible devices",
    },
    features: [
      "Multi-Touch",
      "Wireless",
      "Rechargeable battery",
    ],
    gallery: [
      "/Images/Apple-Magic-Mouse-2.png",
    ],
    availability: "In Stock",
    rating: 4.5,
    reviews_count: 30,
  },

  {
    id: 14,
    name: "Apple 30W USB-C Power Adapter Charger",
    slug: "apple-30w-usb-c-power-adapter-charger",
    category_name: "Accessories",
    price: 8000,
    sale_price: 7500,
    primary_image: {
      image: "/Images/Apple-30W-USB-C-Charger.png",
    },
    colors: [
      {
        name: "White",
        hex: "#FFFFFF",
        images: ["/Images/Apple-30W-USB-C-Charger.png"],
      },
    ],
    description:
      "Apple 30W USB-C Power Adapter provides convenient fast charging for compatible Apple devices.",
    highlights: [
      "30W USB-C power",
      "Compact design",
      "Fast charging",
      "Apple quality",
    ],
    specifications: {
      Power: "30W",
      Port: "USB-C",
      Compatibility: "Compatible Apple devices",
      Design: "Compact",
    },
    features: [
      "USB-C",
      "Fast charging",
      "Compact design",
    ],
    gallery: [
      "/Images/Apple-30W-USB-C-Charger.png",
    ],
    availability: "In Stock",
    rating: 4.6,
    reviews_count: 25,
  },

  {
    id: 7,
    name: "MagSafe Charger",
    slug: "magsafe-charger",
    category_name: "Accessories",
    price: 6500,
    sale_price: 6000,
    primary_image: {
      image: "/Images/MagSafe-Charger.png",
    },
    colors: [
      {
        name: "White",
        hex: "#FFFFFF",
        images: ["/Images/MagSafe-Charger.png"],
      },
    ],
    description:
      "MagSafe Charger provides convenient wireless charging with magnetic alignment for compatible Apple devices.",
    highlights: [
      "Magnetic alignment",
      "Wireless charging",
      "USB-C connection",
      "Compact design",
    ],
    specifications: {
      Connection: "USB-C",
      Charging: "Magnetic wireless charging",
      Compatibility: "Compatible MagSafe devices",
      Design: "Compact circular charger",
    },
    features: [
      "Magnetic alignment",
      "Wireless charging",
      "USB-C",
    ],
    gallery: [
      "/Images/MagSafe-Charger.png",
    ],
    availability: "In Stock",
    rating: 4.6,
    reviews_count: 32,
  },

  {
    id: 6,
    name: "Apple Pencil (2nd Gen)",
    slug: "apple-pencil-2nd-gen",
    category_name: "Accessories",
    price: 18000,
    sale_price: 16500,
    primary_image: {
      image: "/Images/Apple-Pencil-2nd-Gen.png",
    },
    colors: [
      {
        name: "White",
        hex: "#FFFFFF",
        images: ["/Images/Apple-Pencil-2nd-Gen.png"],
      },
    ],
    description:
      "Apple Pencil 2 provides precise and responsive input for compatible iPad models.",
    highlights: [
      "Pixel-perfect precision",
      "Low latency",
      "Magnetic charging",
      "Double-tap controls",
    ],
    specifications: {
      Connection: "Bluetooth",
      Charging: "Magnetic charging",
      Compatibility: "Compatible iPad models",
      Design: "Matte finish",
    },
    features: [
      "Double tap",
      "Magnetic attachment",
      "Wireless charging",
      "Pressure sensitivity",
    ],
    gallery: [
      "/Images/Apple-Pencil-2nd-Gen.png",
    ],
    availability: "In Stock",
    rating: 4.7,
    reviews_count: 40,
  },

  {
    id: 8,
    name: "iPhone 15 Silicone Case with MagSafe",
    slug: "iphone-15-silicone-case-with-magsafe",
    category_name: "Accessories",
    price: 6000,
    sale_price: 5500,
    primary_image: {
      image: "/Images/iPhone-15-Silicone-Case.png",
    },
    colors: [
      {
        name: "Black",
        hex: "#1A1A1A",
        images: ["/Images/iPhone-15-Silicone-Case.png"],
      },
    ],
    description:
      "Silicone Case with MagSafe provides a soft-touch finish and magnetic compatibility for iPhone 15.",
    highlights: [
      "Silicone exterior",
      "MagSafe compatible",
      "Protective design",
      "Slim profile",
    ],
    specifications: {
      Material: "Silicone",
      Compatibility: "iPhone 15",
      Charging: "MagSafe compatible",
      Design: "Slim protective case",
    },
    features: [
      "MagSafe",
      "Protective lining",
      "Soft-touch exterior",
    ],
    gallery: [
      "/Images/iPhone-15-Silicone-Case.png",
    ],
    availability: "In Stock",
    rating: 4.5,
    reviews_count: 22,
  },

  {
    id: 31,
    name: "Studio Display XDR",
    slug: "studio-display-xdr",
    category_name: "Display",
    price: 0,
    sale_price: 0,
    primary_image: {
      image: "/Images/Studio-Display-XDR.png",
    },
    colors: [
      {
        name: "Silver",
        hex: "#C7C7C7",
        images: ["/Images/Studio-Display-XDR.png"],
      },
    ],
    description:
      "Studio Display XDR delivers a professional 27-inch 5K Retina XDR viewing experience with advanced brightness, color and connectivity.",
    highlights: [
      "27-inch 5K Retina XDR",
      "Mini-LED",
      "Up to 2000 nits peak HDR brightness",
      "120Hz",
      "Thunderbolt 5",
      "12MP Center Stage camera",
    ],
    specifications: {
      Display: "27-inch 5K Retina XDR",
      Technology: "Mini-LED",
      Brightness: "Up to 2000 nits peak HDR",
      RefreshRate: "120Hz",
      Camera: "12MP Center Stage",
      Audio: "Six-speaker system with Spatial Audio",
      Connectivity: "Thunderbolt 5",
    },
    features: [
      "Center Stage",
      "Desk View",
      "Spatial Audio",
      "Studio-quality microphones",
      "Thunderbolt 5",
    ],
    gallery: [
      "/Images/Studio-Display-XDR.png",
    ],
    availability: "In Stock",
    rating: 5.0,
    reviews_count: 0,
  },

  {
    id: 30,
    name: "Studio Display",
    slug: "studio-display",
    category_name: "Display",
    price: 0,
    sale_price: 0,
    primary_image: {
      image: "/Images/Studio-Display.png",
    },
    colors: [
      {
        name: "Silver",
        hex: "#C7C7C7",
        images: ["/Images/Studio-Display.png"],
      },
    ],
    description:
      "Studio Display provides a high-quality 27-inch 5K Retina display with an integrated camera and speaker system.",
    highlights: [
      "27-inch 5K Retina display",
      "12MP Center Stage camera",
      "Six-speaker system",
      "Studio-quality microphones",
      "Thunderbolt connectivity",
    ],
    specifications: {
      Display: "27-inch 5K Retina display",
      Resolution: "5120 x 2880",
      Camera: "12MP Center Stage",
      Audio: "Six-speaker system",
      Microphones: "Three-mic array",
      Connectivity: "Thunderbolt and USB-C",
    },
    features: [
      "Center Stage",
      "Spatial Audio",
      "Desk View",
      "Reference modes",
    ],
    gallery: [
      "/Images/Studio-Display.png",
    ],
    availability: "In Stock",
    rating: 4.8,
    reviews_count: 0,
  },
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
    [],
  );

  const filtered = useMemo(() => {
    let result = dummyProducts.slice();

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q),
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
            animate={{
              x: [0, 40, 0],
              y: [0, -30, 0],
              opacity: [0.15, 0.3, 0.15],
            }}
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
                Get instant credit for your iPhone, iPad, MacBook or Watch and
                upgrade today.
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
