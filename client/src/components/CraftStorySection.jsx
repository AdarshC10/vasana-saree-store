import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const craftSteps = [
  {
    step: '01',
    title: 'THREAD',
    subtitle: 'Pure Mulberry & Wild Tussar Silks',
    desc: 'Sourced directly from cocoon farmers in Southern and Eastern India, spun carefully to maintain natural fiber lustrous elasticity.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
  },
  {
    step: '02',
    title: 'WEAVE',
    subtitle: 'Heritage Pit Looms & Korvai Technique',
    desc: 'Hereditary weavers meticulously interlock warp and weft yarns, devoting up to 300 hours to a single wedding masterpiece.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
  },
  {
    step: '03',
    title: 'CRAFT',
    subtitle: 'Zari Brocades & Hand Embroidery',
    desc: 'Pure metallic silver dipped in 24K gold brocades integrated with intricate Kadwa jaals and delicate zardozi needlework.',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=800&q=80'
  },
  {
    step: '04',
    title: 'SAREE',
    subtitle: 'Woven for your moments',
    desc: 'A breathing heirloom garment draped across generations, carrying stories of culture, celebration, and eternal femininity.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
  }
];

export default function CraftStorySection() {
  return (
    <section className="py-24 bg-vasana-dark text-white relative overflow-hidden">
      {/* Decorative Gold Accent Background Grid */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C89B5C_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 text-xs font-sans tracking-super-wide text-vasana-gold uppercase font-bold mb-3">
            <Sparkles className="w-4 h-4" />
            <span>HERITAGE CRAFTSMANSHIP</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-light tracking-wider">
            WOVEN BY HAND
          </h2>
          <p className="font-serif text-xl sm:text-2xl italic text-vasana-gold mt-2 font-light">
            Every thread has a story.
          </p>
          <div className="w-16 h-[2px] bg-vasana-gold mx-auto mt-6" />
        </div>

        {/* 4 Step Timeline Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {craftSteps.map((item, idx) => (
            <div
              key={item.title}
              className="relative bg-white/5 border border-vasana-gold/20 p-6 flex flex-col justify-between group hover:border-vasana-gold transition-all duration-500"
            >
              <div>
                <div className="flex items-center justify-between border-b border-vasana-gold/20 pb-4 mb-4">
                  <span className="font-serif text-4xl text-vasana-gold font-light">
                    {item.step}
                  </span>
                  <span className="text-xs font-sans tracking-super-wide text-vasana-rose uppercase font-semibold">
                    {item.title}
                  </span>
                </div>

                <div className="aspect-[4/3] overflow-hidden mb-4 bg-black">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                  />
                </div>

                <h3 className="font-serif text-xl text-white font-normal mb-2">
                  {item.subtitle}
                </h3>
                <p className="text-xs font-sans text-vasana-rose/70 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Link to Full Craft Documentary Page */}
        <div className="text-center">
          <Link
            to="/craft"
            className="inline-flex items-center space-x-3 px-8 py-3.5 border border-vasana-gold text-vasana-gold hover:bg-vasana-gold hover:text-vasana-dark text-xs font-sans font-bold tracking-super-wide uppercase transition-all duration-300"
          >
            <span>DISCOVER OUR ARTISANS & PROCESS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
