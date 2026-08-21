import React, { useState, useEffect } from 'react';
import { CreditCard, CheckCircle2, DollarSign, Download, ArrowUpRight } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useToast } from '../../context/ToastContext';
import { downloadCSV } from '../../utils/excelExport';

const defaultTransactions = [
  { id: 'TXN-984210', orderId: 'VSN-784920', method: 'Razorpay (Cards)', amount: '₹31,499', fee: '₹630 (2%)', status: 'Settled', date: '20 Aug 2024, 14:32' },
  { id: 'TXN-854219', orderId: 'VSN-658421', method: 'UPI (GPay)', amount: '₹24,225', fee: '₹0 (0%)', status: 'Settled', date: '20 Aug 2024, 11:15' },
  { id: 'TXN-751248', orderId: 'VSN-452810', method: 'COD (Cash)', amount: '₹18,750', fee: '₹150 (COD Fee)', status: 'Pending Clearance', date: '19 Aug 2024, 18:40' },
  { id: 'TXN-652391', orderId: 'VSN-321654', method: 'NetBanking (HDFC)', amount: '₹14,999', fee: '₹299 (2%)', status: 'Settled', date: '19 Aug 2024, 09:20' },
  { id: 'TXN-541289', orderId: 'VSN-123987', method: 'Razorpay (Cards)', amount: '₹22,100', fee: '₹442 (2%)', status: 'Settled', date: '18 Aug 2024, 16:50' }
];

export default function AdminPayments() {
  const [transactions, setTransactions] = useState(defaultTransactions);
  const { addToast } = useToast();

  useEffect(() => {
    fetchMongoDBPayments();
  }, []);

  const fetchMongoDBPayments = async () => {
    try {
      const res = await api.get('/admin/payments');
      if (Array.isArray(res.data) && res.data.length > 0) {
        const liveTxns = res.data.map(o => ({
          id: o.razorpayPaymentId || ('TXN-' + Math.floor(100000 + Math.random() * 900000)),
          orderId: o.razorpayOrderId || o._id,
          method: `${o.paymentMethod || 'Razorpay'} Gateway`,
          amount: `₹${(o.totalAmount || 0).toLocaleString('en-IN')}`,
          fee: '₹0 (Gateway)',
          status: o.paymentStatus === 'paid' ? 'Settled' : 'Pending Clearance',
          date: o.createdAt ? new Date(o.createdAt).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Today'
        }));
        setTransactions([...liveTxns, ...defaultTransactions]);
      }
    } catch (err) {}
  };

  const handleExport = () => {
    const headers = ['Transaction ID', 'Order ID', 'Payment Gateway', 'Amount (INR)', 'Fee / GST', 'Status', 'Date'];
    const rows = transactions.map(t => [t.id, t.orderId, t.method, t.amount, t.fee, t.status, t.date]);
    downloadCSV('VASANA_Payments_Statement', headers, rows);
    addToast('Downloaded Payments & Payout statement (CSV)', 'success');
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-[#292522]">
        
        <div className="flex justify-between items-center border-b border-[#EFE7DC] pb-4">
          <div>
            <h1 className="font-serif text-3xl font-light text-[#1F1A17]">Payments & Settlements</h1>
            <p className="text-xs font-sans text-gray-500">Track Razorpay, UPI, NetBanking, COD payouts, and transaction logs</p>
          </div>

          <button onClick={handleExport} className="px-4 py-2 bg-[#B8924A] hover:bg-[#D4B26A] text-[#1F1A17] text-xs font-sans font-bold uppercase tracking-wider rounded-lg shadow-sm flex items-center space-x-2 transition-all">
            <Download className="w-4 h-4 text-[#1F1A17]" />
            <span>Export Payout Statement</span>
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
                {transactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-[#FAF6F0]/50 transition-colors">
                    <td className="p-4 font-mono font-bold text-[#B8924A]">{txn.id}</td>
                    <td className="p-4 font-mono text-gray-700">{txn.orderId}</td>
                    <td className="p-4 font-semibold text-[#1F1A17]">{txn.method}</td>
                    <td className="p-4 font-bold text-[#1F1A17]">{txn.amount}</td>
                    <td className="p-4 text-gray-500">{txn.fee}</td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border ${
                        txn.status === 'Settled' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-orange-100 text-orange-800 border-orange-200'
                      }`}>
                        {txn.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500">{txn.date}</td>
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
