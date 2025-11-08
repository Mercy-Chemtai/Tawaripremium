// src/components/CompanyGallery.jsx
import React, { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Play, Maximize2 } from "lucide-react";

/**
 * CompanyGallery - Professional mosaic gallery with image/video support
 * Features:
 * - Responsive masonry layout with dynamic spans
 * - Image and video support with elegant thumbnails
 * - Fullscreen modal with keyboard navigation
 * - Smooth animations and hover effects
 * - Accessibility features
 */
function CompanyGallery({ companies = [] }) {
  const normalizeSrc = (s) => {
    if (!s) return s;
    if (/^https?:\/\//i.test(s)) return s;
    if (s.startsWith("/")) return s;
    return `/${s}`;
  };

  const getType = (src) => {
    if (!src) return "image";
    const ext = src.split("?")[0].split(".").pop().toLowerCase();
    if (["mp4", "webm", "ogg"].includes(ext)) return "video";
    if (["jpg", "jpeg", "png", "gif", "avif", "webp", "svg"].includes(ext)) return "image";
    return "image";
  };

  // Flatten and normalize all media items
  const flat = companies.flatMap((c) =>
    Array.isArray(c.gallery)
      ? c.gallery.map((src) => {
          const n = normalizeSrc(src);
          return { companyId: c.id, companyName: c.name, src: n, type: getType(n) };
        })
      : []
  );

  // Dynamic masonry pattern for visual interest
  const spanPattern = [
    "col-span-2 row-span-2", // Large feature
    "col-span-1 row-span-1", // Small square
    "col-span-1 row-span-2", // Tall portrait
    "col-span-1 row-span-1", // Small square
    "col-span-2 row-span-1", // Wide landscape
    "col-span-1 row-span-1", // Small square
  ];

  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const modalRef = useRef(null);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
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

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleImgError = (e) => {
    const el = e.currentTarget;
    if (el.dataset.fallbackApplied === "true") return;
    el.dataset.fallbackApplied = "true";
    el.src = "/fallback-product.png";
  };

  if (flat.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 text-lg">No gallery content available</div>
      </div>
    );
  }

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px]">
        {flat.map((item, idx) => {
          const spanClass = spanPattern[idx % spanPattern.length];
          const isVideo = item.type === "video";
          const isHovered = hoveredIndex === idx;

          return (
            <button
              key={`${item.companyId}-${idx}`}
              onClick={() => openAt(idx)}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative group overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ${spanClass} ${
                isHovered ? 'shadow-2xl scale-[1.02] z-10' : 'shadow-md hover:shadow-xl'
              }`}
              aria-label={`View ${item.companyName} ${isVideo ? "video" : "image"}`}
            >
              {/* Background overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

              {/* Image */}
              {item.type === "image" && (
                <img
                  src={item.src}
                  alt={`${item.companyName} portfolio`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  onError={handleImgError}
                />
              )}

              {/* Video thumbnail */}
              {isVideo && (
                <div className="w-full h-full bg-gray-900 flex items-center justify-center relative">
                  <video
                    src={item.src}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    preload="metadata"
                    muted
                    playsInline
                    onError={handleImgError}
                  />
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-8 w-8 text-gray-900 fill-gray-900" />
                    </div>
                  </div>
                </div>
              )}

              {/* Company name badge */}
              <div className="absolute left-3 top-3 bg-white/95 backdrop-blur-sm text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg z-20 transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
                {item.companyName}
              </div>

              {/* Expand icon on hover */}
              <div className="absolute right-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <div className="bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-lg">
                  <Maximize2 className="h-4 w-4 text-gray-900" />
                </div>
              </div>

              {/* Media type indicator */}
              <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <div className="bg-black/80 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                  {isVideo ? "Video" : "Photo"}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Fullscreen Modal / Lightbox */}
      {open && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Media gallery lightbox"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/95 backdrop-blur-sm" 
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Content Container */}
          <div ref={modalRef} className="relative w-full max-w-7xl mx-auto">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm z-50 transition-all hover:scale-110"
              aria-label="Close gallery"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            {/* Navigation and media display */}
            <div className="flex items-center gap-4">
              {/* Previous button */}
              <button
                onClick={() => setCurrentIndex((i) => (i - 1 + flat.length) % flat.length)}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all hover:scale-110 flex-shrink-0"
                aria-label="Previous media"
              >
                <ChevronLeft className="h-7 w-7 text-white" />
              </button>

              {/* Media content */}
              <div className="flex-1 flex items-center justify-center bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
                {flat[currentIndex].type === "image" ? (
                  <img
                    src={flat[currentIndex].src}
                    alt={`${flat[currentIndex].companyName} full size`}
                    className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                    onError={handleImgError}
                  />
                ) : (
                  <video
                    src={flat[currentIndex].src}
                    className="max-w-full max-h-[80vh] rounded-lg shadow-2xl"
                    controls
                    autoPlay
                    muted
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>

              {/* Next button */}
              <button
                onClick={() => setCurrentIndex((i) => (i + 1) % flat.length)}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all hover:scale-110 flex-shrink-0"
                aria-label="Next media"
              >
                <ChevronRight className="h-7 w-7 text-white" />
              </button>
            </div>

            {/* Caption and counter */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="text-white font-semibold text-lg">
                  {flat[currentIndex].companyName}
                </span>
                <span className="text-white/60">•</span>
                <span className="text-white/80 text-sm">
                  {flat[currentIndex].type === "video" ? "Video" : "Photo"} {currentIndex + 1} of {flat.length}
                </span>
              </div>
            </div>

            {/* Thumbnail navigation strip */}
            <div className="mt-6 flex gap-2 justify-center overflow-x-auto pb-2 px-4">
              {flat.slice(Math.max(0, currentIndex - 4), Math.min(flat.length, currentIndex + 5)).map((item, idx) => {
                const actualIndex = Math.max(0, currentIndex - 4) + idx;
                return (
                  <button
                    key={actualIndex}
                    onClick={() => setCurrentIndex(actualIndex)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ${
                      actualIndex === currentIndex
                        ? 'ring-2 ring-white scale-110 shadow-xl'
                        : 'opacity-50 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    {item.type === "image" ? (
                      <img
                        src={item.src}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <Play className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CompanyGallery;
