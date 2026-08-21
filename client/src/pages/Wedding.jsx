import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import api from '../services/api';
import { fallbackProducts } from '../utils/fallbackData';

const weddingCategories = [
  { title: 'THE BRIDE', desc: 'Grand Kanjivaram pure silk heirloom sarees with heavy pure gold zari brocade work.', link: '/shop?occasion=Bridal' },
  { title: 'BRIDESMAID', desc: 'Lustrous Banarasis, tissue organzas, and vibrant Bandhanis for sangeet & mehendi.', link: '/shop?occasion=Wedding' },
  { title: 'MOTHER OF THE BRIDE', desc: 'Regal Jamdanis, vintage tissue Chanderis, and deep velvet drapes.', link: '/shop?occasion=Wedding' },
  { title: 'WEDDING GUEST', desc: 'Ethereal georgettes, Lucknowi Chikankaris, and lightweight handlooms.', link: '/shop?occasion=Party' }
];

export default function Wedding() {
  const [weddingSarees, setWeddingSarees] = useState([]);
  const [selectedQuickView, setSelectedQuickView] = useState(null);

  useEffect(() => {
    api.get('/products?occasion=Wedding&limit=8')
      .then((res) => {
        if (Array.isArray(res.data?.products) && res.data.products.length > 0) {
          setWeddingSarees(res.data.products);
        } else {
          loadFallback();
        }
      })
      .catch(() => {
        loadFallback();
      });
  }, []);

  const loadFallback = () => {
    const items = fallbackProducts.filter(p => p.occasion === 'Wedding' || p.occasion === 'Bridal' || p.category === 'Kanjeevaram' || p.category === 'Banarasi');
    setWeddingSarees(items.slice(0, 8));
  };

  return (
    <div className="min-h-screen bg-vasana-bg pt-28 pb-20 font-sans text-[#29231F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Editorial Hero */}
        <div className="relative h-[65vh] w-full overflow-hidden bg-[#241C18] text-white flex items-center justify-center text-center shadow-luxury">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=80)' }}
          />
          <div className="relative z-10 max-w-3xl px-4 space-y-4">
            <span className="text-xs font-sans tracking-super-wide text-[#B4975A] uppercase font-bold">
              HAUTE COUTURE TROUSSEAU
            </span>
            <h1 className="font-serif text-4xl sm:text-7xl font-light tracking-wider text-[#F7F3ED]">
              THE WEDDING EDIT
            </h1>
            <p className="font-serif text-xl sm:text-2xl italic text-[#EFE7DC] font-light">
              For the moments you'll remember forever.
            </p>
            <div className="pt-4">
              <Link
                to="/shop?occasion=Wedding"
                className="inline-block px-8 py-4 bg-[#B4975A] hover:bg-[#C5AC73] text-[#241C18] text-xs font-sans font-bold tracking-super-wide uppercase transition-colors shadow-luxury"
              >
                EXPLORE ALL WEDDING SAREES
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Wedding Role Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {weddingCategories.map((cat) => (
            <div key={cat.title} className="p-8 bg-white border border-[#EFE7DC] space-y-3 shadow-luxury hover:border-[#B4975A] transition-colors">
              <span className="text-[10px] font-sans font-bold text-[#B4975A] uppercase tracking-super-wide">
                CATEGORY
              </span>
              <h3 className="font-serif text-2xl text-[#241C18] font-light">{cat.title}</h3>
              <p className="text-xs font-sans text-gray-600 leading-relaxed font-light">{cat.desc}</p>
              <Link
                to={cat.link}
                className="inline-flex items-center space-x-1 text-xs font-sans font-bold text-[#241C18] hover:text-[#B4975A] uppercase tracking-wider pt-2 block"
              >
                <span>Browse Category</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#B4975A]" />
              </Link>
            </div>
          ))}
        </div>

        {/* Featured Wedding Sarees Grid */}
        <div className="space-y-8">
          <div className="text-center">
            <span className="text-[10px] font-sans font-bold tracking-super-wide text-[#B4975A] uppercase">
              BRIDAL TROUSSEAU
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#241C18]">
              Bridal & Trousseau Collection
            </h2>
            <div className="w-12 h-[1px] bg-[#B4975A] mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {weddingSarees.map((saree) => (
              <ProductCard
                key={saree._id}
                product={saree}
                onQuickView={(p) => setSelectedQuickView(p)}
              />
            ))}
          </div>
        </div>

      </div>

      {selectedQuickView && (
        <QuickViewModal
          product={selectedQuickView}
          onClose={() => setSelectedQuickView(null)}
        />
      )}
    </div>
  );
}
