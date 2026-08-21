import React, { useState } from 'react';
import { Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import SareeVisualizerModal from './SareeVisualizerModal';

export default function VasanaAIStylistBanner() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="py-20 bg-gradient-to-r from-[#241C18] via-[#322722] to-[#241C18] text-white relative overflow-hidden shadow-luxury">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center space-x-2 text-[10px] font-sans tracking-super-wide text-[#B4975A] uppercase font-bold">
              <Sparkles className="w-4 h-4" />
              <span>VASANA AI CONCIERGE</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#F7F3ED]">
              Find Your Perfect Saree
            </h2>

            <p className="font-sans text-xs sm:text-sm text-[#EFE7DC]/80 font-light leading-relaxed">
              Tell us about your moment. We'll help you find the right drape.
            </p>

            <div className="p-3 bg-[#241C18]/80 border border-[#B4975A]/30 inline-block text-xs font-serif italic text-[#B4975A]">
              "I need an elegant saree for a wedding under ₹5,000."
            </div>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-8 py-4 bg-[#B4975A] hover:bg-[#C5AC73] text-[#241C18] text-xs font-sans font-bold tracking-super-wide uppercase transition-all duration-300 shadow-luxury flex items-center space-x-2 shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>ASK VASANA STYLIST</span>
          </button>

        </div>
      </section>

      <SareeVisualizerModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
