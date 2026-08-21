import React, { useState } from 'react';
import { Settings, Save, ShieldCheck, Truck, Percent, Lock } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useToast } from '../../context/ToastContext';

export default function AdminSettings() {
  const { addToast } = useToast();

  const [settings, setSettings] = useState({
    storeName: 'VASANA Haute Couture',
    supportEmail: 'concierge@vasana.com',
    supportPhone: '+91 9123456789',
    freeShippingMin: 5000,
    gstRate: 5,
    currency: 'INR (₹)'
  });

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Store configuration saved successfully.', 'success');
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-[#292522]">
        
        <div className="flex justify-between items-center border-b border-[#EFE7DC] pb-4">
          <div>
            <h1 className="font-serif text-3xl font-light text-[#1F1A17]">Settings</h1>
            <p className="text-xs font-sans text-gray-500">Configure business parameters, GST rates, shipping thresholds, and admin security</p>
          </div>

          <button onClick={handleSave} className="px-5 py-2.5 bg-[#B8924A] hover:bg-[#D4B26A] text-[#1F1A17] text-xs font-sans font-bold uppercase tracking-wider rounded-lg shadow-md flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-xl border border-[#EFE7DC] shadow-sm max-w-3xl space-y-6 text-xs font-sans">
          
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-normal text-[#1F1A17] border-b border-[#EFE7DC] pb-2">Store Profile & Concierge</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold uppercase text-gray-700 mb-1">Store Name</label>
                <input type="text" value={settings.storeName} onChange={(e) => setSettings({ ...settings, storeName: e.target.value })} className="w-full p-2.5 border rounded-lg" />
              </div>
              <div>
                <label className="block font-bold uppercase text-gray-700 mb-1">Support Email</label>
                <input type="email" value={settings.supportEmail} onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })} className="w-full p-2.5 border rounded-lg" />
              </div>
              <div>
                <label className="block font-bold uppercase text-gray-700 mb-1">Support Phone</label>
                <input type="text" value={settings.supportPhone} onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })} className="w-full p-2.5 border rounded-lg" />
              </div>
              <div>
                <label className="block font-bold uppercase text-gray-700 mb-1">Store Currency</label>
                <input type="text" disabled value={settings.currency} className="w-full p-2.5 border rounded-lg bg-gray-100 text-gray-500" />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#EFE7DC]">
            <h3 className="font-serif text-xl font-normal text-[#1F1A17] border-b border-[#EFE7DC] pb-2">Taxes & Shipping Thresholds</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold uppercase text-gray-700 mb-1">GST Tax Rate (%)</label>
                <input type="number" value={settings.gstRate} onChange={(e) => setSettings({ ...settings, gstRate: Number(e.target.value) })} className="w-full p-2.5 border rounded-lg" />
              </div>
              <div>
                <label className="block font-bold uppercase text-gray-700 mb-1">Complimentary Shipping Minimum (₹)</label>
                <input type="number" value={settings.freeShippingMin} onChange={(e) => setSettings({ ...settings, freeShippingMin: Number(e.target.value) })} className="w-full p-2.5 border rounded-lg" />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" className="px-8 py-3 bg-[#1F1A17] text-white text-xs font-sans font-bold uppercase tracking-wider rounded-lg shadow-md hover:bg-[#2B231E]">
              Save Settings
            </button>
          </div>

        </form>

      </div>
    </AdminLayout>
  );
}
