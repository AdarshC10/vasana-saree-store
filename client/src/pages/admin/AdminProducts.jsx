import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, ShieldCheck, X, Check } from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discount: 0,
    category: 'Banarasi',
    fabric: 'Pure Katan Silk',
    color: 'Crimson Red',
    occasion: 'Wedding',
    collectionType: 'Silk Stories',
    images: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
    stock: 10,
    sku: '',
    featured: false,
    newArrival: true
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products?limit=100');
      setProducts(res.data.products || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (prod = null) => {
    if (prod) {
      setEditingProduct(prod);
      setFormData({
        name: prod.name,
        description: prod.description,
        price: prod.price,
        discount: prod.discount || 0,
        category: prod.category,
        fabric: prod.fabric,
        color: prod.color,
        occasion: prod.occasion,
        collectionType: prod.collectionType || 'Silk Stories',
        images: prod.images?.join(', ') || '',
        stock: prod.stock,
        sku: prod.sku,
        featured: prod.featured || false,
        newArrival: prod.newArrival || false
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        discount: 0,
        category: 'Banarasi',
        fabric: 'Pure Katan Silk',
        color: 'Crimson Red',
        occasion: 'Wedding',
        collectionType: 'Silk Stories',
        images: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
        stock: 10,
        sku: 'VSN-PRD-' + Math.floor(100 + Math.random() * 900),
        featured: false,
        newArrival: true
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: Number(formData.price),
      discount: Number(formData.discount),
      stock: Number(formData.stock),
      images: formData.images.split(',').map((s) => s.trim()).filter(Boolean)
    };

    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, payload);
        addToast('Product updated successfully!', 'success');
      } else {
        await api.post('/products', payload);
        addToast('New saree product created!', 'success');
      }
      setShowModal(false);
      fetchProducts();
    } catch (error) {
      addToast(error.message || 'Failed to save product.', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this saree product?')) {
      try {
        await api.delete(`/products/${id}`);
        addToast('Product deleted.', 'info');
        fetchProducts();
      } catch (error) {
        addToast('Failed to delete product.', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-vasana-bg pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-vasana-dark">
        
        <div className="flex items-center justify-between border-b border-vasana-rose pb-4">
          <div>
            <h1 className="font-serif text-3xl font-light">Product Inventory CRUD</h1>
            <p className="text-xs font-sans text-gray-500">Manage saree catalogue, pricing, discounts, and stock levels</p>
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="px-6 py-3 bg-vasana-burgundy text-white text-xs font-sans font-bold uppercase tracking-wider hover:bg-vasana-burgundyDark transition-colors flex items-center space-x-2 shadow-luxury"
          >
            <Plus className="w-4 h-4 text-vasana-gold" />
            <span>ADD NEW SAREE</span>
          </button>
        </div>

        {/* Product Table */}
        <div className="bg-white border border-vasana-rose/50 shadow-sm overflow-x-auto text-xs font-sans">
          <table className="w-full text-left">
            <thead className="bg-vasana-bg border-b">
              <tr>
                <th className="p-3">Saree Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Fabric</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">SKU</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((prod) => (
                <tr key={prod._id} className="hover:bg-vasana-bg/50">
                  <td className="p-3 flex items-center space-x-3">
                    <img src={prod.images?.[0]} alt={prod.name} className="w-10 h-12 object-cover border" />
                    <div>
                      <strong className="block font-serif text-sm font-normal">{prod.name}</strong>
                      <span className="text-[10px] text-gray-400">{prod.occasion}</span>
                    </div>
                  </td>
                  <td className="p-3 font-semibold">{prod.category}</td>
                  <td className="p-3">{prod.fabric}</td>
                  <td className="p-3 font-bold text-vasana-burgundy">₹{prod.price?.toLocaleString('en-IN')}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 font-bold rounded text-[10px] ${
                      prod.stock <= 5 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {prod.stock} in stock
                    </span>
                  </td>
                  <td className="p-3 font-mono">{prod.sku}</td>
                  <td className="p-3 text-right space-x-2">
                    <button onClick={() => handleOpenModal(prod)} className="p-1.5 text-blue-600 hover:bg-blue-50">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(prod._id)} className="p-1.5 text-red-600 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Add / Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white max-w-2xl w-full p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto text-vasana-dark text-xs font-sans">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif text-2xl font-light">{editingProduct ? 'Edit Saree' : 'Add New Saree'}</h3>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-bold uppercase mb-1">Saree Name *</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2.5 border" />
              </div>

              <div>
                <label className="block font-bold uppercase mb-1">Description *</label>
                <textarea rows="3" required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-2.5 border" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold uppercase mb-1">Price (₹) *</label>
                  <input type="number" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full p-2.5 border" />
                </div>
                <div>
                  <label className="block font-bold uppercase mb-1">Discount %</label>
                  <input type="number" value={formData.discount} onChange={(e) => setFormData({ ...formData, discount: e.target.value })} className="w-full p-2.5 border" />
                </div>
                <div>
                  <label className="block font-bold uppercase mb-1">Stock Count *</label>
                  <input type="number" required value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className="w-full p-2.5 border" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase mb-1">Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full p-2.5 border">
                    {['Banarasi', 'Kanjeevaram', 'Chanderi', 'Organza', 'Linen', 'Georgette', 'Tussar Silk', 'Velvet'].map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-bold uppercase mb-1">Occasion</label>
                  <select value={formData.occasion} onChange={(e) => setFormData({ ...formData, occasion: e.target.value })} className="w-full p-2.5 border">
                    {['Wedding', 'Festive', 'Everyday', 'Party', 'Bridal', 'Formal'].map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase mb-1">Fabric</label>
                  <input type="text" value={formData.fabric} onChange={(e) => setFormData({ ...formData, fabric: e.target.value })} className="w-full p-2.5 border" />
                </div>
                <div>
                  <label className="block font-bold uppercase mb-1">Color</label>
                  <input type="text" value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })} className="w-full p-2.5 border" />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase mb-1">Image URLs (comma separated) *</label>
                <input type="text" required value={formData.images} onChange={(e) => setFormData({ ...formData, images: e.target.value })} className="w-full p-2.5 border" />
              </div>

              <div>
                <label className="block font-bold uppercase mb-1">SKU Code</label>
                <input type="text" value={formData.sku} onChange={(e) => setFormData({ ...formData, sku: e.target.value })} className="w-full p-2.5 border" />
              </div>

              <div className="flex space-x-6 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} />
                  <span>Featured Saree</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" checked={formData.newArrival} onChange={(e) => setFormData({ ...formData, newArrival: e.target.checked })} />
                  <span>New Arrival</span>
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-vasana-burgundy text-white font-bold uppercase">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
