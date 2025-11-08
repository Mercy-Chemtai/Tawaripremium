"use client";

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Phone,
  ShoppingBag,
  PenTool,
  Trophy,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { servicesAPI, productsAPI } from "../services/api";


/**
 * HomePage with:
 * - HeroSlider (autoplay, keyboard/touch controls)
 * - Services, Why Choose Us
 * - Featured Products (from productsAPI)
 * - Companies Gallery (grid + modal/lightbox)
 * - CTA
 *
 * Tailwind CSS assumed. Place fallback assets in /public or update paths.
 */

export default function HomePage() {
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  // Each company can have multiple gallery images
  // Ensure paths start with '/' so files in public/ are served correctly
  const [companies, setCompanies] = useState([
    {
      id: "c1",
      name: "Image1",
      gallery: ["/Images/image1.jpeg", "/Images/image2.jpeg"],
    },
    {
      id: "c2",
      name: "VoltWorks",
      gallery: ["/Images/apple-repair.mp4", "/Images/image3.jpeg"],
    },
    {
      id: "c3",
      name: "SoundLab",
      gallery: ["/Images/vedio1.mp4", "/Images/vedio2.mp4"],
    },
    {
      id: "c4",
      name: "SkyTech",
      gallery: ["/Images/image4.jpeg", "/Images/vedio3.mp4"],
    },
    {
      id: "c5",
      name: "CamCorp",
      gallery: ["/Images/vedio4.mp4", "/Images/image5.jpeg"],
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const safeGet = (obj, fn) => typeof obj?.[fn] === "function";

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        let servicesData = [];
        let productsData = [];

        if (safeGet(servicesAPI, "getServices")) {
          servicesData = await servicesAPI.getServices();
        } else {
          console.warn("servicesAPI.getServices missing — using empty fallback");
        }

        if (safeGet(productsAPI, "getProducts")) {
          productsData = await productsAPI.getProducts();
        } else {
          console.warn("productsAPI.getProducts missing — using empty fallback");
        }

        if (!mounted) return;
        setServices(servicesData || []);
        setProducts(productsData || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full ">
      <HeroSlider />

      {/* Services */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-black">Our Services</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl">Comprehensive solutions for all your Apple device needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <ServiceCard title="Premium Device Sales" to="/shop" Icon={ShoppingBag}>
              Shop the latest Apple devices and accessories with expert guidance and competitive pricing.
            </ServiceCard>

            <ServiceCard title="Expert Repair Services" to="/services" Icon={PenTool}>
              Fast, reliable repairs for all Apple devices by certified technicians with genuine parts.
            </ServiceCard>

            <ServiceCard title="Professional Training" to="/training" Icon={Trophy}>
              Comprehensive repair and sales training programs for individuals and businesses.
            </ServiceCard>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-black">Why Choose Tawari Digital</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl mx-auto">We're committed to excellence in everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Feature title="Certified Technicians" Icon={CheckCircle}>Our repair specialists are fully certified and continuously trained on the latest Apple technologies.</Feature>
              <Feature title="Genuine Parts" Icon={CheckCircle}>We only use authentic Apple parts to ensure the highest quality repairs and longevity.</Feature>
              <Feature title="Quick Turnaround" Icon={CheckCircle}>Most repairs are completed same-day, minimizing your downtime.</Feature>
            </div>

            <div className="space-y-4">
              <Feature title="Competitive Pricing" Icon={CheckCircle}>Fair and transparent pricing on all our products and services.</Feature>
              <Feature title="Warranty Protection" Icon={CheckCircle}>All repairs and products come with comprehensive warranty coverage for your peace of mind.</Feature>
              <Feature title="Expert Consultation" Icon={CheckCircle}>Personalized advice to help you make informed decisions about your Apple devices.</Feature>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products
      <section>
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-black">Featured Products</h2>
            <p className="max-w-[900px] text-gray-500 md:text-lg mt-1 mx-auto">Hand-picked items from our catalog — top sellers and editor picks.</p>
          </div>

          <div className="mt-6">
            {loading ? (
              <div className="text-center py-12">Loading products...</div>
            ) : error ? (
              <div className="text-center text-red-500 py-6">{error}</div>
            ) : products.length === 0 ? (
              <div className="text-center py-12 text-gray-500">No featured products yet.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.slice(0, 8).map((product) => (
                  <article key={product.id} className="border border-gray-100 rounded-xl p-4 flex flex-col shadow-sm hover:shadow-md transition-shadow bg-white">
                    <div className="relative overflow-hidden rounded-md bg-gray-50">
                      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" onError={(e)=>e.currentTarget.src="/fallback-product.png"} />
                      {product.company && <span className="absolute left-2 top-2 bg-white/90 text-xs font-medium px-2 py-1 rounded">{product.company}</span>}
                    </div>

                    <div className="mt-4 flex-1 flex flex-col">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                      <p className="text-gray-600 mt-2">${Number(product.price).toFixed(2)}</p>

                      <div className="mt-4 flex items-center gap-3">
                        <Link to={`/products/${product.id}`} className="inline-flex items-center px-3 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition">
                          View Product
                        </Link>

                        <button type="button" className="ml-auto inline-flex items-center px-3 py-2 border border-gray-200 rounded-md text-sm" aria-label={`Add ${product.name} to wishlist`} onClick={()=>console.log("wishlist", product.id)}>
                          Wishlist
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section> */}

      {/* Companies Gallery (grid + modal lightbox) */}
      <section className="py-12 bg-white">
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-black">Work Gallery</h2>
            <p className="text-sm text-gray-500">Click any image to open gallery</p>
          </div>

          <CompanyGallery companies={companies} />
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Get Started?</h2>
            <p className="max-w-[600px] text-gray-300 md:text-xl">Contact us today for sales, repairs, or training inquiries</p>

            <div className="flex flex-col gap-2 min-[400px]:flex-row mt-4">
              <Link to="/contact" className="inline-flex items-center justify-center px-4 py-2 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors">
                Contact Us <Phone className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/book-service" className="inline-flex items-center justify-center px-4 py-2 border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors">
                Book a Service <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------------------- small helpers ------------------------------ */

function ServiceCard({ title, to, Icon, children }) {
  return (
    <div className="flex flex-col items-center space-y-4 p-6 border border-gray-200 rounded-lg text-center">
      <div className="p-3 rounded-full bg-black text-white"><Icon className="h-6 w-6" /></div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-500">{children}</p>
      <Link to={to} className="text-black font-medium inline-flex items-center hover:underline mt-2">
        Learn more <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
}

function Feature({ title, Icon, children }) {
  return (
    <div className="flex items-start space-x-3">
      <Icon className="h-6 w-6 text-black mt-1 flex-shrink-0" />
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-500">{children}</p>
      </div>
    </div>
  );
}

/* ---------------------------- HeroSlider -------------------------------- */
function HeroSlider({ interval = 4000, startIndex = 0 }) {
  const slides = [
    {
      id: "hero-1",
      bgImage:
        "https://www.apple.com/v/iphone-17-pro/c/images/overview/welcome/hero_endframe__xdzisdq1ppem_xlarge.jpg style=\"object-fit: cover; object-position: center;\"",
      tagline: "Premium • Repairs • Training",
      title: "Apple Device Specialists",
      desc:
        "Expert repairs, precision service, and professional Apple training — trusted by hundreds of customers to keep their devices performing like new.",
      primary: { label: "Shop Devices", to: "/shop" },
      secondary: { label: "Book Repair", to: "/services" },
      textColor: "text-white",
      overlay: "bg-black/60",
      ctaPrimaryStyle: "bg-white text-black hover:bg-gray-200",
      ctaSecondaryStyle: "border border-white/40 text-white hover:bg-white/10",
    },
    {
      id: "hero-2",
      bgImage:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1400&q=60",
      tagline: "Fast • Reliable",
      title: "Fast, Reliable Repairs",
      desc:
        "Certified technicians, genuine parts and speedy turnarounds — get your device fixed by experts.",
      primary: { label: "Book Repair", to: "/services" },
      secondary: { label: "View Pricing", to: "/services#pricing" },
      textColor: "text-white",
      overlay: "bg-black/50",
      ctaPrimaryStyle: "bg-white text-black hover:bg-gray-200",
      ctaSecondaryStyle: "border border-white/30 text-white hover:bg-white/5",
    },
    {
      id: "hero-3",
      bgImage:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=60",
      tagline: "Train • Certify",
      title: "Pro Training & Certification",
      desc:
        "Hands-on courses for repair professionals and retailers — master the latest Apple repair techniques.",
      primary: { label: "Explore Training", to: "/training" },
      secondary: { label: "Contact Us", to: "/contact" },
      textColor: "text-black",
      overlay: "bg-white/30",
      ctaPrimaryStyle: "bg-black text-white hover:bg-gray-800",
      ctaSecondaryStyle: "border border-black/10 text-black hover:bg-black/5",
    },
  ];

  const [index, setIndex] = useState(Math.max(0, Math.min(startIndex, slides.length - 1)));
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // touch/swipe
  const touchStartX = useRef(0);
  const touchCurrentX = useRef(0);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setIndex((i) => (i + 1) % slides.length);
      }, interval);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, interval, slides.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + slides.length) % slides.length);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % slides.length);
      if (e.key === "Escape") setIsPaused(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slides.length]);

  const goTo = (i) => setIndex((i % slides.length + slides.length) % slides.length);
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches?.[0]?.clientX ?? 0;
    touchCurrentX.current = touchStartX.current;
    setIsPaused(true);
  };
  const handleTouchMove = (e) => {
    touchCurrentX.current = e.touches?.[0]?.clientX ?? touchCurrentX.current;
  };
  const handleTouchEnd = () => {
    const dx = touchCurrentX.current - touchStartX.current;
    const threshold = 50;
    if (dx > threshold) prev();
    else if (dx < -threshold) next();
    setIsPaused(false);
    touchStartX.current = 0;
    touchCurrentX.current = 0;
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Hero slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="relative h-[420px] md:h-[520px] lg:h-[640px]">
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${active ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
              aria-hidden={!active}
            >
              <div className="absolute inset-0 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url("${s.bgImage}")` }} />
              <div className={`absolute inset-0 ${s.overlay}`} />

              <div className="relative z-20 max-w-6xl mx-auto px-6 h-full flex flex-col items-center justify-center text-center">
                <div className={`inline-block mb-6 px-4 py-1 border rounded-full text-xs tracking-widest uppercase ${s.textColor} border-white/20`}>
                  {s.tagline}
                </div>

                <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight ${s.textColor} mb-4`}>{s.title}</h2>

                <p className={`${s.textColor} text-lg md:text-xl max-w-2xl mx-auto leading-relaxed`}>{s.desc}</p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                  <Link to={s.primary.to} className={`inline-flex items-center justify-center px-6 py-3 rounded-md font-semibold shadow-sm transition ${s.ctaPrimaryStyle}`}>
                    {s.primary.label} <ShoppingBag className="ml-2 h-4 w-4" />
                  </Link>

                  <Link to={s.secondary.to} className={`inline-flex items-center justify-center px-6 py-3 rounded-md font-medium transition ${s.ctaSecondaryStyle}`}>
                    {s.secondary.label} <PenTool className="ml-2 h-4 w-4" />
                  </Link>
                </div>

                <div className={`mt-6 text-sm ${s.textColor} text-opacity-80 flex flex-col sm:flex-row items-center gap-2 sm:gap-4`}>
                  <span>Certified Apple Technicians</span>
                  <span className="hidden sm:inline-block">•</span>
                  <span>Genuine Parts Guaranteed</span>
                  <span className="hidden sm:inline-block">•</span>
                  <span>Fast Turnaround Service</span>
                </div>
              </div>

              {active && <div className="absolute inset-0" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} />}
            </div>
          );
        })}

        {/* controls */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30">
          <button onClick={prev} className="p-2 rounded-full bg-white/90 hover:bg-white shadow-md" aria-label="Previous slide">
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>

        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30">
          <button onClick={next} className="p-2 rounded-full bg-white/90 hover:bg-white shadow-md" aria-label="Next slide">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-white" : "w-2 bg-white/40"}`} aria-label={`Go to slide ${i + 1}`} aria-current={i === index ? "true" : "false"} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------- CompanyGallery (mosaic + video support) ------------------------------- */
/**
 * - accepts companies: [{ id, name, gallery: ["/path/a.jpg","/path/b.mp4", ...] }]
 * - normalizes paths (prepends '/' if needed)
 * - mixed mosaic grid with variable spans (big / small / narrow)
 * - supports images + videos (video thumbnails use <video> with poster if available)
 * - modal supports both (videos autoplay muted with controls)
 */
function CompanyGallery({ companies = [] }) {
  const normalizeSrc = (s) => {
    if (!s) return s;
    if (/^https?:\/\//i.test(s)) return s;
    if (s.startsWith("/")) return s;
    return `/${s}`;
  };

  // determine type by extension
  const getType = (src) => {
    if (!src) return "image";
    const ext = src.split("?")[0].split(".").pop().toLowerCase();
    if (["mp4", "webm", "ogg"].includes(ext)) return "video";
    if (["jpg", "jpeg", "png", "gif", "avif", "webp", "svg"].includes(ext)) return "image";
    // fallback
    return "image";
  };

  // flatten and normalize
  const flat = companies.flatMap((c) =>
    Array.isArray(c.gallery)
      ? c.gallery.map((src) => {
          const n = normalizeSrc(src);
          return { companyId: c.id, companyName: c.name, src: n, type: getType(n) };
        })
      : []
  );

  // if you want a repeatable but visually pleasing mosaic pattern, define span pattern
  // pattern length will repeat when more items exist
  const spanPattern = [
    "col-span-2 row-span-2", // big card
    "col-span-1 row-span-1", // small square
    "col-span-1 row-span-2", // narrow tall
    "col-span-1 row-span-1", // small
  ];

  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") setCurrentIndex((i) => (i - 1 + flat.length) % flat.length);
      if (e.key === "ArrowRight") setCurrentIndex((i) => (i + 1) % flat.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, flat.length]);

  const openAt = (i) => {
    setCurrentIndex(i);
    setOpen(true);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const closeModal = () => {
    setOpen(false);
    document.body.style.overflow = "";
  };

  // safe image fallback
  const handleImgError = (e) => {
    const el = e.currentTarget;
    if (el.dataset.fallbackApplied === "true") return;
    el.dataset.fallbackApplied = "true";
    el.src = "/fallback-product.png";
  };

  if (flat.length === 0) {
    return <div className="text-gray-500">No gallery images available.</div>;
  }

  return (
    <>
      {/* Mosaic grid:
          - 4 columns on md+ (grid-cols-4)
          - pattern repeats for mixed sizes
       */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-fr">
        {flat.map((item, idx) => {
          const spanClass = spanPattern[idx % spanPattern.length];
          const isVideo = item.type === "video";

          return (
            <button
              key={`${item.companyId}-${idx}`}
              onClick={() => openAt(idx)}
              className={`relative group overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${spanClass}`}
              aria-label={`Open ${item.companyName} ${isVideo ? "video" : "image"} ${idx + 1}`}
            >
              {/* image */}
              {item.type === "image" && (
                <img
                  src={item.src}
                  alt={`${item.companyName} work ${idx + 1}`}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                  onError={handleImgError}
                />
              )}

              {/* video thumbnail: use <video muted preload="metadata"> as thumbnail so browsers show a poster frame */}
              {isVideo && (
                <div className="w-full h-full bg-black/5 flex items-center justify-center">
                  <video
                    src={item.src}
                    className="w-full h-full object-cover"
                    preload="metadata"
                    muted
                    playsInline
                    // do not autoplay thumbnails (kept muted/preload so a poster frame is available)
                    onError={(e) => {
                      // fallback to an image if video fails
                      const el = e.currentTarget;
                      // replace with fallback poster element by setting a data attribute and rendering fallback below
                      el.dataset.failed = "true";
                    }}
                  />
                  {/* play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-white/90 rounded-full p-2 shadow">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M8 5v14l11-7L8 5z" fill="black" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* caption badge */}
              <div className="absolute left-2 top-2 bg-white/90 text-xs font-medium px-2 py-1 rounded">
                {item.companyName}
              </div>
            </button>
          );
        })}
      </div>

      {/* Modal / Lightbox */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={closeModal} />
          <div ref={modalRef} className="relative w-full max-w-[90vw] max-h-[90vh] bg-transparent rounded">
            <button
              onClick={closeModal}
              className="absolute right-2 top-2 p-2 rounded-full bg-white/90 z-40"
              aria-label="Close gallery"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentIndex((i) => (i - 1 + flat.length) % flat.length)}
                className="p-2 rounded-full bg-white/90"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <div className="flex-1 flex items-center justify-center">
                {flat[currentIndex].type === "image" ? (
                  <img
                    src={flat[currentIndex].src}
                    alt={`${flat[currentIndex].companyName} large`}
                    className="max-w-full max-h-[80vh] object-contain rounded"
                    onError={handleImgError}
                  />
                ) : (
                  <video
                    src={flat[currentIndex].src}
                    className="max-w-full max-h-[80vh] rounded"
                    controls
                    autoPlay
                    muted
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>

              <button
                onClick={() => setCurrentIndex((i) => (i + 1) % flat.length)}
                className="p-2 rounded-full bg-white/90"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-3 text-center text-sm text-white">
              {flat[currentIndex].companyName} — {flat[currentIndex].type === "video" ? "Video" : "Image"} {currentIndex + 1} of {flat.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

