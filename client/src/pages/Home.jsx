import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import ShopByMood from '../components/ShopByMood';
import FeaturedCarousel from '../components/FeaturedCarousel';
import CraftStorySection from '../components/CraftStorySection';
import ShopTheLookSection from '../components/ShopTheLookSection';
import SareeVisualizerModal from '../components/SareeVisualizerModal';
import QuickViewModal from '../components/QuickViewModal';
import ProductCard from '../components/ProductCard';
import api from '../services/api';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [selectedQuickView, setSelectedQuickView] = useState(null);
  const [visualizerOpen, setVisualizerOpen] = useState(false);

  useEffect(() => {
    // Fetch products
    api.get('/products?limit=12')
      .then((res) => {
        const prods = res.data.products || [];
        setFeaturedProducts(prods.slice(0, 6));
        setNewArrivals(prods.slice(6, 12));
      })
      .catch(() => {
        // Fallback demo data if server is off
      });
  }, []);

  return (
    <div className="min-h-screen bg-vasana-bg">
      {/* Hero Viewport Carousel */}
      <HeroSection />

      {/* Shop By Mood */}
      <ShopByMood />

      {/* Featured Collection Slider */}
      <FeaturedCarousel
        title="Featured Heirloom Sarees"
        subtitle="Masterpieces hand-selected for extraordinary moments."
        products={featuredProducts}
        onQuickView={(prod) => setSelectedQuickView(prod)}
      />

      {/* Saree Visualizer Banner */}
      <section className="py-16 bg-gradient-to-r from-vasana-burgundyDark via-vasana-burgundy to-vasana-burgundyDark text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center space-x-2 text-xs font-sans tracking-super-wide text-vasana-gold uppercase font-bold">
              <Sparkles className="w-4 h-4" />
              <span>AI DRAPE ASSISTANT</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-light">
              Not sure which saree fits your event?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-vasana-rose/80">
              Answer 2 simple questions about your occasion & preferred style aesthetic, and our drape algorithm will present your perfect matches.
            </p>
          </div>

          <button
            onClick={() => setVisualizerOpen(true)}
            className="px-8 py-4 bg-vasana-gold hover:bg-vasana-goldLight text-vasana-dark text-xs font-sans font-bold tracking-super-wide uppercase transition-all duration-300 shadow-luxury shrink-0"
          >
            LAUNCH SAREE VISUALIZER
          </button>
        </div>
      </section>

      {/* Craft Story Section */}
      <CraftStorySection />

      {/* Shop The Look Styling */}
      <ShopTheLookSection />

      {/* New Arrivals Section */}
      <section className="py-20 bg-white border-b border-vasana-rose/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-sans tracking-super-wide text-vasana-gold uppercase font-bold">
              FRESH OFF THE LOOM
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-vasana-dark mt-1">
              New Arrivals
            </h2>
            <div className="w-12 h-[2px] bg-vasana-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {newArrivals.map((prod) => (
              <ProductCard
                key={prod._id}
                product={prod}
                onQuickView={(p) => setSelectedQuickView(p)}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/shop?sort=newest"
              className="inline-flex items-center space-x-2 px-8 py-3.5 border border-vasana-burgundy text-vasana-burgundy hover:bg-vasana-burgundy hover:text-white text-xs font-sans font-bold tracking-widest uppercase transition-all duration-300"
            >
              <span>VIEW ALL NEW ARRIVALS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Modals */}
      {selectedQuickView && (
        <QuickViewModal
          product={selectedQuickView}
          onClose={() => setSelectedQuickView(null)}
        />
      )}

      <SareeVisualizerModal
        isOpen={visualizerOpen}
        onClose={() => setVisualizerOpen(false)}
      />
    </div>
  );
}
