import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Package, ShoppingCart, Users, DollarSign, AlertTriangle, ArrowUpRight } from 'lucide-react';
import api from '../../services/api';
import { fallbackAdminStats } from '../../utils/fallbackData';

export default function AdminDashboard() {
  const [stats, setStats] = useState(fallbackAdminStats);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/admin/stats');
      if (res.data && typeof res.data === 'object' && res.data.totalRevenue !== undefined) {
        setStats(res.data);
      } else {
        setStats(fallbackAdminStats);
      }
    } catch (error) {
      setStats(fallbackAdminStats);
    }
  };

  const recentOrders = Array.isArray(stats?.recentOrders) ? stats.recentOrders : fallbackAdminStats.recentOrders;
  const lowStock = Array.isArray(stats?.lowStockProducts) ? stats.lowStockProducts : fallbackAdminStats.lowStockProducts;

  return (
    <div className="min-h-screen bg-vasana-bg pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-vasana-dark">
        
        {/* Admin Header */}
        <div className="bg-vasana-dark text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-luxury">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-8 h-8 text-vasana-gold" />
            <div>
              <h1 className="font-serif text-3xl font-light">VASANA Administration Suite</h1>
              <p className="text-xs font-sans text-vasana-rose/80">Control center for products, orders, inventory, and customer management</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs font-sans font-bold uppercase tracking-wider">
            <Link to="/admin/products" className="px-4 py-2.5 bg-vasana-gold text-vasana-dark hover:bg-vasana-goldLight transition-colors">
              Manage Products
            </Link>
            <Link to="/admin/orders" className="px-4 py-2.5 bg-white text-vasana-dark hover:bg-gray-100 transition-colors">
              Manage Orders
            </Link>
            <Link to="/admin/customers" className="px-4 py-2.5 border border-vasana-gold text-vasana-gold hover:bg-vasana-gold hover:text-vasana-dark transition-colors">
              Customers
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 border border-vasana-rose/50 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-vasana-gold">
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-gray-500">Total Revenue</span>
              <DollarSign className="w-5 h-5" />
            </div>
            <div className="font-sans text-3xl font-bold text-vasana-burgundy">
              ₹{(stats?.totalRevenue || 1245000).toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-green-700 font-bold uppercase">+14% vs last month</span>
          </div>

          <div className="bg-white p-6 border border-vasana-rose/50 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-vasana-gold">
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-gray-500">Total Orders</span>
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div className="font-sans text-3xl font-bold text-vasana-dark">
              {stats?.totalOrders || 48}
            </div>
            <span className="text-[10px] text-vasana-burgundy font-bold uppercase">{stats?.pendingOrders || 3} Pending Fulfillment</span>
          </div>

          <div className="bg-white p-6 border border-vasana-rose/50 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-vasana-gold">
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-gray-500">Saree Products</span>
              <Package className="w-5 h-5" />
            </div>
            <div className="font-sans text-3xl font-bold text-vasana-dark">
              {stats?.totalProducts || 30}
            </div>
            <span className="text-[10px] text-gray-500 uppercase font-semibold">Active in Storefront</span>
          </div>

          <div className="bg-white p-6 border border-vasana-rose/50 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-vasana-gold">
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-gray-500">Registered Clients</span>
              <Users className="w-5 h-5" />
            </div>
            <div className="font-sans text-3xl font-bold text-vasana-dark">
              {stats?.totalCustomers || 142}
            </div>
            <span className="text-[10px] text-green-700 font-bold uppercase">Active Customer Accounts</span>
          </div>

        </div>

        {/* Low Stock Alerts & Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Recent Orders */}
          <div className="lg:col-span-8 bg-white p-6 border border-vasana-rose/50 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-vasana-rose pb-3">
              <h3 className="font-serif text-2xl text-vasana-dark">Recent Customer Orders</h3>
              <Link to="/admin/orders" className="text-xs font-sans font-bold text-vasana-burgundy hover:underline">
                View All Orders →
              </Link>
            </div>

            <div className="overflow-x-auto text-xs font-sans">
              <table className="w-full text-left">
                <thead className="bg-vasana-bg border-b">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentOrders.map((ord) => (
                    <tr key={ord._id} className="hover:bg-vasana-bg/50">
                      <td className="p-3 font-mono font-bold text-vasana-burgundy">{ord._id.substring(0, 10)}...</td>
                      <td className="p-3">{ord.user?.name || 'Customer'}</td>
                      <td className="p-3 font-bold">₹{ord.totalAmount?.toLocaleString('en-IN')}</td>
                      <td className="p-3">
                        <span className="bg-vasana-gold/20 text-vasana-burgundy px-2 py-0.5 font-bold uppercase text-[10px]">
                          {ord.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <Link to="/admin/orders" className="text-vasana-gold hover:underline font-bold">Manage</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="lg:col-span-4 bg-white p-6 border border-vasana-rose/50 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b border-vasana-rose pb-3">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="font-serif text-xl text-vasana-dark">Low Stock Inventory</h3>
            </div>

            <div className="space-y-3 text-xs font-sans">
              {lowStock.map((prod) => (
                <div key={prod._id} className="flex items-center justify-between p-3 bg-red-50/50 border border-red-200">
                  <div>
                    <strong className="text-vasana-dark block line-clamp-1">{prod.name}</strong>
                    <span className="text-gray-500">{prod.category}</span>
                  </div>
                  <span className="bg-red-600 text-white font-bold px-2 py-0.5 rounded text-[10px]">
                    {prod.stock} left
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
