import React, { useState } from 'react';
import { Users, UserPlus, Search, Filter, Mail, Phone, Calendar, DollarSign, X } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useToast } from '../../context/ToastContext';

const sampleCustomers = [
  { id: 'CUST-201', name: 'Priya Sundaram', email: 'priya.s@gmail.com', phone: '+91 9876543210', orders: 4, spend: 124500, joined: '15 Jan 2024' },
  { id: 'CUST-202', name: 'Ananya Sharma', email: 'ananya.mumbai@yahoo.com', phone: '+91 9812345678', orders: 3, spend: 98200, joined: '02 Feb 2024' },
  { id: 'CUST-203', name: 'Meera Rao', email: 'meera.rao@outlook.com', phone: '+91 9765432109', orders: 3, spend: 75800, joined: '18 Mar 2024' },
  { id: 'CUST-204', name: 'Neha Iyer', email: 'neha.iyer@gmail.com', phone: '+91 9654321098', orders: 2, spend: 60300, joined: '10 Apr 2024' },
  { id: 'CUST-205', name: 'Kavita Singh', email: 'kavita.delhi@gmail.com', phone: '+91 9543210987', orders: 2, spend: 52100, joined: '05 May 2024' },
  { id: 'CUST-206', name: 'Sunita Reddy', email: 'sunita.r@gmail.com', phone: '+91 9432109876', orders: 1, spend: 42000, joined: '22 Jun 2024' },
  { id: 'CUST-207', name: 'Pooja Agarwal', email: 'pooja.a@gmail.com', phone: '+91 9321098765', orders: 1, spend: 28900, joined: '14 Jul 2024' }
];

const topSpenders = [
  { name: 'Priya Sundaram', spend: 124500, city: 'Bengaluru' },
  { name: 'Ananya Sharma', spend: 98200, city: 'Mumbai' },
  { name: 'Meera Rao', spend: 75800, city: 'Hyderabad' },
  { name: 'Neha Iyer', spend: 60300, city: 'Chennai' },
  { name: 'Kavita Singh', spend: 52100, city: 'New Delhi' }
];

export default function AdminCustomers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [customersList, setCustomersList] = useState(sampleCustomers);
  const [showAddModal, setShowAddModal] = useState(false);

  const { addToast } = useToast();

  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const filtered = customersList.filter(c => !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.email.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const newC = {
      id: 'CUST-' + Math.floor(208 + Math.random() * 900),
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '+91 9000000000',
      orders: 0,
      spend: 0,
      joined: 'Today'
    };
    setCustomersList([newC, ...customersList]);
    addToast('New client profile created!', 'success');
    setShowAddModal(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-8 text-[#292522]">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-light text-[#1F1A17]">Customers</h1>
            <p className="text-xs font-sans text-gray-500">Manage customer accounts and purchase activity</p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 bg-[#B8924A] hover:bg-[#D4B26A] text-[#1F1A17] text-xs font-sans font-bold uppercase tracking-wider rounded-lg transition-all shadow-md flex items-center space-x-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New Customer</span>
          </button>
        </div>

        {/* TOP KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-sans">
          <div className="bg-white p-5 rounded-xl border border-[#EFE7DC] shadow-sm space-y-1">
            <span className="text-gray-500 block uppercase font-bold text-[9px]">Total Customers</span>
            <strong className="text-3xl text-[#1F1A17] font-bold">142</strong>
            <span className="text-[10px] text-green-700 font-semibold block">+18% vs last month</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#EFE7DC] shadow-sm space-y-1">
            <span className="text-gray-500 block uppercase font-bold text-[9px]">New Customers (This Month)</span>
            <strong className="text-3xl text-[#B8924A] font-bold">18</strong>
            <span className="text-[10px] text-gray-400 block">Registered clientele</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#EFE7DC] shadow-sm space-y-1">
            <span className="text-gray-500 block uppercase font-bold text-[9px]">Returning Customers</span>
            <strong className="text-3xl text-[#1F1A17] font-bold">67%</strong>
            <span className="text-[10px] text-green-700 font-semibold block">High Loyalty Rate</span>
          </div>
        </div>

        {/* MAIN LAYOUT: Customer Table & Top Spenders */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Customers Table */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Search */}
            <div className="bg-white p-4 rounded-xl border border-[#EFE7DC] shadow-sm flex items-center justify-between">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search customer name or email..."
                  className="w-full bg-[#FAF6F0] border border-[#EFE7DC] py-2 px-3 pr-8 text-xs font-sans rounded-lg focus:outline-none focus:border-[#B8924A]"
                />
                <Search className="w-4 h-4 text-gray-400 absolute right-2.5 top-2.5" />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#EFE7DC] shadow-sm overflow-hidden text-xs font-sans">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#FAF6F0] border-b border-[#EFE7DC] uppercase text-[10px] tracking-wider text-gray-500">
                    <tr>
                      <th className="p-4">Customer ID</th>
                      <th className="p-4">Customer Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Phone</th>
                      <th className="p-4">Orders</th>
                      <th className="p-4">Total Spend</th>
                      <th className="p-4">Joined On</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE7DC]">
                    {filtered.map((c) => (
                      <tr key={c.id} className="hover:bg-[#FAF6F0]/50 transition-colors">
                        <td className="p-4 font-mono font-bold text-[#B8924A]">{c.id}</td>
                        <td className="p-4 font-serif text-sm font-normal text-[#1F1A17]">{c.name}</td>
                        <td className="p-4 text-gray-600">{c.email}</td>
                        <td className="p-4 text-gray-500">{c.phone}</td>
                        <td className="p-4 font-bold">{c.orders}</td>
                        <td className="p-4 font-bold text-[#1F1A17]">₹{c.spend.toLocaleString('en-IN')}</td>
                        <td className="p-4 text-gray-500">{c.joined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Top Customers by Spend Sidebar */}
          <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-[#EFE7DC] shadow-sm space-y-4">
            <div className="border-b border-[#EFE7DC] pb-3">
              <h3 className="font-serif text-lg font-normal text-[#1F1A17]">Top Customers by Spend</h3>
              <p className="text-[10px] font-sans text-gray-400">VASANA Privé VIP Clients</p>
            </div>

            <div className="space-y-3 pt-1">
              {topSpenders.map((s, idx) => (
                <div key={s.name} className="p-3 bg-[#FAF6F0] rounded-lg border border-[#EFE7DC] flex items-center justify-between text-xs font-sans">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-full bg-[#1F1A17] text-[#D4B26A] font-bold text-[10px] flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <strong className="text-[#1F1A17] block font-serif text-sm font-normal">{s.name}</strong>
                      <span className="text-[10px] text-gray-400">{s.city}</span>
                    </div>
                  </div>
                  <strong className="text-[#B8924A]">₹{s.spend.toLocaleString('en-IN')}</strong>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleAddCustomer} className="bg-white max-w-md w-full rounded-xl p-6 space-y-4 shadow-2xl font-sans text-xs text-[#292522]">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-serif text-xl font-bold text-[#1F1A17]">Add New Customer</h3>
              <button type="button" onClick={() => setShowAddModal(false)}><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-bold uppercase mb-1">Full Name *</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2.5 border rounded" />
              </div>
              <div>
                <label className="block font-bold uppercase mb-1">Email Address *</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full p-2.5 border rounded" />
              </div>
              <div>
                <label className="block font-bold uppercase mb-1">Phone Number</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full p-2.5 border rounded" />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-3 border-t">
              <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button type="submit" className="px-6 py-2 bg-[#B8924A] text-[#1F1A17] font-bold uppercase rounded shadow-md">Add Profile</button>
            </div>
          </form>
        </div>
      )}
    </AdminLayout>
  );
}
