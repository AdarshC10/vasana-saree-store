import React from 'react';
import { Sparkles, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const craftSteps = [
  {
    step: '01',
    title: 'SILK & FLAX HARVEST',
    subtitle: 'From Mulberry Cocoons to European Flax Yarns',
    desc: 'Our journey begins in Karnataka silkworm farms and European flax fields, where raw fibers are selected for high tensile strength and natural sheen.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
  },
  {
    step: '02',
    title: 'THREAD SPINNING',
    subtitle: 'Hand-Twisted 3-Ply Mulberry Silk Threads',
    desc: 'Artisans manually reel and spin filaments onto charkha bobbins to create uniform 3-ply silk threads essential for grand Kanjivaram drapes.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80'
  },
  {
    step: '03',
    title: 'ECO DYEING',
    subtitle: 'Plant-Based Dyes & Natural Fixatives',
    desc: 'Yarns undergo boiling in natural extracts derived from madder root, indigo leaves, and marigold petals, ensuring radiant non-fading colors.',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1000&q=80'
  },
  {
    step: '04',
    title: 'PIT LOOM WEAVING',
    subtitle: 'Interlocking Warp & Weft via Korvai',
    desc: 'Two weavers sit side by side on wooden pit looms, manually manipulating up to 12,000 Jacquard punch cards to construct complex metallic jaals.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
  },
  {
    step: '05',
    title: 'ZARI EMBELLISHMENT',
    subtitle: '24K Gold Dipped Silver Threads',
    desc: 'Metallic ribbons drawn from pure silver cores are electroplated in 24-karat gold and woven into borders using Kadwa shuttles.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80'
  },
  {
    step: '06',
    title: 'THE SAREE',
    subtitle: 'Finishing, Washing & SilkMark Certification',
    desc: 'Every saree is washed in purified spring water, steam pressed, and affixed with a government-certified SilkMark authenticity tag.',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1000&q=80'
  }
];

export default function CraftPage() {
  return (
    <div className="min-h-screen bg-vasana-dark text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-sans tracking-super-wide text-vasana-gold uppercase font-bold">
            <Sparkles className="w-4 h-4" />
            <span>FASHION DOCUMENTARY</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-wider">
            THE ARTISANAL JOURNEY
          </h1>
          <p className="font-serif text-2xl italic text-vasana-gold font-light">
            From raw thread to royal drape.
          </p>
          <div className="w-16 h-[2px] bg-vasana-gold mx-auto mt-4" />
        </div>

        {/* Step-by-Step Documentary Timeline */}
        <div className="space-y-16">
          {craftSteps.map((step, idx) => (
            <div
              key={step.title}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="aspect-[16/10] overflow-hidden border border-vasana-gold/30 bg-black">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover opacity-85 hover:opacity-100 hover:scale-105 transition-all duration-700"
                  />
                </div>
              </div>

              <div className={`lg:col-span-6 space-y-4 ${idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                <span className="font-serif text-5xl text-vasana-gold font-light block">
                  {step.step}
                </span>
                <span className="text-xs font-sans tracking-super-wide text-vasana-rose uppercase font-bold block">
                  {step.title}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-white">
                  {step.subtitle}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-vasana-rose/80 leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-10">
          <Link
            to="/shop"
            className="inline-block px-10 py-4 bg-vasana-gold text-vasana-dark text-xs font-sans font-bold uppercase tracking-super-wide hover:bg-vasana-goldLight transition-colors shadow-luxury"
          >
            EXPLORE HANDLOOM SAREES
          </Link>
        </div>

      </div>
    </div>
  );
}
