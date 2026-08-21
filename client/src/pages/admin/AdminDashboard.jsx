import React from 'react';
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
  RefreshCw
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
  Cell,
  BarChart
} from 'recharts';
import AdminLayout from '../../components/admin/AdminLayout';

// Mock Recharts Data
const revenueTrendData = [
  { date: 'Aug 01', revenue: 42000, orders: 2 },
  { date: 'Aug 05', revenue: 78000, orders: 3 },
  { date: 'Aug 10', revenue: 145000, orders: 6 },
  { date: 'Aug 15', revenue: 210000, orders: 8 },
  { date: 'Aug 18', revenue: 180000, orders: 7 },
  { date: 'Aug 20', revenue: 320000, orders: 12 },
  { date: 'Aug 25', revenue: 270000, orders: 10 }
];

const orderStatusPieData = [
  { name: 'Delivered', value: 30, count: 30, percent: '62.5%', color: '#16A34A' },
  { name: 'Processing', value: 10, count: 10, percent: '20.8%', color: '#2563EB' },
  { name: 'Pending', value: 5, count: 5, percent: '10.4%', color: '#EA580C' },
  { name: 'Cancelled', value: 3, count: 3, percent: '6.3%', color: '#DC2626' }
];

const topSellingSarees = [
  { name: 'Maroon Velvet Saree', revenue: 245000 },
  { name: 'Banarasi Silk Saree', revenue: 198000 },
  { name: 'Kanjivaram Saree', revenue: 165000 },
  { name: 'Designer Embroidery', revenue: 125000 },
  { name: 'Cotton Silk Saree', revenue: 98000 }
];

const sparklines = {
  revenue: [40, 55, 60, 75, 80, 90, 100],
  orders: [3, 4, 5, 4, 6, 7, 8],
  sold: [10, 15, 18, 20, 22, 25, 28],
  products: [28, 28, 29, 29, 30, 30, 30],
  clients: [110, 115, 120, 128, 134, 138, 142],
  aov: [22000, 23500, 24000, 24800, 25200, 25600, 25938]
};

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="space-y-8 text-[#292522]">
        
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
              <div className="font-sans text-2xl font-bold text-[#1F1A17]">₹12,45,000</div>
              <div className="flex items-center text-[10px] font-sans text-[#16A34A] font-semibold mt-1">
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
                <span>14% vs last month</span>
              </div>
            </div>
            {/* Sparkline Visual */}
            <div className="h-6 flex items-end space-x-1 pt-1">
              {sparklines.revenue.map((val, i) => (
                <div key={i} className="flex-1 bg-[#B8924A]/40 hover:bg-[#B8924A] rounded-t transition-all" style={{ height: `${(val / 100) * 100}%` }} />
              ))}
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
              <div className="font-sans text-2xl font-bold text-[#1F1A17]">48</div>
              <div className="flex items-center text-[10px] font-sans text-[#16A34A] font-semibold mt-1">
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
                <span>8% vs last month</span>
              </div>
              <div className="text-[9px] font-sans text-[#EA580C] font-semibold mt-0.5">3 Pending Fulfillment</div>
            </div>
            <div className="h-6 flex items-end space-x-1 pt-1">
              {sparklines.orders.map((val, i) => (
                <div key={i} className="flex-1 bg-[#1F1A17]/40 hover:bg-[#1F1A17] rounded-t transition-all" style={{ height: `${(val / 8) * 100}%` }} />
              ))}
            </div>
          </div>

          {/* Card 3: Products Sold */}
          <div className="bg-white p-5 rounded-xl border border-[#EFE7DC] shadow-sm hover:shadow-md transition-shadow space-y-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-gray-500">PRODUCTS SOLD</span>
              <div className="p-2 rounded-lg bg-[#FAF6F0] text-[#B8924A]">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="font-sans text-2xl font-bold text-[#1F1A17]">126</div>
              <div className="flex items-center text-[10px] font-sans text-[#16A34A] font-semibold mt-1">
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
                <span>12% vs last month</span>
              </div>
            </div>
            <div className="h-6 flex items-end space-x-1 pt-1">
              {sparklines.sold.map((val, i) => (
                <div key={i} className="flex-1 bg-[#B8924A]/40 hover:bg-[#B8924A] rounded-t transition-all" style={{ height: `${(val / 28) * 100}%` }} />
              ))}
            </div>
          </div>

          {/* Card 4: Saree Products */}
          <div className="bg-white p-5 rounded-xl border border-[#EFE7DC] shadow-sm hover:shadow-md transition-shadow space-y-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-gray-500">SAREE PRODUCTS</span>
              <div className="p-2 rounded-lg bg-[#FAF6F0] text-[#B8924A]">
                <Boxes className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="font-sans text-2xl font-bold text-[#1F1A17]">30</div>
              <div className="text-[10px] font-sans text-[#EA580C] font-semibold mt-1">5 Low Stock</div>
            </div>
            <div className="h-6 flex items-end space-x-1 pt-1">
              {sparklines.products.map((val, i) => (
                <div key={i} className="flex-1 bg-[#2B231E]/40 hover:bg-[#2B231E] rounded-t transition-all" style={{ height: `${(val / 30) * 100}%` }} />
              ))}
            </div>
          </div>

          {/* Card 5: Registered Clients */}
          <div className="bg-white p-5 rounded-xl border border-[#EFE7DC] shadow-sm hover:shadow-md transition-shadow space-y-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-gray-500">REGISTERED CLIENTS</span>
              <div className="p-2 rounded-lg bg-[#FAF6F0] text-[#B8924A]">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="font-sans text-2xl font-bold text-[#1F1A17]">142</div>
              <div className="flex items-center text-[10px] font-sans text-[#16A34A] font-semibold mt-1">
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
                <span>18 New This Month</span>
              </div>
            </div>
            <div className="h-6 flex items-end space-x-1 pt-1">
              {sparklines.clients.map((val, i) => (
                <div key={i} className="flex-1 bg-[#B8924A]/40 hover:bg-[#B8924A] rounded-t transition-all" style={{ height: `${(val / 142) * 100}%` }} />
              ))}
            </div>
          </div>

          {/* Card 6: Average Order Value */}
          <div className="bg-white p-5 rounded-xl border border-[#EFE7DC] shadow-sm hover:shadow-md transition-shadow space-y-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-gray-500">AVG ORDER VALUE</span>
              <div className="p-2 rounded-lg bg-[#FAF6F0] text-[#B8924A]">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="font-sans text-2xl font-bold text-[#1F1A17]">₹25,938</div>
              <div className="flex items-center text-[10px] font-sans text-[#16A34A] font-semibold mt-1">
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
                <span>6% vs last month</span>
              </div>
            </div>
            <div className="h-6 flex items-end space-x-1 pt-1">
              {sparklines.aov.map((val, i) => (
                <div key={i} className="flex-1 bg-[#B8924A]/40 hover:bg-[#B8924A] rounded-t transition-all" style={{ height: `${(val / 25938) * 100}%` }} />
              ))}
            </div>
          </div>

        </div>

        {/* ROW 2: CHARTS (Revenue Trend, Order Status Donut, Top 5 Sarees) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Revenue & Orders Trend */}
          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-[#EFE7DC] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#EFE7DC] pb-3">
              <div>
                <h3 className="font-serif text-lg font-normal text-[#1F1A17]">Revenue & Orders Trend</h3>
                <p className="text-[10px] font-sans text-gray-400">Monthly breakdown of gross revenue and total order count</p>
              </div>
              <span className="text-xs font-sans font-bold text-[#B8924A] bg-[#FAF6F0] px-3 py-1 rounded-full border border-[#B8924A]/30">
                This Month
              </span>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={revenueTrendData}>
                  <XAxis dataKey="date" stroke="#888" fontSize={10} tickLine={false} />
                  <YAxis yAxisId="left" stroke="#888" fontSize={10} tickFormatter={(v) => `₹${v/1000}k`} axisLine={false} />
                  <YAxis yAxisId="right" orientation="right" stroke="#888" fontSize={10} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F1A17', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                    formatter={(value, name) => [name === 'revenue' ? `₹${value.toLocaleString('en-IN')}` : value, name === 'revenue' ? 'Revenue' : 'Orders']}
                  />
                  <Bar yAxisId="left" dataKey="revenue" fill="#B8924A" radius={[4, 4, 0, 0]} barSize={24} />
                  <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#1F1A17" strokeWidth={3} dot={{ r: 4, fill: '#1F1A17' }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Order Status Donut */}
          <div className="lg:col-span-3 bg-white p-6 rounded-xl border border-[#EFE7DC] shadow-sm space-y-4 flex flex-col justify-between">
            <div className="border-b border-[#EFE7DC] pb-3">
              <h3 className="font-serif text-lg font-normal text-[#1F1A17]">Order Status</h3>
              <p className="text-[10px] font-sans text-gray-400">Total Orders: 48</p>
            </div>

            <div className="h-44 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusPieData}
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {orderStatusPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} Orders`, name]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute text-center">
                <span className="font-sans text-2xl font-bold text-[#1F1A17]">48</span>
                <span className="block text-[9px] font-sans text-gray-400 uppercase font-bold">TOTAL</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs font-sans border-t border-[#EFE7DC] pt-3">
              {orderStatusPieData.map((st) => (
                <div key={st.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: st.color }} />
                    <span className="text-gray-700">{st.name}</span>
                  </div>
                  <span className="font-bold text-[#1F1A17]">{st.count} ({st.percent})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top 5 Best Selling Sarees */}
          <div className="lg:col-span-3 bg-white p-6 rounded-xl border border-[#EFE7DC] shadow-sm space-y-4">
            <div className="border-b border-[#EFE7DC] pb-3">
              <h3 className="font-serif text-lg font-normal text-[#1F1A17]">Top 5 Best Selling Sarees</h3>
              <p className="text-[10px] font-sans text-gray-400">Highest revenue saree lines</p>
            </div>

            <div className="space-y-3 pt-1">
              {topSellingSarees.map((item, idx) => (
                <div key={item.name} className="space-y-1 text-xs font-sans">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-semibold text-[#1F1A17] truncate">{idx + 1}. {item.name}</span>
                    <strong className="text-[#B8924A]">₹{item.revenue.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="w-full bg-[#FAF6F0] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#B8924A] h-2 rounded-full"
                      style={{ width: `${(item.revenue / 245000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ROW 3: INVENTORY OVERVIEW, RECENT ORDERS TABLE & LOW STOCK ALERTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Inventory Overview */}
          <div className="lg:col-span-3 bg-white p-6 rounded-xl border border-[#EFE7DC] shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-lg font-normal text-[#1F1A17] border-b border-[#EFE7DC] pb-3">Inventory Overview</h3>
              <div className="grid grid-cols-2 gap-3 pt-4 text-xs font-sans">
                <div className="p-3 bg-[#FAF6F0] rounded-lg border border-[#EFE7DC]">
                  <span className="text-gray-500 block uppercase text-[9px] font-bold">Total Products</span>
                  <strong className="text-lg text-[#1F1A17]">30</strong>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-green-700 block uppercase text-[9px] font-bold">In Stock</span>
                  <strong className="text-lg text-green-800">24</strong>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <span className="text-orange-700 block uppercase text-[9px] font-bold">Low Stock</span>
                  <strong className="text-lg text-orange-800">5</strong>
                </div>
                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <span className="text-red-700 block uppercase text-[9px] font-bold">Out of Stock</span>
                  <strong className="text-lg text-red-800">1</strong>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <button
                onClick={() => navigate('/admin/inventory')}
                className="w-full py-2.5 bg-[#B8924A] hover:bg-[#D4B26A] text-[#1F1A17] text-xs font-sans font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm"
              >
                View Inventory
              </button>
              <button
                onClick={() => navigate('/admin/inventory')}
                className="w-full py-2.5 border border-[#1F1A17] hover:bg-[#1F1A17] hover:text-white text-[#1F1A17] text-xs font-sans font-bold uppercase tracking-wider rounded-lg transition-colors"
              >
                Restock Products
              </button>
            </div>
          </div>

          {/* Recent Customer Orders Table */}
          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-[#EFE7DC] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#EFE7DC] pb-3">
              <h3 className="font-serif text-lg font-normal text-[#1F1A17]">Recent Customer Orders</h3>
              <Link to="/admin/orders" className="text-xs font-sans font-bold text-[#B8924A] hover:underline">
                View All Orders →
              </Link>
            </div>

            <div className="overflow-x-auto text-xs font-sans">
              <table className="w-full text-left">
                <thead className="bg-[#FAF6F0] border-b text-gray-500 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-2.5">Order ID</th>
                    <th className="p-2.5">Customer</th>
                    <th className="p-2.5">Date</th>
                    <th className="p-2.5">Total</th>
                    <th className="p-2.5">Payment</th>
                    <th className="p-2.5">Status</th>
                    <th className="p-2.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { id: 'VSN-784920', name: 'Priya Sundaram', date: '20 Aug 2024', total: '₹31,499', pay: 'Paid', status: 'Shipped', statusColor: 'bg-purple-50 text-purple-700' },
                    { id: 'VSN-658421', name: 'Ananya Sharma', date: '20 Aug 2024', total: '₹24,225', pay: 'Paid', status: 'Processing', statusColor: 'bg-blue-50 text-blue-700' },
                    { id: 'VSN-452810', name: 'Meera Rao', date: '19 Aug 2024', total: '₹18,750', pay: 'Pending', status: 'Pending', statusColor: 'bg-orange-50 text-orange-700' },
                    { id: 'VSN-321654', name: 'Neha Iyer', date: '19 Aug 2024', total: '₹14,999', pay: 'Paid', status: 'Delivered', statusColor: 'bg-green-50 text-green-700' },
                    { id: 'VSN-123987', name: 'Kavita Singh', date: '18 Aug 2024', total: '₹22,100', pay: 'Paid', status: 'Delivered', statusColor: 'bg-green-50 text-green-700' }
                  ].map((row) => (
                    <tr key={row.id} className="hover:bg-[#FAF6F0]/50 transition-colors">
                      <td className="p-2.5 font-mono font-bold text-[#B8924A]">{row.id}</td>
                      <td className="p-2.5 font-semibold text-[#1F1A17]">{row.name}</td>
                      <td className="p-2.5 text-gray-500">{row.date}</td>
                      <td className="p-2.5 font-bold text-[#1F1A17]">{row.total}</td>
                      <td className="p-2.5"><span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded">{row.pay}</span></td>
                      <td className="p-2.5"><span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${row.statusColor}`}>{row.status}</span></td>
                      <td className="p-2.5 text-right">
                        <Link to="/admin/orders" className="text-gray-600 hover:text-[#B8924A] p-1 inline-block" title="View Order">
                          <Eye className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Low Stock Alerts */}
          <div className="lg:col-span-3 bg-white p-6 rounded-xl border border-[#EFE7DC] shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b border-[#EFE7DC] pb-3">
              <AlertTriangle className="w-4 h-4 text-[#EA580C]" />
              <h3 className="font-serif text-lg font-normal text-[#1F1A17]">Recent Low Stock Alerts</h3>
            </div>

            <div className="space-y-3 pt-1">
              {[
                { name: 'Maroon Velvet Embroidered Heritage Saree', cat: 'Velvet', stock: 4, img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80' },
                { name: 'Silk Banarasi Woven Saree', cat: 'Silk', stock: 8, img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=300&q=80' },
                { name: 'Designer Embroidery Saree', cat: 'Georgette', stock: 6, img: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=300&q=80' }
              ].map((item) => (
                <div key={item.name} className="flex items-center space-x-3 p-2 bg-[#FAF6F0] rounded-lg border border-[#EFE7DC]">
                  <img src={item.img} alt={item.name} className="w-10 h-12 object-cover rounded shrink-0 border" />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-serif text-xs text-[#1F1A17] line-clamp-1 font-normal">{item.name}</h5>
                    <span className="text-[10px] text-gray-500 block">{item.cat}</span>
                  </div>
                  <span className="bg-[#EA580C] text-white text-[9px] font-bold px-2 py-1 rounded shrink-0">
                    {item.stock} left
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/admin/inventory')}
              className="w-full py-2 border border-[#EA580C] text-[#EA580C] hover:bg-[#EA580C] hover:text-white text-xs font-sans font-bold uppercase tracking-wider rounded-lg transition-colors pt-2"
            >
              MANAGE INVENTORY ALERTS
            </button>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}
