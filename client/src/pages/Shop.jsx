import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import api from '../services/api';
import { fallbackProducts } from '../utils/fallbackData';
import { SlidersHorizontal, X, Search, RotateCcw } from 'lucide-react';

const categories = ['Banarasi', 'Kanjeevaram', 'Chanderi', 'Organza', 'Linen', 'Georgette', 'Tussar Silk', 'Velvet', 'Handloom Cotton'];
const occasions = ['Wedding', 'Festive', 'Everyday', 'Party', 'Bridal', 'Formal'];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rawProducts, setRawProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(false);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedOccasion, setSelectedOccasion] = useState(searchParams.get('occasion') || '');
  const [selectedCollection, setSelectedCollection] = useState(searchParams.get('collection') || '');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '50000');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');
  
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedQuickView, setSelectedQuickView] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products?limit=50');
      if (Array.isArray(res.data?.products) && res.data.products.length > 0) {
        setRawProducts(res.data.products);
      } else {
        setRawProducts(fallbackProducts);
      }
    } catch (error) {
      setRawProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  };

  // Live Reactive Filtered Products (recalculates immediately when maxPrice or any filter moves)
  const filteredProducts = useMemo(() => {
    let list = [...rawProducts];

    if (selectedCategory) {
      list = list.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (selectedOccasion) {
      list = list.filter(p => p.occasion?.toLowerCase() === selectedOccasion.toLowerCase());
    }

    if (selectedCollection) {
      list = list.filter(p => p.collectionType?.toLowerCase() === selectedCollection.toLowerCase());
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.name?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        (p.fabric && p.fabric.toLowerCase().includes(q))
      );
    }

    if (maxPrice) {
      const limit = Number(maxPrice);
      list = list.filter(p => {
        const itemPrice = p.discount ? Math.round((p.originalPrice || p.price) * (1 - p.discount / 100)) : p.price;
        return itemPrice <= limit;
      });
    }

    if (sort === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      list.sort((a, b) => (b.rating || 4.5) - (a.rating || 4.5));
    }

    return list;
  }, [rawProducts, selectedCategory, selectedOccasion, selectedCollection, searchQuery, maxPrice, sort]);

  const clearAllFilters = () => {
    setSelectedCategory('');
    setSelectedOccasion('');
    setSelectedCollection('');
    setSearchQuery('');
    setMaxPrice('50000');
    setSort('newest');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-[#F7F3ED] text-[#29231F] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Banner Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[10px] font-sans tracking-super-wide text-[#B4975A] uppercase font-bold">
            HAUTE COUTURE CATALOGUE
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#241C18] mt-1">
            Handcrafted Saree Collection
          </h1>
          <p className="text-xs font-sans text-gray-500 font-light mt-2">
            Showing {filteredProducts.length} heirloom pieces woven by hereditary master artisans
          </p>
          <div className="w-12 h-[1px] bg-[#B4975A] mx-auto mt-4" />
        </div>

        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-y border-[#EFE7DC] py-4 gap-4">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden w-full sm:w-auto py-2.5 px-4 border border-[#B4975A] text-[#241C18] text-xs font-sans font-bold tracking-widest uppercase flex items-center justify-center space-x-2 shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#B4975A]" />
            <span>FILTER SAREES</span>
          </button>

          <div className="hidden lg:flex flex-wrap gap-2 items-center text-xs font-sans">
            <span className="text-gray-400 uppercase font-semibold text-[10px]">Active Filters:</span>
            {selectedCategory && (
              <span className="bg-[#EFE7DC] text-[#241C18] px-2.5 py-1 flex items-center space-x-1 rounded">
                <span>Category: {selectedCategory}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('')} />
              </span>
            )}
            {selectedOccasion && (
              <span className="bg-[#EFE7DC] text-[#241C18] px-2.5 py-1 flex items-center space-x-1 rounded">
                <span>Occasion: {selectedOccasion}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedOccasion('')} />
              </span>
            )}
            {maxPrice !== '50000' && (
              <span className="bg-[#EFE7DC] text-[#241C18] px-2.5 py-1 flex items-center space-x-1 rounded">
                <span>Max Price: ≤ ₹{Number(maxPrice).toLocaleString('en-IN')}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => setMaxPrice('50000')} />
              </span>
            )}
            {(selectedCategory || selectedOccasion || searchQuery || maxPrice !== '50000') && (
              <button onClick={clearAllFilters} className="text-xs text-[#B4975A] hover:underline font-semibold ml-2">
                Clear All
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <span className="text-xs font-sans text-gray-500 uppercase tracking-wider shrink-0 font-medium">Sort By:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white border border-[#EFE7DC] py-2 px-3 text-xs font-sans focus:outline-none focus:border-[#B4975A] text-[#241C18] shadow-sm rounded"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Main Grid & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block space-y-6 pr-4 border-r border-[#EFE7DC]">
            <div className="flex items-center justify-between pb-4 border-b border-[#EFE7DC]">
              <h3 className="font-serif text-xl font-light text-[#241C18]">Filter By</h3>
              <button onClick={clearAllFilters} className="text-xs text-[#B4975A] hover:underline font-sans font-semibold">Reset All</button>
            </div>

            {/* Keyword Search */}
            <div>
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-[#241C18] block mb-2">Search Sarees</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Silk, Banarasi, Zari..."
                  className="w-full bg-white border border-[#EFE7DC] py-2 px-3 pr-8 text-xs focus:outline-none focus:border-[#B4975A] rounded"
                />
                <Search className="w-4 h-4 text-[#B4975A] absolute right-2.5 top-2.5" />
              </div>
            </div>

            {/* LIVE DYNAMIC MAX PRICE FILTER SLIDER */}
            <div className="p-4 bg-white border border-[#EFE7DC] rounded-lg shadow-sm space-y-3">
              <div className="flex justify-between items-center text-xs font-sans">
                <span className="font-bold uppercase tracking-wider text-[#241C18]">MAX PRICE</span>
                <strong className="font-sans text-base text-[#B4975A]">₹{Number(maxPrice).toLocaleString('en-IN')}</strong>
              </div>
              <input
                type="range"
                min="1800"
                max="50000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full accent-[#B4975A] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-sans text-gray-400 font-medium">
                <span>₹1,800</span>
                <span>₹50,000</span>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-[#241C18] block mb-2">Category</label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2 text-xs font-sans">
                <label className="flex items-center space-x-2 cursor-pointer hover:text-[#B4975A]">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === ''}
                    onChange={() => setSelectedCategory('')}
                    className="accent-[#241C18]"
                  />
                  <span className="font-semibold">All Categories</span>
                </label>
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center space-x-2 cursor-pointer hover:text-[#B4975A]">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
                      className="accent-[#241C18]"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Occasion Filter */}
            <div>
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-[#241C18] block mb-2">Occasion</label>
              <div className="space-y-2 text-xs font-sans">
                <label className="flex items-center space-x-2 cursor-pointer hover:text-[#B4975A]">
                  <input
                    type="radio"
                    name="occasion"
                    checked={selectedOccasion === ''}
                    onChange={() => setSelectedOccasion('')}
                    className="accent-[#241C18]"
                  />
                  <span className="font-semibold">All Occasions</span>
                </label>
                {occasions.map((occ) => (
                  <label key={occ} className="flex items-center space-x-2 cursor-pointer hover:text-[#B4975A]">
                    <input
                      type="radio"
                      name="occasion"
                      checked={selectedOccasion === occ}
                      onChange={() => setSelectedOccasion(selectedOccasion === occ ? '' : occ)}
                      className="accent-[#241C18]"
                    />
                    <span>{occ}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={clearAllFilters}
              className="w-full py-3 bg-[#241C18] hover:bg-[#322722] text-white text-xs font-sans font-bold tracking-widest uppercase transition-colors flex items-center justify-center space-x-2 rounded shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#B4975A]" />
              <span>RESET ALL FILTERS</span>
            </button>
          </div>

          {/* Product Listing Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white border border-[#EFE7DC] p-8 space-y-4 rounded-xl shadow-sm">
                <h3 className="font-serif text-3xl font-light text-[#241C18]">NO SAREES UNDER ₹{Number(maxPrice).toLocaleString('en-IN')}</h3>
                <p className="text-xs font-sans text-gray-500 max-w-sm mx-auto">Try adjusting the Max Price range slider or clear active category filters to see more sarees.</p>
                <button onClick={clearAllFilters} className="px-6 py-3 bg-[#B4975A] text-[#241C18] text-xs font-sans font-bold tracking-widest uppercase rounded shadow-luxury">
                  RESET PRICE & FILTERS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((prod) => (
                  <ProductCard key={prod._id} product={prod} onQuickView={(p) => setSelectedQuickView(p)} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filter Sheet */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileFilterOpen(false)} />
          <div className="relative bg-[#F7F3ED] p-6 max-h-[85vh] overflow-y-auto z-10 space-y-6 text-[#29231F] rounded-t-2xl shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#EFE7DC] pb-4">
              <h3 className="font-serif text-2xl font-light text-[#241C18]">Filter Sarees</h3>
              <button onClick={() => setMobileFilterOpen(false)}><X className="w-6 h-6" /></button>
            </div>
            
            {/* Mobile Max Price Slider */}
            <div className="p-4 bg-white border border-[#EFE7DC] rounded-lg space-y-3">
              <div className="flex justify-between items-center text-xs font-sans">
                <span className="font-bold uppercase tracking-wider text-[#241C18]">MAX PRICE</span>
                <strong className="font-sans text-base text-[#B4975A]">₹{Number(maxPrice).toLocaleString('en-IN')}</strong>
              </div>
              <input
                type="range"
                min="1800"
                max="50000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full accent-[#B4975A]"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                <span>₹1,800</span>
                <span>₹50,000</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider block mb-2">Category</label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full p-2.5 bg-white border border-[#EFE7DC] text-xs rounded">
                <option value="">All Categories</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider block mb-2">Occasion</label>
              <select value={selectedOccasion} onChange={(e) => setSelectedOccasion(e.target.value)} className="w-full p-2.5 bg-white border border-[#EFE7DC] text-xs rounded">
                <option value="">All Occasions</option>
                {occasions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            <div className="flex space-x-3 pt-4 border-t border-[#EFE7DC]">
              <button onClick={clearAllFilters} className="flex-1 py-3 border border-[#241C18] text-xs font-bold uppercase rounded">Reset All</button>
              <button onClick={() => setMobileFilterOpen(false)} className="flex-1 py-3 bg-[#241C18] text-white text-xs font-bold uppercase rounded">Done</button>
            </div>
          </div>
        </div>
      )}

      {selectedQuickView && (
        <QuickViewModal product={selectedQuickView} onClose={() => setSelectedQuickView(null)} />
      )}
    </div>
  );
}
