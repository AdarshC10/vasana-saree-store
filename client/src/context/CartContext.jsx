import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('vasana_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [coupon, setCoupon] = useState({ code: '', discount: 0, applied: false });
  const { addToast } = useToast();

  useEffect(() => {
    localStorage.setItem('vasana_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1, blouseOption = 'Unstitched Standard') => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product._id === product._id && item.blouseOption === blouseOption
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            product,
            quantity,
            blouseOption,
            price: product.discount ? product.price * (1 - product.discount / 100) : product.price
          }
        ];
      }
    });

    addToast(`Added "${product.name}" to your bag.`, 'success');
  };

  const removeFromCart = (productId, blouseOption) => {
    setCart((prev) => prev.filter((item) => !(item.product._id === productId && item.blouseOption === blouseOption)));
    addToast('Item removed from your bag.', 'info');
  };

  const updateQuantity = (productId, blouseOption, delta) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.product._id === productId && item.blouseOption === blouseOption) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setCoupon({ code: '', discount: 0, applied: false });
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'VASANA10') {
      setCoupon({ code: 'VASANA10', discount: 10, type: 'percent', applied: true });
      addToast('Coupon VASANA10 applied! 10% discount added.', 'success');
    } else if (cleanCode === 'ROYAL500') {
      setCoupon({ code: 'ROYAL500', discount: 500, type: 'flat', applied: true });
      addToast('Coupon ROYAL500 applied! ₹500 discount added.', 'success');
    } else {
      addToast('Invalid coupon code. Try VASANA10 or ROYAL500', 'error');
    }
  };

  const removeCoupon = () => {
    setCoupon({ code: '', discount: 0, applied: false });
    addToast('Coupon removed.', 'info');
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  let discountAmount = 0;
  if (coupon.applied) {
    if (coupon.type === 'percent') {
      discountAmount = (subtotal * coupon.discount) / 100;
    } else if (coupon.type === 'flat') {
      discountAmount = Math.min(subtotal, coupon.discount);
    }
  }

  const shippingFee = subtotal > 15000 || cart.length === 0 ? 0 : 490;
  const taxAmount = Math.round((subtotal - discountAmount) * 0.05); // 5% GST on sarees
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee + taxAmount);
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        subtotal,
        discountAmount,
        shippingFee,
        taxAmount,
        grandTotal,
        totalItemCount,
        coupon,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
