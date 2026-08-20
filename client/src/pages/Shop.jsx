import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import api from '../services/api';
import { Filter, SlidersHorizontal, ChevronDown, X, RefreshCw, Search } from 'lucide-react';

const categories = ['Banarasi', 'Kanjeevaram', 'Chanderi', 'Organza', 'Linen', 'Georgette', 'Tussar Silk', 'Velvet', 'Handloom Cotton'];
const occasions = ['Wedding', 'Festive', 'Everyday', 'Party', 'Bridal', 'Formal'];
const collections = ['Silk Stories', 'Wedding Edit', 'Festive Collection', 'Everyday Grace', 'Royalty'];
const colors = ['Crimson Red', 'Emerald Green', 'Dusty Rose', 'Midnight Blue', 'Maroon', 'Mustard Gold', 'Ivory White', 'Sage Green', 'Deep Plum', 'Orange', 'Teal Blue', 'Pistachio Green'];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedOccasion, setSelectedOccasion] = useState(searchParams.get('occasion') || '');
  const [selectedCollection, setSelectedCollection] = useState(searchParams.get('collection') || '');
  const [selectedColor, setSelectedColor] = useState(searchParams.get('color') || '');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '50000');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');
  
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedQuickView, setSelectedQuickView] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [searchParams, page, sort]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', 12);
      params.append('sort', sort);

      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedOccasion) params.append('occasion', selectedOccasion);
      if (selectedCollection) params.append('collection', selectedCollection);
      if (selectedColor) params.append('color', selectedColor);
      if (searchQuery) params.append('search', searchQuery);
      if (maxPrice && maxPrice !== '50000') params.append('maxPrice', maxPrice);

      if (searchParams.get('newArrival')) params.append('newArrival', 'true');
      if (searchParams.get('featured')) params.append('featured', 'true');

      const res = await api.get(`/products?${params.toString()}`);
      setProducts(res.data.products || []);
      setTotal(res.data.total || 0);
      setTotalPages(res.data.pages || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedOccasion) params.set('occasion', selectedOccasion);
    if (selectedCollection) params.set('collection', selectedCollection);
    if (selectedColor) params.set('color', selectedColor);
    if (searchQuery) params.set('search', searchQuery);
    if (maxPrice && maxPrice !== '50000') params.set('maxPrice', maxPrice);
    if (sort) params.set('sort', sort);
    
    setPage(1);
    setSearchParams(params);
    setMobileFilterOpen(false);
  };

  const clearAllFilters = () => {
    setSelectedCategory('');
    setSelectedOccasion('');
    setSelectedCollection('');
    setSelectedColor('');
    setSearchQuery('');
    setMaxPrice('50000');
    setSort('newest');
    setSearchParams({});
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-vasana-bg pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Banner Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-sans tracking-super-wide text-vasana-gold uppercase font-bold">
            THE LUXURY CATALOGUE
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-vasana-dark mt-1">
            Handcrafted Saree Collection
          </h1>
          <p className="text-xs font-sans text-gray-500 mt-2">
            Showing {total} exquisite pieces woven by master artisans
          </p>
          <div className="w-12 h-[2px] bg-vasana-gold mx-auto mt-4" />
        </div>

        {/* Top Control Bar: Mobile Filter Button & Sort Dropdown */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-y border-vasana-rose/50 py-4 mb-8 gap-4">
          
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden w-full sm:w-auto py-2.5 px-4 border border-vasana-gold text-vasana-dark text-xs font-sans font-bold tracking-widest uppercase flex items-center justify-center space-x-2"
          >
            <SlidersHorizontal className="w-4 h-4 text-vasana-burgundy" />
            <span>FILTER SAREES</span>
          </button>

          {/* Active Filter Badges */}
          <div className="hidden lg:flex flex-wrap gap-2 items-center text-xs">
            <span className="text-gray-400 uppercase font-sans font-semibold text-[10px]">Filters:</span>
            {selectedCategory && (
              <span className="bg-vasana-rose/40 text-vasana-burgundy px-2.5 py-1 flex items-center space-x-1 font-sans">
                <span>Category: {selectedCategory}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => { setSelectedCategory(''); applyFilters(); }} />
              </span>
            )}
            {selectedOccasion && (
              <span className="bg-vasana-rose/40 text-vasana-burgundy px-2.5 py-1 flex items-center space-x-1 font-sans">
                <span>Occasion: {selectedOccasion}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => { setSelectedOccasion(''); applyFilters(); }} />
              </span>
            )}
            {(selectedCategory || selectedOccasion || searchQuery) && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-vasana-gold hover:underline font-sans ml-2"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <span className="text-xs font-sans text-gray-500 uppercase tracking-wider shrink-0">Sort By:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white border border-gray-300 py-2 px-3 text-xs font-sans focus:outline-none focus:border-vasana-gold"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="popularity">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Main Grid & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block space-y-6 pr-4 border-r border-vasana-rose/40">
            <div className="flex items-center justify-between pb-4 border-b border-vasana-rose">
              <h3 className="font-serif text-xl font-light text-vasana-dark">Filter By</h3>
              <button onClick={clearAllFilters} className="text-xs text-vasana-gold hover:underline font-sans">Reset</button>
            </div>

            {/* Keyword Search */}
            <div>
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-vasana-dark block mb-2">
                Keyword Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
                  placeholder="e.g. Silk, Banarasi, Zari..."
                  className="w-full bg-white border border-gray-300 py-2 px-3 pr-8 text-xs focus:outline-none focus:border-vasana-gold"
                />
                <button onClick={applyFilters} className="absolute right-2 top-2 text-vasana-gold">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-vasana-dark block mb-2">
                Category / Craft
              </label>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-2 text-xs font-sans">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center space-x-2 cursor-pointer hover:text-vasana-burgundy">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
                      className="accent-vasana-burgundy"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Occasion */}
            <div>
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-vasana-dark block mb-2">
                Occasion
              </label>
              <div className="space-y-1.5 text-xs font-sans">
                {occasions.map((occ) => (
                  <label key={occ} className="flex items-center space-x-2 cursor-pointer hover:text-vasana-burgundy">
                    <input
                      type="radio"
                      name="occasion"
                      checked={selectedOccasion === occ}
                      onChange={() => setSelectedOccasion(selectedOccasion === occ ? '' : occ)}
                      className="accent-vasana-burgundy"
                    />
                    <span>{occ}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Collection */}
            <div>
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-vasana-dark block mb-2">
                Collection
              </label>
              <div className="space-y-1.5 text-xs font-sans">
                {collections.map((coll) => (
                  <label key={coll} className="flex items-center space-x-2 cursor-pointer hover:text-vasana-burgundy">
                    <input
                      type="radio"
                      name="collection"
                      checked={selectedCollection === coll}
                      onChange={() => setSelectedCollection(selectedCollection === coll ? '' : coll)}
                      className="accent-vasana-burgundy"
                    />
                    <span>{coll}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <div className="flex justify-between items-center text-xs font-sans mb-2">
                <span className="font-bold uppercase tracking-wider text-vasana-dark">Max Price</span>
                <span className="font-bold text-vasana-burgundy">₹{Number(maxPrice).toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="50000"
                step="2500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full accent-vasana-gold"
              />
            </div>

            <button
              onClick={applyFilters}
              className="w-full py-3 bg-vasana-burgundy hover:bg-vasana-burgundyDark text-white text-xs font-sans font-bold tracking-widest uppercase transition-colors"
            >
              APPLY FILTERS
            </button>

          </div>

          {/* Product Listing Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-gray-200 animate-pulse" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 bg-white border border-vasana-rose/50 p-8">
                <h3 className="font-serif text-3xl font-light text-vasana-dark mb-2">
                  NO SAREES FOUND
                </h3>
                <p className="text-xs font-sans text-gray-500 mb-6 max-w-sm mx-auto">
                  We couldn't find any sarees matching your selected filter criteria. Try resetting filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-vasana-gold text-vasana-dark text-xs font-sans font-bold tracking-widest uppercase hover:bg-vasana-goldLight"
                >
                  RESET ALL FILTERS
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {products.map((prod) => (
                    <ProductCard
                      key={prod._id}
                      product={prod}
                      onQuickView={(p) => setSelectedQuickView(p)}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-3 mt-14">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage(page - 1)}
                      className="px-4 py-2 border border-gray-300 text-xs disabled:opacity-40"
                    >
                      Previous
                    </button>
                    <span className="text-xs font-sans font-medium text-vasana-dark">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      disabled={page === totalPages}
                      onClick={() => setPage(page + 1)}
                      className="px-4 py-2 border border-gray-300 text-xs disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Drawer Filter Sheet */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileFilterOpen(false)} />
          <div className="relative bg-vasana-bg p-6 max-h-[85vh] overflow-y-auto z-10 space-y-6">
            <div className="flex items-center justify-between border-b border-vasana-rose pb-4">
              <h3 className="font-serif text-2xl font-light">Filter Sarees</h3>
              <button onClick={() => setMobileFilterOpen(false)}><X className="w-6 h-6" /></button>
            </div>
            
            {/* Category */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider block mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 bg-white border border-gray-300 text-xs"
              >
                <option value="">All Categories</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Occasion */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider block mb-2">Occasion</label>
              <select
                value={selectedOccasion}
                onChange={(e) => setSelectedOccasion(e.target.value)}
                className="w-full p-2 bg-white border border-gray-300 text-xs"
              >
                <option value="">All Occasions</option>
                {occasions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            <div className="flex space-x-3 pt-4">
              <button onClick={clearAllFilters} className="flex-1 py-3 border border-gray-300 text-xs font-bold uppercase">
                Reset
              </button>
              <button onClick={applyFilters} className="flex-1 py-3 bg-vasana-burgundy text-white text-xs font-bold uppercase">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {selectedQuickView && (
        <QuickViewModal
          product={selectedQuickView}
          onClose={() => setSelectedQuickView(null)}
        />
      )}
    </div>
  );
}
