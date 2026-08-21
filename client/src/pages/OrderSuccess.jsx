import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, Truck, ShieldCheck, ArrowRight, Printer, CreditCard, Clock, Check } from 'lucide-react';
import api from '../services/api';

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const local = JSON.parse(localStorage.getItem('vasana_orders') || '[]');
      const found = local.find(o => o._id === id || o.id === id);
      if (found) {
        setOrder(found);
      } else if (id) {
        api.get(`/orders/${id}`)
          .then((res) => {
            if (res.data && typeof res.data === 'object' && res.data._id) setOrder(res.data);
          })
          .catch(() => {});
      }
    } catch(e){}
  }, [id]);

  const trackingCode = order?.trackingCode || 'VSN-784920';
  const paymentMethod = order?.payment?.method || order?.paymentMethod || 'Razorpay / UPI';
  const isCOD = paymentMethod === 'COD' || String(paymentMethod).includes('COD');
  const paymentStatusText = isCOD ? 'Cash on Delivery (Pending at Doorstep)' : 'Paid & Confirmed';
  const totalPaidAmount = order?.totalAmount || order?.total || 31499;

  return (
    <div className="min-h-screen bg-[#F7F4EE] pt-28 pb-20 font-sans selection:bg-[#241C18] selection:text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-[#292522]">
        
        {/* Success Card */}
        <div className="bg-white border border-[#B8924A]/40 p-8 sm:p-12 shadow-luxury text-center space-y-6 rounded-xl">
          <div className="w-20 h-20 bg-[#1F1A17] text-[#B8924A] rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-sans tracking-super-wide text-[#B8924A] uppercase font-bold block">
            THANK YOU FOR YOUR PURCHASE
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#1F1A17]">
            Order Placed Successfully!
          </h1>

          <p className="text-xs font-sans text-gray-600 max-w-md mx-auto leading-relaxed">
            Your heirloom saree order <strong className="text-[#B8924A]">#{id}</strong> has been received and sent to our master artisan studio for final inspection and royal gift box packaging.
          </p>

          {/* Tracking Code */}
          <div className="p-3 bg-[#FAF6F0] border border-[#EFE7DC] inline-block text-xs font-sans rounded-md">
            Tracking Code: <strong className="text-[#1F1A17] font-mono tracking-wider">{trackingCode}</strong>
          </div>

          {/* PROMINENT PAYMENT SUMMARY CARD */}
          <div className="p-6 bg-[#FAF6F0] border border-[#EFE7DC] rounded-xl text-left space-y-4 shadow-sm my-6">
            <div className="flex items-center justify-between border-b border-[#EFE7DC] pb-3">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-[#B8924A]" />
                <h4 className="font-serif text-lg font-bold text-[#1F1A17]">Payment Summary</h4>
              </div>
              <span className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase border ${
                isCOD
                  ? 'bg-orange-100 text-orange-800 border-orange-200'
                  : 'bg-green-100 text-green-800 border-green-200'
              }`}>
                {isCOD ? 'COD PENDING' : 'PAID & CONFIRMED'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div>
                <span className="text-gray-500 uppercase font-bold text-[10px] block mb-0.5">PAYMENT METHOD</span>
                <strong className="text-[#1F1A17] text-sm block font-semibold">
                  {isCOD ? 'Cash on Delivery (COD)' : `${paymentMethod}`}
                </strong>
                <span className="text-gray-500 text-[11px]">
                  {isCOD ? 'Pay cash to delivery partner upon arrival' : 'Instant Secure Gateway Settlement'}
                </span>
              </div>

              <div className="sm:text-right">
                <span className="text-gray-500 uppercase font-bold text-[10px] block mb-0.5">TOTAL AMOUNT</span>
                <strong className="text-[#B8924A] text-xl font-bold block">
                  ₹{typeof totalPaidAmount === 'number' ? totalPaidAmount.toLocaleString('en-IN') : totalPaidAmount}
                </strong>
                <span className="text-green-700 text-[11px] font-semibold flex items-center sm:justify-end">
                  <Check className="w-3.5 h-3.5 mr-1" />
                  Includes 5% GST & Shipping
                </span>
              </div>
            </div>

            {order?.shippingAddress && (
              <div className="pt-3 border-t border-[#EFE7DC] text-xs text-gray-600">
                <span className="font-bold text-[#1F1A17] uppercase text-[10px] block">DELIVERY ADDRESS</span>
                <p className="font-light">
                  {order.shippingAddress.fullName || 'Valued Customer'}, {order.shippingAddress.street || ''}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode || ''}
                </p>
              </div>
            )}
          </div>

          {/* Tracking Timeline */}
          <div className="pt-4 border-t border-[#EFE7DC]">
            <h4 className="font-serif text-xl font-light mb-6 text-[#1F1A17]">Delivery Tracking Timeline</h4>
            <div className="grid grid-cols-4 gap-2 text-[11px] font-sans">
              <div className="text-center space-y-1">
                <div className="w-8 h-8 rounded-full bg-[#1F1A17] text-white flex items-center justify-center mx-auto font-bold">1</div>
                <span className="font-semibold block text-[#1F1A17]">Confirmed</span>
              </div>
              <div className="text-center space-y-1">
                <div className="w-8 h-8 rounded-full bg-[#B8924A] text-[#1F1A17] flex items-center justify-center mx-auto font-bold">2</div>
                <span className="font-semibold block text-[#1F1A17]">Processing</span>
              </div>
              <div className="text-center space-y-1 opacity-50">
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mx-auto">3</div>
                <span className="block">Shipped</span>
              </div>
              <div className="text-center space-y-1 opacity-50">
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mx-auto">4</div>
                <span className="block">Delivered</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-6 py-3 border border-[#B8924A] text-[#1F1A17] text-xs font-sans font-bold tracking-widest uppercase hover:bg-[#B8924A] hover:text-white transition-colors flex items-center justify-center space-x-2 rounded-lg"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT RECEIPT</span>
            </button>
            <Link
              to="/account"
              className="w-full sm:w-auto px-6 py-3 bg-[#1F1A17] text-white text-xs font-sans font-bold tracking-widest uppercase hover:bg-[#2B231E] transition-colors flex items-center justify-center space-x-2 shadow-luxury rounded-lg"
            >
              <span>VIEW IN MY ACCOUNT</span>
              <ArrowRight className="w-4 h-4 text-[#B8924A]" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
