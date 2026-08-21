import React, { useState } from 'react';
import { Search, Plus, Filter, Edit, Trash2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useToast } from '../../context/ToastContext';

const productTabs = ['All Products', 'Active', 'Inactive', 'Low Stock', 'Out of Stock'];

const sampleProducts = [
  { id: 'PRD-1001', name: 'Maroon Velvet Embroidered Heritage Saree', category: 'Velvet', price: 34990, stock: 4, status: 'Low Stock', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80' },
  { id: 'PRD-1002', name: 'Silk Banarasi Woven Saree', category: 'Silk', price: 28500, stock: 8, status: 'Low Stock', img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=300&q=80' },
  { id: 'PRD-1003', name: 'Kanjivaram Silk Saree', category: 'Silk', price: 42000, stock: 12, status: 'Active', img: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=300&q=80' },
  { id: 'PRD-1004', name: 'Designer Embroidery Saree', category: 'Georgette', price: 22400, stock: 6, status: 'Low Stock', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80' },
  { id: 'PRD-1005', name: 'Cotton Silk Saree', category: 'Cotton Silk', price: 14500, stock: 25, status: 'Active', img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=300&q=80' },
  { id: 'PRD-1006', name: 'Party Wear Sequin Saree', category: 'Georgette', price: 18900, stock: 0, status: 'Out of Stock', img: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=300&q=80' },
  { id: 'PRD-1007', name: 'Printed Daily Wear Saree', category: 'Cotton Silk', price: 8500, stock: 18, status: 'Active', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80' }
];

export default function AdminProducts() {
  const [activeTab, setActiveTab] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState('');
  const [productsList, setProductsList] = useState(sampleProducts);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProd, setEditingProd] = useState(null);

  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Silk',
    price: '',
    stock: 10,
    img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80'
  });

  const filteredProducts = productsList.filter((p) => {
    const matchesTab = activeTab === 'All Products' || (activeTab === 'Active' && p.status === 'Active') || (activeTab === 'Low Stock' && p.status === 'Low Stock') || (activeTab === 'Out of Stock' && p.status === 'Out of Stock');
    const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleDelete = (id) => {
    if (window.confirm('Delete this product from catalog?')) {
      setProductsList(prev => prev.filter(p => p.id !== id));
      addToast('Product removed.', 'info');
    }
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (editingProd) {
      setProductsList(prev => prev.map(p => p.id === editingProd.id ? { ...p, ...formData, price: Number(formData.price), stock: Number(formData.stock) } : p));
      addToast('Product updated successfully.', 'success');
    } else {
      const newP = {
        id: 'PRD-' + Math.floor(1008 + Math.random() * 900),
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock),
        status: Number(formData.stock) === 0 ? 'Out of Stock' : (Number(formData.stock) < 10 ? 'Low Stock' : 'Active'),
        img: formData.img
      };
      setProductsList(prev => [newP, ...prev]);
      addToast('New saree product added!', 'success');
    }
    setShowAddModal(false);
    setEditingProd(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-[#292522]">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-light text-[#1F1A17]">Products</h1>
            <p className="text-xs font-sans text-gray-500">Manage your saree catalog</p>
          </div>

          <button
            onClick={() => { setEditingProd(null); setFormData({ name: '', category: 'Silk', price: '', stock: 10, img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80' }); setShowAddModal(true); }}
            className="px-5 py-2.5 bg-[#B8924A] hover:bg-[#D4B26A] text-[#1F1A17] text-xs font-sans font-bold uppercase tracking-wider rounded-lg transition-all shadow-md flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>

        {/* Top Filter Tabs */}
        <div className="flex border-b border-[#EFE7DC] space-x-6 overflow-x-auto no-scrollbar font-sans text-xs">
          {productTabs.map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 font-semibold transition-all relative ${
                  active ? 'text-[#B8924A] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#B8924A]' : 'text-gray-400 hover:text-[#1F1A17]'
                }`}
              >
                <span>{tab}</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-xl border border-[#EFE7DC] shadow-sm flex items-center justify-between">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search product name, ID or category..."
              className="w-full bg-[#FAF6F0] border border-[#EFE7DC] py-2 px-3 pr-8 text-xs font-sans rounded-lg focus:outline-none focus:border-[#B8924A]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-2.5 top-2.5" />
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl border border-[#EFE7DC] shadow-sm overflow-hidden text-xs font-sans">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#FAF6F0] border-b border-[#EFE7DC] uppercase text-[10px] tracking-wider text-gray-500">
                <tr>
                  <th className="p-4">Product Image</th>
                  <th className="p-4">Product ID</th>
                  <th className="p-4">Product Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE7DC]">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FAF6F0]/50 transition-colors">
                    <td className="p-4">
                      <img src={p.img} alt={p.name} className="w-12 h-14 object-cover rounded border" />
                    </td>
                    <td className="p-4 font-mono font-bold text-[#B8924A]">{p.id}</td>
                    <td className="p-4 font-serif text-sm font-normal text-[#1F1A17] max-w-xs">{p.name}</td>
                    <td className="p-4 font-semibold">{p.category}</td>
                    <td className="p-4 font-bold text-[#1F1A17]">₹{p.price.toLocaleString('en-IN')}</td>
                    <td className="p-4 font-bold">{p.stock}</td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                        p.status === 'Active' ? 'bg-green-100 text-green-800' : (p.status === 'Low Stock' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800')
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => { setEditingProd(p); setFormData({ name: p.name, category: p.category, price: p.price, stock: p.stock, img: p.img }); setShowAddModal(true); }} className="p-1.5 hover:bg-gray-100 rounded text-blue-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-1.5 hover:bg-gray-100 rounded text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-[#FAF6F0] border-t border-[#EFE7DC] flex items-center justify-between text-xs text-gray-500 font-sans">
            <span>Showing 1 to {filteredProducts.length} of 30 products</span>
            <div className="flex items-center space-x-2">
              <button disabled className="p-1 border rounded bg-white opacity-50"><ChevronLeft className="w-4 h-4" /></button>
              <span className="px-2 py-1 bg-[#B8924A] text-white font-bold rounded">1</span>
              <button className="p-1 border rounded bg-white hover:bg-gray-100"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

      </div>

      {/* Add / Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSaveProduct} className="bg-white max-w-md w-full rounded-xl p-6 space-y-4 shadow-2xl font-sans text-xs text-[#292522]">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-serif text-xl font-bold text-[#1F1A17]">{editingProd ? 'Edit Product' : 'Add New Saree Product'}</h3>
              <button type="button" onClick={() => setShowAddModal(false)}><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-bold uppercase mb-1">Product Name *</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2.5 border rounded" />
              </div>
              <div>
                <label className="block font-bold uppercase mb-1">Category</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full p-2.5 border rounded">
                  {['Velvet', 'Silk', 'Georgette', 'Cotton Silk', 'Organza', 'Linen'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase mb-1">Price (₹) *</label>
                  <input type="number" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full p-2.5 border rounded" />
                </div>
                <div>
                  <label className="block font-bold uppercase mb-1">Stock Count *</label>
                  <input type="number" required value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className="w-full p-2.5 border rounded" />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-3 border-t">
              <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button type="submit" className="px-6 py-2 bg-[#B8924A] text-[#1F1A17] font-bold uppercase rounded shadow-md">Save Saree</button>
            </div>
          </form>
        </div>
      )}
    </AdminLayout>
  );
}
