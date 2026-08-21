import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function OurStorySection() {
  return (
    <section className="py-24 bg-[#EFE7DC] text-[#29231F] border-b border-[#EFE7DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-sans font-bold tracking-super-wide uppercase text-[#B4975A] block">
              HERITAGE & PHILOSOPHY
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#241C18] leading-tight">
              Rooted in tradition. Designed for today.
            </h2>

            <div className="space-y-4 text-xs font-sans text-gray-700 font-light leading-relaxed">
              <p>
                VASANA was founded on a singular reverence: to celebrate the timeless poetry of Indian handlooms while reinventing the drape for modern women.
              </p>
              <p>
                Collaborating directly with hereditary master weaving clusters across Kanchipuram, Varanasi, Chanderi, Balaramapuram, and Jaipur, every thread is ethically sourced, woven over hundreds of artisan hours, and inspected for certified purity.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-[#241C18] hover:bg-[#322722] text-white text-xs font-sans font-bold tracking-super-wide uppercase transition-colors"
              >
                <span>OUR STORY</span>
                <ArrowRight className="w-4 h-4 text-[#B4975A]" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] bg-[#241C18] overflow-hidden shadow-luxury">
              <img
                src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1200&q=80"
                alt="VASANA Handloom Saree Craftsmanship"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 brightness-95"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
