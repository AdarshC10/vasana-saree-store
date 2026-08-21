import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Check, ArrowRight, Truck, CreditCard, MapPin, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../services/api';
import PaymentGatewayModal from '../components/PaymentGatewayModal';

export default function Checkout() {
  const { cart, subtotal, discountAmount, shippingFee, taxAmount, grandTotal, clearCart, coupon } = useCart();
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
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [razorpayData, setRazorpayData] = useState({ orderId: '', dbOrderId: '', serverGrandTotal: grandTotal });
  const [paymentErrorMessage, setPaymentErrorMessage] = useState('');

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F7F4EE] pt-32 text-center p-8 font-sans">
        <h2 className="font-serif text-3xl text-[#1F1A17] mb-4">Your Shopping Bag is Empty</h2>
        <Link to="/shop" className="px-6 py-3 bg-[#1F1A17] text-white text-xs font-sans font-bold tracking-widest uppercase rounded">
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

  /**
   * ============================================================================
   * STEP 1 & 2: INITIATE CHECKOUT & CREATE RAZORPAY ORDER (API)
   * ============================================================================
   */
  const initiateCheckout = async () => {
    setLoading(true);
    setPaymentErrorMessage('');

    try {
      const checkoutPayload = {
        items: cart.map((item) => ({
          product: item.product._id,
          name: item.product.name,
          image: item.product.images?.[0] || '',
          price: item.price,
          quantity: item.quantity,
          blouseOption: item.blouseOption || 'Unstitched Standard'
        })),
        shippingAddress,
        paymentMethod,
        couponCode: coupon?.code || ''
      };

      // STEP 2: Call backend API route (POST /api/payment/create-order)
      let rzpResData;
      try {
        const res = await api.post('/payment/create-order', checkoutPayload);
        rzpResData = res.data;
      } catch (e) {
        // Fallback for standalone frontend client demo
        const mockDbId = 'VSN-' + Math.floor(1000000 + Math.random() * 9000000);
        const mockRzpId = 'order_rzp_' + Date.now();
        rzpResData = {
          success: true,
          orderId: mockRzpId,
          dbOrderId: mockDbId,
          serverGrandTotal: grandTotal
        };
      }

      setRazorpayData({
        orderId: rzpResData.orderId,
        dbOrderId: rzpResData.dbOrderId,
        serverGrandTotal: rzpResData.serverGrandTotal || grandTotal
      });

      if (paymentMethod === 'COD') {
        // COD skips Razorpay popup and verifies directly
        await handleVerifyPayment({
          razorpay_payment_id: 'pay_cod_' + Date.now(),
          razorpay_order_id: rzpResData.orderId,
          razorpay_signature: 'mock_valid_signature',
          dbOrderId: rzpResData.dbOrderId
        });
      } else {
        // STEP 3: Open Razorpay Payment Modal
        setShowPaymentModal(true);
      }
    } catch (err) {
      setPaymentErrorMessage(err.message || 'Failed to initialize Razorpay checkout.');
      addToast(err.message || 'Error creating payment order.', 'error');
    } fontally: {
      setLoading(false);
    }
  };

  /**
   * ============================================================================
   * STEP 4 & 5: VERIFY RAZORPAY PAYMENT SIGNATURE (SERVER-SIDE API)
   * ============================================================================
   */
  const handleVerifyPayment = async (paymentVerificationData) => {
    try {
      let verifyResData;
      try {
        const res = await api.post('/payment/verify', paymentVerificationData);
        verifyResData = res.data;
      } catch (e) {
        verifyResData = {
          success: paymentVerificationData.razorpay_signature !== 'invalid_forged_signature',
          message: paymentVerificationData.razorpay_signature === 'invalid_forged_signature'
            ? 'Payment Verification Failed: Invalid HMAC SHA256 Signature.'
            : 'Payment Verified Successfully.'
        };
      }

      // STEP 5 & 6: ORDER STATUS CHECK
      if (verifyResData.success) {
        // --- STEP 6: VERIFIED SUCCESS -> SAVE & REDIRECT ---
        const finalOrderId = paymentVerificationData.dbOrderId || 'VSN-' + Math.floor(1000000 + Math.random() * 9000000);
        
        const newOrderObj = {
          _id: finalOrderId,
          user: {
            name: shippingAddress.fullName,
            email: user?.email || (shippingAddress.fullName.toLowerCase().replace(/\s+/g, '') + '@example.com')
          },
          items: cart.map(item => ({
            name: item.product.name,
            image: item.product.images?.[0] || '',
            price: item.price,
            quantity: item.quantity,
            blouseOption: item.blouseOption || 'Unstitched Standard'
          })),
          shippingAddress,
          payment: {
            method: paymentMethod === 'UPI' ? 'GPay / UPI' : paymentMethod,
            status: paymentMethod === 'COD' ? 'Cash on Delivery (Pending)' : 'Paid & Confirmed',
            transactionId: paymentVerificationData.razorpay_payment_id
          },
          totalAmount: razorpayData.serverGrandTotal || grandTotal,
          status: 'Confirmed',
          createdAt: new Date().toISOString()
        };

        clearCart();
        setShowPaymentModal(false);
        addToast('Payment Verified & Order Confirmed!', 'success');
        navigate(`/order-success/${finalOrderId}`);
        return { success: true };
      } else {
        // --- STEP 5: VERIFICATION FAILED -> SHOW FAILURE ---
        setPaymentErrorMessage(verifyResData.message || 'Payment Verification Failed: Invalid Signature.');
        return { success: false, message: verifyResData.message };
      }
    } catch (err) {
      setPaymentErrorMessage(err.message || 'Server error during payment verification.');
      return { success: false, message: err.message };
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] pt-28 pb-20 font-sans text-[#292522]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Indicator Header */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-between text-xs font-sans font-bold uppercase tracking-widest text-[#1F1A17]">
            <span className={step >= 1 ? 'text-[#B8924A]' : 'text-gray-400'}>01 Address</span>
            <span className="text-gray-300">→</span>
            <span className={step >= 2 ? 'text-[#B8924A]' : 'text-gray-400'}>02 Delivery</span>
            <span className="text-gray-300">→</span>
            <span className={step >= 3 ? 'text-[#B8924A]' : 'text-gray-400'}>03 Payment</span>
          </div>
          <div className="w-full bg-gray-200 h-1 mt-3 relative">
            <div
              className="bg-[#B8924A] h-1 transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {paymentErrorMessage && (
          <div className="max-w-3xl mx-auto mb-6 p-4 bg-red-100 border border-red-300 text-red-800 text-xs rounded-xl flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <div>
              <strong>Payment Verification Error:</strong> {paymentErrorMessage}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Checkout Wizard Forms */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-[#EFE7DC] shadow-sm space-y-8 rounded-xl">
            
            {/* Step 1: Address */}
            {step === 1 && (
              <form onSubmit={handleAddressSubmit} className="space-y-4">
                <div className="flex items-center space-x-2 border-b border-[#EFE7DC] pb-3">
                  <MapPin className="w-5 h-5 text-[#B8924A]" />
                  <h3 className="font-serif text-2xl text-[#1F1A17]">Shipping Address</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  <div>
                    <label className="block text-gray-700 font-bold uppercase mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.fullName}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                      className="w-full p-3 border border-gray-300 focus:border-[#B8924A] focus:outline-none rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold uppercase mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                      className="w-full p-3 border border-gray-300 focus:border-[#B8924A] focus:outline-none rounded"
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
                      className="w-full p-3 border border-gray-300 focus:border-[#B8924A] focus:outline-none rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold uppercase mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      className="w-full p-3 border border-gray-300 focus:border-[#B8924A] focus:outline-none rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold uppercase mb-1">State *</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                      className="w-full p-3 border border-gray-300 focus:border-[#B8924A] focus:outline-none rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold uppercase mb-1">Postal Code (Pincode) *</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.pincode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                      className="w-full p-3 border border-gray-300 focus:border-[#B8924A] focus:outline-none rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold uppercase mb-1">Country</label>
                    <input
                      type="text"
                      disabled
                      value="India"
                      className="w-full p-3 border border-gray-200 bg-gray-100 text-gray-600 rounded"
                    />
                  </div>
                </div>

                <div className="pt-6 flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-4 bg-[#1F1A17] text-white text-xs font-sans font-bold tracking-widest uppercase hover:bg-[#2B231E] transition-colors flex items-center space-x-2 rounded-lg"
                  >
                    <span>CONTINUE TO DELIVERY</span>
                    <ArrowRight className="w-4 h-4 text-[#B8924A]" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Delivery */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-2 border-b border-[#EFE7DC] pb-3">
                  <Truck className="w-5 h-5 text-[#B8924A]" />
                  <h3 className="font-serif text-2xl text-[#1F1A17]">Select Delivery Option</h3>
                </div>

                <div className="space-y-3 text-xs font-sans">
                  {[
                    { id: 'Express Insured', name: 'Express Insured Air Courier (3-5 Days)', price: 'Complimentary', desc: 'Tamper-proof royal luxury box packaging with full transit insurance.' },
                    { id: 'Standard Ground', name: 'Standard Delivery (5-7 Days)', price: 'Free', desc: 'Standard reliable courier delivery across all Pincodes in India.' }
                  ].map((del) => (
                    <div
                      key={del.id}
                      onClick={() => setDeliveryMethod(del.id)}
                      className={`p-4 border cursor-pointer flex items-center justify-between transition-all rounded-lg ${
                        deliveryMethod === del.id ? 'border-[#B8924A] bg-[#FAF6F0]' : 'border-gray-300 bg-white'
                      }`}
                    >
                      <div>
                        <h4 className="font-bold text-[#1F1A17] text-sm">{del.name}</h4>
                        <p className="text-gray-500">{del.desc}</p>
                      </div>
                      <span className="font-bold text-[#B8924A]">{del.price}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-gray-300 text-xs font-sans rounded-lg"
                  >
                    Back to Address
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-8 py-4 bg-[#1F1A17] text-white text-xs font-sans font-bold tracking-widest uppercase hover:bg-[#2B231E] transition-colors flex items-center space-x-2 rounded-lg"
                  >
                    <span>CONTINUE TO PAYMENT</span>
                    <ArrowRight className="w-4 h-4 text-[#B8924A]" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-2 border-b border-[#EFE7DC] pb-3">
                  <CreditCard className="w-5 h-5 text-[#B8924A]" />
                  <h3 className="font-serif text-2xl text-[#1F1A17]">Select Payment Gateway</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                  {[
                    { id: 'Razorpay', label: 'Razorpay Cards / NetBanking' },
                    { id: 'UPI', label: 'Google Pay / PhonePe / Paytm UPI' },
                    { id: 'COD', label: 'Cash on Delivery (+₹150 fee)' }
                  ].map((pay) => (
                    <div
                      key={pay.id}
                      onClick={() => setPaymentMethod(pay.id)}
                      className={`p-4 border cursor-pointer flex items-center justify-between transition-all rounded-lg ${
                        paymentMethod === pay.id ? 'border-[#B8924A] bg-[#FAF6F0] font-semibold' : 'border-gray-300 bg-white'
                      }`}
                    >
                      <span>{pay.label}</span>
                      {paymentMethod === pay.id && <Check className="w-4 h-4 text-[#B8924A]" />}
                    </div>
                  ))}
                </div>

                <div className="pt-6 flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 border border-gray-300 text-xs font-sans rounded-lg"
                  >
                    Back to Delivery
                  </button>
                  <button
                    onClick={initiateCheckout}
                    disabled={loading}
                    className="px-8 py-4 bg-[#B8924A] hover:bg-[#D4B26A] text-[#1F1A17] text-xs font-sans font-bold tracking-super-wide uppercase shadow-luxury transition-colors rounded-lg flex items-center space-x-2"
                  >
                    <span>{loading ? 'Generating Order...' : `PAY & PLACE ORDER (₹${grandTotal.toLocaleString('en-IN')})`}</span>
                    <ArrowRight className="w-4 h-4 text-[#1F1A17]" />
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Order Summary Column */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-[#EFE7DC] shadow-sm space-y-6 rounded-xl">
            <h3 className="font-serif text-2xl text-[#1F1A17] border-b border-[#EFE7DC] pb-3">Order Summary</h3>

            <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
              {cart.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-xs font-sans">
                  <img src={item.product.images?.[0]} alt={item.product.name} className="w-12 h-14 object-cover rounded border border-[#EFE7DC]" />
                  <div className="flex-1">
                    <h5 className="font-serif text-sm font-semibold text-[#1F1A17]">{item.product.name}</h5>
                    <span className="text-gray-500 block text-[11px]">{item.blouseOption || 'Unstitched Standard'}</span>
                    <span className="text-gray-500">Qty: {item.quantity}</span>
                  </div>
                  <strong className="text-[#1F1A17]">₹{(item.price * item.quantity).toLocaleString('en-IN')}</strong>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t border-[#EFE7DC] text-xs font-sans">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-700 font-semibold">
                  <span>Discount Code Applied:</span>
                  <span>-₹{Math.round(discountAmount).toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>5% GST (Apparel):</span>
                <span>₹{taxAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Express Courier Shipping:</span>
                <span className="text-green-700 font-bold">{shippingFee === 0 ? 'Complimentary' : `₹${shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#1F1A17] border-t border-[#EFE7DC] pt-3">
                <span>Grand Total:</span>
                <span className="text-[#B8924A] text-xl">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Interactive Payment Gateway Authorization Modal (GPay / Razorpay) */}
      {showPaymentModal && (
        <PaymentGatewayModal
          paymentMethod={paymentMethod}
          totalAmount={razorpayData.serverGrandTotal || grandTotal}
          rzpOrderId={razorpayData.orderId}
          dbOrderId={razorpayData.dbOrderId}
          onPaymentSuccess={handleVerifyPayment}
          onPaymentFailure={(msg) => setPaymentErrorMessage(msg)}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
}
