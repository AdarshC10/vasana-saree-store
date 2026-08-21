import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Eye, ArrowRight, Check, Sparkles, Feather, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

export default function SareeCardShowcase() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // 8 Specific Saree Product Variations
  const products = [
    {
      _id: 'prod_showcase_1',
      name: "Authentic Kerala Kasavu Cotton Saree",
      category: "Kerala Kasavu",
      price: 1701,
      originalPrice: 1890,
      discount: "10% OFF",
      rating: 4.8,
      reviews: 34,
      image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
      fabric: "Pure Kerala Cotton",
      style: 1
    },
    {
      _id: 'prod_showcase_2',
      name: "Traditional Bengal Handloom Tant Saree",
      category: "Bengal Tant",
      price: 1452,
      originalPrice: 1650,
      discount: "12% OFF",
      rating: 4.7,
      reviews: 28,
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1000&q=80",
      fabric: "Soft Handloom Cotton",
      style: 2
    },
    {
      _id: 'prod_showcase_3',
      name: "Pastel Mint Chanderi Semi-Silk Saree",
      category: "Chanderi Silk",
      price: 4050,
      originalPrice: 4500,
      discount: "10% OFF",
      rating: 4.7,
      reviews: 19,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
      fabric: "Chanderi Semi-Silk",
      style: 3
    },
    {
      _id: 'prod_showcase_4',
      name: "Royal Crimson Kanjivaram Pure Silk Saree",
      category: "Kanjivaram Silk",
      price: 31499,
      originalPrice: 34999,
      discount: "10% OFF",
      rating: 4.9,
      reviews: 42,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
      fabric: "3-Ply Mulberry Silk",
      style: 4
    },
    {
      _id: 'prod_showcase_5',
      name: "Blush Pink Organza Floral Hand-Painted Saree",
      category: "Pure Organza",
      price: 6800,
      originalPrice: 7999,
      discount: "15% OFF",
      rating: 4.8,
      reviews: 22,
      image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
      fabric: "Sheer Organza Silk",
      style: 5
    },
    {
      _id: 'prod_showcase_6',
      name: "Teal Artisan Kota Doria Zari Cotton Saree",
      category: "Kota Doria",
      price: 2950,
      originalPrice: 3400,
      discount: "13% OFF",
      rating: 4.6,
      reviews: 15,
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1000&q=80",
      fabric: "Lightweight Kota Zari",
      style: 6
    },
    {
      _id: 'prod_showcase_7',
      name: "Dark Emerald Banarasi Kadwa Brocade Saree",
      category: "Banarasi Brocade",
      price: 24500,
      originalPrice: 28000,
      discount: "12% OFF",
      rating: 4.9,
      reviews: 31,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
      fabric: "Pure Katan Silk",
      style: 7
    },
    {
      _id: 'prod_showcase_8',
      name: "White Marble Gota Patti Royal Georgette Saree",
      category: "Bridal Festive",
      price: 18900,
      originalPrice: 21000,
      discount: "10% OFF",
      rating: 4.9,
      reviews: 39,
      image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
      fabric: "Viscose Pure Georgette",
      style: 8
    }
  ];

  const handleAddToCart = (p) => {
    addToCart(p);
    addToast(`Added ${p.name} to your bag!`, 'success');
  };

  const handleToggleWishlist = (p) => {
    toggleWishlist(p);
    addToast(isInWishlist(p._id) ? 'Removed from Wishlist' : 'Saved to Wishlist', 'info');
  };

  return (
    <section className="py-20 bg-[#F7F4EE] font-sans selection:bg-[#B8924A] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[10px] font-sans font-bold tracking-super-wide uppercase text-[#B8924A] block">
            HAUTE COUTURE TEXTILE COLLECTION
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#1F1A17] tracking-tight">
            8 Luxury Saree Card Designs
          </h2>
          <p className="text-xs sm:text-sm font-sans text-gray-600 font-light leading-relaxed">
            Exploring 8 bespoke UI architectural variations celebrating Indian handloom heritage, refined gold ornamentation, and modern luxury typography.
          </p>
        </div>

        {/* 4-COLUMN × 2-ROW GRID (8 DISTINCT CARD VARIATIONS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* ========================================================================= */}
          {/* STYLE 1: CLASSIC IVORY & GOLD */}
          {/* ========================================================================= */}
          {(() => {
            const p = products[0];
            const wish = isInWishlist(p._id);
            return (
              <div className="group relative bg-white border border-[#EFE7DC] rounded-2xl shadow-luxury hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between transform hover:-translate-y-1.5">
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="px-2.5 py-1 bg-[#1F1A17] text-white text-[9px] font-bold tracking-widest uppercase rounded-md shadow">NEW</span>
                    <span className="px-2.5 py-1 bg-[#B8924A] text-white text-[9px] font-bold tracking-widest uppercase rounded-md shadow">{p.discount}</span>
                  </div>
                  {/* Wishlist */}
                  <button
                    onClick={() => handleToggleWishlist(p)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white text-gray-700 hover:text-red-500 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${wish ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>

                {/* Overlapping Bottom Info Panel */}
                <div className="p-5 bg-white -mt-6 relative z-10 mx-3 mb-3 rounded-xl border border-[#EFE7DC] shadow-sm space-y-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#B8924A] font-bold uppercase tracking-wider">{p.category}</span>
                    <div className="flex items-center space-x-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{p.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-serif text-base font-medium text-[#1F1A17] line-clamp-1 group-hover:text-[#B8924A] transition-colors">
                    {p.name}
                  </h3>
                  <div className="flex items-baseline space-x-2">
                    <span className="font-sans text-base font-bold text-[#1F1A17]">₹{p.price.toLocaleString('en-IN')}</span>
                    <span className="font-sans text-xs text-gray-400 line-through">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(p)}
                    className="w-full py-3 bg-[#B8924A] hover:bg-[#A37E3A] text-white text-[11px] font-bold tracking-super-wide uppercase rounded-lg shadow transition-all flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>ADD TO BAG</span>
                  </button>
                </div>
              </div>
            );
          })()}

          {/* ========================================================================= */}
          {/* STYLE 2: DARK LUXURY HANDLOOM */}
          {/* ========================================================================= */}
          {(() => {
            const p = products[1];
            const wish = isInWishlist(p._id);
            return (
              <div className="group relative bg-[#181310] text-[#F7F4EE] border border-[#B8924A]/40 rounded-2xl shadow-2xl hover:shadow-gold-glow transition-all duration-500 overflow-hidden flex flex-col justify-between transform hover:-translate-y-1.5">
                <div className="relative aspect-[3/4] overflow-hidden bg-black/40">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="px-2.5 py-1 bg-[#B8924A] text-[#181310] text-[9px] font-bold tracking-widest uppercase rounded-md">NEW</span>
                    <span className="px-2.5 py-1 bg-black/80 text-[#B8924A] border border-[#B8924A]/50 text-[9px] font-bold tracking-widest uppercase rounded-md">{p.discount}</span>
                  </div>
                  <button
                    onClick={() => handleToggleWishlist(p)}
                    className="absolute top-3 right-3 p-2 bg-[#181310]/80 border border-[#B8924A]/40 rounded-full text-[#B8924A] hover:text-red-400 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${wish ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>

                <div className="p-5 space-y-3 bg-gradient-to-b from-[#181310] to-[#241C18]">
                  <span className="text-[10px] font-sans font-bold tracking-super-wide text-[#B8924A] uppercase block">
                    {p.category} • ⭐ {p.rating}
                  </span>
                  <h3 className="font-serif text-base font-light text-[#F7F4EE] line-clamp-1">
                    {p.name}
                  </h3>

                  {/* Feature Row Icons */}
                  <div className="py-2 border-y border-[#B8924A]/20 flex items-center justify-between text-[9px] text-gray-300 font-sans">
                    <span className="flex items-center space-x-1"><Feather className="w-3 h-3 text-[#B8924A]" /><span>Lightweight</span></span>
                    <span>•</span>
                    <span className="flex items-center space-x-1"><Sparkles className="w-3 h-3 text-[#B8924A]" /><span>Soft Weave</span></span>
                    <span>•</span>
                    <span className="flex items-center space-x-1"><Shield className="w-3 h-3 text-[#B8924A]" /><span>Pure Handloom</span></span>
                  </div>

                  <div className="flex items-baseline justify-between pt-1">
                    <div className="flex items-baseline space-x-2">
                      <span className="font-sans text-base font-bold text-[#D4B26A]">₹{p.price.toLocaleString('en-IN')}</span>
                      <span className="font-sans text-xs text-gray-500 line-through">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(p)}
                    className="w-full py-3 bg-[#B8924A] hover:bg-[#D4B26A] text-[#181310] text-[11px] font-sans font-bold tracking-super-wide uppercase rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md"
                  >
                    <span>VIEW DETAILS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })()}

          {/* ========================================================================= */}
          {/* STYLE 3: MODERN RED & IVORY */}
          {/* ========================================================================= */}
          {(() => {
            const p = products[2];
            const wish = isInWishlist(p._id);
            return (
              <div className="group relative bg-white border border-[#EFE7DC] rounded-3xl shadow-luxury hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between transform hover:-translate-y-1.5">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#8B0000] rounded-b-[2rem]">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 mix-blend-normal"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="px-2.5 py-1 bg-white text-[#8B0000] text-[9px] font-bold tracking-widest uppercase rounded-full shadow">NEW</span>
                    <span className="px-2.5 py-1 bg-[#8B0000] text-white text-[9px] font-bold tracking-widest uppercase rounded-full shadow">{p.discount}</span>
                  </div>
                  <button
                    onClick={() => handleToggleWishlist(p)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow hover:bg-white text-gray-700 hover:text-red-500 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${wish ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                    <span>{p.category}</span>
                    <span className="text-amber-500">⭐ {p.rating}</span>
                  </div>
                  <h3 className="font-serif text-base font-normal text-[#1F1A17] line-clamp-1">
                    {p.name}
                  </h3>
                  <div className="flex items-baseline space-x-2">
                    <span className="font-sans text-base font-bold text-[#8B0000]">₹{p.price.toLocaleString('en-IN')}</span>
                    <span className="font-sans text-xs text-gray-400 line-through">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Dual Action Bar */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => handleAddToCart(p)}
                      className="py-2.5 bg-[#8B0000] hover:bg-[#6B0000] text-white text-[10px] font-bold uppercase rounded-xl transition-colors flex items-center justify-center space-x-1"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>ADD TO BAG</span>
                    </button>
                    <button
                      onClick={() => setQuickViewProduct(p)}
                      className="py-2.5 bg-[#FAF6F0] hover:bg-[#EFE7DC] text-[#1F1A17] text-[10px] font-bold uppercase rounded-xl transition-colors flex items-center justify-center space-x-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>QUICK VIEW</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ========================================================================= */}
          {/* STYLE 4: ROYAL MAROON HERITAGE */}
          {/* ========================================================================= */}
          {(() => {
            const p = products[3];
            const wish = isInWishlist(p._id);
            return (
              <div className="group relative bg-[#4A0E17] text-[#F7F4EE] border-2 border-[#D4AF37]/60 rounded-2xl shadow-2xl hover:shadow-gold-glow transition-all duration-500 overflow-hidden flex flex-col justify-between transform hover:-translate-y-1.5">
                <div className="relative aspect-[3/4] p-3">
                  {/* Ornamental Gold Frame Container */}
                  <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-[#D4AF37]">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <span className="px-2 py-0.5 bg-[#D4AF37] text-[#4A0E17] text-[8px] font-bold tracking-widest uppercase rounded">NEW</span>
                      <span className="px-2 py-0.5 bg-[#4A0E17] border border-[#D4AF37] text-[#D4AF37] text-[8px] font-bold tracking-widest uppercase rounded">{p.discount}</span>
                    </div>
                    <button
                      onClick={() => handleToggleWishlist(p)}
                      className="absolute top-2 right-2 p-1.5 bg-[#4A0E17]/80 border border-[#D4AF37] rounded-full text-[#D4AF37] hover:text-red-400 transition-colors"
                    >
                      <Heart className={`w-3.5 h-3.5 ${wish ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Decorative Circular Motif Divider */}
                <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#4A0E17] font-serif font-bold text-xs flex items-center justify-center mx-auto -my-4 relative z-10 shadow-md">
                  ❖
                </div>

                <div className="p-5 pt-6 space-y-3 text-center bg-gradient-to-b from-[#4A0E17] to-[#36080F]">
                  <span className="text-[9px] font-sans font-bold tracking-super-wide text-[#D4AF37] uppercase block">
                    HERITAGE {p.category} • ⭐ {p.rating}
                  </span>
                  <h3 className="font-serif text-base font-normal text-[#F7F4EE] line-clamp-1">
                    {p.name}
                  </h3>
                  <div className="flex items-baseline justify-center space-x-2">
                    <span className="font-sans text-lg font-bold text-[#D4AF37]">₹{p.price.toLocaleString('en-IN')}</span>
                    <span className="font-sans text-xs text-gray-400 line-through">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(p)}
                    className="w-full py-3 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11] text-[#4A0E17] text-[11px] font-sans font-bold tracking-super-wide uppercase rounded-xl shadow-lg transition-all transform hover:scale-[1.02]"
                  >
                    ROYAL ADD TO BAG
                  </button>
                </div>
              </div>
            );
          })()}

          {/* ========================================================================= */}
          {/* STYLE 5: SOFT BLUSH MINIMAL */}
          {/* ========================================================================= */}
          {(() => {
            const p = products[4];
            const wish = isInWishlist(p._id);
            return (
              <div className="group relative bg-[#FFF9F9] border border-[#F4C2C2] rounded-3xl shadow-luxury hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between transform hover:-translate-y-1.5">
                <div className="relative aspect-[3/4] overflow-hidden rounded-b-[2.5rem] bg-pink-50">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="px-2.5 py-1 bg-[#E88787] text-white text-[9px] font-bold tracking-widest uppercase rounded-full">NEW</span>
                    <span className="px-2.5 py-1 bg-white text-[#E88787] text-[9px] font-bold tracking-widest uppercase rounded-full shadow">{p.discount}</span>
                  </div>
                  <button
                    onClick={() => handleToggleWishlist(p)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-[#E88787] hover:text-red-500 shadow transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${wish ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-[10px] text-[#E88787] font-bold uppercase tracking-wider">
                    <span>{p.category}</span>
                    <span>⭐ {p.rating}</span>
                  </div>
                  <h3 className="font-serif text-base font-light text-[#2C1D1D] line-clamp-1">
                    {p.name}
                  </h3>
                  <div className="flex items-baseline space-x-2">
                    <span className="font-sans text-base font-bold text-[#E88787]">₹{p.price.toLocaleString('en-IN')}</span>
                    <span className="font-sans text-xs text-gray-400 line-through">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(p)}
                    className="w-full py-3 bg-[#E88787] hover:bg-[#D47070] text-white text-[11px] font-bold tracking-super-wide uppercase rounded-xl transition-all shadow-md"
                  >
                    ADD TO BAG
                  </button>
                </div>
              </div>
            );
          })()}

          {/* ========================================================================= */}
          {/* STYLE 6: TEAL ARTISAN MINIMAL */}
          {/* ========================================================================= */}
          {(() => {
            const p = products[5];
            const wish = isInWishlist(p._id);
            return (
              <div className="group relative bg-[#F4F9F9] border border-[#005F73]/30 rounded-2xl shadow-luxury hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between transform hover:-translate-y-1.5">
                <div className="relative aspect-[3/4] overflow-hidden bg-teal-900/10">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="px-2.5 py-1 bg-[#005F73] text-white text-[9px] font-bold tracking-widest uppercase rounded-md">ARTISAN</span>
                    <span className="px-2.5 py-1 bg-white text-[#005F73] text-[9px] font-bold tracking-widest uppercase rounded-md shadow">{p.discount}</span>
                  </div>
                  <button
                    onClick={() => handleToggleWishlist(p)}
                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-[#005F73] hover:text-red-500 shadow transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${wish ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>

                <div className="p-5 space-y-3">
                  <span className="text-[10px] font-bold text-[#005F73] uppercase tracking-wider block">
                    {p.category} • ⭐ {p.rating}
                  </span>
                  <h3 className="font-serif text-base font-normal text-[#0A2E2B] line-clamp-1">
                    {p.name}
                  </h3>

                  {/* Feature Row */}
                  <div className="py-1.5 border-y border-[#005F73]/20 flex items-center justify-between text-[9px] text-[#005F73] font-medium">
                    <span>Handloom Weave</span>
                    <span>•</span>
                    <span>Soft & Light</span>
                    <span>•</span>
                    <span>Pure Zari</span>
                  </div>

                  <div className="flex items-baseline space-x-2 pt-1">
                    <span className="font-sans text-base font-bold text-[#005F73]">₹{p.price.toLocaleString('en-IN')}</span>
                    <span className="font-sans text-xs text-gray-400 line-through">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(p)}
                    className="w-full py-3 bg-[#005F73] hover:bg-[#0A2E2B] text-white text-[11px] font-bold tracking-super-wide uppercase rounded-xl transition-all flex items-center justify-center space-x-2"
                  >
                    <span>VIEW DETAILS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })()}

          {/* ========================================================================= */}
          {/* STYLE 7: DARK TEAL BOUTIQUE */}
          {/* ========================================================================= */}
          {(() => {
            const p = products[6];
            const wish = isInWishlist(p._id);
            return (
              <div className="group relative bg-[#0A2E2B] text-[#F7F4EE] border border-[#D4AF37]/50 rounded-2xl shadow-2xl hover:shadow-gold-glow transition-all duration-500 overflow-hidden flex flex-col justify-between transform hover:-translate-y-1.5 p-4 text-center">
                
                {/* Circular Red Frame */}
                <div className="relative w-44 h-44 mx-auto rounded-full border-4 border-[#8B0000] overflow-hidden shadow-lg mt-2">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div className="space-y-2 pt-4">
                  <span className="text-[10px] font-sans font-bold tracking-super-wide text-[#D4AF37] uppercase block">
                    BOUTIQUE {p.category} • ⭐ {p.rating}
                  </span>
                  <h3 className="font-serif text-base font-light text-white line-clamp-1">
                    {p.name}
                  </h3>
                  <div className="flex items-baseline justify-center space-x-2">
                    <span className="font-sans text-base font-bold text-[#D4AF37]">₹{p.price.toLocaleString('en-IN')}</span>
                    <span className="font-sans text-xs text-gray-400 line-through">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Action Bar */}
                  <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] font-bold uppercase">
                    <button
                      onClick={() => handleAddToCart(p)}
                      className="py-2.5 bg-[#D4AF37] hover:bg-[#B8924A] text-[#0A2E2B] rounded-xl transition-colors"
                    >
                      ADD TO BAG
                    </button>
                    <button
                      onClick={() => setQuickViewProduct(p)}
                      className="py-2.5 bg-[#144743] hover:bg-[#1A5752] text-[#D4AF37] border border-[#D4AF37]/40 rounded-xl transition-colors"
                    >
                      QUICK VIEW
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ========================================================================= */}
          {/* STYLE 8: WHITE MARBLE & GOLD */}
          {/* ========================================================================= */}
          {(() => {
            const p = products[7];
            const wish = isInWishlist(p._id);
            return (
              <div className="group relative bg-gradient-to-br from-gray-50 via-white to-gray-100 border-2 border-[#D4AF37]/70 rounded-2xl shadow-luxury hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between transform hover:-translate-y-1.5 p-4 text-center">
                
                {/* Gold Corner Ornaments */}
                <div className="absolute top-2 left-2 text-[#D4AF37] text-xs font-serif">❖</div>
                <div className="absolute top-2 right-2 text-[#D4AF37] text-xs font-serif">❖</div>

                {/* Circular Gold Border Image */}
                <div className="relative w-44 h-44 mx-auto rounded-full border-4 border-[#D4AF37] overflow-hidden shadow-xl mt-3 bg-white">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div className="space-y-3 pt-4">
                  <span className="text-[10px] font-sans font-bold tracking-super-wide text-[#B8924A] uppercase block">
                    ROYAL {p.category} • ⭐ {p.rating}
                  </span>
                  <h3 className="font-serif text-base font-semibold text-[#1F1A17] line-clamp-1">
                    {p.name}
                  </h3>
                  <div className="flex items-baseline justify-center space-x-2">
                    <span className="font-sans text-base font-bold text-[#6B0D18]">₹{p.price.toLocaleString('en-IN')}</span>
                    <span className="font-sans text-xs text-gray-400 line-through">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(p)}
                    className="w-full py-3 bg-[#6B0D18] hover:bg-[#8C1322] text-white text-[11px] font-sans font-bold tracking-super-wide uppercase rounded-xl shadow-lg transition-all"
                  >
                    ADD TO BAG
                  </button>
                </div>
              </div>
            );
          })()}

        </div>

        {/* QUICK VIEW MODAL */}
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 relative border border-[#EFE7DC] shadow-2xl">
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-black font-bold text-xl"
              >
                ✕
              </button>
              <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
                <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full h-full object-cover object-top" />
              </div>
              <span className="text-[10px] font-bold text-[#B8924A] uppercase tracking-wider block">
                {quickViewProduct.category} • Fabric: {quickViewProduct.fabric}
              </span>
              <h3 className="font-serif text-xl font-bold text-[#1F1A17]">{quickViewProduct.name}</h3>
              <div className="flex items-baseline space-x-3">
                <span className="font-sans text-2xl font-bold text-[#1F1A17]">₹{quickViewProduct.price.toLocaleString('en-IN')}</span>
                <span className="font-sans text-sm text-gray-400 line-through">₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}</span>
              </div>
              <button
                onClick={() => {
                  handleAddToCart(quickViewProduct);
                  setQuickViewProduct(null);
                }}
                className="w-full py-4 bg-[#1F1A17] hover:bg-[#2B231E] text-white text-xs font-sans font-bold tracking-widest uppercase rounded-xl"
              >
                ADD TO BAG NOW
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
