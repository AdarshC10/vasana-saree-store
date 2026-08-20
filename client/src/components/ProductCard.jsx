import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onQuickView }) {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  const wishlisted = isInWishlist(product._id);

  const originalPrice = product.price;
  const discountedPrice = product.discount
    ? Math.round(originalPrice * (1 - product.discount / 100))
    : originalPrice;

  const image1 = product.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';
  const image2 = product.images?.[1] || image1;

  return (
    <div
      className="group relative flex flex-col bg-white border border-vasana-rose/40 hover:border-vasana-gold/60 transition-all duration-300 shadow-sm hover:shadow-luxury"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Gallery Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-vasana-bg">
        
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col space-y-1">
          {product.newArrival && (
            <span className="bg-vasana-burgundy text-white text-[10px] font-sans font-bold uppercase tracking-widest px-2.5 py-1">
              NEW
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-vasana-gold text-vasana-dark text-[10px] font-sans font-bold uppercase tracking-widest px-2.5 py-1">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
            wishlisted
              ? 'bg-vasana-burgundy text-white'
              : 'bg-white/80 text-vasana-dark hover:bg-vasana-gold hover:text-white'
          }`}
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Image Transition on Hover */}
        <Link to={`/product/${product.slug || product._id}`} className="block h-full w-full">
          <img
            src={isHovered ? image2 : image1}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Quick View Floating Overlay */}
        <div className="absolute bottom-3 left-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
          <button
            onClick={() => onQuickView(product)}
            className="flex-1 bg-vasana-dark/90 hover:bg-vasana-burgundy text-white py-2 px-3 text-xs font-sans font-semibold tracking-wider uppercase backdrop-blur-md flex items-center justify-center transition-colors shadow-md"
          >
            <Eye className="w-3.5 h-3.5 mr-1.5" />
            Quick View
          </button>
          <button
            onClick={() => addToCart(product)}
            className="bg-vasana-gold hover:bg-vasana-goldLight text-vasana-dark p-2 text-xs font-semibold flex items-center justify-center transition-colors shadow-md"
            title="Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] font-sans text-vasana-gold font-semibold uppercase tracking-wider mb-1">
            <span>{product.category}</span>
            <div className="flex items-center text-amber-600">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500 mr-0.5" />
              <span>{product.rating || '4.8'}</span>
            </div>
          </div>

          <Link
            to={`/product/${product.slug || product._id}`}
            className="font-serif text-lg font-normal text-vasana-dark hover:text-vasana-burgundy transition-colors line-clamp-1 block"
          >
            {product.name}
          </Link>

          <p className="text-xs text-gray-500 font-sans mt-0.5 line-clamp-1">
            Fabric: {product.fabric}
          </p>
        </div>

        {/* Pricing */}
        <div className="mt-3 pt-2 border-t border-vasana-rose/30 flex items-baseline space-x-2">
          <span className="font-sans font-bold text-base text-vasana-burgundy">
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
