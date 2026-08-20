import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import api from '../services/api';

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
      .then((res) => setWeddingSarees(res.data.products || []))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-vasana-bg pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Editorial Hero */}
        <div className="relative h-[65vh] w-full overflow-hidden bg-vasana-dark text-white flex items-center justify-center text-center shadow-luxury">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=80)' }}
          />
          <div className="relative z-10 max-w-3xl px-4 space-y-4">
            <span className="text-xs font-sans tracking-super-wide text-vasana-gold uppercase font-bold">
              HAUTE COUTURE TROUSSEAU
            </span>
            <h1 className="font-serif text-4xl sm:text-7xl font-light tracking-wider">
              THE WEDDING EDIT
            </h1>
            <p className="font-serif text-xl sm:text-2xl italic text-vasana-rose font-light">
              For the moments you'll remember forever.
            </p>
            <div className="pt-4">
              <Link
                to="/shop?occasion=Wedding"
                className="inline-block px-8 py-4 bg-vasana-gold text-vasana-dark text-xs font-sans font-bold tracking-super-wide uppercase hover:bg-vasana-goldLight transition-colors"
              >
                EXPLORE ALL WEDDING SAREES
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Wedding Role Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {weddingCategories.map((cat) => (
            <div key={cat.title} className="p-8 bg-white border border-vasana-rose/60 space-y-3 shadow-sm hover:border-vasana-gold transition-colors">
              <span className="text-[10px] font-sans font-bold text-vasana-gold uppercase tracking-super-wide">
                CATEGORY
              </span>
              <h3 className="font-serif text-2xl text-vasana-dark font-light">{cat.title}</h3>
              <p className="text-xs font-sans text-gray-600 leading-relaxed">{cat.desc}</p>
              <Link
                to={cat.link}
                className="inline-flex items-center space-x-1 text-xs font-sans font-bold text-vasana-burgundy hover:text-vasana-gold uppercase tracking-wider pt-2 block"
              >
                <span>Browse Category</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>

        {/* Featured Wedding Sarees Grid */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-vasana-dark">
              Bridal & Trousseau Collection
            </h2>
            <div className="w-12 h-[2px] bg-vasana-gold mx-auto mt-3" />
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
