import React from 'react';
import { CreditCard, CheckCircle2, DollarSign, Download, ArrowUpRight } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminPayments() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-[#292522]">
        
        <div className="flex justify-between items-center border-b border-[#EFE7DC] pb-4">
          <div>
            <h1 className="font-serif text-3xl font-light text-[#1F1A17]">Payments & Settlements</h1>
            <p className="text-xs font-sans text-gray-500">Track Razorpay, UPI, COD payouts, and gateway transaction logs</p>
          </div>

          <button className="px-4 py-2 bg-[#B8924A] text-[#1F1A17] text-xs font-sans font-bold uppercase tracking-wider rounded-lg shadow-sm">
            Export Payout Statement
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-sans">
          <div className="bg-white p-5 rounded-xl border border-[#EFE7DC] shadow-sm space-y-1">
            <span className="text-gray-500 block uppercase font-bold text-[9px]">TOTAL SETTLED (THIS MONTH)</span>
            <strong className="text-2xl text-green-800 font-bold">₹11,98,400</strong>
            <span className="text-[10px] text-green-600 block">Directly deposited to HDFC Bank</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#EFE7DC] shadow-sm space-y-1">
            <span className="text-gray-500 block uppercase font-bold text-[9px]">PENDING GATEWAY CLEARANCE</span>
            <strong className="text-2xl text-[#B8924A] font-bold">₹46,600</strong>
            <span className="text-[10px] text-orange-600 block">Settling in T+1 business day</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#EFE7DC] shadow-sm space-y-1">
            <span className="text-gray-500 block uppercase font-bold text-[9px]">COD UNCOLLECTED</span>
            <strong className="text-2xl text-[#1F1A17] font-bold">₹18,750</strong>
            <span className="text-[10px] text-gray-400 block">In transit with BlueDart courier</span>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-xl border border-[#EFE7DC] shadow-sm overflow-hidden text-xs font-sans">
          <div className="p-4 bg-[#FAF6F0] border-b border-[#EFE7DC] font-serif text-lg text-[#1F1A17]">
            Recent Gateway Transactions
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white border-b border-[#EFE7DC] uppercase text-[10px] tracking-wider text-gray-500">
                <tr>
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Gateway</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Fee / GST</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE7DC]">
                {[
                  { tx: 'TXN-904812', ord: 'VSN-784920', method: 'Razorpay Cards', amt: 31499, fee: 629, status: 'Settled', date: '20 Aug 2024' },
                  { tx: 'TXN-904813', ord: 'VSN-658421', method: 'Google Pay UPI', amt: 24225, fee: 0, status: 'Settled', date: '20 Aug 2024' },
                  { tx: 'TXN-904814', ord: 'VSN-452810', method: 'Cash on Delivery', amt: 18750, fee: 150, status: 'Pending Delivery', date: '19 Aug 2024' },
                  { tx: 'TXN-904815', ord: 'VSN-321654', method: 'NetBanking (HDFC)', amt: 14999, fee: 299, status: 'Settled', date: '19 Aug 2024' }
                ].map((row) => (
                  <tr key={row.tx} className="hover:bg-[#FAF6F0]/50 transition-colors">
                    <td className="p-4 font-mono font-bold text-[#B8924A]">{row.tx}</td>
                    <td className="p-4 font-mono">{row.ord}</td>
                    <td className="p-4 font-semibold">{row.method}</td>
                    <td className="p-4 font-bold text-[#1F1A17]">₹{row.amt.toLocaleString('en-IN')}</td>
                    <td className="p-4 text-gray-500">₹{row.fee}</td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        row.status === 'Settled' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500">{row.date}</td>
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
