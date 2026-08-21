import React from 'react';
import { Instagram } from 'lucide-react';

const gallery = [
  { id: 1, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80', handle: '@vasana_sarees' },
  { id: 2, image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80', handle: '@priya_drapes' },
  { id: 3, image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=600&q=80', handle: '@ananya_weddings' },
  { id: 4, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80', handle: '@meera_couture' },
  { id: 5, image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80', handle: '@vasana_prive' },
  { id: 6, image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=600&q=80', handle: '@indian_heritage' }
];

export default function MomentsInVasana() {
  return (
    <section className="py-24 bg-[#EFE7DC] text-[#29231F] border-b border-[#EFE7DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] font-sans font-bold tracking-super-wide uppercase text-[#B4975A]">
            COMMUNITY & INSPIRATION
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#241C18]">
            Moments in Vasana
          </h2>
          <p className="font-serif italic text-base text-[#6B5546]">
            "Wear it. Live it. Remember it."
          </p>
          <div className="w-12 h-[1px] bg-[#B4975A] mx-auto mt-4" />
        </div>

        {/* 6 Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {gallery.map((g) => (
            <a
              key={g.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square bg-[#241C18] overflow-hidden shadow-luxury"
            >
              <img
                src={g.image}
                alt="Moments in Vasana Saree"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90"
              />
              <div className="absolute inset-0 bg-[#241C18]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white space-y-1 p-2 text-center">
                <Instagram className="w-5 h-5 text-[#B4975A]" />
                <span className="text-[10px] font-sans font-bold tracking-wider">{g.handle}</span>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center pt-2">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-xs font-sans font-bold tracking-widest text-[#241C18] hover:text-[#B4975A] uppercase border-b border-[#241C18] pb-1 transition-colors"
          >
            <Instagram className="w-4 h-4 text-[#B4975A]" />
            <span>FOLLOW @VASANA_SAREES ON INSTAGRAM</span>
          </a>
        </div>

      </div>
    </section>
  );
}
