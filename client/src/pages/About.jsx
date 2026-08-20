import React from 'react';
import { Sparkles, Heart, ShieldCheck, Feather, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-vasana-bg pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Cinematic Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-sans tracking-super-wide text-vasana-gold uppercase font-bold">
            THE VASANA HERITAGE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-vasana-dark leading-tight">
            MORE THAN A SAREE.
          </h1>
          <p className="font-serif text-2xl sm:text-3xl italic text-vasana-burgundy font-light">
            A story woven into every thread.
          </p>
          <div className="w-16 h-[2px] bg-vasana-gold mx-auto mt-4" />
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-8 sm:p-12 border border-vasana-rose/50 shadow-luxury">
          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-light text-vasana-dark">
              Our Philosophy & Origins
            </h2>
            <p className="text-sm font-sans text-gray-700 leading-relaxed">
              Founded with a passion to revitalize India's majestic handloom legacy, <strong>VASANA</strong> translates to the sacred essence of fragrance and garment attire in ancient Sanskrit literature.
            </p>
            <p className="text-sm font-sans text-gray-700 leading-relaxed">
              We collaborate directly with master artisan families across Kanchipuram, Varanasi, Chanderi, and Jaipur. By removing intermediary brokers, we ensure our weavers receive honorable compensation while preserving age-old Korvai and Kadwa weaving traditions.
            </p>
          </div>
          <div className="aspect-[4/3] bg-vasana-dark overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80"
              alt="Artisan weaving"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 5 Core Values */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="font-serif text-3xl font-light text-vasana-dark">Our Pillars of Excellence</h3>
            <div className="w-12 h-[2px] bg-vasana-gold mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: Sparkles, title: 'Craftsmanship', desc: 'Over 200 hours of handloom weaving per heirloom saree.' },
              { icon: ShieldCheck, title: 'Uncompromising Quality', desc: 'Certified pure silk and authentic metallic zari.' },
              { icon: Heart, title: 'Sustainability', desc: 'Zero plastic, natural plant dyes, and ethical silk farming.' },
              { icon: Feather, title: 'Modern Design', desc: 'Timeless traditional motifs reimagined for contemporary women.' },
              { icon: Award, title: 'Cultural Heritage', desc: 'Preserving UNESCO-recognized Jamdani & Kadwa techniques.' }
            ].map((pillar) => (
              <div key={pillar.title} className="p-6 bg-white border border-vasana-rose/50 text-center space-y-3 shadow-sm">
                <pillar.icon className="w-8 h-8 text-vasana-gold mx-auto" />
                <h4 className="font-serif text-lg text-vasana-dark">{pillar.title}</h4>
                <p className="text-xs font-sans text-gray-500">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-vasana-dark text-white p-12 space-y-4">
          <h3 className="font-serif text-3xl font-light">Explore Our Artisanal Saree Collection</h3>
          <p className="font-sans text-xs text-vasana-rose/80">Experience the unmatched drape of pure Mulberry silk and handwoven brocades.</p>
          <Link
            to="/shop"
            className="inline-block px-8 py-3.5 bg-vasana-gold text-vasana-dark text-xs font-sans font-bold uppercase tracking-super-wide hover:bg-vasana-goldLight transition-colors"
          >
            DISCOVER THE COLLECTION
          </Link>
        </div>

      </div>
    </div>
  );
}
