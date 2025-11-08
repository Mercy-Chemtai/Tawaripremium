"use client";
import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ShoppingCart, Heart, Share2, Check, Truck, Shield, RefreshCw, Star, Package } from "lucide-react";
import { useCart } from "../components/cart/CartContext";

export const dummyProducts = [
  {
    id: 9,
    name: "iPhone 17 Pro Max",
    slug: "iphone-17-pro-max",
    category_name: "iPhone",
    price: 250000,
    sale_price: 248000,
    primary_image: { image: "https://www.novelty.co.ke/wp-content/uploads/2025/09/iPhone-17-Pro-2.jpg" },
    colors: [
      { name: "Natural Titanium", hex: "#8B7355", images: ["https://www.novelty.co.ke/wp-content/uploads/2025/09/iPhone-17-Pro-2.jpg"] },
      { name: "Black", hex: "#1a1a1a", images: ["https://www.novelty.co.ke/wp-content/uploads/2025/09/iPhone-17-Pro-2.jpg"] },
      { name: "White", hex: "#f5f5f5", images: ["https://www.novelty.co.ke/wp-content/uploads/2025/09/iPhone-17-Pro-2.jpg"] }
    ],
    description: "The iPhone 17 Pro Max — powerful A-series chip, pro camera system and a stunning display.",
    highlights: ["ProMotion 120Hz", "Always-On", "A19 Pro performance"],
    specifications: {
      Display: "6.9-inch Super Retina XDR display with ProMotion",
      Chip: "A19 Pro chip with 6-core CPU",
      Camera: "48MP Main | 48MP Ultra Wide | 12MP Telephoto (5x optical zoom)",
      Battery: "Up to 29 hours video playback",
      Storage: "256GB, 512GB, 1TB",
      Material: "Titanium design with Ceramic Shield front",
      Connectivity: "5G, Wi-Fi 7, Bluetooth 5.3",
      "Water Resistance": "IP68 (max 6m up to 30 minutes)"
    },
    features: ["Action button", "Dynamic Island", "Always-On display", "Face ID", "Emergency SOS via satellite", "Crash Detection"],
    gallery: ["https://www.novelty.co.ke/wp-content/uploads/2025/09/iPhone-17-Pro-2.jpg"],
    availability: "In Stock",
    rating: 4.9,
    reviews_count: 120,
    storage_options: ["256GB", "512GB", "1TB"]
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
    colors: [
      { name: "Natural Titanium", hex: "#8B7355", images: ["https://alephksa.com/cdn/...jpg"] },
      { name: "Blue Titanium", hex: "#4A5A6A", images: ["https://alephksa.com/cdn/...jpg"] },
      { name: "White Titanium", hex: "#E5E5E5", images: ["https://alephksa.com/cdn/...jpg"] },
      { name: "Black Titanium", hex: "#2C2C2C", images: ["https://alephksa.com/cdn/...jpg"] }
    ],
    description: "The iPhone 16 Pro Max combines cutting-edge performance, a new titanium build, and Apple's most advanced camera system.",
    highlights: [
      "6.9-inch Super Retina XDR display with ProMotion",
      "A18 Pro chip (3-nm)",
      "48MP Pro camera system",
      "All-day battery life",
      "iOS 18"
    ],
    specifications: {
      Display: "6.9-inch Super Retina XDR OLED, 120Hz ProMotion",
      Processor: "Apple A18 Pro chip",
      Camera: "48MP Main + 12MP Ultra-Wide + 12MP Telephoto",
      "Front Camera": "12MP TrueDepth",
      Battery: "Up to 29 hours video playback",
      OS: "iOS 18",
      Connectivity: "5G, Wi-Fi 7, Bluetooth 5.3, USB-C",
      Materials: "Titanium frame, Ceramic Shield front"
    },
    features: ["Always-On Display", "Dynamic Island", "ProRAW & ProRes", "Crash Detection", "Face ID"],
    gallery: [
      "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-16-pro-max-titanium-1",
      "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-16-pro-max-titanium-2"
    ],
    availability: "In Stock",
    rating: 4.9,
    reviews_count: 327,
    storage_options: ["256GB", "512GB", "1TB"]
  },

  {
    id: 2,
    name: "MacBook Air M3 (2024)",
    slug: "macbook-air-m3-2024",
    category_name: "MacBook",
    price: 199999,
    sale_price: 189999,
    primary_image: { image: "https://www.phoneplacekenya.com/wp-content/uploads/2024/04/13-inch-MacBook-Air-M3.webp" },
    colors: [
      { name: "Midnight", hex: "#191E29", images: ["https://www.phoneplacekenya.com/wp-content/uploads/2024/04/13-inch-MacBook-Air-M3.webp"] },
      { name: "Starlight", hex: "#F2E9DC", images: ["https://www.phoneplacekenya.com/...webp"] }
    ],
    description: "The MacBook Air M3 redefines lightweight performance with the M3 chip.",
    specifications: {
      Display: "13.6-inch Liquid Retina (2560×1664)",
      Processor: "Apple M3",
      Memory: "8GB unified (configurable)",
      Storage: "256GB (configurable up to 2TB)",
      Battery: "Up to 18 hours",
      OS: "macOS Sonoma"
    },
    features: ["Touch ID", "1080p FaceTime HD", "MagSafe 3", "Wi-Fi 6E"],
    gallery: ["https://www.phoneplacekenya.com/wp-content/uploads/2024/04/13-inch-MacBook-Air-M3.webp"],
    availability: "In Stock",
    rating: 4.8,
    reviews_count: 191,
    storage_options: ["256GB", "512GB", "1TB", "2TB"]
  },

  {
    id: 3,
    name: "iPad Pro M4 (2024)",
    slug: "ipad-pro-m4",
    category_name: "iPad",
    price: 159999,
    sale_price: 149999,
    primary_image: { image: "https://noypigeeks.gumlet.io/wp-content/uploads/2024/05/iPad-Pro-M4.jpg" },
    description: "iPad Pro M4 — power and portability with the M4 chip.",
    specifications: {
      Display: "13-inch Ultra Retina XDR OLED 120Hz",
      Processor: "Apple M4",
      Camera: "12MP Wide, LiDAR",
      OS: "iPadOS 18",
      Connectivity: "Wi-Fi 6E, 5G, Thunderbolt USB-C",
      Battery: "Up to 10 hours"
    },
    features: ["Apple Pencil Pro support", "ProMotion 120Hz"],
    gallery: ["https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-pro-m4-1"],
    availability: "In Stock",
    rating: 4.9,
    reviews_count: 245,
    storage_options: ["256GB", "512GB", "1TB", "2TB"]
  },

  {
    id: 4,
    name: "Apple Watch Ultra 2",
    slug: "apple-watch-ultra-2",
    category_name: "Apple Watch",
    price: 119999,
    sale_price: 114999,
    primary_image: { image: "https://www.androidauthority.com/wp-content/uploads/2024/09/Apple-Watch-Ultra-2-in-Black-featured-image-scaled.jpg" },
    description: "Engineered for endurance athletes and adventurers.",
    specifications: {
      Display: "49mm Always-On Retina, 3000 nits",
      Processor: "S9 SiP",
      Battery: "36 hours typical, 72 hours Low Power",
      OS: "watchOS 11",
      Sensors: "HR, ECG, SpO2, depth"
    },
    features: ["Action Button", "Dual-frequency GPS", "Dive-ready"],
    gallery: ["https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/apple-watch-ultra-2-1"],
    availability: "In Stock",
    rating: 4.9,
    reviews_count: 411
  },

  {
    id: 5,
    name: "AirPods Pro (2nd Gen)",
    slug: "airpods-pro-2",
    category_name: "AirPods",
    price: 39999,
    sale_price: 37999,
    primary_image: { image: "https://applecenter.co.ke/wp-content/uploads/2023/11/MTJV3.jpeg" },
    description: "AirPods Pro (2nd Gen) with Adaptive Audio and ANC.",
    specifications: {
      Chip: "Apple H2",
      Battery: "Up to 30 hours with MagSafe case",
      Connectivity: "Bluetooth 5.3"
    },
    features: ["Active Noise Cancellation", "Adaptive Transparency"],
    gallery: ["https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/airpods-pro-2-1"],
    availability: "In Stock",
    rating: 4.8,
    reviews_count: 540
  },

  {
    id: 6,
    name: "Apple Pencil (2nd Gen)",
    slug: "apple-pencil-2",
    category_name: "Accessories",
    price: 19999,
    sale_price: 17999,
    primary_image: { image: "https://mightyape.co.ke/public/uploads/all/MDhOiqV5A41K6szVExXk199dK4PUU6YFbj2EcWvO.png" },
    description: "Apple Pencil (2nd Gen) for precision input.",
    specifications: { Compatibility: "iPad Pro, iPad Air (selected models)", Battery: "Rechargeable" },
    features: ["Magnetic charging", "Double-tap gesture"],
    availability: "In Stock",
    rating: 4.7,
    reviews_count: 320
  },

  {
    id: 7,
    name: "MagSafe Charger",
    slug: "magsafe-charger",
    category_name: "Accessories",
    price: 9999,
    sale_price: 8999,
    primary_image: { image: "https://mac-more.co.ke/wp-content/uploads/2025/07/MagSafe_Charger_1m_Coiled_Screen__USEN.jpg" },
    description: "MagSafe Charger — magnetic wireless charging up to 15W.",
    specifications: { ChargingPower: "Up to 15W", Connector: "USB-C", CableLength: "1m" },
    features: ["Magnetic snap-on alignment", "Qi compatible"],
    availability: "In Stock",
    rating: 4.6,
    reviews_count: 212
  },

  {
    id: 8,
    name: "iPhone 15 Silicone Case with MagSafe",
    slug: "iphone-15-case",
    category_name: "Accessories",
    price: 7999,
    sale_price: 6999,
    primary_image: { image: "https://i.ebayimg.com/images/g/I98AAOSwNbNlprtg/s-l1200.jpg" },
    description: "Silicone Case with MagSafe for iPhone 15.",
    specifications: { Material: "Silicone", Compatibility: "iPhone 15", MagSafeSupport: "Yes" },
    features: ["Microfiber lining", "Built-in magnets"],
    availability: "In Stock",
    rating: 4.8,
    reviews_count: 154
  }
];

export default function ProductDetail() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const productFromState = location.state?.product;
  const productFromList = dummyProducts.find((p) => p.slug === slug);
  const product = productFromState && productFromState.slug === slug ? productFromState : productFromList;

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  const [selectedStorage, setSelectedStorage] = useState(product?.storage_options?.[0] || null);
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
          <button onClick={() => navigate(-1)} className="px-6 py-3 bg-black text-white rounded-lg">
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

  const BUSINESS_NUMBER = "254700000000";
  const waMessage = encodeURIComponent(
    `Hi, I'm interested in ${product.name}${selectedColor ? ` in ${selectedColor.name}` : ''}${selectedStorage ? ` - ${selectedStorage}` : ''} (KSh${product.sale_price || product.price}). Can you help me purchase this?`
  );
  const waLink = `https://wa.me/${BUSINESS_NUMBER}?text=${waMessage}`;

  const discount = product.sale_price ? Math.round(((product.price - product.sale_price) / product.price) * 100) : 0;
  const currentImage = selectedColor?.images?.[currentImageIndex] || product.primary_image?.image || product.gallery?.[0] || '';

  // Helper to render spec values (primitives, arrays, nested objects)
  const renderSpecValue = (val) => {
    if (val === null || val === undefined) return <span className="text-gray-500">—</span>;
    if (Array.isArray(val)) {
      return (
        <div className="flex flex-col items-end text-right">
          {val.map((item, i) => (
            <span key={i} className="text-gray-900 text-sm">{typeof item === 'object' ? JSON.stringify(item) : item}</span>
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
              <span className="text-gray-900">{Array.isArray(v) ? v.join(", ") : String(v)}</span>
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
      <div className="bg-white border-b sticky top-16 z-40 shadow-sm backdrop-blur-lg bg-opacity-90">
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
                <Heart className={`w-6 h-6 transition-all ${isLiked ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-600'}`} />
              </button>
              <img
                src={currentImage}
                alt={product.name}
                className={`w-full h-full object-contain p-12 transition-all duration-700 ${
                  isZoomed ? 'scale-150' : 'scale-100'
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
                      currentImageIndex === idx ? 'border-black shadow-lg scale-105' : 'border-gray-200'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-24 object-contain p-3" />
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
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>
              
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-lg font-semibold">{product.rating}</span>
                  <span className="text-gray-500">({product.reviews_count} reviews)</span>
                </div>
              )}
              
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
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
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
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
                <span className="text-5xl font-bold">KSh {(product.sale_price || product.price)?.toLocaleString()}</span>
                {product.sale_price && product.price !== product.sale_price && (
                  <span className="text-2xl text-gray-400 line-through">
                    KSh {product.price?.toLocaleString()}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-300">Tax included • Free shipping nationwide</p>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
                  Color: <span className="text-gray-600 font-normal normal-case">{selectedColor?.name}</span>
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
                            ? 'border-black shadow-2xl scale-110 ring-4 ring-black/10'
                            : 'border-gray-300 hover:border-gray-500 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                      {selectedColor?.name === color.name && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Check className="w-7 h-7 text-white drop-shadow-2xl" strokeWidth={3} />
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
            {product.storage_options && product.storage_options.length > 0 && product.storage_options[0] !== "—" && (
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                  Storage: <span className="text-gray-600 font-normal normal-case">{selectedStorage}</span>
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {product.storage_options.map((storage, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedStorage(storage)}
                      className={`px-6 py-3 border-2 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5 ${
                        selectedStorage === storage
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-black'
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
              <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-xl border-2 border-gray-300 hover:border-black transition-all font-bold text-xl hover:shadow-lg"
                >
                  −
                </button>
                <span className="text-2xl font-bold w-16 text-center">{quantity}</span>
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
                {addedToCart ? 'Added to Cart ✓' : 'Add to Cart'}
              </button>
              
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-5 rounded-xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                Buy on WhatsApp
              </a>
              
              <button className="flex items-center justify-center gap-3 w-full border-2 border-gray-300 hover:border-black font-semibold py-4 rounded-xl transition-all hover:shadow-lg">
                <Share2 className="w-5 h-5" />
                Share Product
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t-2 border-gray-200">
              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl w-14 h-14 flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Truck className="w-7 h-7 text-white" />
                </div>
                <p className="text-xs font-bold text-gray-900">Free Delivery</p>
                <p className="text-xs text-gray-500">Nationwide</p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl w-14 h-14 flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <p className="text-xs font-bold text-gray-900">1 Year Warranty</p>
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
            {Object.entries(product.specifications || {}).map(([key, value]) => (
              <div key={key} className="border-b border-gray-200 pb-5 hover:border-gray-400 transition-colors">
                <dt className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">{key}</dt>
                <dd className="text-base text-gray-900 font-medium">
                  {renderSpecValue(value)}
                </dd>
              </div>
            ))}
            {(!product.specifications || Object.keys(product.specifications).length === 0) && (
              <div className="text-sm text-gray-500 col-span-full">No specifications available for this product.</div>
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
                <div key={idx} className="flex items-start gap-4 bg-white/80 backdrop-blur-sm p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 rounded-xl p-2 mt-0.5 shadow-lg flex-shrink-0">
                    <Check className="w-5 h-5 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-gray-700 font-medium leading-relaxed">{feature}</span>
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
                <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow aspect-square">
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}