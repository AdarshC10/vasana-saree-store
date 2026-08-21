import React from 'react';
import { Link } from 'react-router-dom';

const fabrics = [
  {
    name: 'Kanjivaram Silk',
    desc: 'Lustrous 3-ply mulberry silk interlocked with pure gold Korvai zari borders.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    path: '/shop?category=Kanjeevaram'
  },
  {
    name: 'Banarasi Brocade',
    desc: 'Intricate Kadwa floral jaals crafted on traditional pit looms in Varanasi.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
    path: '/shop?category=Banarasi'
  },
  {
    name: 'Tissue Organza',
    desc: 'Crisp glass-like sheer texture embellished with delicate hand zardozi work.',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=600&q=80',
    path: '/shop?category=Organza'
  },
  {
    name: 'Handloom Cotton',
    desc: 'Authentic Kerala Kasavu and Balaramapuram weaves with golden tissue borders.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
    path: '/shop?category=Handloom+Cotton'
  },
  {
    name: 'Pure Organic Linen',
    desc: '100-count European flax yarn providing an ultra-breathable minimalist drape.',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=600&q=80',
    path: '/shop?category=Linen'
  }
];

export default function FabricStoriesSection() {
  return (
    <section className="py-24 bg-[#F7F3ED] text-[#29231F] border-b border-[#EFE7DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] font-sans font-bold tracking-super-wide uppercase text-[#B4975A]">
            TEXTILE HERITAGE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#241C18]">
            The Art of the Weave
          </h2>
          <p className="text-xs font-sans text-gray-500 font-light">
            Discover the distinct character, tactile drape, and weaving technique of Indian fabrics.
          </p>
          <div className="w-12 h-[1px] bg-[#B4975A] mx-auto mt-4" />
        </div>

        {/* 5 Fabric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {fabrics.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="group bg-white border border-[#EFE7DC] p-4 flex flex-col justify-between shadow-luxury hover:border-[#B4975A] transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="aspect-square bg-[#241C18] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#241C18] group-hover:text-[#B4975A] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[11px] font-sans text-gray-600 font-light mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EFE7DC] mt-4">
                <span className="text-[10px] font-sans font-bold tracking-wider text-[#B4975A] uppercase group-hover:underline">
                  EXPLORE WEAVE →
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
