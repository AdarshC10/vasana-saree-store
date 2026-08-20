import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const popularSearches = [
  'Silk Saree',
  'Banarasi Saree',
  'Wedding Saree',
  'Kanchipuram Saree',
  'Organza Saree',
  'Chanderi Silk'
];

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      onClose();
      setQuery('');
    }
  };

  const handleSelectPopular = (term) => {
    navigate(`/shop?search=${encodeURIComponent(term)}`);
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col bg-vasana-bg/98 backdrop-blur-xl p-4 sm:p-8 md:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto w-full">
          {/* Header Close */}
          <div className="flex justify-end mb-8">
            <button
              onClick={onClose}
              className="p-2 text-vasana-dark hover:text-vasana-burgundy transition-colors flex items-center space-x-1 text-xs tracking-widest font-sans font-medium"
            >
              <span>CLOSE</span>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative mb-12">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH SAREES, FABRICS, OCCASIONS..."
              autoFocus
              className="w-full bg-transparent border-b-2 border-vasana-gold/50 focus:border-vasana-burgundy py-4 pl-2 pr-12 text-2xl sm:text-3xl font-serif text-vasana-dark placeholder:text-gray-400 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-vasana-burgundy hover:text-vasana-gold transition-colors"
            >
              <ArrowRight className="w-8 h-8" />
            </button>
          </form>

          {/* Popular Searches */}
          <div>
            <div className="flex items-center space-x-2 text-xs font-sans tracking-super-wide text-vasana-gold font-bold uppercase mb-4">
              <Sparkles className="w-4 h-4 text-vasana-gold" />
              <span>Popular Searches</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => handleSelectPopular(term)}
                  className="px-4 py-2 border border-vasana-rose hover:border-vasana-burgundy hover:bg-vasana-burgundy hover:text-white text-vasana-dark text-xs tracking-wider font-sans transition-all duration-300"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
