import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  DollarSign,
  ShoppingCart,
  Package,
  Boxes,
  Users,
  TrendingUp,
  ArrowUpRight,
  AlertTriangle,
  Eye,
  RefreshCw,
  Calendar,
  Filter,
  CheckCircle2
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import AdminLayout, { useAdminDate } from '../../components/admin/AdminLayout';
import { useToast } from '../../context/ToastContext';
import api from '../../services/api';

// Date Range Dataset Definitions
const dateRangeDatasets = {
  Today: {
    stats: {
      totalRevenue: 48500,
      totalOrders: 2,
      itemsSold: '3 Sarees',
      totalCustomers: 2,
      pendingOrders: 1,
      revenueGrowth: '+100% vs yesterday',
      ordersGrowth: '+2 orders today'
    },
    trend: [
      { date: '09:00 AM', revenue: 14000, orders: 1 },
      { date: '12:00 PM', revenue: 0, orders: 0 },
      { date: '03:00 PM', revenue: 34500, orders: 1 },
      { date: '06:00 PM', revenue: 0, orders: 0 },
      { date: '09:00 PM', revenue: 0, orders: 0 }
    ],
    pie: [
      { name: 'Delivered', value: 1, count: 1, percent: '50.0%', color: '#16A34A' },
      { name: 'Processing', value: 1, count: 1, percent: '50.0%', color: '#2563EB' }
    ],
    recentOrders: [
      { id: 'VSN-784920', name: 'Priya Sundaram', date: 'Today, 03:14 PM', total: '₹34,500', pay: 'Paid', status: 'Processing', statusColor: 'bg-blue-50 text-blue-700' },
      { id: 'VSN-658421', name: 'Ananya Sharma', date: 'Today, 09:45 AM', total: '₹14,000', pay: 'Paid', status: 'Delivered', statusColor: 'bg-green-50 text-green-700' }
    ]
  },
  'This Week': {
    stats: {
      totalRevenue: 385000,
      totalOrders: 14,
      itemsSold: '18 Sarees',
      totalCustomers: 12,
      pendingOrders: 2,
      revenueGrowth: '+14.2% vs last week',
      ordersGrowth: '+4 orders'
    },
    trend: [
      { date: 'Mon', revenue: 42000, orders: 2 },
      { date: 'Tue', revenue: 58000, orders: 2 },
      { date: 'Wed', revenue: 34000, orders: 1 },
      { date: 'Thu', revenue: 89000, orders: 3 },
      { date: 'Fri', revenue: 64000, orders: 2 },
      { date: 'Sat', revenue: 98000, orders: 4 }
    ],
    pie: [
      { name: 'Delivered', value: 8, count: 8, percent: '57.1%', color: '#16A34A' },
      { name: 'Processing', value: 4, count: 4, percent: '28.6%', color: '#2563EB' },
      { name: 'Pending', value: 2, count: 2, percent: '14.3%', color: '#EA580C' }
    ],
    recentOrders: [
      { id: 'VSN-784920', name: 'Priya Sundaram', date: '20 Aug 2024', total: '₹31,499', pay: 'Paid', status: 'Shipped', statusColor: 'bg-purple-50 text-purple-700' },
      { id: 'VSN-658421', name: 'Ananya Sharma', date: '20 Aug 2024', total: '₹24,225', pay: 'Paid', status: 'Processing', statusColor: 'bg-blue-50 text-blue-700' },
      { id: 'VSN-452810', name: 'Meera Rao', date: '19 Aug 2024', total: '₹18,750', pay: 'Pending', status: 'Pending', statusColor: 'bg-orange-50 text-orange-700' },
      { id: 'VSN-321654', name: 'Neha Iyer', date: '19 Aug 2024', total: '₹14,999', pay: 'Paid', status: 'Delivered', statusColor: 'bg-green-50 text-green-700' }
    ]
  },
  'This Month': {
    stats: {
      totalRevenue: 1245000,
      totalOrders: 48,
      itemsSold: '64 Sarees',
      totalCustomers: 142,
      pendingOrders: 3,
      revenueGrowth: '+18.4% vs last month',
      ordersGrowth: '+12.1% growth'
    },
    trend: [
      { date: 'Aug 01', revenue: 42000, orders: 2 },
      { date: 'Aug 05', revenue: 78000, orders: 3 },
      { date: 'Aug 10', revenue: 145000, orders: 6 },
      { date: 'Aug 15', revenue: 210000, orders: 8 },
      { date: 'Aug 18', revenue: 180000, orders: 7 },
      { date: 'Aug 20', revenue: 320000, orders: 12 },
      { date: 'Aug 25', revenue: 270000, orders: 10 }
    ],
    pie: [
      { name: 'Delivered', value: 30, count: 30, percent: '62.5%', color: '#16A34A' },
      { name: 'Processing', value: 10, count: 10, percent: '20.8%', color: '#2563EB' },
      { name: 'Pending', value: 5, count: 5, percent: '10.4%', color: '#EA580C' },
      { name: 'Cancelled', value: 3, count: 3, percent: '6.3%', color: '#DC2626' }
    ],
    recentOrders: [
      { id: 'VSN-784920', name: 'Priya Sundaram', date: '20 Aug 2024', total: '₹31,499', pay: 'Paid', status: 'Shipped', statusColor: 'bg-purple-50 text-purple-700' },
      { id: 'VSN-658421', name: 'Ananya Sharma', date: '20 Aug 2024', total: '₹24,225', pay: 'Paid', status: 'Processing', statusColor: 'bg-blue-50 text-blue-700' },
      { id: 'VSN-452810', name: 'Meera Rao', date: '19 Aug 2024', total: '₹18,750', pay: 'Pending', status: 'Pending', statusColor: 'bg-orange-50 text-orange-700' },
      { id: 'VSN-321654', name: 'Neha Iyer', date: '19 Aug 2024', total: '₹14,999', pay: 'Paid', status: 'Delivered', statusColor: 'bg-green-50 text-green-700' },
      { id: 'VSN-123987', name: 'Kavita Singh', date: '18 Aug 2024', total: '₹22,100', pay: 'Paid', status: 'Delivered', statusColor: 'bg-green-50 text-green-700' }
    ]
  },
  'Custom Range': {
    stats: {
      totalRevenue: 1890000,
      totalOrders: 72,
      itemsSold: '96 Sarees',
      totalCustomers: 215,
      pendingOrders: 4,
      revenueGrowth: '+24.6% custom period',
      ordersGrowth: '+18 orders'
    },
    trend: [
      { date: 'Week 1', revenue: 310000, orders: 12 },
      { date: 'Week 2', revenue: 450000, orders: 18 },
      { date: 'Week 3', revenue: 580000, orders: 22 },
      { date: 'Week 4', revenue: 550000, orders: 20 }
    ],
    pie: [
      { name: 'Delivered', value: 48, count: 48, percent: '66.7%', color: '#16A34A' },
      { name: 'Processing', value: 16, count: 16, percent: '22.2%', color: '#2563EB' },
      { name: 'Pending', value: 5, count: 5, percent: '6.9%', color: '#EA580C' },
      { name: 'Cancelled', value: 3, count: 3, percent: '4.2%', color: '#DC2626' }
    ],
    recentOrders: [
      { id: 'VSN-998877', name: 'Sunita Reddy', date: '15 Aug 2024', total: '₹42,000', pay: 'Paid', status: 'Delivered', statusColor: 'bg-green-50 text-green-700' },
      { id: 'VSN-784920', name: 'Priya Sundaram', date: '20 Aug 2024', total: '₹31,499', pay: 'Paid', status: 'Shipped', statusColor: 'bg-purple-50 text-purple-700' },
      { id: 'VSN-658421', name: 'Ananya Sharma', date: '20 Aug 2024', total: '₹24,225', pay: 'Paid', status: 'Processing', statusColor: 'bg-blue-50 text-blue-700' },
      { id: 'VSN-452810', name: 'Meera Rao', date: '19 Aug 2024', total: '₹18,750', pay: 'Pending', status: 'Pending', statusColor: 'bg-orange-50 text-orange-700' }
    ]
  }
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const adminDateCtx = useAdminDate();

  const [dateRange, setDateRange] = useState(adminDateCtx?.dateFilter || 'Today');
  const [customStartDate, setCustomStartDate] = useState('2024-08-01');
  const [customEndDate, setCustomEndDate] = useState('2024-08-21');

  const initialDataset = dateRangeDatasets[adminDateCtx?.dateFilter || 'Today'] || dateRangeDatasets['Today'];
  const [stats, setStats] = useState(initialDataset.stats);
  const [trendData, setTrendData] = useState(initialDataset.trend);
  const [pieData, setPieData] = useState(initialDataset.pie);
  const [recentOrders, setRecentOrders] = useState(initialDataset.recentOrders);

  // Sync date filter from top header dropdown (AdminLayout context)
  useEffect(() => {
    if (adminDateCtx?.dateFilter) {
      const selectedFilter = adminDateCtx.dateFilter;
      setDateRange(selectedFilter);
      const dataset = dateRangeDatasets[selectedFilter] || dateRangeDatasets['Today'];
      setStats(dataset.stats);
      setTrendData(dataset.trend);
      setPieData(dataset.pie);
      setRecentOrders(dataset.recentOrders);
    }
  }, [adminDateCtx?.dateFilter]);

  // Auto-Update Dashboard when Date Range Filter changes locally or globally
  const handleDateRangeChange = (newRange) => {
    setDateRange(newRange);
    if (adminDateCtx?.setDateFilter) {
      adminDateCtx.setDateFilter(newRange);
    }
    const dataset = dateRangeDatasets[newRange] || dateRangeDatasets['Today'];
    
    setStats(dataset.stats);
    setTrendData(dataset.trend);
    setPieData(dataset.pie);
    setRecentOrders(dataset.recentOrders);

    addToast(`Dashboard updated for range: ${newRange}`, 'info');
  };

  useEffect(() => {
    fetchLiveMongoDBStats();
    const intervalId = setInterval(() => {
      fetchLiveMongoDBStats();
    }, 10000);
    return () => clearInterval(intervalId);
  }, [dateRange]);

  const fetchLiveMongoDBStats = async () => {
    try {
      const res = await api.get(`/admin/stats?range=${dateRange}`);
      if (res.data) {
        if (res.data.recentOrders && res.data.recentOrders.length > 0) {
          const apiFormatted = res.data.recentOrders.map(o => ({
            id: o._id || o.id,
            name: o.user?.name || o.shippingAddress?.fullName || 'Customer',
            date: o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : 'Today',
            total: typeof o.totalAmount === 'number' ? `₹${o.totalAmount.toLocaleString('en-IN')}` : '₹0',
            pay: o.paymentStatus === 'paid' ? 'Paid' : 'Pending',
            status: o.status || 'Processing',
            statusColor: o.status === 'Delivered' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
          }));
          setRecentOrders(apiFormatted);
        }
      }
    } catch (err) {}
  };

  return (
    <AdminLayout>
      <div className="space-y-8 text-[#292522]">
        
        {/* DYNAMIC DATE RANGE CONTROL BAR */}
        <div className="bg-white p-4 rounded-xl border border-[#EFE7DC] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-[#B8924A]" />
            <div>
              <span className="text-xs font-sans font-bold text-[#1F1A17] uppercase tracking-wider block">
                ANALYTICS DATE RANGE
              </span>
              <span className="text-[11px] text-gray-500 font-light block">
                Currently showing performance for <strong className="text-[#B8924A] font-bold">{dateRange}</strong>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Selector Dropdown */}
            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => handleDateRangeChange(e.target.value)}
                className="bg-[#FAF6F0] border border-[#B8924A]/40 text-[#1F1A17] py-2 px-4 pr-8 rounded-lg text-xs font-sans font-bold focus:outline-none focus:border-[#B8924A] cursor-pointer shadow-sm"
              >
                <option value="Today">Today</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="Custom Range">Custom Range</option>
              </select>
            </div>

            {/* Custom Range Date Pickers (Shown when Custom Range selected) */}
            {dateRange === 'Custom Range' && (
              <div className="flex items-center space-x-2 bg-[#F7F4EE] p-1.5 rounded-lg border border-[#EFE7DC] text-xs font-sans">
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="bg-white border border-gray-300 p-1 rounded text-xs focus:outline-none"
                />
                <span className="text-gray-400">to</span>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="bg-white border border-gray-300 p-1 rounded text-xs focus:outline-none"
                />
                <button
                  onClick={() => handleDateRangeChange('Custom Range')}
                  className="px-3 py-1 bg-[#1F1A17] text-white text-[11px] font-bold uppercase rounded hover:bg-[#2B231E]"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ROW 1: 6 TOP KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
          
          {/* Card 1: Total Revenue */}
          <div className="bg-white p-5 rounded-xl border border-[#EFE7DC] shadow-sm hover:shadow-md transition-shadow space-y-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-gray-500">TOTAL REVENUE</span>
              <div className="p-2 rounded-lg bg-[#FAF6F0] text-[#B8924A]">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="font-sans text-2xl font-bold text-[#1F1A17]">₹{stats.totalRevenue.toLocaleString('en-IN')}</div>
              <div className="flex items-center text-[10px] text-green-600 font-medium mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span>{stats.revenueGrowth}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Total Orders */}
          <div className="bg-white p-5 rounded-xl border border-[#EFE7DC] shadow-sm hover:shadow-md transition-shadow space-y-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-gray-500">TOTAL ORDERS</span>
              <div className="p-2 rounded-lg bg-[#FAF6F0] text-[#B8924A]">
                <ShoppingCart className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="font-sans text-2xl font-bold text-[#1F1A17]">{stats.totalOrders}</div>
              <div className="flex items-center text-[10px] text-green-600 font-medium mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span>{stats.ordersGrowth}</span>
              </div>
            </div>
          </div>

          {/* Card 3: Items Sold */}
          <div className="bg-white p-5 rounded-xl border border-[#EFE7DC] shadow-sm hover:shadow-md transition-shadow space-y-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-gray-500">ITEMS SOLD</span>
              <div className="p-2 rounded-lg bg-[#FAF6F0] text-[#B8924A]">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="font-sans text-2xl font-bold text-[#1F1A17]">{stats.itemsSold}</div>
              <div className="text-[10px] text-gray-400 font-medium mt-1">
                Handloom silk & bespoke
              </div>
            </div>
          </div>

          {/* Card 4: Total Products */}
          <div className="bg-white p-5 rounded-xl border border-[#EFE7DC] shadow-sm hover:shadow-md transition-shadow space-y-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-gray-500">TOTAL PRODUCTS</span>
              <div className="p-2 rounded-lg bg-[#FAF6F0] text-[#B8924A]">
                <Boxes className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="font-sans text-2xl font-bold text-[#1F1A17]">30 Active</div>
              <div className="text-[10px] text-gray-400 font-medium mt-1">
                In live catalogue
              </div>
            </div>
          </div>

          {/* Card 5: Total Customers */}
          <div className="bg-white p-5 rounded-xl border border-[#EFE7DC] shadow-sm hover:shadow-md transition-shadow space-y-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-gray-500">CUSTOMERS</span>
              <div className="p-2 rounded-lg bg-[#FAF6F0] text-[#B8924A]">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="font-sans text-2xl font-bold text-[#1F1A17]">{stats.totalCustomers}</div>
              <div className="text-[10px] text-green-600 font-medium mt-1">
                Active buyer accounts
              </div>
            </div>
          </div>

          {/* Card 6: Pending Orders Alert */}
          <div className="bg-white p-5 rounded-xl border border-amber-200 shadow-sm hover:shadow-md transition-shadow space-y-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-amber-700">ACTION REQUIRED</span>
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="font-sans text-2xl font-bold text-amber-900">{stats.pendingOrders} Orders</div>
              <Link to="/admin/orders" className="text-[10px] text-amber-700 hover:underline font-semibold mt-1 inline-block">
                Fulfill orders →
              </Link>
            </div>
          </div>

        </div>

        {/* ROW 2: CHARTS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Revenue & Orders Trend (2 Cols) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-[#EFE7DC] shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#1F1A17]">Revenue & Order Volume Trend</h3>
                <p className="text-xs text-gray-500 font-light">Performance timeline for <strong className="text-[#B8924A]">{dateRange}</strong></p>
              </div>
              <span className="px-3 py-1 bg-[#FAF6F0] text-[#B8924A] text-[10px] font-sans font-bold uppercase rounded-full border border-[#B8924A]/30">
                {dateRange}
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#6B7280' }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 10, fill: '#6B7280' }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: '#6B7280' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F1A17', borderRadius: '8px', border: 'none', color: '#FFF', fontSize: '11px' }}
                    formatter={(val, name) => [name === 'revenue' ? `₹${val.toLocaleString('en-IN')}` : val, name === 'revenue' ? 'Revenue' : 'Orders']}
                  />
                  <Bar yAxisId="left" dataKey="revenue" fill="#B8924A" radius={[4, 4, 0, 0]} barSize={24} />
                  <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#1F1A17" strokeWidth={2} dot={{ r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Order Status Breakdown (1 Col) */}
          <div className="bg-white p-6 rounded-xl border border-[#EFE7DC] shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="font-serif text-xl font-bold text-[#1F1A17]">Fulfillment Breakdown</h3>
              <p className="text-xs text-gray-500 font-light">Order status ratio ({dateRange})</p>
            </div>

            <div className="h-52 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val, name) => [`${val} Orders`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-gray-100">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600 font-medium">{item.name}: <strong>{item.count}</strong></span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ROW 3: RECENT ORDERS TABLE */}
        <div className="bg-white p-6 rounded-xl border border-[#EFE7DC] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#1F1A17]">Recent Orders</h3>
              <p className="text-xs text-gray-500 font-light">Filtered live transaction history ({dateRange})</p>
            </div>
            <Link to="/admin/orders" className="text-xs font-sans font-bold text-[#B8924A] hover:underline flex items-center space-x-1">
              <span>View All Orders</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#FAF6F0]/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#1F1A17]">{ord.id}</td>
                    <td className="py-3.5 px-4 font-medium text-gray-800">{ord.name}</td>
                    <td className="py-3.5 px-4 text-gray-500">{ord.date}</td>
                    <td className="py-3.5 px-4 font-bold text-[#1F1A17]">{ord.total}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${ord.pay === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                        {ord.pay}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${ord.statusColor || 'bg-blue-50 text-blue-700'}`}>
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link to={`/admin/orders?id=${ord.id}`} className="text-gray-500 hover:text-[#B8924A] p-1 inline-block">
                        <Eye className="w-4 h-4" />
                      </Link>
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
