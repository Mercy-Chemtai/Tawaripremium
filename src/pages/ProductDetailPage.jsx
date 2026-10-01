"use client";
import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ShoppingCart,
  Heart,
  Share2,
  Check,
  Truck,
  Shield,
  RefreshCw,
  Star,
  Package,
} from "lucide-react";
import { useCart } from "../components/cart/CartContext";

export const dummyProducts = [
  {
    id: 17,
    name: "iPhone 17e",
    slug: "iphone-17e",
    category_name: "iPhone",
    price: 0,
    sale_price: 0,
    primary_image: { image: "/Images/iPhone-17e.png" },

    colors: [
      {
        name: "Black",
        hex: "#1A1A1A",
        images: ["/Images/iPhone-17e-Black.png"],
      },
      {
        name: "White",
        hex: "#F5F5F5",
        images: ["/Images/iPhone-17e-White.png"],
      },
      {
        name: "Soft Pink",
        hex: "#F2C6CC",
        images: ["/Images/iPhone-17e-Soft-Pink.png"],
      },
    ],

    description:
      "The iPhone 17e delivers powerful everyday performance with Apple's A19 chip, a 48MP Fusion camera, a 6.1-inch Super Retina XDR display, Ceramic Shield 2 and MagSafe charging.",

    highlights: [
      "A19 chip",
      "48MP Fusion camera",
      "6.1-inch Super Retina XDR",
      "Ceramic Shield 2",
      "MagSafe charging",
      "Apple Intelligence",
    ],

    specs: {
      Display: "6.1-inch Super Retina XDR display",
      Chip: "A19 chip with 6-core CPU",
      Camera: "48MP Fusion camera with 2-in-1 camera system",
      "Front Camera": "12MP TrueDepth camera",
      Battery: "All-day battery life",
      Storage: "256GB, 512GB",
      Material: "Aluminum design with Ceramic Shield 2 front",
      Connectivity: "5G, Wi-Fi, Bluetooth",
      Charging: "USB-C and MagSafe wireless charging",
      "Water Resistance": "IP68",
      "Operating System": "iOS 27",
    },

    features: [
      "Face ID",
      "Dynamic Island",
      "Apple Intelligence",
      "MagSafe",
      "Emergency SOS via satellite",
      "Crash Detection",
    ],

    gallery: [
      "/Images/iPhone-17e.png",
      "/Images/iPhone-17e-Black.png",
      "/Images/iPhone-17e-White.png",
      "/Images/iPhone-17e-Soft-Pink.png",
    ],

    availability: "In Stock",
    rating: 4.8,
    reviews_count: 0,
    storage_options: ["256GB", "512GB"],
  },

  {
    id: 18,
    name: "iPhone 18 Pro",
    slug: "iphone-18-pro",
    category_name: "iPhone",
    price: 0,
    sale_price: 0,
    primary_image: { image: "/Images/iPhone-18-Pro.png" },

    colors: [
      {
        name: "Black",
        hex: "#1A1A1A",
        images: ["/Images/iPhone-18-Pro-Black.png"],
      },
      {
        name: "Silver",
        hex: "#C7C7C7",
        images: ["/Images/iPhone-18-Pro-Silver.png"],
      },
      {
        name: "Glacier",
        hex: "#DDE7ED",
        images: ["/Images/iPhone-18-Pro-Glacier.png"],
      },
      {
        name: "Burgundy",
        hex: "#5A1F2B",
        images: ["/Images/iPhone-18-Pro-Burgundy.png"],
      },
    ],

    description:
      "The iPhone 18 Pro introduces Apple's next-generation A20 Pro chip, the most advanced iPhone camera system yet with a 48MP Fusion Main camera featuring variable aperture, improved battery life and next-generation Apple Intelligence.",

    highlights: [
      "A20 Pro chip",
      "48MP Fusion camera",
      "Variable aperture",
      "ProMotion display",
      "Next-generation Apple Intelligence",
      "Next-generation vapor chamber",
    ],

    specifications: {
      Display: "Super Retina XDR display with ProMotion",
      Chip: "A20 Pro chip",
      Camera: "48MP Fusion Main camera with variable aperture",
      "Camera System": "Advanced Pro camera system",
      "Pro Controls": "Customizable controls in the Camera app",
      Battery: "Major battery-life improvements",
      Storage: "256GB, 512GB, 1TB, 2TB",
      Material: "Pro-grade design",
      Connectivity: "5G, Wi-Fi, Bluetooth",
      Charging: "USB-C and MagSafe",
      "Water Resistance": "IP68",
      "Operating System": "iOS 27",
    },

    features: [
      "Dynamic Island",
      "Camera Control",
      "Face ID",
      "Apple Intelligence",
      "Siri AI",
      "Emergency SOS via satellite",
      "Crash Detection",
      "MagSafe",
    ],

    gallery: [
      "/Images/iPhone-18-Pro.png",
      "/Images/iPhone-18-Pro-Black.png",
      "/Images/iPhone-18-Pro-Silver.png",
      "/Images/iPhone-18-Pro-Glacier.png",
      "/Images/iPhone-18-Pro-Burgundy.png",
    ],

    availability: "In Stock",
    rating: 4.9,
    reviews_count: 0,
    storage_options: ["256GB", "512GB", "1TB", "2TB"],
  },

  {
    id: 19,
    name: "iPhone 18 Pro Max",
    slug: "iphone-18-pro-max",
    category_name: "iPhone",
    price: 0,
    sale_price: 0,
    primary_image: { image: "/Images/iPhone-18-Pro-Max.png" },

    colors: [
      {
        name: "Black",
        hex: "#1A1A1A",
        images: ["/Images/iPhone-18-Pro-Max-Black.png"],
      },
      {
        name: "Silver",
        hex: "#C7C7C7",
        images: ["/Images/iPhone-18-Pro-Max-Silver.png"],
      },
      {
        name: "Glacier",
        hex: "#DDE7ED",
        images: ["/Images/iPhone-18-Pro-Max-Glacier.png"],
      },
      {
        name: "Burgundy",
        hex: "#5A1F2B",
        images: ["/Images/iPhone-18-Pro-Max-Burgundy.png"],
      },
    ],

    description:
      "The iPhone 18 Pro Max is Apple's flagship Pro iPhone, featuring the A20 Pro chip, the most advanced iPhone camera system with variable aperture, major battery-life improvements and next-generation Apple Intelligence.",

    highlights: [
      "A20 Pro chip",
      "48MP Fusion camera",
      "Variable aperture",
      "ProMotion display",
      "Largest iPhone battery-life increase",
      "Next-generation Apple Intelligence",
    ],

    specifications: {
      Display: "Super Retina XDR display with ProMotion",
      Chip: "A20 Pro chip",
      Camera: "48MP Fusion Main camera with variable aperture",
      "Camera System": "Advanced Pro camera system",
      "Pro Controls": "Customizable controls in the Camera app",
      Battery: "Largest battery-life increase ever on iPhone",
      Storage: "256GB, 512GB, 1TB, 2TB",
      Material: "Pro-grade design",
      Connectivity: "5G, Wi-Fi, Bluetooth",
      Charging: "USB-C and MagSafe",
      "Water Resistance": "IP68",
      "Operating System": "iOS 27",
    },

    features: [
      "Dynamic Island",
      "Camera Control",
      "Face ID",
      "Apple Intelligence",
      "Siri AI",
      "Emergency SOS via satellite",
      "Crash Detection",
      "MagSafe",
    ],

    gallery: [
      "/Images/iPhone-18-Pro-Max.png",
      "/Images/iPhone-18-Pro-Max-Black.png",
      "/Images/iPhone-18-Pro-Max-Silver.png",
      "/Images/iPhone-18-Pro-Max-Glacier.png",
      "/Images/iPhone-18-Pro-Max-Burgundy.png",
    ],

    availability: "In Stock",
    rating: 4.9,
    reviews_count: 0,
    storage_options: ["256GB", "512GB", "1TB", "2TB"],
  },

  {
    id: 20,
    name: "MacBook Neo",
    slug: "macbook-neo",
    category_name: "MacBook",
    price: 0,
    sale_price: 0,
    primary_image: { image: "/Images/MacBook-Neo.png" },

    colors: [
      {
        name: "Blush",
        hex: "#E8B7B7",
        images: ["/Images/MacBook-Neo-Blush.png"],
      },
      {
        name: "Indigo",
        hex: "#394B78",
        images: ["/Images/MacBook-Neo-Indigo.png"],
      },
      {
        name: "Silver",
        hex: "#C7C7C7",
        images: ["/Images/MacBook-Neo-Silver.png"],
      },
      {
        name: "Citrus",
        hex: "#D7D96C",
        images: ["/Images/MacBook-Neo-Citrus.png"],
      },
    ],

    description:
      "MacBook Neo is Apple's affordable 13-inch MacBook, featuring Apple silicon performance, a fanless design, durable aluminum construction, a 1080p FaceTime HD camera and up to 16 hours of battery life.",

    highlights: [
      "13-inch Liquid Retina display",
      "Apple A18 Pro chip",
      "Fanless design",
      "Up to 16 hours battery life",
      "1080p FaceTime HD camera",
      "Durable aluminum enclosure",
    ],

    specifications: {
      Display: "13-inch Liquid Retina display",
      Chip: "Apple A18 Pro",
      CPU: "6-core CPU",
      GPU: "5-core GPU",
      Memory: "8GB unified memory",
      Storage: "256GB SSD",
      Camera: "1080p FaceTime HD camera",
      Microphones: "Dual microphones",
      Battery: "Up to 16 hours",
      Design: "Fanless aluminum enclosure",
      Connectivity: "Wi-Fi, Bluetooth",
      "Operating System": "macOS",
    },

    features: [
      "Apple Intelligence",
      "Fanless operation",
      "1080p FaceTime HD camera",
      "Touch ID",
      "Aluminum enclosure",
      "All-day battery life",
    ],

    gallery: [
      "/Images/MacBook-Neo.png",
      "/Images/MacBook-Neo-Blush.png",
      "/Images/MacBook-Neo-Indigo.png",
      "/Images/MacBook-Neo-Silver.png",
      "/Images/MacBook-Neo-Citrus.png",
    ],

    availability: "In Stock",
    rating: 4.8,
    reviews_count: 0,
    storage_options: ["256GB"],
  },

  {
    id: 21,
    name: "MacBook Air M5",
    slug: "macbook-air-m5",
    category_name: "MacBook",
    price: 0,
    sale_price: 0,
    primary_image: { image: "/Images/MacBook-Air-M5.png" },

    colors: [
      {
        name: "Sky Blue",
        hex: "#AFC9D9",
        images: ["/Images/MacBook-Air-M5-Sky-Blue.png"],
      },
      {
        name: "Midnight",
        hex: "#1D1D1F",
        images: ["/Images/MacBook-Air-M5-Midnight.png"],
      },
      {
        name: "Starlight",
        hex: "#E6DCCB",
        images: ["/Images/MacBook-Air-M5-Starlight.png"],
      },
      {
        name: "Silver",
        hex: "#C7C7C7",
        images: ["/Images/MacBook-Air-M5-Silver.png"],
      },
    ],

    description:
      "MacBook Air with M5 combines next-generation Apple silicon performance, powerful AI capabilities and an incredibly thin and lightweight design in 13-inch and 15-inch models.",

    highlights: [
      "M5 chip",
      "13-inch or 15-inch display",
      "Liquid Retina display",
      "512GB starting storage",
      "Wi-Fi 7",
      "Bluetooth 6",
    ],

    specifications: {
      Display: "Liquid Retina display",
      Sizes: "13-inch and 15-inch",
      Chip: "Apple M5",
      CPU: "Next-generation CPU",
      GPU: "Next-generation GPU",
      NeuralEngine: "16-core Neural Engine",
      Memory: "Unified memory",
      Storage: "512GB starting storage",
      Camera: "12MP Center Stage camera",
      Connectivity: "Wi-Fi 7, Bluetooth 6",
      Battery: "All-day battery life",
      "Operating System": "macOS",
    },

    features: [
      "Apple Intelligence",
      "Center Stage",
      "MagSafe charging",
      "Wi-Fi 7",
      "Bluetooth 6",
      "Liquid Retina display",
    ],

    gallery: [
      "/Images/MacBook-Air-M5.png",
      "/Images/MacBook-Air-M5-Sky-Blue.png",
      "/Images/MacBook-Air-M5-Midnight.png",
      "/Images/MacBook-Air-M5-Starlight.png",
      "/Images/MacBook-Air-M5-Silver.png",
    ],

    availability: "In Stock",
    rating: 4.9,
    reviews_count: 0,
    storage_options: ["512GB", "1TB", "2TB", "4TB"],
  },

  {
    id: 22,
    name: "MacBook Pro M5 Pro",
    slug: "macbook-pro-m5-pro",
    category_name: "MacBook",
    price: 0,
    sale_price: 0,
    primary_image: { image: "/Images/MacBook-Pro-M5-Pro.png" },

    colors: [
      {
        name: "Space Black",
        hex: "#1D1D1F",
        images: ["/Images/MacBook-Pro-M5-Pro-Space-Black.png"],
      },
      {
        name: "Silver",
        hex: "#D6D6D6",
        images: ["/Images/MacBook-Pro-M5-Pro-Silver.png"],
      },
    ],

    description:
      "MacBook Pro with M5 Pro delivers professional performance for software development, AI workloads, creative production, video editing and demanding professional applications.",

    highlights: [
      "M5 Pro chip",
      "14-inch or 16-inch display",
      "Liquid Retina XDR",
      "Neural Accelerator",
      "Wi-Fi 7",
      "Thunderbolt 5",
    ],

    specifications: {
      Display: "Liquid Retina XDR display with ProMotion",
      Sizes: "14-inch and 16-inch",
      Chip: "Apple M5 Pro",
      CPU: "Next-generation CPU",
      GPU: "Next-generation GPU with Neural Accelerators",
      Memory: "Unified memory",
      Storage: "1TB starting storage",
      Camera: "12MP Center Stage camera",
      Connectivity: "Wi-Fi 7, Bluetooth 6",
      Ports: "Thunderbolt 5",
      Battery: "All-day battery life",
      "Operating System": "macOS",
    },

    features: [
      "Apple Intelligence",
      "Center Stage",
      "Liquid Retina XDR",
      "ProMotion",
      "MagSafe charging",
      "Thunderbolt 5",
      "Wi-Fi 7",
    ],

    gallery: [
      "/Images/MacBook-Pro-M5-Pro.png",
      "/Images/MacBook-Pro-M5-Pro-Space-Black.png",
      "/Images/MacBook-Pro-M5-Pro-Silver.png",
    ],

    availability: "In Stock",
    rating: 4.9,
    reviews_count: 0,
    storage_options: ["1TB", "2TB", "4TB"],
  },

  {
    id: 23,
    name: "MacBook Pro M5 Max",
    slug: "macbook-pro-m5-max",
    category_name: "MacBook",
    price: 0,
    sale_price: 0,
    primary_image: { image: "/Images/MacBook-Pro-M5-Max.png" },

    colors: [
      {
        name: "Space Black",
        hex: "#1D1D1F",
        images: ["/Images/MacBook-Pro-M5-Max-Space-Black.png"],
      },
      {
        name: "Silver",
        hex: "#D6D6D6",
        images: ["/Images/MacBook-Pro-M5-Max-Silver.png"],
      },
    ],

    description:
      "MacBook Pro with M5 Max delivers extreme professional performance for AI development, 3D rendering, video production, software development and advanced creative workflows.",

    highlights: [
      "M5 Max chip",
      "14-inch or 16-inch display",
      "Liquid Retina XDR",
      "Advanced GPU",
      "Neural Accelerators",
      "2TB starting storage",
    ],

    specifications: {
      Display: "Liquid Retina XDR display with ProMotion",
      Sizes: "14-inch and 16-inch",
      Chip: "Apple M5 Max",
      CPU: "Next-generation CPU",
      GPU: "Next-generation GPU with Neural Accelerators",
      Memory: "High-capacity unified memory",
      Storage: "2TB starting storage",
      Camera: "12MP Center Stage camera",
      Connectivity: "Wi-Fi 7, Bluetooth 6",
      Ports: "Thunderbolt 5",
      Battery: "All-day battery life",
      "Operating System": "macOS",
    },

    features: [
      "Apple Intelligence",
      "Center Stage",
      "Liquid Retina XDR",
      "ProMotion",
      "MagSafe charging",
      "Thunderbolt 5",
      "Wi-Fi 7",
    ],

    gallery: [
      "/Images/MacBook-Pro-M5-Max.png",
      "/Images/MacBook-Pro-M5-Max-Space-Black.png",
      "/Images/MacBook-Pro-M5-Max-Silver.png",
    ],

    availability: "In Stock",
    rating: 4.9,
    reviews_count: 0,
    storage_options: ["2TB", "4TB", "8TB"],
  },

  {
    id: 24,
    name: "iPad Air M4",
    slug: "ipad-air-m4",
    category_name: "iPad",
    price: 0,
    sale_price: 0,
    primary_image: { image: "/Images/iPad-Air-M4.png" },

    colors: [
      {
        name: "Blue",
        hex: "#4A78A8",
        images: ["/Images/iPad-Air-M4-Blue.png"],
      },
      {
        name: "Purple",
        hex: "#A48BC2",
        images: ["/Images/iPad-Air-M4-Purple.png"],
      },
      {
        name: "Starlight",
        hex: "#E6DCCB",
        images: ["/Images/iPad-Air-M4-Starlight.png"],
      },
      {
        name: "Space Gray",
        hex: "#5A5A5A",
        images: ["/Images/iPad-Air-M4-Space-Gray.png"],
      },
    ],

    description:
      "iPad Air with M4 delivers powerful performance for productivity, creativity, gaming and AI, with support for Apple Pencil Pro and Magic Keyboard.",

    highlights: [
      "M4 chip",
      "11-inch or 13-inch display",
      "Liquid Retina display",
      "Apple Pencil Pro support",
      "Magic Keyboard support",
      "Apple Intelligence",
    ],

    specifications: {
      Display: "Liquid Retina display",
      Sizes: "11-inch and 13-inch",
      Chip: "Apple M4",
      CPU: "Multi-core CPU",
      GPU: "Advanced GPU",
      Storage: "Multiple storage configurations",
      Camera: "12MP Center Stage camera",
      Connectivity: "Wi-Fi and cellular options",
      ApplePencil: "Apple Pencil Pro support",
      Keyboard: "Magic Keyboard support",
      "Operating System": "iPadOS 26",
    },

    features: [
      "Apple Intelligence",
      "Apple Pencil Pro",
      "Magic Keyboard",
      "Center Stage",
      "USB-C",
      "iPadOS 26",
    ],

    gallery: [
      "/Images/iPad-Air-M4.png",
      "/Images/iPad-Air-M4-Blue.png",
      "/Images/iPad-Air-M4-Purple.png",
      "/Images/iPad-Air-M4-Starlight.png",
      "/Images/iPad-Air-M4-Space-Gray.png",
    ],

    availability: "In Stock",
    rating: 4.8,
    reviews_count: 0,
    storage_options: ["128GB", "256GB", "512GB", "1TB"],
  },

  {
    id: 25,
    name: "AirPods 5",
    slug: "airpods-5",
    category_name: "AirPods",
    price: 0,
    sale_price: 0,
    primary_image: { image: "/Images/AirPods-5.png" },

    colors: [
      {
        name: "White",
        hex: "#FFFFFF",
        images: ["/Images/AirPods-5.png"],
      },
    ],

    description:
      "AirPods 5 deliver an open-ear listening experience with Active Noise Cancellation, an all-new multiport acoustic architecture, next-generation Adaptive EQ and an improved Transparency mode.",

    highlights: [
      "Active Noise Cancellation",
      "Open-ear design",
      "Multiport acoustic architecture",
      "Adaptive EQ",
      "Transparency mode",
      "Wireless Charging Case",
    ],

    specifications: {
      Design: "Open-ear design",
      Audio: "All-new multiport acoustic architecture",
      ANC: "Active Noise Cancellation",
      AdaptiveEQ: "Next-generation Adaptive EQ",
      Transparency: "Natural Transparency mode",
      ChargingCase: "Wireless Charging Case",
      Controls: "Force sensor with volume swipe",
      Connectivity: "Bluetooth",
      Compatibility: "iPhone, iPad, Mac and Apple Watch",
      Audio: "Spatial Audio",
    },

    features: [
      "Active Noise Cancellation",
      "Transparency mode",
      "Spatial Audio",
      "Adaptive EQ",
      "Siri AI",
      "Head gesture controls",
      "Live Translation",
    ],

    gallery: ["/Images/AirPods-5.png"],

    availability: "In Stock",
    rating: 4.8,
    reviews_count: 0,
    storage_options: [],
  },

  {
    id: 26,
    name: "Apple Watch Series 12",
    slug: "apple-watch-series-12",
    category_name: "Apple Watch",
    price: 0,
    sale_price: 0,
    primary_image: { image: "/Images/Apple-Watch-Series-12.png" },

    colors: [
      {
        name: "Dark Bronze",
        hex: "#5A4637",
        images: ["/Images/Apple-Watch-Series-12-Dark-Bronze.png"],
      },
      {
        name: "Black",
        hex: "#1A1A1A",
        images: ["/Images/Apple-Watch-Series-12-Black.png"],
      },
      {
        name: "Light Gold",
        hex: "#D8C49A",
        images: ["/Images/Apple-Watch-Series-12-Light-Gold.png"],
      },
      {
        name: "Space Gray",
        hex: "#5A5A5A",
        images: ["/Images/Apple-Watch-Series-12-Space-Gray.png"],
      },
    ],

    description:
      "Apple Watch Series 12 introduces Apple's new Health Sensing System, S11 chip, advanced heart-rate sensing, higher-frequency HRV measurements and new readiness insights.",

    highlights: [
      "S11 chip",
      "New Health Sensing System",
      "Advanced heart-rate sensing",
      "Readiness insights",
      "Advanced fitness tracking",
      "watchOS 27",
    ],

    specifications: {
      Sizes: "42mm and 46mm",
      Chip: "Apple S11",
      Sensors: "New Health Sensing System",
      HeartRate: "Advanced heart-rate sensing",
      HRV: "Higher-frequency heart-rate variability measurements",
      Health: "Advanced health and fitness features",
      Battery: "Up to 24 hours",
      Charging: "Fast charging",
      WaterResistance: "Water-resistant design",
      Connectivity: "GPS and cellular options",
      "Operating System": "watchOS 27",
    },

    features: [
      "ECG",
      "Sleep tracking",
      "Sleep apnea notifications",
      "Fall Detection",
      "Emergency SOS",
      "Readiness insights",
      "Workout tracking",
      "Siri AI",
    ],

    gallery: [
      "/Images/Apple-Watch-Series-12.png",
      "/Images/Apple-Watch-Series-12-Dark-Bronze.png",
      "/Images/Apple-Watch-Series-12-Black.png",
      "/Images/Apple-Watch-Series-12-Light-Gold.png",
    ],

    availability: "In Stock",
    rating: 4.8,
    reviews_count: 0,
    storage_options: [],
  },

  {
    id: 27,
    name: "Apple Watch Ultra 4",
    slug: "apple-watch-ultra-4",
    category_name: "Apple Watch",
    price: 0,
    sale_price: 0,
    primary_image: { image: "/Images/Apple-Watch-Ultra-4.png" },

    colors: [
      {
        name: "Natural Titanium",
        hex: "#AAA9A3",
        images: ["/Images/Apple-Watch-Ultra-4-Natural-Titanium.png"],
      },
      {
        name: "Black Titanium",
        hex: "#252525",
        images: ["/Images/Apple-Watch-Ultra-4-Black.png"],
      },
    ],

    description:
      "Apple Watch Ultra 4 is Apple's rugged smartwatch for demanding sports and outdoor activities, featuring the S11 chip, advanced health sensing, extended battery life and a titanium design.",

    highlights: [
      "S11 chip",
      "Titanium design",
      "Advanced Health Sensing System",
      "Up to 50 hours battery life",
      "Advanced workout tracking",
      "GPS and cellular",
    ],

    specifications: {
      Case: "Titanium",
      Chip: "Apple S11",
      Sensors: "New Health Sensing System",
      HeartRate: "Advanced heart-rate sensing",
      Battery: "Up to 50 hours",
      OutdoorWorkout: "Up to 45 hours outdoor workout tracking",
      Charging: "Fast charging",
      Fitness: "Advanced workout tracking",
      Sleep: "Advanced sleep tracking",
      Connectivity: "GPS and cellular",
      "Operating System": "watchOS 27",
    },

    features: [
      "Readiness insights",
      "Emergency SOS",
      "Fall Detection",
      "Advanced workout tracking",
      "Sleep tracking",
      "Heart health notifications",
      "Siri AI",
      "Rugged titanium design",
    ],

    gallery: [
      "/Images/Apple-Watch-Ultra-4.png",
      "/Images/Apple-Watch-Ultra-4-Natural-Titanium.png",
      "/Images/Apple-Watch-Ultra-4-Black.png",
    ],

    availability: "In Stock",
    rating: 4.9,
    reviews_count: 0,
    storage_options: [],
  },

  {
    id: 28,
    name: "Mac mini M6",
    slug: "mac-mini-m6",
    category_name: "Mac",
    price: 0,
    sale_price: 0,
    primary_image: { image: "/Images/Mac-mini-M6.png" },

    colors: [
      {
        name: "Silver",
        hex: "#C7C7C7",
        images: ["/Images/Mac-mini-M6.png"],
      },
    ],

    description:
      "Mac mini with the all-new M6 delivers a major performance boost in a compact desktop design, with faster AI, graphics, storage and CPU performance.",

    highlights: [
      "M6 chip",
      "Up to 4x faster AI performance",
      "Up to 40% faster CPU performance",
      "Up to 2x faster graphics",
      "Wi-Fi 7",
      "Bluetooth 6",
    ],

    specifications: {
      Chip: "Apple M6",
      CPU: "12-core CPU",
      GPU: "12-core GPU",
      Memory: "Up to 32GB unified memory",
      MemoryBandwidth: "Up to 170GB/s",
      Storage: "Multiple SSD configurations",
      AI: "Up to 4x faster AI performance",
      Graphics: "Hardware-accelerated graphics",
      Connectivity: "Wi-Fi 7, Bluetooth 6",
      Ports: "Thunderbolt 5",
      "Operating System": "macOS 27",
    },

    features: [
      "Apple Intelligence",
      "On-device AI",
      "Thunderbolt 5",
      "Wi-Fi 7",
      "Bluetooth 6",
      "Compact desktop design",
    ],

    gallery: ["/Images/Mac-mini-M6.png"],

    availability: "Coming Soon",
    rating: 4.9,
    reviews_count: 0,
    storage_options: ["512GB", "1TB", "2TB", "4TB"],
  },

  {
    id: 29,
    name: "Mac Studio M5 Ultra",
    slug: "mac-studio-m5-ultra",
    category_name: "Mac",
    price: 0,
    sale_price: 0,
    primary_image: { image: "/Images/Mac-Studio-M5-Ultra.png" },

    colors: [
      {
        name: "Silver",
        hex: "#C7C7C7",
        images: ["/Images/Mac-Studio-M5-Ultra.png"],
      },
    ],

    description:
      "Mac Studio with M5 Ultra delivers exceptional professional performance for AI development, data science, video production, 3D rendering and demanding creative workflows.",

    highlights: [
      "M5 Ultra chip",
      "Up to 36-core CPU",
      "Up to 80-core GPU",
      "Up to 512GB unified memory",
      "Up to 1.2TB/s memory bandwidth",
      "Thunderbolt 5",
    ],

    specifications: {
      Chip: "Apple M5 Ultra",
      CPU: "Up to 36-core CPU",
      GPU: "Up to 80-core GPU",
      NeuralEngine: "32-core Neural Engine",
      Memory: "Up to 512GB unified memory",
      MemoryBandwidth: "Up to 1.2TB/s",
      Storage: "Multiple SSD configurations",
      AI: "Up to 4.3x faster AI performance",
      Graphics: "Advanced GPU with hardware-accelerated ray tracing",
      Connectivity: "Wi-Fi 7, Bluetooth 6",
      Ports: "Thunderbolt 5",
      "Operating System": "macOS 27",
    },

    features: [
      "Apple Intelligence",
      "On-device AI",
      "Hardware-accelerated ray tracing",
      "Thunderbolt 5",
      "Wi-Fi 7",
      "Bluetooth 6",
    ],

    gallery: ["/Images/Mac-Studio-M5-Ultra.png"],

    availability: "Coming Soon",
    rating: 4.9,
    reviews_count: 0,
    storage_options: ["1TB", "2TB", "4TB", "8TB"],
  },

  {
    id: 30,
    name: "Studio Display",
    slug: "studio-display",
    category_name: "Display",
    price: 0,
    sale_price: 0,
    primary_image: { image: "/Images/Studio-Display.png" },

    colors: [
      {
        name: "Silver",
        hex: "#C7C7C7",
        images: ["/Images/Studio-Display.png"],
      },
    ],

    description:
      "Apple Studio Display combines excellent visual quality with a 12MP Center Stage camera, Desk View, studio-quality microphones, a six-speaker sound system and Thunderbolt 5 connectivity.",

    highlights: [
      "12MP Center Stage camera",
      "Desk View",
      "Studio-quality microphones",
      "Six-speaker sound system",
      "Spatial Audio",
      "Thunderbolt 5",
    ],

    specifications: {
      Display: "High-resolution Retina display",
      Camera: "12MP Center Stage camera",
      CameraFeature: "Desk View",
      Microphones: "Studio-quality three-microphone array",
      Speakers: "Six-speaker sound system",
      Audio: "Spatial Audio",
      Connectivity: "Thunderbolt 5",
      Compatibility: "Mac",
    },

    features: [
      "Center Stage",
      "Desk View",
      "Spatial Audio",
      "Studio-quality microphones",
      "Six-speaker sound system",
      "Thunderbolt 5",
    ],

    gallery: ["/Images/Studio-Display.png"],

    availability: "In Stock",
    rating: 4.8,
    reviews_count: 0,
    storage_options: [],
  },

  {
    id: 31,
    name: "Studio Display XDR",
    slug: "studio-display-xdr",
    category_name: "Display",
    price: 0,
    sale_price: 0,
    primary_image: { image: "/Images/Studio-Display-XDR.png" },

    colors: [
      {
        name: "Silver",
        hex: "#C7C7C7",
        images: ["/Images/Studio-Display-XDR.png"],
      },
    ],

    description:
      "Studio Display XDR is Apple's professional 27-inch 5K Retina XDR display featuring mini-LED backlighting, 2000 nits peak HDR brightness, a 120Hz refresh rate and expanded professional color support.",

    highlights: [
      "27-inch 5K Retina XDR",
      "Mini-LED backlight",
      "2000 nits peak HDR",
      "120Hz refresh rate",
      "P3 wide color",
      "Adobe RGB",
    ],

    specifications: {
      Display: "27-inch 5K Retina XDR display",
      Resolution: "5K",
      Backlight: "Mini-LED",
      Brightness: "Up to 2000 nits peak HDR brightness",
      RefreshRate: "120Hz",
      Color: "P3 wide color gamut",
      ProfessionalColor: "Adobe RGB",
      Camera: "12MP Center Stage camera",
      CameraFeature: "Desk View",
      Microphones: "Studio-quality three-microphone array",
      Speakers: "Six-speaker sound system",
      Audio: "Spatial Audio",
      Connectivity: "Thunderbolt 5",
    },

    features: [
      "Retina XDR",
      "Mini-LED backlighting",
      "120Hz refresh rate",
      "Center Stage",
      "Desk View",
      "Spatial Audio",
      "Thunderbolt 5",
    ],

    gallery: ["/Images/Studio-Display-XDR.png"],

    availability: "In Stock",
    rating: 4.9,
    reviews_count: 0,
    storage_options: [],
  },
  {
    id: 9,
    name: "iPhone 17 Pro Max",
    slug: "iphone-17-pro-max",
    category_name: "iPhone",
    price: 250000,
    sale_price: 248000,
    primary_image: { image: "/Images/iPhone-17-Pro-Max.png" },
    colors: [
      {
        name: "Orange Titanium",
        hex: "#8B7355",
        images: ["/Images/iPhone-17-Pro-Max.png"],
      },
      {
        name: "Black",
        hex: "#1a1a1a",
        images: ["/Images/iPhone-17-Pro-Max-Titanium.png"],
      },
      {
        name: "White",
        hex: "#f5f5f5",
        images: ["/Images/iPhone-17-Pro-Max-White.png"],
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
      "https://www.novelty.co.ke/wp-content/uploads/2025/09/iPhone-17-Pro-2.jpg",
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
    primary_image: { image: "/Images/iPhone-16-Pro-Max.png" },
    colors: [
      {
        name: "Natural Titanium",
        hex: "#8B7355",
        images: ["/Images/iPhone-16-Pro-Max.png"],
      },
      {
        name: "Blue Titanium",
        hex: "#4A5A6A",
        images: ["/Images/iPhone-16-Pro-Max-Blue.png"],
      },
      {
        name: "Black Titanium",
        hex: "#2C2C2C",
        images: ["/Images/iPhone-16-Pro-Max-Black.png"],
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
    name: "MacBook Air M3 (2024)",
    slug: "macbook-air-m3-2024",
    category_name: "MacBook",
    price: 199999,
    sale_price: 189999,
    primary_image: { image: "/Images/MacBook-Air-M3.png" },
    colors: [
      {
        name: "Midnight",
        hex: "#191E29",
        images: ["/Images/MacBook-Air-M3.png"],
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
      "https://www.phoneplacekenya.com/wp-content/uploads/2024/04/13-inch-MacBook-Air-M3.webp",
    ],
    availability: "In Stock",
    rating: 4.8,
    reviews_count: 191,
    storage_options: ["256GB", "512GB", "1TB", "2TB"],
  },

  {
    id: 3,
    name: "iPad Pro M4 (2024)",
    slug: "ipad-pro-m4",
    category_name: "iPad",
    price: 159999,
    sale_price: 149999,
    primary_image: { image: "/Images/iPad-Pro-M4.png" },
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
    price: 119999,
    sale_price: 114999,
    primary_image: { image: "/Images/Apple-Watch-Ultra-2.png" },
    description: "Engineered for endurance athletes and adventurers.",
    specifications: {
      Display: "49mm Always-On Retina, 3000 nits",
      Processor: "S9 SiP",
      Battery: "36 hours typical, 72 hours Low Power",
      OS: "watchOS 11",
      Sensors: "HR, ECG, SpO2, depth",
    },
    features: ["Action Button", "Dual-frequency GPS", "Dive-ready"],
    availability: "In Stock",
    rating: 4.9,
    reviews_count: 411,
  },

  {
    id: 5,
    name: "AirPods Pro (2nd Gen)",
    slug: "airpods-pro-2",
    category_name: "AirPods",
    price: 39999,
    sale_price: 37999,
    primary_image: { image: "/Images/AirPods-Pro-2.png" },
    description: "AirPods Pro (2nd Gen) with Adaptive Audio and ANC.",
    specifications: {
      Chip: "Apple H2",
      Battery: "Up to 30 hours with MagSafe case",
      Connectivity: "Bluetooth 5.3",
    },
    features: ["Active Noise Cancellation", "Adaptive Transparency"],
    primary_image: { image: "/Images/AirPods-Pro-2.png" },
    availability: "In Stock",
    rating: 4.8,
    reviews_count: 540,
  },

  {
    id: 6,
    name: "Apple Pencil (2nd Gen)",
    slug: "apple-pencil-2",
    category_name: "Accessories",
    price: 19999,
    sale_price: 17999,
    primary_image: { image: "/Images/Apple-Pencil-2.png" },
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
    primary_image: { image: "/Images/MagSafe-Charger.png" },
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
    id: 9,
    name: "iPhone 15 Silicone Case with MagSafe",
    slug: "iphone-15-case",
    category_name: "Accessories",
    price: 7999,
    sale_price: 6999,
    primary_image: { image: "/Images/iPhone-15-Silicone-Case.png" },
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
    name: "iPhone 15 Silicone Case with MagSafe",
    slug: "iphone-15-case",
    category_name: "Accessories",
    price: 7999,
    sale_price: 6999,
    primary_image: { image: "/Images/iPhone-15-128GB.png" },
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
    id: 11,
    name: "iPhone 15 128GB",
    slug: "iphone-15-128gb",
    category_name: "Smartphones",
    price: 75000,
    sale_price: 75000,
    primary_image: { image: "/Images/iPhone-15-128GB.png" },
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
    category_name: "Smartphones",
    price: 58000,
    sale_price: 58000,
    primary_image: { image: "/Images/iPhone-14-128GB.png" },
    description:
      "iPhone 14 with powerful performance and advanced safety features.",
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
];

export default function ProductDetail() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const productFromState = location.state?.product;
  const productFromList = dummyProducts.find((p) => p.slug === slug);
  const product =
    productFromState && productFromState.slug === slug
      ? productFromState
      : productFromList;

  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || null,
  );
  const [selectedStorage, setSelectedStorage] = useState(
    product?.storage_options?.[0] || null,
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-black text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor?.name, selectedStorage);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const BUSINESS_NUMBER = "254712007722";
  const waMessage = encodeURIComponent(
    `Hello, I would like to order:
Product: ${product.name}
${selectedColor ? `Color: ${selectedColor.name}` : ""}
${selectedStorage ? `Storage: ${selectedStorage}` : ""}
Quantity: ${quantity}
Price: KSh ${product.sale_price || product.price}`,
  );
  const waLink = `https://wa.me/${BUSINESS_NUMBER}?text=${waMessage}`;

  const discount = product.sale_price
    ? Math.round(((product.price - product.sale_price) / product.price) * 100)
    : 0;
  const currentImage =
    selectedColor?.images?.[currentImageIndex] ||
    product.primary_image?.image ||
    product.gallery?.[0] ||
    "";

  // Helper to render spec values (primitives, arrays, nested objects)
  const renderSpecValue = (val) => {
    if (val === null || val === undefined)
      return <span className="text-gray-500">—</span>;
    if (Array.isArray(val)) {
      return (
        <div className="flex flex-col items-end text-right">
          {val.map((item, i) => (
            <span key={i} className="text-gray-900 text-sm">
              {typeof item === "object" ? JSON.stringify(item) : item}
            </span>
          ))}
        </div>
      );
    }
    if (typeof val === "object") {
      return (
        <div className="flex flex-col items-end text-right">
          {Object.entries(val).map(([k, v]) => (
            <div key={k} className="text-sm">
              <span className="text-gray-600 mr-1">{k}:</span>
              <span className="text-gray-900">
                {Array.isArray(v) ? v.join(", ") : String(v)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return <span className="text-gray-900 text-sm">{String(val)}</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Added to Cart Notification */}
      {addedToCart && (
        <div className="fixed top-24 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          ✓ Added to cart successfully!
        </div>
      )}

      {/* Navigation */}
      <div className="bg-white border-b sticky top-24 z-40 shadow-sm backdrop-blur-lg bg-opacity-90">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Shop</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div
              className="relative bg-white rounded-2xl shadow-xl overflow-hidden aspect-square group"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              {discount > 0 && (
                <div className="absolute top-6 left-6 z-10 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  Save {discount}%
                </div>
              )}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="absolute top-6 right-6 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:scale-110 transition-all duration-300"
              >
                <Heart
                  className={`w-6 h-6 transition-all ${
                    isLiked
                      ? "fill-red-500 text-red-500 scale-110"
                      : "text-gray-600"
                  }`}
                />
              </button>
              <img
                src={currentImage}
                alt={product.name}
                className={`w-full h-full object-contain p-12 transition-all duration-700 ${
                  isZoomed ? "scale-150" : "scale-100"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>

            {/* Thumbnail Gallery */}
            {selectedColor?.images && selectedColor.images.length > 1 && (
              <div className="flex gap-3">
                {selectedColor.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-1 bg-white rounded-xl overflow-hidden border-2 transition-all duration-300 hover:shadow-lg ${
                      currentImageIndex === idx
                        ? "border-black shadow-lg scale-105"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-24 object-contain p-3"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-semibold shadow-lg">
                  {product.category_name}
                </span>
                {product.availability && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    <Package className="w-3 h-3" />
                    {product.availability}
                  </span>
                )}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold">
                    {product.rating}
                  </span>
                  <span className="text-gray-500">
                    ({product.reviews_count} reviews)
                  </span>
                </div>
              )}

              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Highlights */}
            {product.highlights && product.highlights.length > 0 && (
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-5 border border-blue-100">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-600" />
                  Key Highlights
                </h3>
                <ul className="space-y-2">
                  {product.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pricing */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl p-6 text-white shadow-2xl">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-5xl font-bold">
                  KSh {(product.sale_price || product.price)?.toLocaleString()}
                </span>
                {product.sale_price && product.price !== product.sale_price && (
                  <span className="text-2xl text-gray-400 line-through">
                    KSh {product.price?.toLocaleString()}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-300">
                You can Trade in • We deliver across Kenya
              </p>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
                  Color:{" "}
                  <span className="text-gray-600 font-normal normal-case">
                    {selectedColor?.name}
                  </span>
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => {
                        setSelectedColor(color);
                        setCurrentImageIndex(0);
                      }}
                      className="relative group"
                    >
                      <div
                        className={`w-14 h-14 rounded-full border-3 transition-all duration-300 ${
                          selectedColor?.name === color.name
                            ? "border-black shadow-2xl scale-110 ring-4 ring-black/10"
                            : "border-gray-300 hover:border-gray-500 hover:scale-105"
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                      {selectedColor?.name === color.name && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Check
                            className="w-7 h-7 text-white drop-shadow-2xl"
                            strokeWidth={3}
                          />
                        </div>
                      )}
                      <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                        {color.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Storage Options */}
            {product.storage_options &&
              product.storage_options.length > 0 &&
              product.storage_options[0] !== "—" && (
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                    Storage:{" "}
                    <span className="text-gray-600 font-normal normal-case">
                      {selectedStorage}
                    </span>
                  </h3>
                  <div className="flex gap-3 flex-wrap">
                    {product.storage_options.map((storage, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedStorage(storage)}
                        className={`px-6 py-3 border-2 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5 ${
                          selectedStorage === storage
                            ? "border-black bg-black text-white"
                            : "border-gray-300 hover:border-black"
                        }`}
                      >
                        {storage}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-xl border-2 border-gray-300 hover:border-black transition-all font-bold text-xl hover:shadow-lg"
                >
                  −
                </button>
                <span className="text-2xl font-bold w-16 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-xl border-2 border-gray-300 hover:border-black transition-all font-bold text-xl hover:shadow-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-black to-gray-900 hover:from-gray-900 hover:to-black text-white font-bold py-5 rounded-xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                <ShoppingCart className="w-6 h-6" />
                {addedToCart ? "Added to Cart ✓" : "Add to Cart"}
              </button>

              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-5 rounded-xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                Buy on WhatsApp
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t-2 border-gray-200">
              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl w-14 h-14 flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Truck className="w-7 h-7 text-white" />
                </div>
                <p className="text-xs font-bold text-gray-900">We Deliver</p>
                <p className="text-xs text-gray-500">Nationwide</p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl w-14 h-14 flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <p className="text-xs font-bold text-gray-900">
                  1 Year Warranty
                </p>
                <p className="text-xs text-gray-500">Full coverage</p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl w-14 h-14 flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <RefreshCw className="w-7 h-7 text-white" />
                </div>
                <p className="text-xs font-bold text-gray-900">Easy Returns</p>
                <p className="text-xs text-gray-500">30 days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        <div className="mt-16 bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Technical Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {Object.entries(product.specifications || {}).map(
              ([key, value]) => (
                <div
                  key={key}
                  className="border-b border-gray-200 pb-5 hover:border-gray-400 transition-colors"
                >
                  <dt className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">
                    {key}
                  </dt>
                  <dd className="text-base text-gray-900 font-medium">
                    {renderSpecValue(value)}
                  </dd>
                </div>
              ),
            )}
            {(!product.specifications ||
              Object.keys(product.specifications).length === 0) && (
              <div className="text-sm text-gray-500 col-span-full">
                No specifications available for this product.
              </div>
            )}
          </div>
        </div>

        {/* Key Features */}
        {product.features && product.features.length > 0 && (
          <div className="mt-12 bg-gradient-to-br from-white via-white to-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-200">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              What Makes It Special
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {product.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 bg-white/80 backdrop-blur-sm p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 rounded-xl p-2 mt-0.5 shadow-lg flex-shrink-0">
                    <Check className="w-5 h-5 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-gray-700 font-medium leading-relaxed">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery */}
        {product.gallery && product.gallery.length > 1 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6">Product Gallery</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {product.gallery.map((img, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow aspect-square"
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
