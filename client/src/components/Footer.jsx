import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, ArrowRight, Heart } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      addToast('Thank you for subscribing to VASANA Privé newsletter!', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-vasana-dark text-vasana-bg pt-16 pb-12 border-t border-vasana-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-vasana-gold/20">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-3xl sm:text-4xl tracking-super-wide uppercase font-bold text-white block">
                VASANA
              </span>
              <span className="text-xs tracking-widest text-vasana-gold uppercase font-sans font-medium">
                Woven for your moments.
              </span>
            </Link>
            <p className="text-sm text-vasana-rose/80 font-sans max-w-sm leading-relaxed">
              Crafting heirloom Indian sarees and haute couture ethnic wear. Celebrating centuries of weaving traditions, master handloom craftsmanship, and modern feminine grace.
            </p>
            
            {/* Newsletter */}
            <div className="pt-4">
              <p className="text-xs font-serif uppercase tracking-widest text-vasana-gold mb-3">
                JOIN VASANA PRIVÉ
              </p>
              <form onSubmit={handleSubscribe} className="flex max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="bg-white/5 border border-vasana-rose/30 focus:border-vasana-gold px-4 py-2.5 text-xs text-white placeholder:text-gray-400 focus:outline-none flex-1 font-sans"
                />
                <button
                  type="submit"
                  className="bg-vasana-gold hover:bg-vasana-goldLight text-vasana-dark px-5 py-2.5 text-xs font-sans font-bold tracking-widest uppercase transition-colors flex items-center"
                >
                  SUBSCRIBE
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links: Shop */}
          <div>
            <h4 className="font-serif text-lg tracking-wider text-vasana-gold mb-4 border-b border-vasana-gold/30 pb-1">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-xs font-sans tracking-wide text-vasana-rose/80">
              <li><Link to="/shop" className="hover:text-vasana-gold transition-colors">Sarees</Link></li>
              <li><Link to="/shop?newArrival=true" className="hover:text-vasana-gold transition-colors">New Arrivals</Link></li>
              <li><Link to="/wedding" className="hover:text-vasana-gold transition-colors">Wedding Edit</Link></li>
              <li><Link to="/shop?collection=Silk+Stories" className="hover:text-vasana-gold transition-colors">Silk Stories</Link></li>
              <li><Link to="/visualizer" className="hover:text-vasana-gold transition-colors">Saree Visualizer</Link></li>
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4 className="font-serif text-lg tracking-wider text-vasana-gold mb-4 border-b border-vasana-gold/30 pb-1">
              ABOUT
            </h4>
            <ul className="space-y-2.5 text-xs font-sans tracking-wide text-vasana-rose/80">
              <li><Link to="/about" className="hover:text-vasana-gold transition-colors">Our Story</Link></li>
              <li><Link to="/craft" className="hover:text-vasana-gold transition-colors">Artisanal Craft</Link></li>
              <li><Link to="/journal" className="hover:text-vasana-gold transition-colors">Fashion Journal</Link></li>
              <li><Link to="/contact" className="hover:text-vasana-gold transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="font-serif text-lg tracking-wider text-vasana-gold mb-4 border-b border-vasana-gold/30 pb-1">
              HELP
            </h4>
            <ul className="space-y-2.5 text-xs font-sans tracking-wide text-vasana-rose/80">
              <li><Link to="/contact" className="hover:text-vasana-gold transition-colors">Customer Care</Link></li>
              <li><Link to="/contact" className="hover:text-vasana-gold transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/contact" className="hover:text-vasana-gold transition-colors">FAQs</Link></li>
              <li><Link to="/account" className="hover:text-vasana-gold transition-colors">Order Tracking</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-vasana-rose/60 font-sans space-y-4 sm:space-y-0">
          <div>
            © 2026 VASANA Luxury Fashion. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-vasana-gold transition-colors flex items-center space-x-1">
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-vasana-gold transition-colors flex items-center space-x-1">
              <Facebook className="w-4 h-4" />
              <span>Facebook</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
