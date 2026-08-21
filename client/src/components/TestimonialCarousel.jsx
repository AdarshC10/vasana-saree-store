import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sundaram',
    role: 'Verified Customer • Bengaluru',
    review: 'The Royal Crimson Kanjivaram saree exceeded every expectation for my wedding day. The weight of the pure silk, the interlocked Korvai border, and the SilkMark certification made me feel like royalty.',
    rating: 5
  },
  {
    id: 2,
    name: 'Ananya Sharma',
    role: 'Verified Customer • Mumbai',
    review: 'VASANA has set a new standard for Indian luxury fashion online. The packaging, express delivery, and bespoke blouse fitting were flawless. The Banarasi silk jaal is breathtaking.',
    rating: 5
  },
  {
    id: 3,
    name: 'Meera Kapoor',
    role: 'Verified Customer • New Delhi',
    review: 'I bought the Tissue Organza for a family reception. The sheer glass sheen and delicate zardozi embroidery drew endless compliments all evening. Truly an heirloom piece.',
    rating: 5
  }
];

export default function TestimonialCarousel() {
  const [curr, setCurr] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurr((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[curr];

  return (
    <section className="py-24 bg-[#F7F3ED] text-[#29231F] border-b border-[#EFE7DC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        <div className="space-y-2">
          <span className="text-[10px] font-sans font-bold tracking-super-wide uppercase text-[#B4975A]">
            CLIENT TESTIMONIALS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#241C18]">
            Moments Celebrated in Vasana
          </h2>
          <div className="w-12 h-[1px] bg-[#B4975A] mx-auto mt-4" />
        </div>

        <div className="bg-white border border-[#EFE7DC] p-8 sm:p-12 shadow-luxury relative min-h-[220px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="flex justify-center text-amber-500">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>

              <p className="font-serif text-lg sm:text-2xl text-[#241C18] italic leading-relaxed font-light">
                "{t.review}"
              </p>

              <div>
                <strong className="block font-sans text-xs font-bold uppercase tracking-wider text-[#241C18]">
                  {t.name}
                </strong>
                <span className="text-[10px] font-sans text-[#B4975A] font-medium">
                  {t.role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicators */}
        <div className="flex justify-center items-center space-x-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurr(idx)}
              className={`transition-all duration-300 rounded-full ${
                curr === idx ? 'w-6 h-1.5 bg-[#B4975A]' : 'w-1.5 h-1.5 bg-[#241C18]/30'
              }`}
              aria-label={`Testimonial ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
