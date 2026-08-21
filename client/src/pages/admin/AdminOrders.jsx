import React, { useState } from 'react';
import { Search, Filter, Download, Eye, ChevronLeft, ChevronRight, CheckCircle2, Clock, XCircle, Truck, Package } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useToast } from '../../context/ToastContext';
import { downloadCSV } from '../../utils/excelExport';

const orderTabs = ['All Orders', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const sampleOrders = [
  { id: 'VSN-784920', customer: 'Priya Sundaram', email: 'priya.s@gmail.com', city: 'Bengaluru', date: '20 Aug 2024', total: 31499, payment: 'Razorpay (Paid)', status: 'Shipped', items: '2 Sarees (Kanjivaram & Organza)' },
  { id: 'VSN-658421', customer: 'Ananya Sharma', email: 'ananya.mumbai@yahoo.com', city: 'Mumbai', date: '20 Aug 2024', total: 24225, payment: 'UPI (Paid)', status: 'Processing', items: '1 Saree (Banarasi Silk)' },
  { id: 'VSN-452810', customer: 'Meera Rao', email: 'meera.rao@outlook.com', city: 'Hyderabad', date: '19 Aug 2024', total: 18750, payment: 'COD (Pending)', status: 'Pending', items: '1 Saree (Chanderi Linen)' },
  { id: 'VSN-321654', customer: 'Neha Iyer', email: 'neha.iyer@gmail.com', city: 'Chennai', date: '19 Aug 2024', total: 14999, payment: 'NetBanking (Paid)', status: 'Delivered', items: '1 Saree (Handloom Cotton)' },
  { id: 'VSN-123987', customer: 'Kavita Singh', email: 'kavita.delhi@gmail.com', city: 'New Delhi', date: '18 Aug 2024', total: 22100, payment: 'Razorpay (Paid)', status: 'Delivered', items: '1 Saree (Tissue Organza)' },
  { id: 'VSN-987654', customer: 'Sunita Reddy', email: 'sunita.reddy@gmail.com', city: 'Visakhapatnam', date: '18 Aug 2024', total: 42000, payment: 'Razorpay (Paid)', status: 'Delivered', items: '2 Sarees (Royal Bridal Edit)' },
  { id: 'VSN-852963', customer: 'Ritu Verma', email: 'ritu.v@gmail.com', city: 'Jaipur', date: '17 Aug 2024', total: 12500, payment: 'UPI (Paid)', status: 'Cancelled', items: '1 Saree (Printed Linen)' },
  { id: 'VSN-741852', customer: 'Pooja Agarwal', email: 'pooja.a@gmail.com', city: 'Kolkata', date: '17 Aug 2024', total: 28900, payment: 'Razorpay (Paid)', status: 'Shipped', items: '1 Saree (Varanasi Brocade)' },
  { id: 'VSN-963852', customer: 'Deepika Nair', email: 'deepika.n@gmail.com', city: 'Kochi', date: '16 Aug 2024', total: 19500, payment: 'UPI (Paid)', status: 'Processing', items: '1 Saree (Kerala Kasavu)' },
  { id: 'VSN-159357', customer: 'Shalini Joshi', email: 'shalini.j@gmail.com', city: 'Pune', date: '16 Aug 2024', total: 34000, payment: 'Razorpay (Paid)', status: 'Delivered', items: '2 Sarees (Festive Silk)' }
];

export default function AdminOrders() {
  const [activeTab, setActiveTab] = useState('All Orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [ordersList, setOrdersList] = useState(sampleOrders);
  const [selectedOrderModal, setSelectedOrderModal] = useState(null);

  const { addToast } = useToast();

  const filteredOrders = ordersList.filter((ord) => {
    const matchesTab = activeTab === 'All Orders' || ord.status === activeTab;
    const matchesSearch = !searchQuery || ord.id.toLowerCase().includes(searchQuery.toLowerCase()) || ord.customer.toLowerCase().includes(searchQuery.toLowerCase()) || ord.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'Shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleExport = () => {
    const headers = ['Order ID', 'Customer Name', 'Email', 'City', 'Date', 'Total Amount (INR)', 'Payment Method', 'Status', 'Items'];
    const rows = filteredOrders.map(o => [o.id, o.customer, o.email, o.city, o.date, o.total, o.payment, o.status, o.items]);
    downloadCSV('VASANA_Orders_Export', headers, rows);
    addToast('Downloaded Orders spreadsheet (CSV)', 'success');
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-[#292522]">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-light text-[#1F1A17]">Orders</h1>
            <p className="text-xs font-sans text-gray-500">Manage and track all customer orders</p>
          </div>

          <div className="flex items-center space-x-3">
            <button onClick={handleExport} className="px-4 py-2 border border-[#EFE7DC] hover:border-[#B8924A] bg-white text-xs font-sans font-semibold rounded-lg flex items-center space-x-2 shadow-sm transition-all">
              <Download className="w-4 h-4 text-[#B8924A]" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Top Filter Tabs */}
        <div className="flex border-b border-[#EFE7DC] space-x-6 overflow-x-auto no-scrollbar font-sans text-xs">
          {orderTabs.map((tab) => {
            const active = activeTab === tab;
            const count = tab === 'All Orders' ? ordersList.length : ordersList.filter(o => o.status === tab).length;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 font-semibold transition-all relative ${
                  active ? 'text-[#B8924A] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#B8924A]' : 'text-gray-400 hover:text-[#1F1A17]'
                }`}
              >
                <span>{tab} ({count})</span>
              </button>
            );
          })}
        </div>

        {/* Search & Controls */}
        <div className="bg-white p-4 rounded-xl border border-[#EFE7DC] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search order ID, customer name, or city..."
              className="w-full bg-[#FAF6F0] border border-[#EFE7DC] py-2 px-3 pr-8 text-xs font-sans rounded-lg focus:outline-none focus:border-[#B8924A]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-2.5 top-2.5" />
          </div>

          <div className="flex items-center space-x-2 text-xs font-sans text-gray-500">
            <Filter className="w-4 h-4 text-[#B8924A]" />
            <span>Showing {filteredOrders.length} matching orders</span>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl border border-[#EFE7DC] shadow-sm overflow-hidden text-xs font-sans">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#FAF6F0] border-b border-[#EFE7DC] uppercase text-[10px] tracking-wider text-gray-500">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Items Summary</th>
                  <th className="p-4">Total Amount</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE7DC]">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#FAF6F0]/50 transition-colors">
                    <td className="p-4 font-mono font-bold text-[#B8924A]">{ord.id}</td>
                    <td className="p-4">
                      <strong className="block text-[#1F1A17]">{ord.customer}</strong>
                      <span className="text-[10px] text-gray-400">{ord.city} • {ord.email}</span>
                    </td>
                    <td className="p-4 text-gray-600">{ord.date}</td>
                    <td className="p-4 text-gray-700">{ord.items}</td>
                    <td className="p-4 font-bold text-[#1F1A17]">₹{ord.total.toLocaleString('en-IN')}</td>
                    <td className="p-4">
                      <span className="text-[10px] font-semibold text-gray-600 bg-[#FAF6F0] px-2 py-1 rounded border border-[#EFE7DC]">
                        {ord.payment}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border ${getStatusBadge(ord.status)}`}>
                        {ord.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedOrderModal(ord)}
                        className="px-3 py-1.5 bg-[#FAF6F0] hover:bg-[#B8924A] hover:text-white text-[#1F1A17] font-semibold rounded transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-4 bg-[#FAF6F0] border-t border-[#EFE7DC] flex items-center justify-between text-xs text-gray-500 font-sans">
            <span>Showing 1 to {filteredOrders.length} of 48 orders</span>
            <div className="flex items-center space-x-2">
              <button disabled className="p-1 border rounded bg-white opacity-50"><ChevronLeft className="w-4 h-4" /></button>
              <span className="px-2 py-1 bg-[#B8924A] text-white font-bold rounded">1</span>
              <button className="p-1 border rounded bg-white hover:bg-gray-100"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

      </div>

      {/* View Order Details Modal */}
      {selectedOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-xl p-6 space-y-4 shadow-2xl font-sans text-xs text-[#292522]">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#1F1A17]">Order {selectedOrderModal.id}</h3>
                <span className="text-gray-400">Placed on {selectedOrderModal.date}</span>
              </div>
              <button onClick={() => setSelectedOrderModal(null)} className="p-1 hover:bg-gray-100 rounded">✕</button>
            </div>

            <div className="space-y-3 bg-[#FAF6F0] p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="text-gray-500">Customer Name:</span>
                <strong className="text-[#1F1A17]">{selectedOrderModal.customer}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery Address:</span>
                <span>Indiranagar, {selectedOrderModal.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Items Ordered:</span>
                <strong>{selectedOrderModal.items}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Status:</span>
                <span className="text-green-700 font-bold">{selectedOrderModal.payment}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#1F1A17] border-t pt-2">
                <span>Total Paid:</span>
                <span className="text-[#B8924A]">₹{selectedOrderModal.total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button onClick={() => setSelectedOrderModal(null)} className="px-5 py-2 bg-[#1F1A17] text-white font-bold rounded-lg uppercase">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
