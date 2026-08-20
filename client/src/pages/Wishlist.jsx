import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-vasana-bg pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-sans tracking-super-wide text-vasana-gold uppercase font-bold">
            SAVED TREASURES
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-vasana-dark mt-1">
            Your Wishlist
          </h1>
          <p className="text-xs font-sans text-gray-500 mt-2">
            {wishlist.length} {wishlist.length === 1 ? 'piece' : 'pieces'} waiting for you.
          </p>
          <div className="w-12 h-[2px] bg-vasana-gold mx-auto mt-4" />
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-white border border-vasana-rose/50 p-8 max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-vasana-rose/30 flex items-center justify-center mx-auto text-vasana-gold mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-light text-vasana-dark mb-2">
              YOUR WISHLIST IS EMPTY
            </h3>
            <p className="text-xs font-sans text-gray-500 mb-6 leading-relaxed">
              Find something beautiful to save. Browse our handcrafted Kanjivarams, Banarasis, and Organza sarees.
            </p>
            <Link
              to="/shop"
              className="inline-block px-8 py-3.5 bg-vasana-burgundy text-white text-xs font-sans font-bold tracking-widest uppercase hover:bg-vasana-burgundyDark transition-colors shadow-luxury"
            >
              EXPLORE SAREES
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onQuickView={() => {}}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
