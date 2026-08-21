import React from 'react';
import { ShieldCheck, Printer, Download, X } from 'lucide-react';

export default function TaxInvoiceModal({ order, onClose }) {
  if (!order) return null;

  const invoiceNo = 'INV-' + (order._id || order.id || 'VSN-784920').replace(/\D/g, '');
  const invoiceDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '21 Aug 2026';
  const totalAmount = order.totalAmount || order.total || 31499;
  const subtotal = order.subtotal || Math.round(totalAmount / 1.05);
  const gstAmount = Math.round(subtotal * 0.05);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 font-sans text-xs text-[#292522] overflow-y-auto">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden border border-[#B8924A]/40 my-8 animate-fade-in">
        
        {/* Top Control Bar */}
        <div className="bg-[#1F1A17] text-white p-4 flex items-center justify-between no-print">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#B8924A]" />
            <span className="font-serif text-sm font-bold tracking-widest text-[#F7F4EE]">VASANA ATELIER OFFICIAL TAX INVOICE</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-[#B8924A] text-[#1F1A17] text-xs font-bold rounded flex items-center space-x-1 hover:bg-[#D4B26A]"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT INVOICE</span>
            </button>
            <button onClick={onClose} className="p-1 hover:bg-gray-800 rounded"><X className="w-5 h-5 text-gray-300" /></button>
          </div>
        </div>

        {/* INVOICE BODY (Print Target) */}
        <div className="p-8 sm:p-10 space-y-6 bg-white" id="printable-invoice">
          
          {/* Header */}
          <div className="flex items-start justify-between border-b border-[#EFE7DC] pb-6">
            <div>
              <span className="font-serif text-3xl font-bold tracking-super-wide text-[#1F1A17] block">
                VASANA
              </span>
              <span className="text-[9px] font-sans font-bold tracking-super-wide text-[#B8924A] uppercase block -mt-1">
                WOVEN FOR YOUR MOMENTS
              </span>
              <p className="text-[10px] text-gray-500 font-light mt-2 leading-tight">
                Vasana Luxury Sarees Pvt Ltd<br />
                Atelier No. 42, Heritage Weaving Enclave, Indiranagar<br />
                Bengaluru, Karnataka - 560038, India<br />
                <strong>GSTIN:</strong> 29AAACV8492K1Z9
              </p>
            </div>

            <div className="text-right space-y-1">
              <span className="inline-block px-3 py-1 bg-[#1F1A17] text-[#B8924A] text-[10px] font-bold uppercase tracking-widest rounded">
                OFFICIAL TAX INVOICE
              </span>
              <div className="text-xs font-mono text-[#1F1A17] font-bold pt-1">Invoice #: {invoiceNo}</div>
              <div className="text-[11px] text-gray-500">Date: {invoiceDate}</div>
              <div className="text-[11px] text-gray-500">Order ID: #{order._id || order.id}</div>
            </div>
          </div>

          {/* Customer & Billing Address */}
          <div className="grid grid-cols-2 gap-6 p-4 bg-[#FAF6F0] rounded-xl border border-[#EFE7DC] text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8924A] block mb-1">BILLED TO</span>
              <strong className="text-[#1F1A17] block text-sm font-serif">{order.shippingAddress?.fullName || order.user?.name || 'Valued Customer'}</strong>
              <p className="text-gray-600 font-light">
                {order.shippingAddress?.street || 'Royal Palms Suite'}<br />
                {order.shippingAddress?.city || 'Bengaluru'}, {order.shippingAddress?.state || 'Karnataka'} - {order.shippingAddress?.pincode || '560038'}<br />
                Email: {order.user?.email || order.email || 'customer@example.com'}
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8924A] block mb-1">PAYMENT & SHIPPING</span>
              <strong className="text-green-800 block uppercase font-bold text-xs">
                {order.payment?.method === 'COD' ? 'CASH ON DELIVERY (PENDING)' : `PAID VIA ${order.payment?.method || 'RAZORPAY / GPAY'}`}
              </strong>
              <p className="text-gray-600 font-light mt-1">
                Dispatch Status: <strong>{order.status || 'Confirmed'}</strong><br />
                Courier: <strong>Express Insured Air (BlueDart)</strong>
              </p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border border-[#EFE7DC] rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-[#1F1A17] text-white uppercase text-[9px] tracking-wider font-bold">
                <tr>
                  <th className="p-3">Item Description</th>
                  <th className="p-3">HSN Code</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Unit Price</th>
                  <th className="p-3 text-right">Total (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE7DC]">
                {(order.items || [{ name: 'Royal Kanjivaram Pure Silk Saree', price: totalAmount, quantity: 1 }]).map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF6F0]/50">
                    <td className="p-3">
                      <strong className="block text-[#1F1A17] font-serif text-sm">{item.name}</strong>
                      <span className="text-[10px] text-gray-500 block">Blouse Tailoring: {item.blouseOption || 'Unstitched Standard'}</span>
                    </td>
                    <td className="p-3 font-mono text-gray-500">5407.10</td>
                    <td className="p-3 text-center font-bold">{item.quantity || 1}</td>
                    <td className="p-3 text-right">₹{item.price?.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-right font-bold text-[#1F1A17]">
                      ₹{((item.price || totalAmount) * (item.quantity || 1)).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Invoice Totals */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-2">
            <div className="text-[10px] text-gray-500 font-light max-w-xs space-y-1">
              <strong>TERMS & CONDITIONS:</strong>
              <p>Goods once sold can be exchanged within 7 days. Dry clean only for authentic pure handloom silks.</p>
            </div>

            <div className="w-full sm:w-64 space-y-2 bg-[#FAF6F0] p-4 rounded-xl border border-[#EFE7DC] text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Taxable Amount:</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>GST (5% Apparel):</span>
                <span>₹{gstAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Express Shipping:</span>
                <span className="text-green-700 font-bold">Complimentary</span>
              </div>
              <div className="flex justify-between font-bold text-[#1F1A17] border-t border-[#EFE7DC] pt-2 text-base">
                <span>Grand Total:</span>
                <span className="text-[#B8924A]">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Footer Signature */}
          <div className="border-t border-[#EFE7DC] pt-6 flex justify-between items-center text-[10px] text-gray-400 font-light">
            <span>This is a computer-generated official tax invoice for Vasana Luxury Sarees.</span>
            <span className="font-serif italic text-xs text-[#1F1A17]">Authorized Signatory • Vasana Atelier</span>
          </div>

        </div>

      </div>
    </div>
  );
}
