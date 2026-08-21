import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function SignatureSareesSection() {
  return (
    <section className="py-24 bg-[#241C18] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Editorial Media */}
          <div className="lg:col-span-7 relative">
            <div className="aspect-[4/5] bg-black overflow-hidden shadow-luxury">
              <img
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85"
                alt="Kerala Kasavu Signature Saree"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 brightness-90"
              />
            </div>
            
            {/* Subtle Floating Gold Tag */}
            <div className="absolute top-6 left-6 bg-[#241C18]/90 backdrop-blur-md border border-[#B4975A]/40 px-4 py-2 text-[10px] font-sans font-bold uppercase tracking-widest text-[#B4975A]">
              HEIRLOOM HERITAGE
            </div>
          </div>

          {/* Right Editorial Copy */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-sans font-bold tracking-super-wide uppercase text-[#B4975A] block">
              HERITAGE SELECTION
            </span>

            <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#F7F3ED] leading-tight">
              Our Signature Sarees
            </h2>

            <div className="space-y-4 text-xs font-sans text-[#EFE7DC]/80 font-light leading-relaxed">
              <h3 className="font-serif text-2xl text-[#B4975A] italic">
                Kerala Kasavu & Kanjivaram Silks
              </h3>
              <p className="text-sm font-serif italic text-white">
                "Rooted in tradition. Designed for today."
              </p>
              <p>
                From classic 100% pure handloom cotton Kasavu sarees woven with golden tissue borders to 3-ply mulberry silk Kanjivarams, our signature collection embodies the soul of Indian weaving heritage.
              </p>
            </div>

            <div className="pt-4">
              <Link
                to="/shop?collection=Silk+Stories"
                className="inline-flex items-center space-x-3 px-8 py-4 bg-[#B4975A] hover:bg-[#C5AC73] text-[#241C18] text-xs font-sans font-bold tracking-super-wide uppercase transition-all duration-300 shadow-luxury"
              >
                <span>EXPLORE SIGNATURE COLLECTION</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
