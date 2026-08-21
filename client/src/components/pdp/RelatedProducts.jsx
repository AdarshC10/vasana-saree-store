import React from 'react';
import SareeProductCard from '../SareeProductCard';
import { fallbackProducts } from '../../utils/fallbackData';

export default function RelatedProducts({ currentProduct }) {
  if (!currentProduct) return null;

  // Filter recommendations matching category, fabric, or occasion
  let recommendations = fallbackProducts.filter((p) => p._id !== currentProduct._id);

  if (currentProduct.category) {
    const sameCat = recommendations.filter((p) => p.category === currentProduct.category);
    if (sameCat.length >= 2) recommendations = sameCat;
  }

  const displayList = recommendations.slice(0, 4);

  return (
    <section className="py-16 border-t border-[#EFE7DC] text-[#29231F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-1">
          <span className="text-[10px] font-sans font-bold tracking-super-wide text-[#B4975A] uppercase">
            CURATED SELECTION
          </span>
          <h2 className="font-serif text-3xl font-light text-[#241C18]">
            You May Also Like
          </h2>
          <div className="w-12 h-[1px] bg-[#B4975A] mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayList.map((p) => (
            <SareeProductCard key={p._id} product={p} />
          ))}
        </div>

      </div>
    </section>
  );
}
