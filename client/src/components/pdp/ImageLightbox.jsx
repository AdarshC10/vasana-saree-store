import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageLightbox({ images = [], selectedIndex = 0, onClose, onNavigate }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((selectedIndex - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') onNavigate((selectedIndex + 1) % images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, images, onClose, onNavigate]);

  if (!images.length) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors z-10"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-6 text-xs font-sans font-bold tracking-widest text-[#B4975A] uppercase bg-black/60 px-3 py-1.5 border border-[#B4975A]/30">
        {selectedIndex + 1} / {images.length}
      </div>

      {/* Left Arrow */}
      {images.length > 1 && (
        <button
          onClick={() => onNavigate((selectedIndex - 1 + images.length) % images.length)}
          className="absolute left-6 p-3 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {/* Main Lightbox Image */}
      <div className="max-w-5xl max-h-[85vh] overflow-hidden flex items-center justify-center">
        <img
          src={images[selectedIndex]}
          alt={`Saree View ${selectedIndex + 1}`}
          className="max-w-full max-h-[85vh] object-contain shadow-2xl"
        />
      </div>

      {/* Right Arrow */}
      {images.length > 1 && (
        <button
          onClick={() => onNavigate((selectedIndex + 1) % images.length)}
          className="absolute right-6 p-3 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors"
          aria-label="Next Image"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}
    </div>
  );
}
