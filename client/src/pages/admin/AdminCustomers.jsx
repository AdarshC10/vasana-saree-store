import React, { useState, useEffect } from 'react';
import { Users, Mail, Phone, Calendar } from 'lucide-react';
import api from '../../services/api';
import { fallbackCustomers } from '../../utils/fallbackData';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/customers');
      setCustomers(res.data?.length ? res.data : fallbackCustomers);
    } catch (error) {
      setCustomers(fallbackCustomers);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-vasana-bg pt-28 pb-20 text-vasana-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="border-b border-vasana-rose pb-4">
          <h1 className="font-serif text-3xl font-light">Client Account Directory</h1>
          <p className="text-xs font-sans text-gray-500">Registered VASANA Privé clientele and customer profiles</p>
        </div>

        {/* Customer Directory Grid */}
        <div className="bg-white border border-vasana-rose/50 shadow-sm overflow-x-auto text-xs font-sans">
          <table className="w-full text-left">
            <thead className="bg-vasana-bg border-b">
              <tr>
                <th className="p-3">Client Name</th>
                <th className="p-3">Email Address</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Saved Addresses</th>
                <th className="p-3">Member Since</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map((cust) => (
                <tr key={cust._id} className="hover:bg-vasana-bg/50">
                  <td className="p-3 font-bold font-serif text-sm">{cust.name}</td>
                  <td className="p-3">{cust.email}</td>
                  <td className="p-3">{cust.phone || 'N/A'}</td>
                  <td className="p-3 font-medium">{cust.addresses?.length || 1} Saved</td>
                  <td className="p-3 text-gray-500">{new Date(cust.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
