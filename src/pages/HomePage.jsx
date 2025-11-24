"use client";

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Phone,
  ShoppingBag,
  Wrench,
  Trophy,
  ChevronLeft,
  ChevronRight,
  X,
  Zap,
  Shield,
  Award,
} from "lucide-react";
// import { servicesAPI, productsAPI } from "../services/api";

export default function HomePage() {
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [companies, setCompanies] = useState([
    {
      id: "c1",
      name: "iPhone Repairs",
      gallery: ["/Images/image1.jpeg", "/Images/image2.jpeg"],
    },
    {
      id: "c2",
      name: "iPad Services",
      gallery: ["/Images/apple-repair.mp4", "/Images/image3.jpeg"],
    },
    {
      id: "c3",
      name: "MacBook Pro",
      gallery: ["/Images/vedio1.mp4", "/Images/vedio2.mp4"],
    },
    {
      id: "c4",
      name: "Apple Watch",
      gallery: ["/Images/image4.jpeg", "/Images/vedio3.mp4"],
    },
    {
      id: "c5",
      name: "Accessories",
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
        }

        if (safeGet(productsAPI, "getProducts")) {
          productsData = await productsAPI.getProducts();
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
    <div className="flex flex-col min-h-screen w-full bg-white">
      <HeroSlider />

      {/* Services Section with Parallax Video */}
      <ParallaxSection
        videoSrc="https://player.vimeo.com/external/371433846.sd.mp4?s=236ed1e7c8e2e1c5c9d8b0c6e3e1b4e5d8e5e5e5&profile_id=164&oauth2_token_id=57447761"
        imageFallback="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=2000&q=80"
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <AnimatedContent delay={0}>
            <div className="flex flex-col items-center justify-center space-y-6 text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
                Our Services
              </h2>
              <p className="max-w-2xl text-xl text-gray-100">
                Comprehensive Apple solutions tailored to your needs
              </p>
            </div>
          </AnimatedContent>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <AnimatedContent delay={200}>
              <ServiceCard
                title="Device Sales"
                to="/shop"
                Icon={ShoppingBag}
              >
                Latest Apple devices with expert guidance and competitive pricing
              </ServiceCard>
            </AnimatedContent>

            <AnimatedContent delay={400}>
              <ServiceCard
                title="Repair Services"
                to="/services"
                Icon={Wrench}
              >
                Professional repairs by certified technicians with genuine parts
              </ServiceCard>
            </AnimatedContent>

            <AnimatedContent delay={600}>
              <ServiceCard
                title="Training Programs"
                to="/training"
                Icon={Trophy}
              >
                Comprehensive training for repair professionals and retailers
              </ServiceCard>
            </AnimatedContent>
          </div>
        </div>
      </ParallaxSection>

      {/* Brands We Partner With */}
      <section className="w-full py-20 bg-gray-50">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <AnimatedContent delay={0}>
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                Brands We Partner With
              </h2>
              <p className="max-w-2xl text-xl text-gray-600 mx-auto">
                Trusted by leading brands in the industry
              </p>
            </div>
          </AnimatedContent>

          <AnimatedContent delay={200}>
            <BrandsCarousel />
          </AnimatedContent>
        </div>
      </section>

      {/* Why Choose Us with Parallax Image */}
      <ParallaxSection
        imageSrc="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=2000&q=80"
        overlay="dark"
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <AnimatedContent delay={0}>
            <div className="text-center space-y-6 mb-20">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
                Why Choose Us
              </h2>
              <p className="max-w-2xl text-xl text-gray-100 mx-auto">
                Your trusted partner for Apple device excellence
              </p>
            </div>
          </AnimatedContent>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <AnimatedContent delay={200}>
              <FeatureCard title="Certified Experts" Icon={Award}>
                Fully certified technicians trained on latest Apple technologies
              </FeatureCard>
            </AnimatedContent>
            
            <AnimatedContent delay={300}>
              <FeatureCard title="Genuine Parts" Icon={Shield}>
                Only authentic Apple parts for quality and longevity
              </FeatureCard>
            </AnimatedContent>
            
            <AnimatedContent delay={400}>
              <FeatureCard title="Fast Service" Icon={Zap}>
                Same-day repairs to minimize your downtime
              </FeatureCard>
            </AnimatedContent>

            <AnimatedContent delay={500}>
              <FeatureCard title="Fair Pricing" Icon={CheckCircle}>
                Transparent, competitive pricing with no hidden fees
              </FeatureCard>
            </AnimatedContent>
            
            <AnimatedContent delay={600}>
              <FeatureCard title="Warranty Included" Icon={Shield}>
                Comprehensive warranty on all repairs and products
              </FeatureCard>
            </AnimatedContent>
            
            <AnimatedContent delay={700}>
              <FeatureCard title="Expert Guidance" Icon={Award}>
                Personalized consultation for informed decisions
              </FeatureCard>
            </AnimatedContent>
          </div>
        </div>
      </ParallaxSection>

      {/* Work Gallery with Parallax */}
      <ParallaxSection
        imageSrc="https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=2000&q=80"
        overlay="light"
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <AnimatedContent delay={0}>
            <div className="text-center space-y-6 mb-20">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
                Our Work
              </h2>
              <p className="text-xl text-gray-700">
                Quality repairs and satisfied customers
              </p>
            </div>
          </AnimatedContent>

          <AnimatedContent delay={200}>
            <CompanyGallery companies={companies} />
          </AnimatedContent>
        </div>
      </ParallaxSection>

      {/* CTA Section with Video */}
      <ParallaxSection
        videoSrc="https://player.vimeo.com/external/396879075.sd.mp4?s=4e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e&profile_id=164&oauth2_token_id=57447761"
        imageFallback="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=2000&q=80"
        overlay="dark"
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <AnimatedContent delay={0}>
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
                Ready to Get Started?
              </h2>
              <p className="max-w-2xl text-2xl text-gray-100">
                Contact us today for expert service
              </p>

              <div className="flex flex-col sm:flex-row gap-6 mt-8">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-10 py-5 bg-white text-black text-lg font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-2xl transform hover:scale-105"
                >
                  Contact Us
                  <Phone className="ml-3 h-5 w-5" />
                </Link>
                
                <Link
                  to="/book-service"
                  className="inline-flex items-center justify-center px-10 py-5 border-2 border-white text-white text-lg font-semibold rounded-lg hover:bg-white/10 transition-all transform hover:scale-105"
                >
                  Book Service
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </ParallaxSection>
    </div>
  );
}

/* Brands Carousel */
function BrandsCarousel() {
  const brands = [
    { name: "Apple", logo: "/brands/apple.svg" },
    { name: "Samsung", logo: "/brands/samsung.svg" },
    { name: "Google", logo: "/brands/google.svg" },
    { name: "Microsoft", logo: "/brands/microsoft.svg" },
    { name: "Intel", logo: "/brands/intel.svg" },
    { name: "Dell", logo: "/brands/dell.svg" },
    { name: "HP", logo: "/brands/hp.svg" },
    { name: "Lenovo", logo: "/brands/lenovo.svg" },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex animate-scroll gap-12 py-4">
        {[...brands, ...brands].map((brand, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-32 h-32 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center p-4"
          >
            <div className="text-2xl font-bold text-gray-800 text-center">
              {brand.name}
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 3rem)); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
}

/* Gallery with Stacked Carousel Layout */
function CompanyGallery({ companies = [] }) {
  const normalizeSrc = (s) => {
    if (!s) return s;
    if (/^https?:\/\//i.test(s)) return s;
    return s.startsWith("/") ? s : `/${s}`;
  };

  const getType = (src) => {
    if (!src) return "image";
    const ext = src.split("?")[0].split(".").pop().toLowerCase();
    return ["mp4", "webm", "ogg"].includes(ext) ? "video" : "image";
  };

  const flat = companies.flatMap((c) =>
    Array.isArray(c.gallery)
      ? c.gallery.map((src) => ({
          companyId: c.id,
          companyName: c.name,
          src: normalizeSrc(src),
          type: getType(src),
        }))
      : []
  );

  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide effect
  useEffect(() => {
    if (isPaused || flat.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % flat.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, flat.length]);

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

  const closeModal = () => {
    setOpen(false);
    document.body.style.overflow = "";
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % flat.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + flat.length) % flat.length);
  };

  // Get previous, current, and next indices for stacked effect
  const getSlideIndices = () => {
    const prev = (currentIndex - 1 + flat.length) % flat.length;
    const next = (currentIndex + 1) % flat.length;
    return { prev, current: currentIndex, next };
  };

  const { prev, current, next } = getSlideIndices();

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (flat.length === 0) {
    return <div className="text-center text-gray-800 py-12">No gallery images available</div>;
  }

  return (
    <>
      <div 
        className="relative w-full max-w-6xl mx-auto h-96 md:h-[500px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Stacked Carousel */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Previous Slide (Left Stack) */}
          <div className="absolute left-4 md:left-8 z-10 transform -translate-x-4 scale-75 opacity-70 hover:opacity-90 transition-all duration-300">
            <GalleryItem
              item={flat[prev]}
              index={prev}
              onClick={() => openAt(prev)}
              className="w-120 h-80 md:w-90 md:h-65"
            />
          </div>

          {/* Current Slide (Center - Big) */}
          <div className="relative z-20 transform scale-100 hover:scale-105 transition-all duration-300">
            <GalleryItem
              item={flat[current]}
              index={current}
              onClick={() => openAt(current)}
              className="w-90 h-120 md:w-96 md:h-60 lg:w-[500px] lg:h-[300px]"
            />
          </div>

          {/* Next Slide (Right Stack) */}
          <div className="absolute right-4 md:right-8 z-10 transform translate-x-4 scale-75 opacity-70 hover:opacity-90 transition-all duration-300">
            <GalleryItem
              item={flat[next]}
              index={next}
              onClick={() => openAt(next)}
              className="w-120 h-80 md:w-90 md:h-65"
            />
          </div>
        </div>

        {/* Navigation Arrows */}
        {flat.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/80 backdrop-blur-md hover:bg-white transition-all shadow-lg"
            >
              <ChevronLeft className="h-6 w-6 text-gray-800" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/80 backdrop-blur-md hover:bg-white transition-all shadow-lg"
            >
              <ChevronRight className="h-6 w-6 text-gray-800" />
            </button>
          </>
        )}

        {/* Slide Indicators */}
        {flat.length > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {flat.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-gray-800" : "w-2 bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95">
          <button
            onClick={closeModal}
            className="absolute right-8 top-8 p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all z-50"
          >
            <X className="h-7 w-7 text-white" />
          </button>

          <button
            onClick={() => setCurrentIndex((i) => (i - 1 + flat.length) % flat.length)}
            className="absolute left-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          >
            <ChevronLeft className="h-8 w-8 text-white" />
          </button>

          <div className="max-w-5xl max-h-[85vh] flex items-center justify-center">
            {flat[currentIndex].type === "image" ? (
              <img
                src={flat[currentIndex].src}
                alt={flat[currentIndex].companyName}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
                onError={(e) => (e.currentTarget.src = "/fallback-product.png")}
              />
            ) : (
              <video
                src={flat[currentIndex].src}
                className="max-w-full max-h-[85vh] rounded-lg"
                controls
                autoPlay
                muted
                playsInline
              />
            )}
          </div>

          <button
            onClick={() => setCurrentIndex((i) => (i + 1) % flat.length)}
            className="absolute right-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          >
            <ChevronRight className="h-8 w-8 text-white" />
          </button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-center">
            <p className="text-xl font-medium">{flat[currentIndex].companyName}</p>
            <p className="text-sm text-gray-400 mt-2">
              {currentIndex + 1} / {flat.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

/* Gallery Item Component */
function GalleryItem({ item, index, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`relative group overflow-hidden rounded-2xl bg-white shadow-2xl hover:shadow-3xl transition-all duration-300 ${className}`}
    >
      {item.type === "image" ? (
        <img
          src={item.src}
          alt={`${item.companyName} work`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => (e.currentTarget.src = "/fallback-product.png")}
        />
      ) : (
        <>
          <video
            src={item.src}
            className="w-full h-full object-cover"
            preload="metadata"
            muted
            playsInline
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="bg-white rounded-full p-3 shadow-xl">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="black">
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
            </div>
          </div>
        </>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-4 left-4 right-4 text-white text-left">
          <p className="font-semibold text-sm truncate">{item.companyName}</p>
          <p className="text-xs text-gray-200 mt-1">Click to view</p>
        </div>
      </div>
    </button>
  );
}

/* Parallax Section with Video/Image Background */
function ParallaxSection({ children, videoSrc, imageSrc, imageFallback, overlay = "medium" }) {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = -rect.top / (rect.height + window.innerHeight);
        setScrollY(scrollProgress * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const overlayClass = {
    dark: "bg-black/70",
    medium: "bg-black/50",
    light: "bg-white/85",
  }[overlay];

  return (
    <section ref={sectionRef} className="relative w-full py-32 overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          transition: "transform 0.1s ease-out"
        }}
      >
        {videoSrc ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-[120%] object-cover"
            poster={imageFallback}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : imageSrc ? (
          <div 
            className="w-full h-[120%] bg-cover bg-center"
            style={{ backgroundImage: `url(${imageSrc})` }}
          />
        ) : null}
        <div className={`absolute inset-0 ${overlayClass}`}></div>
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}

/* Animated Content Component */
function AnimatedContent({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={contentRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-12"
      }`}
    >
      {children}
    </div>
  );
}

/* Service Card */
function ServiceCard({ title, to, Icon, children }) {
  return (
    <Link to={to} className="group block">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 h-full transform hover:scale-105">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="p-5 rounded-2xl bg-gray-900 text-white group-hover:bg-gray-800 transition-all duration-300">
            <Icon className="h-10 w-10" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          <p className="text-gray-700 text-lg leading-relaxed">{children}</p>
          
          <div className="inline-flex items-center text-gray-900 font-semibold group-hover:gap-3 gap-2 transition-all mt-4">
            Learn more
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* Feature Card */
function FeatureCard({ title, Icon, children }) {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 transform hover:scale-105">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-4 rounded-xl bg-gray-900 text-white">
          <Icon className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-gray-700 leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

/* Hero Slider with Videos */
function HeroSlider({ interval = 6000, startIndex = 0 }) {
  const slides = [
    {
      id: "hero-1",
      type: "video",
      src: "https://player.vimeo.com/external/371433846.sd.mp4?s=236ed1e7c8e2e1c5c9d8b0c6e3e1b4e5d8e5e5e5&profile_id=164&oauth2_token_id=57447761",
      poster: "https://applecenter.co.ke/wp-content/uploads/2024/12/Apple-Screen-Repair-600x450.jpeg",
      title: "Apple Device Specialists",
      desc: "Expert repairs, premium devices, and professional training",
      primary: { label: "Shop Devices", to: "/shop" },
      secondary: { label: "Book Repair", to: "/services" },
    },
    {
      id: "hero-2",
      type: "video",
      src: "https://player.vimeo.com/external/396879075.sd.mp4?s=4e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1e&profile_id=164&oauth2_token_id=57447761",
      poster: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=2000&q=80",
      title: "Expert Repair Services",
      desc: "Certified technicians and genuine parts for quality you can trust",
      primary: { label: "Book Repair", to: "/services" },
      secondary: { label: "View Pricing", to: "/services#pricing" },
    },
    {
      id: "hero-3",
      type: "image",
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80",
      title: "Professional Training",
      desc: "Comprehensive courses for repair technicians and retailers",
      primary: { label: "Explore Training", to: "/training" },
      secondary: { label: "Contact Us", to: "/contact" },
    },
  ];

  const [index, setIndex] = useState(Math.max(0, Math.min(startIndex, slides.length - 1)));
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
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
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slides.length]);

  const goTo = (i) => setIndex((i % slides.length + slides.length) % slides.length);
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches?.[0]?.clientX ?? 0;
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    touchCurrentX.current = e.touches?.[0]?.clientX ?? touchCurrentX.current;
  };

  const handleTouchEnd = () => {
    const dx = touchCurrentX.current - touchStartX.current;
    if (dx > 50) prev();
    else if (dx < -50) next();
    setIsPaused(false);
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-screen min-h-[600px] max-h-[900px]">
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                active ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {s.type === "video" ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  poster={s.poster}
                >
                  <source src={s.src} type="video/mp4" />
                </video>
              ) : (
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${s.src})` }}
                />
              )}
              <div className="absolute inset-0 bg-black/50"></div>

              <div className="relative z-20 h-full flex items-center justify-center px-6">
                <div className="max-w-4xl text-center">
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight animate-fadeIn">
                    {s.title}
                  </h1>

                  <p className="text-xl md:text-2xl text-gray-100 mb-12 max-w-3xl mx-auto animate-fadeIn" style={{ animationDelay: "0.2s" }}>
                    {s.desc}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fadeIn" style={{ animationDelay: "0.4s" }}>
                    <Link
                      to={s.primary.to}
                      className="inline-flex items-center justify-center px-10 py-5 bg-white text-black text-lg font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-2xl transform hover:scale-105"
                    >
                      {s.primary.label}
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </Link>

                    <Link
                      to={s.secondary.to}
                      className="inline-flex items-center justify-center px-10 py-5 border-2 border-white text-white text-lg font-semibold rounded-lg hover:bg-white/10 transition-all transform hover:scale-105"
                    >
                      {s.secondary.label}
                    </Link>
                  </div>
                </div>
              </div>

              {active && (
                <div
                  className="absolute inset-0"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                />
              )}
            </div>
          );
        })}

        <button
          onClick={prev}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all"
        >
          <ChevronLeft className="h-7 w-7 text-white" />
        </button>

        <button
          onClick={next}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all"
        >
          <ChevronRight className="h-7 w-7 text-white" />
        </button>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-16 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* Add CSS animations */
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .animate-fadeIn {
      animation: fadeIn 0.8s ease-out forwards;
      opacity: 0;
    }
  `;
  
  if (!document.head.querySelector('style[data-hero-animations]')) {
    style.setAttribute('data-hero-animations', 'true');
    document.head.appendChild(style);
  }
}