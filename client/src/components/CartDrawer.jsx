import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    subtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    grandTotal,
    coupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 text-vasana-dark overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-vasana-rose/40 flex items-center justify-between bg-vasana-bg">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-vasana-burgundy" />
            <h3 className="font-serif text-2xl font-light tracking-wide text-vasana-dark">
              Shopping Bag ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-gray-500 hover:text-vasana-burgundy transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-vasana-rose/30 flex items-center justify-center mx-auto text-vasana-gold">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl font-light text-vasana-dark">
                YOUR BAG IS EMPTY
              </h4>
              <p className="text-xs font-sans text-gray-500 max-w-xs mx-auto">
                Your next favourite saree could be waiting for you in our new arrivals.
              </p>
              <Link
                to="/shop"
                onClick={() => setIsCartOpen(false)}
                className="inline-block px-6 py-3 bg-vasana-burgundy text-white text-xs font-sans font-bold tracking-widest uppercase hover:bg-vasana-burgundyDark transition-colors shadow-luxury mt-4"
              >
                START SHOPPING
              </Link>
            </div>
          ) : (
            cart.map((item, idx) => {
              const image = item.product.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80';
              return (
                <div key={`${item.product._id}-${item.blouseOption}-${idx}`} className="flex space-x-4 border-b border-vasana-rose/30 pb-4">
                  <img
                    src={image}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover border border-vasana-rose/50 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-base font-normal text-vasana-dark line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product._id, item.blouseOption)}
                          className="text-gray-400 hover:text-red-600 transition-colors ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] font-sans text-vasana-gold font-semibold uppercase">
                        {item.blouseOption}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-300">
                        <button
                          onClick={() => updateQuantity(item.product._id, item.blouseOption, -1)}
                          className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product._id, item.blouseOption, 1)}
                          className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-sans font-bold text-sm text-vasana-burgundy">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-vasana-rose/40 bg-vasana-bg space-y-4">
            
            {/* Coupon Code Section */}
            <div>
              {coupon.applied ? (
                <div className="flex items-center justify-between bg-vasana-gold/15 p-2 px-3 border border-vasana-gold/40 text-xs font-sans text-vasana-burgundy font-semibold">
                  <div className="flex items-center space-x-1.5">
                    <Tag className="w-4 h-4 text-vasana-gold" />
                    <span>Coupon {coupon.code} Applied</span>
                  </div>
                  <button onClick={removeCoupon} className="text-xs text-red-600 hover:underline">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Coupon code (VASANA10)"
                    className="flex-1 border border-gray-300 px-3 py-1.5 text-xs focus:outline-none focus:border-vasana-burgundy uppercase"
                  />
                  <button
                    type="submit"
                    className="bg-vasana-gold hover:bg-vasana-goldLight text-vasana-dark px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    APPLY
                  </button>
                </form>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs font-sans text-gray-600 pt-2 border-t border-vasana-rose/30">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-vasana-dark">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-vasana-burgundy font-medium">
                  <span>Discount</span>
                  <span>-₹{Math.round(discountAmount).toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-medium text-vasana-dark">
                  {shippingFee === 0 ? <strong className="text-green-700 font-semibold">FREE</strong> : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span className="font-medium text-vasana-dark">₹{taxAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-vasana-burgundy pt-2 border-t border-vasana-rose/40">
                <span>Grand Total</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={handleProceedCheckout}
              className="w-full py-4 bg-vasana-burgundy hover:bg-vasana-burgundyDark text-white text-xs font-sans font-bold tracking-super-wide uppercase shadow-luxury transition-all flex items-center justify-center space-x-2"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4 text-vasana-gold" />
            </button>

            <div className="flex items-center justify-center space-x-1 text-[10px] text-gray-500 font-sans">
              <ShieldCheck className="w-3.5 h-3.5 text-vasana-gold" />
              <span>Complimentary insured shipping & easy return guarantee</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
