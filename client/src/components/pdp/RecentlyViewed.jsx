import React, { useState, useEffect } from 'react';
import SareeProductCard from '../SareeProductCard';
import { fallbackProducts } from '../../utils/fallbackData';

export default function RecentlyViewed({ currentProductId }) {
  const [recentList, setRecentList] = useState([]);

  useEffect(() => {
    if (!currentProductId) return;

    try {
      const saved = JSON.parse(localStorage.getItem('vasana_recent_viewed') || '[]');
      const updated = [currentProductId, ...saved.filter(id => id !== currentProductId)].slice(0, 8);
      localStorage.setItem('vasana_recent_viewed', JSON.stringify(updated));

      // Match IDs with fallback products
      const items = updated
        .filter(id => id !== currentProductId)
        .map(id => fallbackProducts.find(p => p._id === id || p.slug === id))
        .filter(Boolean);

      setRecentList(items.slice(0, 4));
    } catch (e) {}
  }, [currentProductId]);

  if (!recentList.length) return null;

  return (
    <section className="py-16 border-t border-[#EFE7DC] text-[#29231F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-1">
          <span className="text-[10px] font-sans font-bold tracking-super-wide text-[#B4975A] uppercase">
            YOUR BROWSING HISTORY
          </span>
          <h2 className="font-serif text-3xl font-light text-[#241C18]">
            Recently Viewed
          </h2>
          <div className="w-12 h-[1px] bg-[#B4975A] mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentList.map((p) => (
            <SareeProductCard key={p._id} product={p} />
          ))}
        </div>

      </div>
    </section>
  );
}
