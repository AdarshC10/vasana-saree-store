import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    title: 'THE ART OF DRAPING',
    subtitle: 'Timeless sarees. Modern stories.',
    collection: 'Silk Stories',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=85',
    link: '/shop?collection=Silk+Stories'
  },
  {
    id: 2,
    title: 'THE WEDDING EDIT',
    subtitle: 'For the moments you\'ll remember forever.',
    collection: 'Wedding Edit',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=2000&q=85',
    link: '/wedding'
  },
  {
    id: 3,
    title: 'FESTIVE SPLENDOR',
    subtitle: 'Woven with gold threads and heritage Grace.',
    collection: 'Festive Collection',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=2000&q=85',
    link: '/shop?collection=Festive+Collection'
  },
  {
    id: 4,
    title: 'EVERYDAY ELEGANCE',
    subtitle: 'Breathtaking handlooms for effortless drape.',
    collection: 'Everyday Grace',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=85',
    link: '/shop?collection=Everyday+Grace'
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-vasana-dark">
      {/* Slide Image Background Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          {/* Subtle Dark Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-vasana-dark via-vasana-dark/40 to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content Overlay */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl space-y-6"
          >
            {/* Tag / Collection */}
            <span className="inline-block text-xs sm:text-sm font-sans tracking-super-wide text-vasana-gold uppercase font-semibold">
              {slide.collection}
            </span>

            {/* Main Heading */}
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider font-light leading-none">
              {slide.title}
            </h1>

            {/* Expanding Decorative Gold Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '80px' }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-[2px] bg-vasana-gold mx-auto"
            />

            {/* Subtitle */}
            <p className="font-serif text-lg sm:text-2xl text-vasana-rose/90 italic font-light">
              {slide.subtitle}
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <Link
                to={slide.link}
                className="inline-block px-8 py-4 bg-vasana-gold hover:bg-vasana-goldLight text-vasana-dark font-sans text-xs sm:text-sm tracking-super-wide font-bold uppercase transition-all duration-300 transform hover:-translate-y-0.5 shadow-luxury"
              >
                EXPLORE COLLECTION
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls: Left / Right Arrows */}
      <div className="absolute inset-y-0 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="pointer-events-auto p-3 rounded-full bg-black/30 hover:bg-vasana-gold text-white hover:text-vasana-dark backdrop-blur-md transition-all duration-300"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="pointer-events-auto p-3 rounded-full bg-black/30 hover:bg-vasana-gold text-white hover:text-vasana-dark backdrop-blur-md transition-all duration-300"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Pagination Dots & Scroll Down */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex flex-col items-center space-y-4">
        <div className="flex space-x-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                currentSlide === idx ? 'w-8 bg-vasana-gold' : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>
        <div className="animate-bounce text-vasana-gold/80 flex items-center space-x-1 text-[10px] tracking-widest font-sans uppercase">
          <span>Scroll</span>
          <ArrowDown className="w-3 h-3" />
        </div>
      </div>
    </section>
  );
}
