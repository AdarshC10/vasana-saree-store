import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('vasana_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const { addToast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    localStorage.setItem('vasana_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item._id === product._id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item._id !== product._id));
      addToast(`Removed "${product.name}" from your wishlist.`, 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      addToast(`Saved "${product.name}" to your wishlist.`, 'success');
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId);
  };

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
