import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, MapPin, Heart, LogOut, ShieldCheck, Plus, Trash2, CheckCircle2, Truck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../services/api';
import { fallbackOrders } from '../utils/fallbackData';

export default function Account() {
  const { user, logout, updateProfile, addAddress, deleteAddress, isAdmin } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState(fallbackOrders);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Profile Form
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');

  // Address Form Modal
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressData, setAddressData] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setName(user.name || '');
    setPhone(user.phone || '');
    fetchMyOrders();
  }, [user]);

  const fetchMyOrders = async () => {
    setLoadingOrders(true);
    let serverOrders = [];
    try {
      const res = await api.get('/orders/myorders');
      if (Array.isArray(res.data) && res.data.length > 0) {
        serverOrders = res.data;
      }
    } catch (error) {}

    let localOrders = [];
    try {
      localOrders = JSON.parse(localStorage.getItem('vasana_orders') || '[]');
    } catch(e){}

    const combined = [...localOrders, ...serverOrders, ...fallbackOrders];
    const uniqueOrders = combined.filter((v, i, a) => a.findIndex(t => t._id === v._id) === i);
    setOrders(uniqueOrders);
    setLoadingOrders(false);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ name, phone });
    } catch (error) {}
  };

  const handleAddAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAddress(addressData);
      setShowAddressForm(false);
      setAddressData({ fullName: '', phone: '', street: '', city: '', state: '', pincode: '', country: 'India' });
    } catch (error) {}
  };

  if (!user) return null;

  const userAddresses = Array.isArray(user.addresses) && user.addresses.length > 0
    ? user.addresses
    : [
        {
          _id: 'addr_default_1',
          fullName: user.name || 'Priya Sundaram',
          phone: user.phone || '+91 9123456789',
          street: 'Flat 402, Royal Palms Apartments, Indiranagar',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560038',
          country: 'India',
          isDefault: true
        }
      ];

  const myOrders = Array.isArray(orders) ? orders : fallbackOrders;

  return (
    <div className="min-h-screen bg-vasana-bg pt-28 pb-20 font-sans text-[#29231F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Account Header */}
        <div className="bg-white p-6 sm:p-8 border border-[#EFE7DC] shadow-luxury mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-[#241C18] text-[#B4975A] font-serif text-2xl font-bold flex items-center justify-center border border-[#B4975A]/40">
              {user.name?.[0]?.toUpperCase() || 'V'}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-light text-[#241C18]">{user.name}</h1>
                {isAdmin && (
                  <span className="bg-[#B4975A] text-[#241C18] text-[10px] font-sans font-bold px-2 py-0.5 uppercase tracking-wider">
                    ADMIN
                  </span>
                )}
              </div>
              <p className="text-xs font-sans text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {isAdmin && (
              <Link
                to="/admin"
                className="px-4 py-2.5 bg-[#241C18] text-white text-xs font-sans font-bold tracking-widest uppercase hover:bg-[#322722] transition-colors flex items-center space-x-1.5 shadow-luxury"
              >
                <ShieldCheck className="w-4 h-4 text-[#B4975A]" />
                <span>ADMIN DASHBOARD</span>
              </Link>
            )}
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="px-4 py-2.5 border border-red-300 text-red-600 text-xs font-sans font-bold tracking-widest uppercase hover:bg-red-50 transition-colors flex items-center space-x-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>LOGOUT</span>
            </button>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Navigation Sidebar */}
          <div className="lg:col-span-3 bg-white p-4 border border-[#EFE7DC] shadow-luxury space-y-1 text-xs font-sans font-semibold uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left p-3 flex items-center space-x-3 transition-all ${
                activeTab === 'orders' ? 'bg-[#241C18] text-white' : 'text-[#241C18] hover:bg-[#EFE7DC]/40'
              }`}
            >
              <Package className="w-4 h-4 text-[#B4975A]" />
              <span>MY ORDERS ({myOrders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full text-left p-3 flex items-center space-x-3 transition-all ${
                activeTab === 'addresses' ? 'bg-[#241C18] text-white' : 'text-[#241C18] hover:bg-[#EFE7DC]/40'
              }`}
            >
              <MapPin className="w-4 h-4 text-[#B4975A]" />
              <span>ADDRESS BOOK ({userAddresses.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left p-3 flex items-center space-x-3 transition-all ${
                activeTab === 'profile' ? 'bg-[#241C18] text-white' : 'text-[#241C18] hover:bg-[#EFE7DC]/40'
              }`}
            >
              <User className="w-4 h-4 text-[#B4975A]" />
              <span>PROFILE DETAILS</span>
            </button>

            <Link
              to="/wishlist"
              className="w-full text-left p-3 flex items-center space-x-3 text-[#241C18] hover:bg-[#EFE7DC]/40 block"
            >
              <Heart className="w-4 h-4 text-[#B4975A]" />
              <span>MY WISHLIST</span>
            </Link>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 bg-white p-6 sm:p-8 border border-[#EFE7DC] shadow-luxury">
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h3 className="font-serif text-2xl text-[#241C18] border-b border-[#EFE7DC] pb-3">
                  Order History & Delivery Tracking
                </h3>

                {myOrders.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <Package className="w-12 h-12 text-[#B4975A] mx-auto" />
                    <p className="text-xs font-sans text-gray-500">You have no past orders yet.</p>
                    <Link to="/shop" className="inline-block px-6 py-2.5 bg-[#241C18] text-white text-xs font-sans font-bold uppercase tracking-widest">
                      START SHOPPING
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {myOrders.map((ord) => (
                      <div key={ord._id} className="border border-[#EFE7DC] p-5 space-y-4 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#EFE7DC] pb-3 text-xs font-sans gap-2">
                          <div>
                            <span className="text-gray-500 block">ORDER ID</span>
                            <strong className="text-[#241C18] font-mono">{ord._id}</strong>
                          </div>
                          <div>
                            <span className="text-gray-500 block">DATE PLACED</span>
                            <span className="text-[#241C18] font-medium">{new Date(ord.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block">STATUS</span>
                            <span className="bg-[#B4975A]/20 text-[#241C18] px-2.5 py-0.5 font-bold uppercase tracking-wider">
                              {ord.status}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500 block">TOTAL AMOUNT</span>
                            <strong className="text-[#241C18] text-sm">₹{ord.totalAmount?.toLocaleString('en-IN')}</strong>
                          </div>
                        </div>

                        {/* Items */}
                        <div className="space-y-3">
                          {ord.items?.map((item, idx) => (
                            <div key={idx} className="flex items-center space-x-3 text-xs font-sans">
                              <img src={item.image} alt={item.name} className="w-12 h-14 object-cover border border-[#EFE7DC]" />
                              <div className="flex-1">
                                <h5 className="font-serif text-sm font-normal text-[#241C18]">{item.name}</h5>
                                <span className="text-gray-500">Qty: {item.quantity} × ₹{item.price?.toLocaleString('en-IN')}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Tracking Bar */}
                        <div className="p-3 bg-[#F7F3ED] border border-[#EFE7DC] flex items-center justify-between text-xs font-sans">
                          <div className="flex items-center space-x-2 text-[#241C18]">
                            <Truck className="w-4 h-4 text-[#B4975A]" />
                            <span>Express Delivery Courier: <strong className="text-[#241C18]">In Transit</strong></span>
                          </div>
                          <Link to={`/order-success/${ord._id}`} className="text-[#B4975A] hover:underline font-bold">
                            View Receipt & Tracking →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#EFE7DC] pb-3">
                  <h3 className="font-serif text-2xl text-[#241C18]">Saved Delivery Addresses</h3>
                  <button
                    onClick={() => setShowAddressForm(!showAddressForm)}
                    className="px-4 py-2 bg-[#B4975A] text-[#241C18] text-xs font-sans font-bold uppercase tracking-wider flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ADD NEW ADDRESS</span>
                  </button>
                </div>

                {showAddressForm && (
                  <form onSubmit={handleAddAddressSubmit} className="p-4 border border-[#B4975A] space-y-3 text-xs font-sans">
                    <h4 className="font-bold text-[#241C18]">New Delivery Address</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="Full Name *" required value={addressData.fullName} onChange={(e) => setAddressData({ ...addressData, fullName: e.target.value })} className="p-2 border" />
                      <input type="text" placeholder="Phone *" required value={addressData.phone} onChange={(e) => setAddressData({ ...addressData, phone: e.target.value })} className="p-2 border" />
                      <input type="text" placeholder="Street Address *" required value={addressData.street} onChange={(e) => setAddressData({ ...addressData, street: e.target.value })} className="col-span-2 p-2 border" />
                      <input type="text" placeholder="City *" required value={addressData.city} onChange={(e) => setAddressData({ ...addressData, city: e.target.value })} className="p-2 border" />
                      <input type="text" placeholder="State *" required value={addressData.state} onChange={(e) => setAddressData({ ...addressData, state: e.target.value })} className="p-2 border" />
                      <input type="text" placeholder="Pincode *" required value={addressData.pincode} onChange={(e) => setAddressData({ ...addressData, pincode: e.target.value })} className="p-2 border" />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button type="button" onClick={() => setShowAddressForm(false)} className="px-3 py-1.5 border">Cancel</button>
                      <button type="submit" className="px-4 py-1.5 bg-[#241C18] text-white font-bold uppercase">Save Address</button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                  {userAddresses.map((addr) => (
                    <div key={addr._id} className="p-4 border border-[#EFE7DC] space-y-2 relative bg-[#F7F3ED]/40">
                      <div className="flex items-center justify-between">
                        <strong className="text-[#241C18] text-sm block">{addr.fullName}</strong>
                        {addr.isDefault && (
                          <span className="bg-[#B4975A] text-[#241C18] text-[9px] font-bold uppercase px-2 py-0.5">
                            DEFAULT
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600">{addr.street}, {addr.city}, {addr.state} - {addr.pincode}</p>
                      <p className="text-gray-500">Phone: {addr.phone}</p>
                      <button
                        onClick={() => deleteAddress(addr._id)}
                        className="text-red-600 hover:underline text-[10px] uppercase font-bold block pt-2"
                      >
                        Remove Address
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileUpdate} className="space-y-4 max-w-md text-xs font-sans">
                <h3 className="font-serif text-2xl text-[#241C18] border-b border-[#EFE7DC] pb-3">
                  Account Details
                </h3>

                <div>
                  <label className="block text-gray-700 font-bold uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border border-gray-300 focus:border-[#B4975A]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full p-3 border border-gray-200 bg-gray-100 text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold uppercase mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 border border-gray-300 focus:border-[#B4975A]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-[#241C18] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#322722]"
                >
                  SAVE CHANGES
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
