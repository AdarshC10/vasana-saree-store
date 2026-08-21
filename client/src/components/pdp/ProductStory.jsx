import React from 'react';

export default function ProductStory({ product }) {
  if (!product) return null;

  return (
    <section className="py-16 bg-[#EFE7DC]/60 border-y border-[#EFE7DC] my-16 text-[#29231F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Editorial Image */}
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] bg-[#241C18] overflow-hidden shadow-luxury">
              <img
                src={product.images?.[1] || product.images?.[0] || 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85'}
                alt={`Craftsmanship of ${product.name}`}
                className="w-full h-full object-cover object-center brightness-95"
              />
            </div>
          </div>

          {/* Story Narrative */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[10px] font-sans font-bold tracking-super-wide text-[#B4975A] uppercase">
              EDITORIAL CRAFT STORY
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#241C18]">
              The Story Behind The Saree
            </h2>

            <p className="font-serif italic text-lg text-[#6B5546]">
              "Rooted in tradition. Designed for today."
            </p>

            <p className="text-xs font-sans text-gray-700 font-light leading-relaxed">
              {product.craftStory || `Handcrafted over hundreds of artisan hours using pure ${product.fabric || 'silk'} strands. Each motifs carries centuries of regional weaving inspiration, interlocked with metallic zari borders for timeless celebration drapes.`}
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-sans border-t border-[#B4975A]/20 pt-4">
              <div>
                <span className="text-gray-500 block uppercase text-[10px] font-bold">WEAVING TECHNIQUE</span>
                <strong className="text-[#241C18] font-serif text-sm">{product.category || 'Handloom'}</strong>
              </div>
              <div>
                <span className="text-gray-500 block uppercase text-[10px] font-bold">RECOMMENDED OCCASION</span>
                <strong className="text-[#241C18] font-serif text-sm">{product.occasion || 'Wedding & Festive'}</strong>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
