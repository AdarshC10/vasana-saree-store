import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, ShoppingBag, Star, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function QuickViewModal({ product, onClose }) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [blouseOption, setBlouseOption] = useState('Unstitched Standard');

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const wishlisted = isInWishlist(product._id);
  const originalPrice = product.price;
  const discountedPrice = product.discount
    ? Math.round(originalPrice * (1 - product.discount / 100))
    : originalPrice;

  const images = product.images?.length
    ? product.images
    : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'];

  const handleAddToCart = () => {
    addToCart(product, quantity, blouseOption);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white border border-vasana-gold/50 max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative text-vasana-dark max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-vasana-burgundy transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-vasana-bg overflow-hidden border border-vasana-rose/50">
              <img
                src={images[selectedImageIdx]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            {images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto no-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`w-16 h-20 border overflow-hidden transition-all ${
                      selectedImageIdx === idx ? 'border-vasana-burgundy ring-2 ring-vasana-burgundy/20' : 'border-gray-200'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center space-x-2 text-xs font-sans text-vasana-gold font-semibold uppercase tracking-wider mb-1">
                <span>{product.category}</span>
                <span>•</span>
                <span>{product.fabric}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-vasana-dark leading-tight">
                {product.name}
              </h2>

              <div className="flex items-center space-x-2 mt-2">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating || 5) ? 'fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-xs font-sans text-gray-500 font-medium">
                  {product.rating || 4.8} ({product.reviewCount || 12} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-3 border-y border-vasana-rose/40 py-3">
              <span className="font-sans text-2xl font-bold text-vasana-burgundy">
                ₹{discountedPrice.toLocaleString('en-IN')}
              </span>
              {product.discount > 0 && (
                <span className="font-sans text-sm text-gray-400 line-through">
                  ₹{originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.discount > 0 && (
                <span className="bg-vasana-gold/20 text-vasana-burgundy text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
                  Save {product.discount}%
                </span>
              )}
            </div>

            <p className="text-xs font-sans text-gray-600 leading-relaxed line-clamp-3">
              {product.description}
            </p>

            {/* Blouse Stitching Option */}
            <div className="space-y-2">
              <label className="text-xs font-sans font-semibold uppercase tracking-wider text-vasana-dark block">
                Blouse Styling Option:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                {['Unstitched Standard', 'Custom Tailored (+₹1,490)'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setBlouseOption(opt)}
                    className={`py-2 px-3 border text-left flex items-center justify-between transition-all ${
                      blouseOption === opt
                        ? 'border-vasana-burgundy bg-vasana-rose/20 text-vasana-burgundy font-semibold'
                        : 'border-gray-200 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <span className="truncate">{opt}</span>
                    {blouseOption === opt && <Check className="w-3.5 h-3.5 ml-1 text-vasana-burgundy shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Adjuster */}
            <div className="flex items-center space-x-4 pt-2">
              <span className="text-xs font-sans font-semibold uppercase tracking-wider text-vasana-dark">
                Quantity:
              </span>
              <div className="flex items-center border border-gray-300">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-1 text-xs font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 pt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 bg-vasana-burgundy hover:bg-vasana-burgundyDark text-white text-xs font-sans font-bold tracking-super-wide uppercase shadow-luxury transition-all flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4 text-vasana-gold" />
                <span>ADD TO BAG</span>
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 border transition-all ${
                  wishlisted ? 'border-vasana-burgundy bg-vasana-burgundy text-white' : 'border-gray-300 text-vasana-dark hover:border-vasana-burgundy'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="pt-2 text-center">
              <Link
                to={`/product/${product.slug || product._id}`}
                onClick={onClose}
                className="text-xs font-sans text-vasana-gold hover:text-vasana-burgundy underline uppercase tracking-widest font-semibold"
              >
                View Full Product Details & Craft Specs →
              </Link>
            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
}
