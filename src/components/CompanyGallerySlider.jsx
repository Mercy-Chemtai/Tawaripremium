"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/**
 * CompanyGallerySlider
 * Props:
 *  - images: array of image URLs (strings)
 *  - autoplay: boolean (default true)
 *  - interval: ms (default 4000)
 *
 * Usage:
 *  <CompanyGallerySlider images={[
 *    "/images/gallery-1.jpg",
 *    "/images/gallery-2.jpg",
 *    "/images/gallery-3.jpg",
 *  ]} />
 */
export default function CompanyGallerySlider({
  images = [],
  autoplay = true,
  interval = 4000,
}) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  // autoplay
  useEffect(() => {
    if (!autoplay || isPaused || images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(intervalRef.current);
  }, [autoplay, isPaused, interval, images.length]);

  // keyboard navigation for lightbox + slider
  useEffect(() => {
    const onKey = (e) => {
      if (lightboxOpen) {
        if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
        if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
        if (e.key === "Escape") setLightboxOpen(false);
      } else {
        if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
        if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, images.length]);

  // touch / swipe
  const touchStartX = useRef(0);
  const touchCurrentX = useRef(0);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches?.[0]?.clientX ?? 0;
    touchCurrentX.current = touchStartX.current;
    setIsPaused(true);
  };
  const onTouchMove = (e) => {
    touchCurrentX.current = e.touches?.[0]?.clientX ?? touchCurrentX.current;
  };
  const onTouchEnd = () => {
    const dx = touchCurrentX.current - touchStartX.current;
    const threshold = 40;
    if (dx > threshold) setIndex((i) => (i - 1 + images.length) % images.length);
    else if (dx < -threshold) setIndex((i) => (i + 1) % images.length);
    touchStartX.current = 0;
    touchCurrentX.current = 0;
    setTimeout(() => setIsPaused(false), 300);
  };

  if (!images || images.length === 0) {
    return <div className="text-gray-500">No gallery images yet.</div>;
  }

  return (
    <div className="w-full">
      {/* Main slider area */}
      <div
        ref={containerRef}
        className="relative rounded-lg overflow-hidden bg-gray-100"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="w-full h-64 sm:h-72 md:h-96 lg:h-[520px] flex items-center justify-center bg-black"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* current image */}
          <button
            onClick={() => setLightboxOpen(true)}
            className="w-full h-full flex items-center justify-center focus:outline-none"
            aria-label="Open image in lightbox"
          >
            <img
              src={images[index]}
              alt={`Gallery image ${index + 1}`}
              loading="lazy"
              className="object-contain w-full h-full"
              onError={(e) => (e.currentTarget.src = "/fallback-product.png")}
            />
          </button>
        </div>

        {/* Prev / Next controls */}
        <button
          onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 shadow hover:bg-white"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={() => setIndex((i) => (i + 1) % images.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 shadow hover:bg-white"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* counter */}
        <div className="absolute right-4 bottom-4 z-20 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
          {index + 1} / {images.length}
        </div>
      </div>

      {/* thumbnails */}
      <div className="mt-3 flex gap-2 overflow-x-auto py-1">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-md overflow-hidden border-2 ${
              i === index ? "border-indigo-500" : "border-transparent"
            } focus:outline-none`}
            aria-label={`Go to image ${i + 1}`}
          >
            <img src={src} alt={`thumb ${i + 1}`} loading="lazy" className="w-full h-full object-cover" onError={(e)=>e.currentTarget.src="/fallback-product.png"} />
          </button>
        ))}
      </div>

      {/* Lightbox modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setLightboxOpen(false)} />
          <div className="relative max-w-[95vw] max-h-[95vh] w-full bg-transparent flex items-center justify-center">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-3 right-3 z-30 p-2 rounded-full bg-white/90"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
              className="absolute left-3 z-30 p-2 rounded-full bg-white/90"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="max-w-full max-h-full flex items-center justify-center">
              <img src={images[index]} alt={`Large ${index + 1}`} className="max-w-full max-h-[85vh] object-contain rounded" onError={(e)=>e.currentTarget.src="/fallback-product.png"} />
            </div>

            <button
              onClick={() => setIndex((i) => (i + 1) % images.length)}
              className="absolute right-3 z-30 p-2 rounded-full bg-white/90"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
