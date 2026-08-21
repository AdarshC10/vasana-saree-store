import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, Star, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onQuickView }) {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!product) return null;

  const wishlisted = isInWishlist(product._id);
  const primaryImg = product.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';
  const secondaryImg = product.images?.[1] || primaryImg;

  const originalPrice = product.price;
  const discountedPrice = product.discount
    ? Math.round(originalPrice * (1 - product.discount / 100))
    : originalPrice;

  return (
    <div
      className="group relative bg-white border border-[#EFE7DC] shadow-luxury hover:shadow-luxury-hover transition-all duration-500 flex flex-col h-full font-sans"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Box */}
      <div className="relative aspect-[3/4] bg-[#241C18] overflow-hidden">
        <Link to={`/product/${product.slug || product._id}`} className="block w-full h-full">
          <img
            src={isHovered ? secondaryImg : primaryImg}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700 brightness-95"
          />
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300 ${
            wishlisted
              ? 'bg-[#241C18] text-white shadow-md'
              : 'bg-white/80 backdrop-blur-md text-[#29231F] hover:bg-[#241C18] hover:text-white'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current text-[#B4975A]' : ''}`} />
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          {product.newArrival && (
            <span className="bg-[#241C18] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1">
              NEW
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-[#B4975A] text-[#241C18] text-[9px] font-bold uppercase tracking-widest px-2.5 py-1">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Hover Quick View Trigger Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              className="flex-1 py-2 bg-white/95 text-[#241C18] text-[10px] font-bold tracking-widest uppercase hover:bg-[#B4975A] hover:text-white transition-colors flex items-center justify-center space-x-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>QUICK VIEW</span>
            </button>
          )}
          <button
            onClick={() => addToCart(product, 1)}
            className="p-2 bg-[#241C18] text-white text-[10px] font-bold hover:bg-[#B4975A] transition-colors"
            title="Add to Bag"
          >
            <ShoppingBag className="w-4 h-4 text-[#B4975A]" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2 bg-[#F7F3ED]">
        <div>
          <div className="flex items-center justify-between text-[10px] text-[#B4975A] font-bold uppercase tracking-wider mb-0.5">
            <span>{product.category}</span>
            <span className="flex items-center text-[#29231F]/70 font-semibold">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500 mr-0.5" />
              {product.rating || 4.8}
            </span>
          </div>

          <Link
            to={`/product/${product.slug || product._id}`}
            className="font-serif text-base text-[#241C18] hover:text-[#B4975A] transition-colors line-clamp-1 block font-normal"
          >
            {product.name}
          </Link>
        </div>

        <div className="flex items-baseline space-x-2 pt-1">
          <span className="font-sans text-sm font-bold text-[#241C18]">
            ₹{discountedPrice.toLocaleString('en-IN')}
          </span>
          {product.discount > 0 && (
            <span className="font-sans text-xs text-gray-400 line-through">
              ₹{originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
