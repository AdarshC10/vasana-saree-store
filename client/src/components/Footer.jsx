import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Instagram, Facebook, PinIcon as Pinterest } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { addToast } = useToast();
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) return null;

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      addToast('Thank you for joining the Vasana Journal!', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#241C18] text-[#F7F3ED] font-sans border-t border-[#B4975A]/20">
      
      {/* Newsletter Section */}
      <div className="py-20 border-b border-[#EFE7DC]/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-[10px] font-sans font-bold tracking-super-wide uppercase text-[#B4975A]">
            VASANA PRIVÉ CONCIERGE
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#F7F3ED]">
            Enter the Vasana Journal
          </h2>

          <p className="text-xs sm:text-sm font-sans text-[#EFE7DC]/80 font-light max-w-xl mx-auto leading-relaxed">
            Stories of Indian textiles, styling inspiration, new collections and moments worth remembering.
          </p>

          <form onSubmit={handleSubscribe} className="pt-4 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 bg-[#1A1411] border border-[#B4975A]/30 py-3 px-4 text-xs font-sans text-white focus:outline-none focus:border-[#B4975A]"
            />
            <button
              type="submit"
              className="py-3 px-6 bg-[#B4975A] hover:bg-[#C5AC73] text-[#241C18] text-xs font-sans font-bold tracking-widest uppercase transition-colors shrink-0"
            >
              JOIN THE JOURNAL
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3">
            <Link to="/" className="inline-block">
              <span className="font-serif text-3xl tracking-super-wide uppercase font-bold text-white block">
                VASANA
              </span>
              <span className="block text-[9px] tracking-widest text-[#B4975A] uppercase font-sans -mt-1 font-medium">
                Woven for your moments.
              </span>
            </Link>

            <p className="text-xs text-[#EFE7DC]/70 font-light max-w-sm leading-relaxed">
              Crafting heirloom Indian sarees and haute couture ethnic wear. Celebrating centuries of weaving traditions, master handloom craftsmanship, and modern feminine grace.
            </p>
          </div>

          {/* SHOP */}
          <div className="space-y-3 text-xs">
            <h4 className="font-sans font-bold tracking-wider uppercase text-[#B4975A]">SHOP</h4>
            <ul className="space-y-2 font-light text-[#EFE7DC]/80">
              <li><Link to="/shop?sort=newest" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Sarees</Link></li>
              <li><Link to="/shop?collection=Silk+Stories" className="hover:text-white transition-colors">Collections</Link></li>
              <li><Link to="/wedding" className="hover:text-white transition-colors">Occasions</Link></li>
            </ul>
          </div>

          {/* ABOUT */}
          <div className="space-y-3 text-xs">
            <h4 className="font-sans font-bold tracking-wider uppercase text-[#B4975A]">ABOUT</h4>
            <ul className="space-y-2 font-light text-[#EFE7DC]/80">
              <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link to="/craft" className="hover:text-white transition-colors">Craftsmanship</Link></li>
              <li><Link to="/journal" className="hover:text-white transition-colors">Journal</Link></li>
            </ul>
          </div>

          {/* HELP & FOLLOW */}
          <div className="space-y-3 text-xs">
            <h4 className="font-sans font-bold tracking-wider uppercase text-[#B4975A]">HELP</h4>
            <ul className="space-y-2 font-light text-[#EFE7DC]/80">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Shipping</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Returns</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>

            <div className="pt-2">
              <h4 className="font-sans font-bold tracking-wider uppercase text-[#B4975A] mb-2">FOLLOW</h4>
              <div className="flex space-x-3 text-[#EFE7DC]">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#B4975A] transition-colors"><Instagram className="w-4 h-4" /></a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#B4975A] transition-colors"><Facebook className="w-4 h-4" /></a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#B4975A] transition-colors"><Pinterest className="w-4 h-4" /></a>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-[#EFE7DC]/10 flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#EFE7DC]/50 font-light gap-4">
          <p>© {new Date().getFullYear()} VASANA Luxury Fashion. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link to="/contact" className="hover:text-white">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>

      </div>

    </footer>
  );
}
