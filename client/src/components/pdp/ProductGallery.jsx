import React, { useState } from 'react';
import { Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

export default function ProductGallery({ images = [], name = 'Saree' }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const galleryImages = images.length > 0
    ? images
    : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85'];

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 items-start">
        
        {/* Desktop Vertical Thumbnail Strip */}
        <div className="hidden lg:flex flex-col space-y-3 max-h-[600px] overflow-y-auto no-scrollbar shrink-0 w-20">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className={`w-20 h-24 border overflow-hidden transition-all duration-300 ${
                selectedIdx === idx
                  ? 'border-[#241C18] ring-2 ring-[#B4975A]/40 scale-95'
                  : 'border-[#EFE7DC] opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Main Image Display Box */}
        <div className="relative flex-1 aspect-[3/4] bg-[#241C18] border border-[#EFE7DC] shadow-luxury overflow-hidden group w-full">
          <img
            src={galleryImages[selectedIdx]}
            alt={name}
            onClick={() => setLightboxOpen(true)}
            className="w-full h-full object-cover object-center cursor-zoom-in group-hover:scale-105 transition-transform duration-700 brightness-95"
          />

          {/* Full-Screen Lightbox Trigger Button */}
          <button
            onClick={() => setLightboxOpen(true)}
            className="absolute bottom-4 right-4 p-3 bg-white/90 backdrop-blur-md text-[#241C18] hover:bg-[#241C18] hover:text-white transition-colors shadow-md"
            title="Expand Gallery"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Mobile Previous / Next Quick Arrows */}
          {galleryImages.length > 1 && (
            <div className="flex lg:hidden justify-between absolute inset-x-2 top-1/2 -translate-y-1/2 pointer-events-none">
              <button
                onClick={() => setSelectedIdx((selectedIdx - 1 + galleryImages.length) % galleryImages.length)}
                className="p-2 bg-white/80 backdrop-blur-md text-[#241C18] pointer-events-auto rounded-full shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSelectedIdx((selectedIdx + 1) % galleryImages.length)}
                className="p-2 bg-white/80 backdrop-blur-md text-[#241C18] pointer-events-auto rounded-full shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Mobile Counter Badge (1 / 6) */}
      <div className="block lg:hidden text-center mt-3">
        <span className="inline-block text-[11px] font-sans font-bold tracking-widest text-[#B4975A] uppercase bg-[#EFE7DC] px-3 py-1 border border-[#B4975A]/20">
          {selectedIdx + 1} / {galleryImages.length}
        </span>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <ImageLightbox
          images={galleryImages}
          selectedIndex={selectedIdx}
          onClose={() => setLightboxOpen(false)}
          onNavigate={(idx) => setSelectedIdx(idx)}
        />
      )}
    </>
  );
}
