import React, { useState } from 'react';
import { BarChart3, Download, Calendar, DollarSign, ShoppingCart, Package, TrendingUp, Filter, FileText, CheckCircle2, AlertTriangle, Users, CreditCard } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import AdminLayout from '../../components/admin/AdminLayout';
import { useToast } from '../../context/ToastContext';
import { downloadCSV } from '../../utils/excelExport';

const reportTypes = [
  { id: 'Sales Report', label: 'Sales Report', icon: DollarSign },
  { id: 'Order Report', label: 'Order Report', icon: ShoppingCart },
  { id: 'Inventory Report', label: 'Inventory Report', icon: Package },
  { id: 'Customer Report', label: 'Customer Report', icon: Users },
  { id: 'Payment Report', label: 'Payment Report', icon: CreditCard }
];

// Sales Report Mock Data
const salesTrendData = [
  { date: 'Aug 01', revenue: 65000, orders: 2 },
  { date: 'Aug 05', revenue: 110000, orders: 4 },
  { date: 'Aug 10', revenue: 240000, orders: 8 },
  { date: 'Aug 15', revenue: 310000, orders: 10 },
  { date: 'Aug 20', revenue: 520000, orders: 16 }
];

// Order Report Mock Data
const orderVolumeData = [
  { day: 'Mon', count: 6 },
  { day: 'Tue', count: 10 },
  { day: 'Wed', count: 8 },
  { day: 'Thu', count: 14 },
  { day: 'Fri', count: 12 },
  { day: 'Sat', count: 18 },
  { day: 'Sun', count: 15 }
];

// Inventory Report Mock Data
const inventoryHealthData = [
  { category: 'Silk', inStock: 12, lowStock: 2 },
  { category: 'Velvet', inStock: 4, lowStock: 1 },
  { category: 'Georgette', inStock: 6, lowStock: 2 },
  { category: 'Cotton Silk', inStock: 25, lowStock: 0 }
];

// Customer Acquisition Mock Data
const customerGrowthData = [
  { month: 'Apr', newCust: 12 },
  { month: 'May', newCust: 14 },
  { month: 'Jun', newCust: 15 },
  { month: 'Jul', newCust: 16 },
  { month: 'Aug', newCust: 18 }
];

// Payment Split Mock Data
const paymentSplitPie = [
  { name: 'Razorpay Cards', value: 580000, color: '#B8924A' },
  { name: 'UPI (GPay/PhonePe)', value: 420000, color: '#16A34A' },
  { name: 'NetBanking', value: 165000, color: '#2563EB' },
  { name: 'COD', value: 80000, color: '#EA580C' }
];

export default function AdminReports() {
  const [selectedReport, setSelectedReport] = useState('Sales Report');
  const [dateRange, setDateRange] = useState('This Month');
  const { addToast } = useToast();

  const handleExportCSV = () => {
    let headers = [];
    let rows = [];
    let filename = `VASANA_${selectedReport.replace(/\s+/g, '_')}_${dateRange.replace(/\s+/g, '_')}`;

    if (selectedReport === 'Sales Report') {
      headers = ['Date', 'Gross Revenue (INR)', 'Order Count'];
      rows = salesTrendData.map(d => [d.date, d.revenue, d.orders]);
    } else if (selectedReport === 'Order Report') {
      headers = ['Day', 'Order Volume'];
      rows = orderVolumeData.map(d => [d.day, d.count]);
    } else if (selectedReport === 'Inventory Report') {
      headers = ['Category', 'In Stock Units', 'Low Stock Threshold'];
      rows = inventoryHealthData.map(d => [d.category, d.inStock, d.lowStock]);
    } else if (selectedReport === 'Customer Report') {
      headers = ['Month', 'New Registrations'];
      rows = customerGrowthData.map(d => [d.month, d.newCust]);
    } else {
      headers = ['Payment Gateway', 'Volume Settled (INR)'];
      rows = paymentSplitPie.map(d => [d.name, d.value]);
    }

    downloadCSV(filename, headers, rows);
    addToast(`Downloaded Excel/CSV spreadsheet: ${filename}.csv`, 'success');
  };

  return (
    <AdminLayout>
      <div className="space-y-8 text-[#292522]">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-light text-[#1F1A17]">Reports & Analytics</h1>
            <p className="text-xs font-sans text-gray-500">Analyze sales performance, orders breakdown, inventory health, and payment settlements</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-sans">
            {/* Date Range Selector */}
            <div className="flex items-center space-x-1 border border-[#EFE7DC] bg-white rounded-lg p-1">
              {['Today', 'This Week', 'This Month', 'Custom Date Range'].map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                    dateRange === range ? 'bg-[#1F1A17] text-[#D4B26A] font-bold shadow-sm' : 'text-gray-600 hover:bg-[#FAF6F0]'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-[#B8924A] hover:bg-[#D4B26A] text-[#1F1A17] font-bold uppercase tracking-wider rounded-lg shadow-md flex items-center space-x-2 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export Excel (CSV)</span>
            </button>
          </div>
        </div>

        {/* TOP DYNAMIC KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-sans">
          <div className="bg-white p-5 rounded-xl border border-[#EFE7DC] shadow-sm space-y-1">
            <span className="text-gray-500 block uppercase font-bold text-[9px]">TOTAL REVENUE</span>
            <div className="text-2xl font-bold text-[#1F1A17]">₹12,45,000</div>
            <span className="text-[10px] font-semibold text-green-700 block">↑ 14% vs last month</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#EFE7DC] shadow-sm space-y-1">
            <span className="text-gray-500 block uppercase font-bold text-[9px]">TOTAL ORDERS</span>
            <div className="text-2xl font-bold text-[#1F1A17]">48</div>
            <span className="text-[10px] font-semibold text-green-700 block">↑ 8% vs last month</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#EFE7DC] shadow-sm space-y-1">
            <span className="text-gray-500 block uppercase font-bold text-[9px]">PRODUCTS SOLD</span>
            <div className="text-2xl font-bold text-[#1F1A17]">126</div>
            <span className="text-[10px] font-semibold text-green-700 block">↑ 12% vs last month</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#EFE7DC] shadow-sm space-y-1">
            <span className="text-gray-500 block uppercase font-bold text-[9px]">AVG ORDER VALUE</span>
            <div className="text-2xl font-bold text-[#1F1A17]">₹25,938</div>
            <span className="text-[10px] font-semibold text-green-700 block">↑ 6% vs last month</span>
          </div>
        </div>

        {/* MAIN LAYOUT SPLIT: Left Module Switcher, Right Module View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Module Switcher */}
          <div className="lg:col-span-3 bg-white p-4 rounded-xl border border-[#EFE7DC] shadow-sm space-y-2 text-xs font-sans">
            <h4 className="font-serif text-base font-normal text-[#1F1A17] border-b border-[#EFE7DC] pb-2 mb-3">Report Modules</h4>
            {reportTypes.map((rep) => {
              const Icon = rep.icon;
              const active = selectedReport === rep.id;
              return (
                <button
                  key={rep.id}
                  onClick={() => setSelectedReport(rep.id)}
                  className={`w-full text-left p-3 rounded-lg flex items-center justify-between transition-all ${
                    active
                      ? 'bg-[#1F1A17] text-[#D4B26A] font-bold shadow-md'
                      : 'text-gray-700 hover:bg-[#FAF6F0]'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${active ? 'text-[#B8924A]' : 'text-gray-400'}`} />
                    <span>{rep.label}</span>
                  </div>
                  {active && <span className="text-[9px] font-bold uppercase text-[#B8924A] bg-[#2B231E] px-2 py-0.5 rounded">ACTIVE</span>}
                </button>
              );
            })}
          </div>

          {/* Right Dynamic Report Body */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* 1. SALES REPORT VIEW */}
            {selectedReport === 'Sales Report' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-[#EFE7DC] shadow-sm space-y-4">
                  <div className="border-b border-[#EFE7DC] pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-normal text-[#1F1A17]">Sales & Gross Revenue Performance</h3>
                      <p className="text-[10px] font-sans text-gray-400">Gross sales breakdown for {dateRange}</p>
                    </div>
                    <span className="text-xs font-sans font-bold text-[#B8924A] bg-[#FAF6F0] px-3 py-1 rounded-full border">
                      Revenue Trend
                    </span>
                  </div>

                  <div className="h-64 w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesTrendData}>
                        <XAxis dataKey="date" stroke="#888" fontSize={10} tickLine={false} />
                        <YAxis stroke="#888" fontSize={10} tickFormatter={(v) => `₹${v/1000}k`} axisLine={false} />
                        <Tooltip formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']} contentStyle={{ backgroundColor: '#1F1A17', color: '#fff', borderRadius: '8px', fontSize: '12px' }} />
                        <Bar dataKey="revenue" fill="#B8924A" radius={[6, 6, 0, 0]} barSize={36} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-[#EFE7DC] shadow-sm overflow-hidden text-xs font-sans">
                  <h4 className="font-serif text-lg text-[#1F1A17] border-b pb-3 mb-4">Sales Audit Log</h4>
                  <table className="w-full text-left">
                    <thead className="bg-[#FAF6F0] text-gray-500 uppercase text-[10px]">
                      <tr><th className="p-3">Period</th><th className="p-3">Orders</th><th className="p-3">Gross Sales</th><th className="p-3">Average Value</th></tr>
                    </thead>
                    <tbody className="divide-y">
                      {salesTrendData.map(s => (
                        <tr key={s.date}>
                          <td className="p-3 font-semibold">{s.date}</td>
                          <td className="p-3">{s.orders} orders</td>
                          <td className="p-3 font-bold text-[#B8924A]">₹{s.revenue.toLocaleString('en-IN')}</td>
                          <td className="p-3 font-bold">₹{(s.revenue / s.orders).toLocaleString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 2. ORDER REPORT VIEW */}
            {selectedReport === 'Order Report' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-[#EFE7DC] shadow-sm space-y-4">
                  <div className="border-b border-[#EFE7DC] pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-normal text-[#1F1A17]">Weekly Order Volume & Velocity</h3>
                      <p className="text-[10px] font-sans text-gray-400">Order count distribution per day</p>
                    </div>
                    <span className="text-xs font-sans font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      Fulfillment Report
                    </span>
                  </div>

                  <div className="h-64 w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={orderVolumeData}>
                        <XAxis dataKey="day" stroke="#888" fontSize={10} tickLine={false} />
                        <YAxis stroke="#888" fontSize={10} axisLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#1F1A17', color: '#fff', borderRadius: '8px', fontSize: '12px' }} />
                        <Line type="monotone" dataKey="count" stroke="#2563EB" strokeWidth={3} dot={{ r: 5, fill: '#2563EB' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* 3. INVENTORY REPORT VIEW */}
            {selectedReport === 'Inventory Report' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-[#EFE7DC] shadow-sm space-y-4">
                  <div className="border-b border-[#EFE7DC] pb-3">
                    <h3 className="font-serif text-xl font-normal text-[#1F1A17]">Stock Health & Reorder Thresholds</h3>
                    <p className="text-[10px] font-sans text-gray-400">Inventory levels across fabric categories</p>
                  </div>

                  <div className="h-64 w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={inventoryHealthData}>
                        <XAxis dataKey="category" stroke="#888" fontSize={10} tickLine={false} />
                        <YAxis stroke="#888" fontSize={10} axisLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#1F1A17', color: '#fff', borderRadius: '8px', fontSize: '12px' }} />
                        <Bar dataKey="inStock" fill="#16A34A" radius={[4, 4, 0, 0]} name="In Stock" />
                        <Bar dataKey="lowStock" fill="#EA580C" radius={[4, 4, 0, 0]} name="Low Stock" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* 4. CUSTOMER REPORT VIEW */}
            {selectedReport === 'Customer Report' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-[#EFE7DC] shadow-sm space-y-4">
                  <div className="border-b border-[#EFE7DC] pb-3">
                    <h3 className="font-serif text-xl font-normal text-[#1F1A17]">Clientele Acquisition & Growth</h3>
                    <p className="text-[10px] font-sans text-gray-400">Monthly new registered clientele</p>
                  </div>

                  <div className="h-64 w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={customerGrowthData}>
                        <XAxis dataKey="month" stroke="#888" fontSize={10} tickLine={false} />
                        <YAxis stroke="#888" fontSize={10} axisLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#1F1A17', color: '#fff', borderRadius: '8px', fontSize: '12px' }} />
                        <Bar dataKey="newCust" fill="#1F1A17" radius={[6, 6, 0, 0]} barSize={32} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* 5. PAYMENT REPORT VIEW */}
            {selectedReport === 'Payment Report' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-[#EFE7DC] shadow-sm space-y-4">
                  <div className="border-b border-[#EFE7DC] pb-3">
                    <h3 className="font-serif text-xl font-normal text-[#1F1A17]">Payment Gateway Settlement Split</h3>
                    <p className="text-[10px] font-sans text-gray-400">Revenue collected by payment gateway</p>
                  </div>

                  <div className="h-56 relative flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={paymentSplitPie} innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                          {paymentSplitPie.map((e, idx) => <Cell key={idx} fill={e.color} />)}
                        </Pie>
                        <Tooltip formatter={(v, name) => [`₹${v.toLocaleString('en-IN')}`, name]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-sans border-t pt-4">
                    {paymentSplitPie.map(p => (
                      <div key={p.name} className="flex justify-between items-center p-2 bg-[#FAF6F0] rounded">
                        <span className="font-semibold text-gray-700">{p.name}</span>
                        <strong className="text-[#1F1A17]">₹{p.value.toLocaleString('en-IN')}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </AdminLayout>
  );
}
