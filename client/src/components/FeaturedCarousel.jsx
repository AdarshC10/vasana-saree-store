import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

export default function FeaturedCarousel({ title, subtitle, products, onQuickView }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="py-16 bg-white border-b border-vasana-rose/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-sans tracking-super-wide text-vasana-gold uppercase font-bold">
              HANDPICKED HEIRLOOMS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-vasana-dark mt-1">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs font-sans text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>

          {/* Carousel Buttons */}
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 border border-vasana-gold/50 text-vasana-dark hover:bg-vasana-gold hover:text-white transition-colors"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 border border-vasana-gold/50 text-vasana-dark hover:bg-vasana-gold hover:text-white transition-colors"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Track */}
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto no-scrollbar pb-6 scroll-smooth snap-x snap-mandatory"
        >
          {products.map((product) => (
            <div key={product._id} className="min-w-[260px] sm:min-w-[290px] md:min-w-[320px] snap-start">
              <ProductCard product={product} onQuickView={onQuickView} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
