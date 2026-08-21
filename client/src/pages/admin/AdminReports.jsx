import React, { useState } from 'react';
import { BarChart3, Download, Calendar, DollarSign, ShoppingCart, Package, TrendingUp, Filter, FileText } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import AdminLayout from '../../components/admin/AdminLayout';
import { useToast } from '../../context/ToastContext';

const reportTypes = [
  'Sales Report',
  'Order Report',
  'Inventory Report',
  'Customer Report',
  'Payment Report'
];

const revenueOverTimeData = [
  { date: 'Aug 01', revenue: 65000 },
  { date: 'Aug 05', revenue: 110000 },
  { date: 'Aug 10', revenue: 240000 },
  { date: 'Aug 15', revenue: 310000 },
  { date: 'Aug 20', revenue: 520000 }
];

const ordersStatusPie = [
  { name: 'Delivered', value: 30, color: '#16A34A' },
  { name: 'Processing', value: 10, color: '#2563EB' },
  { name: 'Pending', value: 5, color: '#EA580C' },
  { name: 'Cancelled', value: 3, color: '#DC2626' }
];

const topCategoriesData = [
  { name: 'Silk', sales: 540000 },
  { name: 'Velvet', sales: 320000 },
  { name: 'Georgette', sales: 220000 },
  { name: 'Cotton Silk', sales: 165000 }
];

export default function AdminReports() {
  const [selectedReport, setSelectedReport] = useState('Sales Report');
  const [dateRange, setDateRange] = useState('This Month');
  const { addToast } = useToast();

  const handleExport = () => {
    addToast(`Exporting ${selectedReport} (${dateRange}) as PDF/Excel...`, 'info');
  };

  return (
    <AdminLayout>
      <div className="space-y-8 text-[#292522]">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-light text-[#1F1A17]">Reports & Analytics</h1>
            <p className="text-xs font-sans text-gray-500">Analyze sales performance, orders breakdown, and category trends</p>
          </div>

          <div className="flex items-center space-x-3 text-xs font-sans">
            {/* Date Filters */}
            <div className="flex items-center space-x-1 border border-[#EFE7DC] bg-white rounded-lg p-1">
              {['Today', 'This Week', 'This Month', 'Custom Date Range'].map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                    dateRange === range ? 'bg-[#1F1A17] text-[#D4B26A] font-bold' : 'text-gray-600 hover:bg-[#FAF6F0]'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>

            <button
              onClick={handleExport}
              className="px-4 py-2 bg-[#B8924A] hover:bg-[#D4B26A] text-[#1F1A17] font-bold uppercase tracking-wider rounded-lg shadow-md flex items-center space-x-2 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* TOP KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-sans">
          
          <div className="bg-white p-5 rounded-xl border border-[#EFE7DC] shadow-sm space-y-2">
            <span className="text-gray-500 block uppercase font-bold text-[9px]">TOTAL REVENUE</span>
            <div className="text-2xl font-bold text-[#1F1A17]">₹12,45,000</div>
            <span className="text-[10px] font-semibold text-green-700 block">↑ 14% vs last month</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#EFE7DC] shadow-sm space-y-2">
            <span className="text-gray-500 block uppercase font-bold text-[9px]">TOTAL ORDERS</span>
            <div className="text-2xl font-bold text-[#1F1A17]">48</div>
            <span className="text-[10px] font-semibold text-green-700 block">↑ 8% vs last month</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#EFE7DC] shadow-sm space-y-2">
            <span className="text-gray-500 block uppercase font-bold text-[9px]">PRODUCTS SOLD</span>
            <div className="text-2xl font-bold text-[#1F1A17]">126</div>
            <span className="text-[10px] font-semibold text-green-700 block">↑ 12% vs last month</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#EFE7DC] shadow-sm space-y-2">
            <span className="text-gray-500 block uppercase font-bold text-[9px]">AVERAGE ORDER VALUE</span>
            <div className="text-2xl font-bold text-[#1F1A17]">₹25,938</div>
            <span className="text-[10px] font-semibold text-green-700 block">↑ 6% vs last month</span>
          </div>

        </div>

        {/* LAYOUT SPLIT: Report Navigation Left, Main Charts Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Report Type Navigation Sidebar */}
          <div className="lg:col-span-3 bg-white p-4 rounded-xl border border-[#EFE7DC] shadow-sm space-y-2 text-xs font-sans">
            <h4 className="font-serif text-base font-normal text-[#1F1A17] border-b border-[#EFE7DC] pb-2 mb-3">Report Modules</h4>
            {reportTypes.map((rep) => (
              <button
                key={rep}
                onClick={() => setSelectedReport(rep)}
                className={`w-full text-left p-3 rounded-lg flex items-center justify-between transition-all ${
                  selectedReport === rep
                    ? 'bg-[#1F1A17] text-[#D4B26A] font-bold shadow-md'
                    : 'text-gray-700 hover:bg-[#FAF6F0]'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <FileText className={`w-4 h-4 ${selectedReport === rep ? 'text-[#B8924A]' : 'text-gray-400'}`} />
                  <span>{rep}</span>
                </div>
                {selectedReport === rep && <span className="text-[10px] font-bold uppercase text-[#B8924A]">Active</span>}
              </button>
            ))}
          </div>

          {/* Main Visual Reports Body */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Chart 1: Revenue Over Time */}
            <div className="bg-white p-6 rounded-xl border border-[#EFE7DC] shadow-sm space-y-4">
              <div className="border-b border-[#EFE7DC] pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-normal text-[#1F1A17]">1. Revenue Over Time</h3>
                  <p className="text-[10px] font-sans text-gray-400">Gross revenue distribution over selected date range ({dateRange})</p>
                </div>
                <span className="text-xs font-sans font-bold text-[#B8924A]">Gold Column Chart</span>
              </div>

              <div className="h-64 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueOverTimeData}>
                    <XAxis dataKey="date" stroke="#888" fontSize={10} tickLine={false} />
                    <YAxis stroke="#888" fontSize={10} tickFormatter={(v) => `₹${v/1000}k`} axisLine={false} />
                    <Tooltip formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']} contentStyle={{ backgroundColor: '#1F1A17', color: '#fff', borderRadius: '8px', fontSize: '12px' }} />
                    <Bar dataKey="revenue" fill="#B8924A" radius={[6, 6, 0, 0]} barSize={36} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Split Row: Orders by Status & Top Selling Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Chart 2: Orders by Status */}
              <div className="bg-white p-6 rounded-xl border border-[#EFE7DC] shadow-sm space-y-4">
                <div className="border-b border-[#EFE7DC] pb-3">
                  <h3 className="font-serif text-lg font-normal text-[#1F1A17]">2. Orders by Status</h3>
                  <p className="text-[10px] font-sans text-gray-400">Fulfillment ratio distribution</p>
                </div>

                <div className="h-48 relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={ordersStatusPie} innerRadius={45} outerRadius={65} paddingAngle={3} dataKey="value">
                        {ordersStatusPie.map((e, idx) => <Cell key={idx} fill={e.color} />)}
                      </Pie>
                      <Tooltip formatter={(v, name) => [`${v} Orders`, name]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-sans border-t border-[#EFE7DC] pt-3">
                  {ordersStatusPie.map(o => (
                    <div key={o.name} className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: o.color }} />
                      <span className="text-gray-700">{o.name}: <strong>{o.value}</strong></span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chart 3: Top Selling Categories */}
              <div className="bg-white p-6 rounded-xl border border-[#EFE7DC] shadow-sm space-y-4">
                <div className="border-b border-[#EFE7DC] pb-3">
                  <h3 className="font-serif text-lg font-normal text-[#1F1A17]">3. Top Selling Categories</h3>
                  <p className="text-[10px] font-sans text-gray-400">Revenue split across fabric categories</p>
                </div>

                <div className="space-y-3 pt-2">
                  {topCategoriesData.map((cat) => (
                    <div key={cat.name} className="space-y-1 text-xs font-sans">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-semibold text-[#1F1A17]">{cat.name}</span>
                        <strong className="text-[#B8924A]">₹{cat.sales.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="w-full bg-[#FAF6F0] h-2 rounded-full overflow-hidden">
                        <div className="bg-[#B8924A] h-2 rounded-full" style={{ width: `${(cat.sales / 540000) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </AdminLayout>
  );
}
