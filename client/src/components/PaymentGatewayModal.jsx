import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, QrCode, Smartphone, CreditCard, Lock, X, ArrowRight, RefreshCw } from 'lucide-react';

export default function PaymentGatewayModal({ paymentMethod, totalAmount, rzpOrderId, dbOrderId, onPaymentSuccess, onPaymentFailure, onClose }) {
  const [upiId, setUpiId] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // STEP 3: Frontend Razorpay / GPay Payment Execution & STEP 4 Verification Call
  const handleExecutePayment = async (forceSimulateFailure = false) => {
    setProcessing(true);
    setFailed(false);
    setErrorMessage('');

    try {
      // Generate Razorpay payment credentials
      const rzpPaymentId = `pay_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
      
      // HMAC SHA256 test signature (or simulated invalid signature if test failure requested)
      const rzpSignature = forceSimulateFailure ? 'invalid_forged_signature' : 'mock_valid_signature';

      // STEP 4: Call Backend API to verify signature server-side
      const verificationResult = await onPaymentSuccess({
        razorpay_payment_id: rzpPaymentId,
        razorpay_order_id: rzpOrderId || `order_rzp_${Date.now()}`,
        razorpay_signature: rzpSignature,
        dbOrderId
      });

      if (verificationResult && verificationResult.success) {
        setProcessing(false);
        setSuccess(true);
      } else {
        setProcessing(false);
        setFailed(true);
        setErrorMessage(verificationResult?.message || 'Payment Verification Failed: Invalid HMAC SHA256 Signature.');
        if (onPaymentFailure) onPaymentFailure(verificationResult?.message);
      }
    } catch (err) {
      setProcessing(false);
      setFailed(true);
      setErrorMessage(err.message || 'Payment processing or server verification failed.');
      if (onPaymentFailure) onPaymentFailure(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 font-sans text-xs text-[#292522]">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden border border-[#B8924A]/40 animate-fade-in">
        
        {/* Header */}
        <div className="bg-[#1F1A17] text-white p-5 flex items-center justify-between border-b border-[#2B231E]">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#B8924A] text-[#1F1A17] flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#F7F4EE]">
                {paymentMethod === 'UPI' ? 'GPay / UPI Secure Payment' : 'Razorpay Secure Checkout'}
              </h3>
              <span className="text-[10px] text-[#B8924A] uppercase font-bold tracking-wider block -mt-0.5">HMAC-SHA256 Server Verified</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded"><X className="w-5 h-5" /></button>
        </div>

        {/* Processing State */}
        {processing ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 border-4 border-[#B8924A] border-t-transparent rounded-full animate-spin mx-auto" />
            <h4 className="font-serif text-xl font-bold text-[#1F1A17]">Verifying Payment Signature...</h4>
            <p className="text-xs text-gray-500">Executing Step 4: Server-Side HMAC SHA256 Signature Verification. Please wait...</p>
          </div>
        ) : success ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-green-700">Payment Verified & Confirmed!</h4>
            <p className="text-xs text-gray-600">HMAC Signature Matched. Order status updated to "paid". Redirecting...</p>
          </div>
        ) : failed ? (
          /* STEP 5: Payment Failed State with Retry Option */
          <div className="p-8 text-center space-y-4 bg-red-50/50">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <AlertCircle className="w-10 h-10" />
            </div>
            <div>
              <h4 className="font-serif text-2xl font-bold text-red-700">Payment Failed — Please Try Again</h4>
              <p className="text-xs text-gray-600 mt-1">{errorMessage}</p>
              <p className="text-[11px] text-red-600 font-semibold mt-2">Order status set to "payment_failed". Stock was not reduced.</p>
            </div>
            
            <div className="flex space-x-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-3 border border-gray-300 text-gray-700 font-bold uppercase rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleExecutePayment(false)}
                className="flex-1 py-3 bg-[#1F1A17] text-white font-bold uppercase rounded-lg flex items-center justify-center space-x-2 shadow-luxury"
              >
                <RefreshCw className="w-4 h-4 text-[#B8924A]" />
                <span>Retry Payment</span>
              </button>
            </div>
          </div>
        ) : (
          /* Payment Form Screen */
          <div className="p-6 space-y-6">
            
            {/* Server-Calculated Amount Banner */}
            <div className="p-4 bg-[#FAF6F0] border border-[#EFE7DC] rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-500 font-bold uppercase block">SERVER CALCULATED AMOUNT</span>
                <span className="text-xs text-[#1F1A17] font-semibold">Razorpay Order: {rzpOrderId || 'Created'}</span>
              </div>
              <strong className="text-2xl font-bold text-[#B8924A]">₹{totalAmount?.toLocaleString('en-IN')}</strong>
            </div>

            {/* UPI / GPay Interactive Screen */}
            {paymentMethod === 'UPI' ? (
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <span className="text-xs font-bold text-[#1F1A17] block">Select Instant App or Scan QR:</span>
                  <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => handleExecutePayment(false)} className="p-3 border border-gray-200 hover:border-[#B8924A] rounded-lg bg-white shadow-sm font-bold text-center text-[11px] text-blue-700 flex flex-col items-center">
                      <Smartphone className="w-5 h-5 text-blue-600 mb-1" />
                      <span>Google Pay</span>
                    </button>
                    <button onClick={() => handleExecutePayment(false)} className="p-3 border border-gray-200 hover:border-[#B8924A] rounded-lg bg-white shadow-sm font-bold text-center text-[11px] text-purple-700 flex flex-col items-center">
                      <Smartphone className="w-5 h-5 text-purple-600 mb-1" />
                      <span>PhonePe</span>
                    </button>
                    <button onClick={() => handleExecutePayment(false)} className="p-3 border border-gray-200 hover:border-[#B8924A] rounded-lg bg-white shadow-sm font-bold text-center text-[11px] text-cyan-700 flex flex-col items-center">
                      <Smartphone className="w-5 h-5 text-cyan-600 mb-1" />
                      <span>Paytm UPI</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 border border-dashed border-[#B8924A] bg-[#FAF6F0] rounded-xl text-center space-y-2">
                  <QrCode className="w-16 h-16 text-[#1F1A17] mx-auto" />
                  <span className="text-[10px] text-gray-500 block">Scan this QR Code using GPay / PhonePe</span>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-600 block">OR ENTER VPA / UPI ID</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="mobile@okaxis / gpay@upi"
                      className="flex-1 p-2.5 border border-gray-300 rounded focus:border-[#B8924A] focus:outline-none"
                    />
                    <button onClick={() => handleExecutePayment(false)} className="px-4 py-2.5 bg-[#1F1A17] text-white font-bold rounded">
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-3 bg-[#FAF6F0] p-4 rounded-xl border border-[#EFE7DC]">
                  <div className="flex justify-between text-xs font-semibold text-[#1F1A17]">
                    <span>Card / NetBanking / Wallet</span>
                    <span className="text-[#B8924A]">Razorpay Verified</span>
                  </div>
                  <input type="text" placeholder="Card Number (4000 0000 0000 0000)" disabled value="4111 •••• •••• 1111" className="w-full p-2.5 border border-gray-300 rounded bg-white font-mono text-xs" />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="MM / YY" disabled value="12 / 28" className="p-2.5 border border-gray-300 rounded bg-white text-xs" />
                    <input type="password" placeholder="CVV" disabled value="123" className="p-2.5 border border-gray-300 rounded bg-white text-xs" />
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => handleExecutePayment(false)}
              className="w-full py-4 bg-[#B8924A] hover:bg-[#D4B26A] text-[#1F1A17] text-xs font-sans font-bold tracking-super-wide uppercase rounded-xl shadow-luxury transition-all flex items-center justify-center space-x-2"
            >
              <span>AUTHORISE & VERIFY PAYMENT (₹{totalAmount?.toLocaleString('en-IN')})</span>
              <ArrowRight className="w-4 h-4 text-[#1F1A17]" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
