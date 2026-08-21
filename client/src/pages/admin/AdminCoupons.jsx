import React, { useState } from 'react';
import { Tag, Plus, Check, X } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useToast } from '../../context/ToastContext';

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([
    { code: 'FESTIVE10', discount: '10% OFF', category: 'All Sarees', minSpend: 5000, usage: 142, status: 'Active' },
    { code: 'BRIDAL20', discount: '20% OFF', category: 'Kanjivaram Silk', minSpend: 25000, usage: 38, status: 'Active' },
    { code: 'VASANA15', discount: '15% OFF', category: 'Banarasi Brocades', minSpend: 15000, usage: 85, status: 'Active' },
    { code: 'WELCOME500', discount: '₹500 OFF', category: 'First Order', minSpend: 3000, usage: 210, status: 'Expired' }
  ]);

  const { addToast } = useToast();

  const handleCreateCoupon = () => {
    addToast('Coupon feature: New promo code active!', 'success');
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-[#292522]">
        
        <div className="flex justify-between items-center border-b border-[#EFE7DC] pb-4">
          <div>
            <h1 className="font-serif text-3xl font-light text-[#1F1A17]">Offers & Discount Coupons</h1>
            <p className="text-xs font-sans text-gray-500">Manage promotional codes, festive discounts, and loyalty perks</p>
          </div>

          <button onClick={handleCreateCoupon} className="px-5 py-2.5 bg-[#B8924A] text-[#1F1A17] text-xs font-sans font-bold uppercase tracking-wider rounded-lg shadow-sm flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Create Coupon Code</span>
          </button>
        </div>

        {/* Coupons Table */}
        <div className="bg-white rounded-xl border border-[#EFE7DC] shadow-sm overflow-hidden text-xs font-sans">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#FAF6F0] border-b border-[#EFE7DC] uppercase text-[10px] tracking-wider text-gray-500">
                <tr>
                  <th className="p-4">Coupon Code</th>
                  <th className="p-4">Discount Rate</th>
                  <th className="p-4">Applicable Category</th>
                  <th className="p-4">Min. Spend</th>
                  <th className="p-4">Total Uses</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE7DC]">
                {coupons.map((c) => (
                  <tr key={c.code} className="hover:bg-[#FAF6F0]/50 transition-colors">
                    <td className="p-4 font-mono font-bold text-[#B8924A] text-sm">{c.code}</td>
                    <td className="p-4 font-bold text-[#1F1A17]">{c.discount}</td>
                    <td className="p-4 font-semibold">{c.category}</td>
                    <td className="p-4 text-gray-600">₹{c.minSpend.toLocaleString('en-IN')}</td>
                    <td className="p-4 font-bold">{c.usage} times</td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        c.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
