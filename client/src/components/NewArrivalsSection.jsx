import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import QuickViewModal from './QuickViewModal';
import { ArrowRight } from 'lucide-react';

export default function NewArrivalsSection({ products = [] }) {
  const [selectedQuickView, setSelectedQuickView] = useState(null);

  const displayProducts = products.length > 0 ? products.slice(0, 4) : [];

  return (
    <section className="py-24 bg-[#EFE7DC] text-[#29231F] border-b border-[#EFE7DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#241C18]/10 pb-6 gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-sans font-bold tracking-super-wide uppercase text-[#B4975A]">
              FRESH OFF THE LOOM
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#241C18]">
              New Arrivals
            </h2>
          </div>

          <Link
            to="/shop?sort=newest"
            className="inline-flex items-center space-x-2 text-xs font-sans font-semibold tracking-widest text-[#241C18] hover:text-[#B4975A] uppercase border-b border-[#241C18] pb-1 transition-colors self-start md:self-auto"
          >
            <span>VIEW ALL NEW ARRIVALS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Products Desktop / Horizontal Scroll Mobile */}
        <div className="flex md:grid md:grid-cols-4 gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 md:pb-0">
          {displayProducts.map((product) => (
            <div key={product._id} className="min-w-[260px] sm:min-w-[280px] md:min-w-0 snap-center">
              <ProductCard
                product={product}
                onQuickView={(p) => setSelectedQuickView(p)}
              />
            </div>
          ))}
        </div>

      </div>

      {selectedQuickView && (
        <QuickViewModal
          product={selectedQuickView}
          onClose={() => setSelectedQuickView(null)}
        />
      )}
    </section>
  );
}
