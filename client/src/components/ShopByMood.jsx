import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const moodCards = [
  {
    title: 'WEDDINGS',
    subtitle: 'Grand Kanjivarams & Royal Brocades',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
    link: '/shop?occasion=Wedding'
  },
  {
    title: 'FESTIVE',
    subtitle: 'Lustrous Banarasis & Vibrant Bandhanis',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
    link: '/shop?occasion=Festive'
  },
  {
    title: 'EVERYDAY',
    subtitle: 'Airy Linens & Handloom Cottons',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1000&q=80',
    link: '/shop?occasion=Everyday'
  },
  {
    title: 'PARTY',
    subtitle: 'Ethereal Organzas & Fluid Georgettes',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
    link: '/shop?occasion=Party'
  }
];

export default function ShopByMood() {
  return (
    <section className="py-20 bg-vasana-bg border-b border-vasana-rose/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-sans tracking-super-wide text-vasana-gold uppercase font-bold">
            CURATED SELECTIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-vasana-dark mt-2">
            Shop by Mood & Occasion
          </h2>
          <div className="w-12 h-[2px] bg-vasana-gold mx-auto mt-4" />
        </div>

        {/* 4 Large Editorial Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {moodCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <Link
                to={card.link}
                className="group relative block aspect-[3/4] overflow-hidden bg-vasana-dark shadow-luxury"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${card.image})` }}
                />

                {/* Dark Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-vasana-dark/90 via-vasana-dark/30 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                {/* Content Shift */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10">
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-2xl sm:text-3xl font-light tracking-wider group-hover:text-vasana-gold transition-colors">
                        {card.title}
                      </h3>
                      <div className="w-9 h-9 rounded-full border border-vasana-gold/50 flex items-center justify-center text-vasana-gold group-hover:bg-vasana-gold group-hover:text-vasana-dark transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                    <p className="text-xs font-sans text-vasana-rose/80 font-light mt-2 line-clamp-1">
                      {card.subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
