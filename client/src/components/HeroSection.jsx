import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=85',
    tag: 'THE HERITAGE EDIT',
    title: 'Woven for your moments.',
    subtitle: 'Timeless Indian sarees, thoughtfully curated for celebrations, rituals and everything in between.'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=2000&q=85',
    tag: 'ROYAL BRIDAL TROUSSEAU',
    title: 'Heirloom Kanjivaram Silks',
    subtitle: 'Woven over 240 hours by hereditary master weavers in Kanchipuram.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=2000&q=85',
    tag: 'MODERN FESTIVE ELEGANCE',
    title: 'Varanasi Kadwa Zari',
    subtitle: 'Authentic Banarasi brocades created for unforgettable celebrations.'
  }
];

export default function HeroSection() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentIdx];

  return (
    <section className="relative h-screen w-full bg-[#241C18] text-white overflow-hidden flex items-center justify-center">
      {/* Background Image Carousel with Zoom Motion */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center brightness-75"
          />
          {/* Subtle Luxury Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#241C18]/90 via-[#241C18]/30 to-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pt-20">
        
        {/* Subtle Tag */}
        <motion.span
          key={`tag-${slide.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-block text-[10px] sm:text-xs font-sans font-bold tracking-super-wide uppercase text-[#B4975A]"
        >
          {slide.tag}
        </motion.span>

        {/* Headline */}
        <motion.h1
          key={`title-${slide.id}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F7F3ED] leading-tight tracking-tight"
        >
          {slide.title}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          key={`sub-${slide.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-sans text-xs sm:text-sm text-[#EFE7DC]/90 max-w-2xl mx-auto font-light leading-relaxed tracking-wide"
        >
          {slide.subtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link
            to="/shop"
            className="w-full sm:w-auto px-8 py-4 bg-[#B4975A] hover:bg-[#C5AC73] text-[#241C18] text-xs font-sans font-bold tracking-super-wide uppercase transition-all duration-300 shadow-luxury flex items-center justify-center space-x-2"
          >
            <span>EXPLORE COLLECTION</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/about"
            className="w-full sm:w-auto px-8 py-4 border border-[#F7F3ED]/40 text-[#F7F3ED] hover:bg-[#F7F3ED] hover:text-[#241C18] text-xs font-sans font-bold tracking-super-wide uppercase transition-all duration-300"
          >
            <span>DISCOVER VASANA</span>
          </Link>
        </motion.div>

      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center items-center space-x-3">
        {heroSlides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentIdx(idx)}
            className={`transition-all duration-500 rounded-full ${
              currentIdx === idx ? 'w-8 h-1.5 bg-[#B4975A]' : 'w-2 h-1.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
