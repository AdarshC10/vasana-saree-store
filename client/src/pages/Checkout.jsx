import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Check, ArrowRight, Truck, CreditCard, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

export default function Checkout() {
  const { cart, subtotal, discountAmount, shippingFee, taxAmount, grandTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  // Address Form State
  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    street: user?.addresses?.[0]?.street || '',
    city: user?.addresses?.[0]?.city || '',
    state: user?.addresses?.[0]?.state || '',
    pincode: user?.addresses?.[0]?.pincode || '',
    country: 'India'
  });

  // Delivery Method State
  const [deliveryMethod, setDeliveryMethod] = useState('Express Insured');

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState('Razorpay');

  const [loading, setLoading] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-vasana-bg pt-32 text-center p-8">
        <h2 className="font-serif text-3xl text-vasana-dark mb-4">Your Bag is Empty</h2>
        <Link to="/shop" className="px-6 py-3 bg-vasana-burgundy text-white text-xs font-sans font-bold tracking-widest uppercase">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.street || !shippingAddress.city || !shippingAddress.pincode) {
      addToast('Please fill in all required shipping address fields.', 'error');
      return;
    }
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const orderPayload = {
        items: cart.map((item) => ({
          product: item.product._id,
          name: item.product.name,
          image: item.product.images?.[0] || '',
          price: item.price,
          quantity: item.quantity
        })),
        shippingAddress,
        paymentMethod,
        subtotal,
        discount: Math.round(discountAmount),
        shippingFee,
        tax: taxAmount,
        totalAmount: grandTotal
      };

      let orderId;
      if (user) {
        const res = await api.post('/orders', orderPayload);
        orderId = res.data._id;
      } else {
        // Fallback guest order ID
        orderId = 'VSN-ORD-' + Date.now();
      }

      clearCart();
      addToast('Order placed successfully!', 'success');
      navigate(`/order-success/${orderId}`);
    } catch (error) {
      addToast(error.message || 'Failed to process order.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-vasana-bg pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Indicator Header */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-between text-xs font-sans font-bold uppercase tracking-widest text-vasana-dark">
            <span className={step >= 1 ? 'text-vasana-burgundy' : 'text-gray-400'}>01 Address</span>
            <span className="text-gray-300">→</span>
            <span className={step >= 2 ? 'text-vasana-burgundy' : 'text-gray-400'}>02 Delivery</span>
            <span className="text-gray-300">→</span>
            <span className={step >= 3 ? 'text-vasana-burgundy' : 'text-gray-400'}>03 Payment</span>
          </div>
          <div className="w-full bg-gray-200 h-1 mt-3 relative">
            <div
              className="bg-vasana-burgundy h-1 transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Checkout Wizard Forms */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-vasana-rose/50 shadow-sm space-y-8">
            
            {/* Step 1: Address */}
            {step === 1 && (
              <form onSubmit={handleAddressSubmit} className="space-y-4">
                <div className="flex items-center space-x-2 border-b border-vasana-rose pb-3">
                  <MapPin className="w-5 h-5 text-vasana-burgundy" />
                  <h3 className="font-serif text-2xl text-vasana-dark">Shipping Address</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  <div>
                    <label className="block text-gray-700 font-bold uppercase mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.fullName}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                      className="w-full p-3 border border-gray-300 focus:border-vasana-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold uppercase mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                      className="w-full p-3 border border-gray-300 focus:border-vasana-gold focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-gray-700 font-bold uppercase mb-1">Street Address *</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.street}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                      placeholder="Apartment, House No., Street"
                      className="w-full p-3 border border-gray-300 focus:border-vasana-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold uppercase mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      className="w-full p-3 border border-gray-300 focus:border-vasana-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold uppercase mb-1">State *</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                      className="w-full p-3 border border-gray-300 focus:border-vasana-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold uppercase mb-1">Postal Code (Pincode) *</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.pincode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                      className="w-full p-3 border border-gray-300 focus:border-vasana-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold uppercase mb-1">Country</label>
                    <input
                      type="text"
                      disabled
                      value="India"
                      className="w-full p-3 border border-gray-200 bg-gray-100 text-gray-600"
                    />
                  </div>
                </div>

                <div className="pt-6 flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-4 bg-vasana-burgundy text-white text-xs font-sans font-bold tracking-widest uppercase hover:bg-vasana-burgundyDark transition-colors flex items-center space-x-2"
                  >
                    <span>CONTINUE TO DELIVERY</span>
                    <ArrowRight className="w-4 h-4 text-vasana-gold" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Delivery */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-2 border-b border-vasana-rose pb-3">
                  <Truck className="w-5 h-5 text-vasana-burgundy" />
                  <h3 className="font-serif text-2xl text-vasana-dark">Select Delivery Option</h3>
                </div>

                <div className="space-y-3 text-xs font-sans">
                  {[
                    { id: 'Express Insured', name: 'Express Insured Air Courier (3-5 Days)', price: 'Complimentary', desc: 'Tamper-proof royal luxury box packaging with full transit insurance.' },
                    { id: 'Standard Ground', name: 'Standard Delivery (5-7 Days)', price: 'Free', desc: 'Standard reliable courier delivery across all Pincodes in India.' }
                  ].map((del) => (
                    <div
                      key={del.id}
                      onClick={() => setDeliveryMethod(del.id)}
                      className={`p-4 border cursor-pointer flex items-center justify-between transition-all ${
                        deliveryMethod === del.id ? 'border-vasana-burgundy bg-vasana-rose/20' : 'border-gray-300 bg-white'
                      }`}
                    >
                      <div>
                        <h4 className="font-bold text-vasana-dark text-sm">{del.name}</h4>
                        <p className="text-gray-500">{del.desc}</p>
                      </div>
                      <span className="font-bold text-vasana-burgundy">{del.price}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-gray-300 text-xs font-sans"
                  >
                    Back to Address
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-8 py-4 bg-vasana-burgundy text-white text-xs font-sans font-bold tracking-widest uppercase hover:bg-vasana-burgundyDark transition-colors flex items-center space-x-2"
                  >
                    <span>CONTINUE TO PAYMENT</span>
                    <ArrowRight className="w-4 h-4 text-vasana-gold" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-2 border-b border-vasana-rose pb-3">
                  <CreditCard className="w-5 h-5 text-vasana-burgundy" />
                  <h3 className="font-serif text-2xl text-vasana-dark">Payment Gateway</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                  {[
                    { id: 'Razorpay', label: 'Razorpay / Credit / Debit Cards' },
                    { id: 'UPI', label: 'Instant UPI (Google Pay, PhonePe, Paytm)' },
                    { id: 'NetBanking', label: 'Net Banking' },
                    { id: 'COD', label: 'Cash on Delivery (+₹150 fee)' }
                  ].map((pay) => (
                    <div
                      key={pay.id}
                      onClick={() => setPaymentMethod(pay.id)}
                      className={`p-4 border cursor-pointer flex items-center justify-between transition-all ${
                        paymentMethod === pay.id ? 'border-vasana-burgundy bg-vasana-rose/30 font-semibold' : 'border-gray-300 bg-white'
                      }`}
                    >
                      <span>{pay.label}</span>
                      {paymentMethod === pay.id && <Check className="w-4 h-4 text-vasana-burgundy" />}
                    </div>
                  ))}
                </div>

                <div className="pt-6 flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 border border-gray-300 text-xs font-sans"
                  >
                    Back to Delivery
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="px-8 py-4 bg-vasana-gold text-vasana-dark text-xs font-sans font-bold tracking-super-wide uppercase hover:bg-vasana-goldLight transition-colors shadow-luxury flex items-center space-x-2"
                  >
                    {loading ? 'Processing...' : `PAY & PLACE ORDER (₹${grandTotal.toLocaleString('en-IN')})`}
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Order Summary Column */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-vasana-rose/50 shadow-sm space-y-6">
            <h3 className="font-serif text-2xl text-vasana-dark border-b border-vasana-rose pb-3">
              Order Summary ({cart.length})
            </h3>

            <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
              {cart.map((item, idx) => (
                <div key={idx} className="flex space-x-3 text-xs font-sans">
                  <img
                    src={item.product.images?.[0]}
                    alt={item.product.name}
                    className="w-14 h-16 object-cover border border-vasana-rose/40 shrink-0"
                  />
                  <div className="flex-1">
                    <h4 className="font-serif text-sm font-normal text-vasana-dark line-clamp-1">{item.product.name}</h4>
                    <span className="text-[10px] text-vasana-gold block">{item.blouseOption}</span>
                    <span className="text-gray-500">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-bold text-vasana-burgundy">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs font-sans border-t border-vasana-rose/40 pt-4 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-vasana-dark font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-vasana-burgundy font-medium">
                  <span>Discount</span>
                  <span>-₹{Math.round(discountAmount).toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-700 font-semibold">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span className="text-vasana-dark font-medium">₹{taxAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-vasana-burgundy pt-3 border-t border-vasana-rose/50">
                <span>Total</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="p-3 bg-vasana-bg border border-vasana-gold/30 flex items-center space-x-2 text-[10px] text-gray-600 font-sans">
              <ShieldCheck className="w-4 h-4 text-vasana-gold shrink-0" />
              <span>256-Bit SSL Encrypted & PCI-DSS Compliant Payment</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
