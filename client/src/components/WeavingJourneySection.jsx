import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { step: '01', title: 'THREAD', desc: 'Selection of 100-count organic European flax, mulberry silk strands & pure metallic zari.' },
  { step: '02', title: 'WEAVE', desc: 'Hundreds of craftsman hours on traditional pit looms creating Korvai borders & Kadwa floral jaals.' },
  { step: '03', title: 'SAREE', desc: 'Hand inspection, SilkMark purity tag certification & bespoke tailoring of unstitched blouse pieces.' },
  { step: '04', title: 'YOUR MOMENT', desc: 'Draped for weddings, grand festivals, milestone rituals, and cherished life memories.' }
];

export default function WeavingJourneySection() {
  return (
    <section className="py-24 bg-[#F7F3ED] text-[#29231F] border-b border-[#EFE7DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] font-sans font-bold tracking-super-wide uppercase text-[#B4975A]">
            THE ARTISANAL PROCESS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#241C18]">
            The Weaving Journey
          </h2>
          <p className="text-xs font-sans text-gray-500 font-light">
            From raw Mulberry cocoon to your unforgettable celebration.
          </p>
          <div className="w-12 h-[1px] bg-[#B4975A] mx-auto mt-4" />
        </div>

        {/* 4 Step Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {steps.map((st, idx) => (
            <div key={st.title} className="bg-white border border-[#EFE7DC] p-6 space-y-4 shadow-luxury relative flex flex-col justify-between">
              <div className="space-y-2">
                <span className="font-serif text-4xl text-[#B4975A] font-light block">{st.step}</span>
                <h3 className="font-serif text-2xl text-[#241C18] font-normal tracking-wider">{st.title}</h3>
                <p className="text-xs font-sans text-gray-600 font-light leading-relaxed">{st.desc}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-[#B4975A] font-bold text-lg z-10">
                  ↓
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
