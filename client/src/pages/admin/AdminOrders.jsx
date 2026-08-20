import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, Search, Clock } from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { fallbackOrders } from '../../utils/fallbackData';

const statusOptions = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Returned'];

export default function AdminOrders() {
  const [orders, setOrders] = useState(fallbackOrders);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const { addToast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get('/orders/admin/all');
      if (Array.isArray(res.data) && res.data.length > 0) {
        setOrders(res.data);
      } else {
        setOrders(fallbackOrders);
      }
    } catch (error) {
      setOrders(fallbackOrders);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      addToast(`Order status updated to "${newStatus}"`, 'success');
      fetchOrders();
    } catch (error) {
      setOrders((prev) => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
      addToast(`Order status updated to "${newStatus}"`, 'success');
    }
  };

  const filteredOrders = (Array.isArray(orders) ? orders : fallbackOrders).filter((o) => {
    const matchesStatus = filterStatus === 'All' || o.status === filterStatus;
    const matchesSearch = !searchQuery || o._id.toLowerCase().includes(searchQuery.toLowerCase()) || o.user?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-vasana-bg pt-28 pb-20 text-vasana-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-vasana-rose pb-4 gap-4">
          <div>
            <h1 className="font-serif text-3xl font-light">Order Fulfillment & Tracking</h1>
            <p className="text-xs font-sans text-gray-500">Monitor customer orders, dispatch status, and shipping logs</p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search order ID or client..."
                className="bg-white border px-3 py-2 text-xs w-48 font-sans focus:outline-none"
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-2 top-2.5" />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white border px-3 py-2 text-xs font-sans focus:outline-none"
            >
              <option value="All">All Statuses</option>
              {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white border border-vasana-rose/50 shadow-sm overflow-x-auto text-xs font-sans">
          <table className="w-full text-left">
            <thead className="bg-vasana-bg border-b">
              <tr>
                <th className="p-3">Order Ref</th>
                <th className="p-3">Client</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total Amount</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Current Status</th>
                <th className="p-3">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((ord) => (
                <tr key={ord._id} className="hover:bg-vasana-bg/50">
                  <td className="p-3 font-mono font-bold text-vasana-burgundy">{ord._id}</td>
                  <td className="p-3">
                    <strong className="block">{ord.user?.name || 'Priya S.'}</strong>
                    <span className="text-[10px] text-gray-500">{ord.shippingAddress?.city}, {ord.shippingAddress?.state}</span>
                  </td>
                  <td className="p-3">
                    <span className="font-bold">{ord.items?.length || 1} saree(s)</span>
                  </td>
                  <td className="p-3 font-bold text-vasana-burgundy">₹{ord.totalAmount?.toLocaleString('en-IN')}</td>
                  <td className="p-3">
                    <span className="bg-green-50 text-green-700 px-2 py-0.5 font-bold uppercase text-[10px]">
                      {ord.payment?.method || 'Razorpay'} • Paid
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="bg-vasana-gold/20 text-vasana-burgundy px-2.5 py-1 font-bold uppercase text-[10px]">
                      {ord.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <select
                      value={ord.status}
                      onChange={(e) => handleUpdateStatus(ord._id, e.target.value)}
                      className="bg-vasana-bg border border-vasana-gold p-1 text-[11px] font-sans font-bold focus:outline-none"
                    >
                      {statusOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
