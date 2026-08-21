import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const moments = [
  {
    id: 'wedding',
    title: 'Wedding',
    subtitle: 'Grand heirloom bridal Kanjivaram and Banarasi weaves.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    path: '/wedding'
  },
  {
    id: 'festive',
    title: 'Festive',
    subtitle: 'Vibrant silk brocades for Pujas, Diwali, and family rituals.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    path: '/shop?occasion=Festive'
  },
  {
    id: 'everyday',
    title: 'Everyday',
    subtitle: 'Breathable 100-count organic linens and Kerala Kasavu cottons.',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=800&q=80',
    path: '/shop?occasion=Everyday'
  },
  {
    id: 'reception',
    title: 'Reception',
    subtitle: 'Fluid viscose georgettes and tissue organzas with hand embroidery.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    path: '/shop?occasion=Party'
  },
  {
    id: 'office',
    title: 'Office',
    subtitle: 'Minimalist Chanderi stripes and subtle handloom sophistication.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    path: '/shop?category=Chanderi'
  },
  {
    id: 'gifting',
    title: 'Gifting',
    subtitle: 'Precious silk boxes crafted to celebrate milestone moments.',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=800&q=80',
    path: '/shop?collection=Silk+Stories'
  }
];

export default function ShopByMood() {
  return (
    <section className="py-24 bg-[#F7F3ED] text-[#29231F] border-b border-[#EFE7DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] font-sans font-bold tracking-super-wide uppercase text-[#B4975A]">
            CURATED MOMENTS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#241C18]">
            Shop by Moment
          </h2>
          <div className="w-12 h-[1px] bg-[#B4975A] mx-auto mt-4" />
        </div>

        {/* Editorial Collection Grid with Horizontal Scroll on Mobile */}
        <div className="flex lg:grid lg:grid-cols-3 gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 lg:pb-0">
          {moments.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="group relative min-w-[280px] sm:min-w-[320px] lg:min-w-0 snap-center bg-[#241C18] aspect-[3/4] overflow-hidden shadow-luxury"
            >
              {/* Background Image with Hover Zoom */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#241C18]/90 via-[#241C18]/20 to-transparent transition-opacity" />

              {/* Content Box */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white space-y-2">
                <span className="text-[10px] font-sans font-bold tracking-super-wide text-[#B4975A] uppercase">
                  MOMENT
                </span>
                
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-3xl font-light tracking-wide text-[#F7F3ED]">
                    {item.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-[#B4975A] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>

                <p className="text-xs font-sans text-[#EFE7DC]/80 font-light line-clamp-2 leading-relaxed">
                  {item.subtitle}
                </p>

                <div className="pt-2">
                  <span className="text-[11px] font-sans font-semibold tracking-widest text-[#B4975A] uppercase border-b border-[#B4975A] pb-0.5">
                    EXPLORE MOMENT →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
