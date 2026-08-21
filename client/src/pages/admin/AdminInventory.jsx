import React, { useState } from 'react';
import { Boxes, AlertTriangle, CheckCircle, XCircle, Search, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import AdminLayout from '../../components/admin/AdminLayout';
import { useToast } from '../../context/ToastContext';

const inventoryData = [
  { name: 'Maroon Velvet Embroidered Heritage Saree', sku: 'PRD-1001', cat: 'Velvet', stock: 4, reorder: 10, status: 'Low', updated: '20 Aug 2024' },
  { name: 'Silk Banarasi Woven Saree', sku: 'PRD-1002', cat: 'Silk', stock: 8, reorder: 10, status: 'Low', updated: '20 Aug 2024' },
  { name: 'Kanjivaram Silk Saree', sku: 'PRD-1003', cat: 'Silk', stock: 12, reorder: 10, status: 'Good', updated: '20 Aug 2024' },
  { name: 'Designer Embroidery Saree', sku: 'PRD-1004', cat: 'Georgette', stock: 6, reorder: 10, status: 'Low', updated: '20 Aug 2024' },
  { name: 'Cotton Silk Saree', sku: 'PRD-1005', cat: 'Cotton Silk', stock: 25, reorder: 10, status: 'Good', updated: '20 Aug 2024' },
  { name: 'Party Wear Sequin Saree', sku: 'PRD-1006', cat: 'Georgette', stock: 0, reorder: 5, status: 'Out of Stock', updated: '20 Aug 2024' },
  { name: 'Printed Daily Wear Saree', sku: 'PRD-1007', cat: 'Cotton Silk', stock: 18, reorder: 10, status: 'Good', updated: '19 Aug 2024' }
];

const stockPieData = [
  { name: 'In Stock', value: 24, color: '#16A34A' },
  { name: 'Low Stock', value: 5, color: '#EA580C' },
  { name: 'Out of Stock', value: 1, color: '#DC2626' }
];

export default function AdminInventory() {
  const [searchQuery, setSearchQuery] = useState('');
  const { addToast } = useToast();

  const filtered = inventoryData.filter(i => !searchQuery || i.name.toLowerCase().includes(searchQuery.toLowerCase()) || i.sku.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleRestock = (sku) => {
    addToast(`Restock purchase order initiated for ${sku}`, 'success');
  };

  return (
    <AdminLayout>
      <div className="space-y-8 text-[#292522]">
        
        {/* Page Header */}
        <div>
          <h1 className="font-serif text-3xl font-light text-[#1F1A17]">Inventory</h1>
          <p className="text-xs font-sans text-gray-500">Monitor stock levels, reorder thresholds, and warehouse status</p>
        </div>

        {/* TOP SUMMARY CARDS & DONUT CHART */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Summary Cards */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-sans">
            <div className="bg-white p-5 rounded-xl border border-[#EFE7DC] shadow-sm space-y-1">
              <span className="text-gray-500 block uppercase font-bold text-[9px]">Total Products</span>
              <strong className="text-2xl text-[#1F1A17] font-bold">30</strong>
              <span className="text-[10px] text-gray-400 block">Catalog Total</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-green-200 shadow-sm space-y-1">
              <span className="text-green-700 block uppercase font-bold text-[9px]">In Stock</span>
              <strong className="text-2xl text-green-800 font-bold">24</strong>
              <span className="text-[10px] text-green-600 block">Healthy Threshold</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-orange-200 shadow-sm space-y-1">
              <span className="text-orange-700 block uppercase font-bold text-[9px]">Low Stock</span>
              <strong className="text-2xl text-orange-800 font-bold">5</strong>
              <span className="text-[10px] text-orange-600 block">Reorder Required</span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-red-200 shadow-sm space-y-1">
              <span className="text-red-700 block uppercase font-bold text-[9px]">Out of Stock</span>
              <strong className="text-2xl text-red-800 font-bold">1</strong>
              <span className="text-[10px] text-red-600 block">Action Needed</span>
            </div>
          </div>

          {/* Stock Summary Donut Chart */}
          <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-[#EFE7DC] shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-serif text-base text-[#1F1A17] font-normal">Stock Summary</h3>
              <div className="space-y-1 text-[11px] font-sans pt-2">
                <div className="flex items-center space-x-2 text-green-700"><span className="w-2 h-2 rounded-full bg-green-600" /><span>In Stock: 24</span></div>
                <div className="flex items-center space-x-2 text-orange-700"><span className="w-2 h-2 rounded-full bg-orange-600" /><span>Low Stock: 5</span></div>
                <div className="flex items-center space-x-2 text-red-700"><span className="w-2 h-2 rounded-full bg-red-600" /><span>Out of Stock: 1</span></div>
              </div>
            </div>

            <div className="w-28 h-28 relative flex items-center justify-center shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={stockPieData} innerRadius={28} outerRadius={42} paddingAngle={2} dataKey="value">
                    {stockPieData.map((e, idx) => <Cell key={idx} fill={e.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Controls */}
        <div className="bg-white p-4 rounded-xl border border-[#EFE7DC] shadow-sm flex items-center justify-between">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search SKU, product name..."
              className="w-full bg-[#FAF6F0] border border-[#EFE7DC] py-2 px-3 pr-8 text-xs font-sans rounded-lg focus:outline-none focus:border-[#B8924A]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-2.5 top-2.5" />
          </div>
        </div>

        {/* Large Inventory Table */}
        <div className="bg-white rounded-xl border border-[#EFE7DC] shadow-sm overflow-hidden text-xs font-sans">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#FAF6F0] border-b border-[#EFE7DC] uppercase text-[10px] tracking-wider text-gray-500">
                <tr>
                  <th className="p-4">Product Name</th>
                  <th className="p-4">SKU</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Current Stock</th>
                  <th className="p-4">Reorder Level</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Last Updated</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE7DC]">
                {filtered.map((item) => (
                  <tr key={item.sku} className="hover:bg-[#FAF6F0]/50 transition-colors">
                    <td className="p-4 font-serif text-sm font-normal text-[#1F1A17]">{item.name}</td>
                    <td className="p-4 font-mono font-bold text-[#B8924A]">{item.sku}</td>
                    <td className="p-4 font-semibold">{item.cat}</td>
                    <td className="p-4 font-bold text-[#1F1A17]">{item.stock}</td>
                    <td className="p-4 text-gray-500">{item.reorder}</td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                        item.status === 'Good' ? 'bg-green-100 text-green-800' : (item.status === 'Low' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800')
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500">{item.updated}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleRestock(item.sku)}
                        className="px-3 py-1.5 bg-[#FAF6F0] hover:bg-[#B8924A] hover:text-white text-[#1F1A17] font-semibold rounded transition-colors"
                      >
                        Restock
                      </button>
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
