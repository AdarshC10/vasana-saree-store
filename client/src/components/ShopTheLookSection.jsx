import React, { useState } from 'react';
import { Sparkles, Check, ShoppingBag, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const sampleLook = {
  id: 'look-royal-bride',
  title: 'THE ROYAL BANARASI ENSEMBLE',
  description: 'Curated by VASANA stylists for grand wedding occasions. A perfect harmony of crimson silk, zardozi blouse work, and temple gold jewelry.',
  mainImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
  items: [
    {
      id: 'look-item-saree',
      name: 'Varanasi Crimson Katan Silk Saree',
      category: 'Saree',
      price: 28500,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80',
      fabric: 'Pure Katan Silk'
    },
    {
      id: 'look-item-blouse',
      name: 'Hand-Embroidered Zardozi Raw Silk Blouse',
      category: 'Blouse',
      price: 6490,
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=300&q=80',
      fabric: 'Raw Silk'
    },
    {
      id: 'look-item-jewelry',
      name: 'Antique Temple Gold Choker & Jhumka Set',
      category: 'Jewellery',
      price: 8990,
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=300&q=80',
      fabric: '24K Gold Plated Brass'
    }
  ]
};

export default function ShopTheLookSection() {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [selectedItems, setSelectedItems] = useState([
    sampleLook.items[0].id,
    sampleLook.items[1].id,
    sampleLook.items[2].id
  ]);

  const toggleItem = (id) => {
    if (selectedItems.includes(id)) {
      if (selectedItems.length === 1) {
        addToast('At least one item must remain selected.', 'info');
        return;
      }
      setSelectedItems((prev) => prev.filter((i) => i !== id));
    } else {
      setSelectedItems((prev) => [...prev, id]);
    }
  };

  const selectedProducts = sampleLook.items.filter((item) => selectedItems.includes(item.id));
  const totalAmount = selectedProducts.reduce((sum, item) => sum + item.price, 0);

  const handleAddCompleteLook = () => {
    selectedProducts.forEach((item) => {
      addToCart({
        _id: item.id,
        name: item.name,
        price: item.price,
        fabric: item.fabric,
        category: item.category,
        images: [item.image]
      });
    });
    addToast(`Added complete ${sampleLook.title} (${selectedProducts.length} pieces) to your bag!`, 'success');
  };

  return (
    <section className="py-20 bg-vasana-bg border-b border-vasana-rose/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-xs font-sans tracking-super-wide text-vasana-gold uppercase font-bold mb-2">
            <Sparkles className="w-4 h-4 text-vasana-gold" />
            <span>STYLIST RECOMMENDATION</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-vasana-dark">
            Shop The Complete Look
          </h2>
          <div className="w-12 h-[2px] bg-vasana-gold mx-auto mt-4" />
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white p-6 sm:p-10 border border-vasana-rose/60 shadow-luxury">
          
          {/* Left Model Showcase */}
          <div className="lg:col-span-6 relative aspect-[3/4] overflow-hidden bg-vasana-dark">
            <img
              src={sampleLook.mainImage}
              alt={sampleLook.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-xs font-sans tracking-widest text-vasana-gold uppercase font-semibold">
                CURATED LOOK
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light tracking-wide mt-1">
                {sampleLook.title}
              </h3>
              <p className="text-xs font-sans text-vasana-rose/80 font-light mt-1">
                {sampleLook.description}
              </p>
            </div>
          </div>

          {/* Right Product Ensemble Breakdown */}
          <div className="lg:col-span-6 space-y-6">
            <div className="border-b border-vasana-rose pb-4">
              <h4 className="font-serif text-2xl text-vasana-dark font-light">
                THIS LOOK INCLUDES:
              </h4>
              <p className="text-xs font-sans text-gray-500">
                Select or unselect individual pieces to customize your ensemble.
              </p>
            </div>

            {/* Individual Item Selectors */}
            <div className="space-y-4">
              {sampleLook.items.map((item) => {
                const isSelected = selectedItems.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`flex items-center justify-between p-3.5 border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-vasana-burgundy bg-vasana-rose/20'
                        : 'border-gray-200 bg-white opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                        isSelected ? 'bg-vasana-burgundy border-vasana-burgundy text-white' : 'border-gray-400'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover border border-vasana-rose/50"
                      />

                      <div>
                        <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-vasana-gold">
                          {item.category}
                        </span>
                        <h5 className="font-serif text-base text-vasana-dark font-normal line-clamp-1">
                          {item.name}
                        </h5>
                        <span className="text-xs font-sans text-gray-500">
                          {item.fabric}
                        </span>
                      </div>
                    </div>

                    <div className="font-sans font-bold text-sm text-vasana-burgundy ml-4">
                      ₹{item.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total & Action */}
            <div className="pt-4 border-t border-vasana-rose flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-sans text-gray-500 uppercase tracking-widest block">
                  ENSEMBLE TOTAL ({selectedProducts.length} ITEMS)
                </span>
                <span className="font-sans text-2xl font-bold text-vasana-burgundy">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                onClick={handleAddCompleteLook}
                className="w-full sm:w-auto px-8 py-4 bg-vasana-burgundy hover:bg-vasana-burgundyDark text-white text-xs font-sans font-bold tracking-super-wide uppercase shadow-luxury transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4 text-vasana-gold" />
                <span>ADD COMPLETE LOOK</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
