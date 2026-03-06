import React, { useState } from "react";

/**
 * ImageGallery component
 * Displays a main image with clickable thumbnails underneath.
 *
 * Props:
 *  - images: array of image URLs (required)
 *  - alt: alt text for accessibility (optional)
 *
 * Example usage:
 *  <ImageGallery images={[image1, image2, image3]} alt="Product" />
 */

const ImageGallery = ({ images = [], alt = "Product image" }) => {
  const [selected, setSelected] = useState(images[0]);

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center border rounded-md h-64 bg-gray-50 text-gray-400">
        No images available
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      {/* Main Image */}
      <div className="w-full max-w-lg border rounded-lg overflow-hidden">
        <img
          src={selected}
          alt={alt}
          className="object-contain w-full h-96 bg-white"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex flex-wrap gap-3 justify-center mt-4">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(img)}
            className={`border rounded-md overflow-hidden w-20 h-20 p-1 ${
              selected === img
                ? "border-blue-500 ring-2 ring-blue-400"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <img
              src={img}
              alt={`${alt} thumbnail ${idx + 1}`}
              className="object-cover w-full h-full rounded-sm"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
