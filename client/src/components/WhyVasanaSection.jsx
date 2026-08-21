import React from 'react';
import { Sparkles, ShieldCheck, Truck, UserCheck } from 'lucide-react';

const benefits = [
  {
    icon: Sparkles,
    title: 'Thoughtfully Curated',
    desc: 'Each saree is hand-picked for exquisite silk weave quality, color palette, and heirloom appeal.'
  },
  {
    icon: ShieldCheck,
    title: 'Authentic Craft',
    desc: 'Government-certified SilkMark purity tags guaranteeing 100% genuine silk and authentic metallic zari.'
  },
  {
    icon: Truck,
    title: 'Secure Delivery',
    desc: 'Complimentary insured express air shipping with real-time tracking across India and worldwide.'
  },
  {
    icon: UserCheck,
    title: 'Personal Styling',
    desc: 'Bespoke blouse tailoring and 1-on-1 AI drape recommendation concierge for your special occasions.'
  }
];

export default function WhyVasanaSection() {
  return (
    <section className="py-20 bg-[#EFE7DC] text-[#29231F] border-b border-[#EFE7DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="text-center space-y-3 p-4">
                <div className="w-12 h-12 rounded-full bg-[#F7F3ED] border border-[#B4975A]/40 flex items-center justify-center mx-auto text-[#B4975A]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-[#241C18] font-normal">{b.title}</h3>
                <p className="text-xs font-sans text-gray-600 font-light leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
