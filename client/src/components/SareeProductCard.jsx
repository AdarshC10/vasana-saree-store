import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export default function SareeProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  if (!product) return null;

  const wishlisted = isInWishlist(product._id);
  const primaryImg = product.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';
  const secondaryImg = product.images?.[1] || primaryImg;

  const originalPrice = product.originalPrice || product.price;
  const discountPercent = product.discount || (product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0);
  const currentPrice = product.discount ? Math.round(originalPrice * (1 - discountPercent / 100)) : product.price;

  const handleCardClick = (e) => {
    navigate(`/product/${product._id || product.slug}`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleWishlist(product);
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer bg-[#FAF6F0] border border-[#EFE7DC] shadow-luxury hover:shadow-luxury-hover transition-all duration-500 flex flex-col font-sans overflow-hidden"
    >
      {/* Top Media Container */}
      <div className="relative aspect-[3/4] bg-[#241C18] overflow-hidden">
        
        {/* Main Image with Crossfade Hover */}
        <img
          src={isHovered ? secondaryImg : primaryImg}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700 brightness-95"
        />

        {/* Top-Left Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1.5 z-10">
          {(product.isNew || product.newArrival) && (
            <span className="bg-[#B4975A] text-[#241C18] text-[9px] font-sans font-bold uppercase tracking-widest px-2.5 py-1 shadow-sm">
              NEW
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-[#241C18] text-[#F7F3ED] text-[9px] font-sans font-bold uppercase tracking-widest px-2.5 py-1 shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Top-Right Circular Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300 z-10 ${
            wishlisted
              ? 'bg-[#241C18] text-[#B4975A] shadow-md scale-110'
              : 'bg-white/90 backdrop-blur-md text-[#29231F] hover:bg-[#241C18] hover:text-[#B4975A]'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

      </div>

      {/* Bottom Information Box */}
      <div className="p-4 bg-[#FAF6F0] flex-1 flex flex-col justify-between space-y-2 text-[#29231F]">
        
        {/* Category/Fabric & Rating Line */}
        <div className="flex items-center justify-between text-[11px] font-sans font-bold uppercase tracking-widest text-[#B4975A]">
          <span className="truncate">{product.fabric || product.category || 'HANDLOOM'}</span>
          <span className="flex items-center text-[#29231F] font-semibold shrink-0 ml-2">
            <Star className="w-3.5 h-3.5 fill-[#B4975A] text-[#B4975A] mr-1" />
            {product.rating || 4.8}
          </span>
        </div>

        {/* Product Title */}
        <h3 className="font-serif text-base text-[#241C18] group-hover:text-[#B4975A] transition-colors line-clamp-1 font-normal leading-snug">
          {product.name}
        </h3>

        {/* Price Hierarchy */}
        <div className="flex items-baseline space-x-2.5 pt-1">
          <span className="font-sans text-base font-bold text-[#241C18]">
            ₹{currentPrice.toLocaleString('en-IN')}
          </span>
          {discountPercent > 0 && (
            <span className="font-sans text-xs text-gray-400 line-through">
              ₹{originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
