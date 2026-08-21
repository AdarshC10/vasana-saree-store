import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, Truck, ShieldCheck, ArrowRight, Printer } from 'lucide-react';
import api from '../services/api';

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const local = JSON.parse(localStorage.getItem('vasana_orders') || '[]');
      const found = local.find(o => o._id === id);
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

  return (
    <div className="min-h-screen bg-vasana-bg pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-vasana-dark">
        
        {/* Success Card */}
        <div className="bg-white border border-vasana-gold/50 p-8 sm:p-12 shadow-luxury text-center space-y-6">
          <div className="w-20 h-20 bg-vasana-burgundy text-vasana-gold rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-sans tracking-super-wide text-vasana-gold uppercase font-bold block">
            THANK YOU FOR YOUR PURCHASE
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl font-light text-vasana-dark">
            Order Placed Successfully!
          </h1>

          <p className="text-xs font-sans text-gray-600 max-w-md mx-auto leading-relaxed">
            Your heirloom saree order <strong className="text-vasana-burgundy">#{id}</strong> has been received and sent to our master artisan studio for final inspection and royal gift box packaging.
          </p>

          <div className="p-4 bg-vasana-rose/20 border border-vasana-rose/50 inline-block text-xs font-sans">
            Tracking Code: <strong className="text-vasana-burgundy font-mono tracking-wider">{trackingCode}</strong>
          </div>

          {/* Tracking Timeline */}
          <div className="pt-6 border-t border-vasana-rose/40">
            <h4 className="font-serif text-xl font-light mb-6 text-vasana-dark">Delivery Tracking Timeline</h4>
            <div className="grid grid-cols-4 gap-2 text-[11px] font-sans">
              <div className="text-center space-y-1">
                <div className="w-8 h-8 rounded-full bg-vasana-burgundy text-white flex items-center justify-center mx-auto font-bold">1</div>
                <span className="font-semibold block text-vasana-burgundy">Confirmed</span>
              </div>
              <div className="text-center space-y-1">
                <div className="w-8 h-8 rounded-full bg-vasana-gold text-vasana-dark flex items-center justify-center mx-auto font-bold">2</div>
                <span className="font-semibold block text-vasana-dark">Processing</span>
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
              className="px-6 py-3 border border-vasana-gold text-vasana-dark text-xs font-sans font-bold tracking-widest uppercase hover:bg-vasana-gold hover:text-white transition-colors flex items-center space-x-2"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT RECEIPT</span>
            </button>
            <Link
              to="/account"
              className="px-6 py-3 bg-vasana-burgundy text-white text-xs font-sans font-bold tracking-widest uppercase hover:bg-vasana-burgundyDark transition-colors flex items-center space-x-2 shadow-luxury"
            >
              <span>VIEW IN MY ACCOUNT</span>
              <ArrowRight className="w-4 h-4 text-vasana-gold" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
