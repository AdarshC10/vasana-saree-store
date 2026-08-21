import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  LayoutDashboard,
  ShoppingCart,
  Package,
  Boxes,
  Users,
  BarChart3,
  CreditCard,
  Tag,
  Settings,
  PlusCircle,
  FileText,
  UserPlus,
  HelpCircle,
  Bell,
  RefreshCw,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Calendar
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { addToast } = useToast();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState('This Month');
  const [lastRefreshed, setLastRefreshed] = useState('20 Aug 2024, 10:30 AM');

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Inventory', path: '/admin/inventory', icon: Boxes },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Reports', path: '/admin/reports', icon: BarChart3 },
    { name: 'Payments', path: '/admin/payments', icon: CreditCard },
    { name: 'Offers & Coupons', path: '/admin/coupons', icon: Tag },
    { name: 'Settings', path: '/admin/settings', icon: Settings }
  ];

  const handleRefresh = () => {
    const now = new Date();
    const formatted = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLastRefreshed(formatted);
    addToast('Dashboard data refreshed.', 'info');
  };

  const isActivePath = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#292522] font-sans flex flex-col md:flex-row selection:bg-[#B8924A] selection:text-white">
      
      {/* PERSISTENT LEFT SIDEBAR (Desktop) */}
      <aside className="hidden lg:flex w-72 bg-[#1F1A17] text-white flex-col justify-between shrink-0 shadow-2xl border-r border-[#2B231E]">
        <div>
          {/* Top Brand Header */}
          <div className="p-6 border-b border-[#2B231E] flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B8924A] to-[#D4B26A] flex items-center justify-center text-[#1F1A17] shadow-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="font-serif text-xl tracking-widest font-bold text-[#F7F4EE] uppercase block">
                VASANA
              </span>
              <span className="text-[9px] font-sans font-bold tracking-super-wide text-[#B8924A] uppercase block -mt-1">
                ADMIN SUITE
              </span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActivePath(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-xs font-sans font-medium tracking-wide transition-all ${
                    active
                      ? 'bg-[#B8924A] text-[#1F1A17] font-bold shadow-md'
                      : 'text-gray-300 hover:bg-[#2B231E] hover:text-[#D4B26A]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#1F1A17]' : 'text-[#B8924A]'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Quick Actions & Support Card */}
        <div className="p-4 space-y-4 border-t border-[#2B231E]">
          
          {/* Quick Actions List */}
          <div className="space-y-1.5">
            <span className="text-[9px] font-sans font-bold tracking-super-wide text-[#B8924A] uppercase block px-2">
              QUICK ACTIONS
            </span>
            <button
              onClick={() => navigate('/admin/products?action=new')}
              className="w-full text-left px-3 py-1.5 text-[11px] font-sans text-gray-300 hover:text-[#D4B26A] hover:bg-[#2B231E] rounded flex items-center space-x-2"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#B8924A]" />
              <span>Add New Product</span>
            </button>
            <button
              onClick={() => navigate('/admin/orders?action=new')}
              className="w-full text-left px-3 py-1.5 text-[11px] font-sans text-gray-300 hover:text-[#D4B26A] hover:bg-[#2B231E] rounded flex items-center space-x-2"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-[#B8924A]" />
              <span>Create New Order</span>
            </button>
            <button
              onClick={() => navigate('/admin/customers?action=new')}
              className="w-full text-left px-3 py-1.5 text-[11px] font-sans text-gray-300 hover:text-[#D4B26A] hover:bg-[#2B231E] rounded flex items-center space-x-2"
            >
              <UserPlus className="w-3.5 h-3.5 text-[#B8924A]" />
              <span>Add New Customer</span>
            </button>
            <button
              onClick={() => navigate('/admin/reports')}
              className="w-full text-left px-3 py-1.5 text-[11px] font-sans text-gray-300 hover:text-[#D4B26A] hover:bg-[#2B231E] rounded flex items-center space-x-2"
            >
              <FileText className="w-3.5 h-3.5 text-[#B8924A]" />
              <span>Generate Report</span>
            </button>
          </div>

          {/* Support Card */}
          <div className="bg-[#2B231E] p-3 rounded-lg border border-[#B8924A]/30 flex items-center space-x-3">
            <HelpCircle className="w-6 h-6 text-[#B8924A] shrink-0" />
            <div>
              <strong className="text-xs text-[#F7F4EE] block font-medium">Need Help?</strong>
              <a href="mailto:support@vasana.com" className="text-[10px] text-[#D4B26A] hover:underline">
                Contact Support →
              </a>
            </div>
          </div>

        </div>
      </aside>

      {/* MOBILE DRAWER TOGGLE HEADER */}
      <div className="lg:hidden bg-[#1F1A17] text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-6 h-6 text-[#B8924A]" />
          <span className="font-serif text-lg font-bold tracking-widest text-[#F7F4EE]">VASANA ADMIN</span>
        </div>
        <button onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)} className="p-2 text-[#D4B26A]">
          {mobileDrawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE SIDEBAR DRAWER */}
      {mobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#1F1A17] text-white p-6 space-y-6 overflow-y-auto">
          <div className="flex items-center justify-between border-b border-[#2B231E] pb-4">
            <span className="font-serif text-xl font-bold tracking-widest text-[#F7F4EE]">VASANA ADMIN</span>
            <button onClick={() => setMobileDrawerOpen(false)}><X className="w-6 h-6 text-[#B8924A]" /></button>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActivePath(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileDrawerOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-xs font-sans ${
                    active ? 'bg-[#B8924A] text-[#1F1A17] font-bold' : 'text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP HEADER */}
        <header className="bg-white border-b border-[#EFE7DC] px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-light text-[#292522]">
              VASANA Administration Suite
            </h1>
            <p className="text-xs font-sans text-gray-500 font-light">
              Control center for products, orders, inventory, and customer management
            </p>
          </div>

          <div className="flex items-center space-x-4">
            
            {/* Notification Bell */}
            <button className="relative p-2 text-gray-600 hover:text-[#B8924A] transition-colors" title="Notifications">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#EA580C] ring-2 ring-white" />
            </button>

            {/* Date Filter Dropdown */}
            <div className="flex items-center space-x-1.5 bg-[#F7F4EE] border border-[#EFE7DC] px-3 py-1.5 rounded text-xs font-sans font-medium text-[#292522]">
              <Calendar className="w-3.5 h-3.5 text-[#B8924A]" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="Today">Today</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="Custom Range">Custom Range</option>
              </select>
            </div>

            {/* Admin Avatar Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
                className="flex items-center space-x-2 p-1 border border-[#EFE7DC] rounded-lg hover:border-[#B8924A] transition-all bg-white"
              >
                <div className="w-8 h-8 rounded-full bg-[#1F1A17] text-[#D4B26A] font-serif text-sm font-bold flex items-center justify-center">
                  {user?.name?.[0]?.toUpperCase() || 'A'}
                </div>
                <div className="hidden sm:block text-left pr-1">
                  <span className="text-xs font-sans font-bold text-[#292522] block leading-tight">
                    {user?.name || 'VASANA Admin'}
                  </span>
                  <span className="text-[9px] font-sans text-[#B8924A] font-semibold block uppercase">
                    Super Administrator
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {adminDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#EFE7DC] rounded-lg shadow-xl py-2 z-50 text-xs font-sans">
                  <Link to="/admin/settings" onClick={() => setAdminDropdownOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-[#F7F4EE]">
                    Store Settings
                  </Link>
                  <Link to="/account" onClick={() => setAdminDropdownOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-[#F7F4EE]">
                    My Account Profile
                  </Link>
                  <div className="border-t border-gray-100 my-1" />
                  <button
                    onClick={() => { setAdminDropdownOpen(false); logout(); navigate('/'); }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* TIMESTAMP & REFRESH SUBHEADER */}
        <div className="bg-[#FAF8F5] border-b border-[#EFE7DC] px-6 py-2 flex items-center justify-between text-xs font-sans text-gray-500 font-light">
          <div>
            <span>Last updated: </span>
            <strong className="text-[#292522] font-semibold">{lastRefreshed}</strong>
          </div>

          <button
            onClick={handleRefresh}
            className="inline-flex items-center space-x-1 text-[#B8924A] hover:text-[#1F1A17] font-semibold transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Data</span>
          </button>
        </div>

        {/* MAIN PAGE BODY */}
        <main className="p-6 sm:p-8 flex-1">
          {children}
        </main>

      </div>
    </div>
  );
}
