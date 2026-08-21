import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import ShopByMood from '../components/ShopByMood';
import NewArrivalsSection from '../components/NewArrivalsSection';
import SignatureSareesSection from '../components/SignatureSareesSection';
import FabricStoriesSection from '../components/FabricStoriesSection';
import VasanaAIStylistBanner from '../components/VasanaAIStylistBanner';
import OurStorySection from '../components/OurStorySection';
import WeavingJourneySection from '../components/WeavingJourneySection';
import WhyVasanaSection from '../components/WhyVasanaSection';
import TestimonialCarousel from '../components/TestimonialCarousel';
import MomentsInVasana from '../components/MomentsInVasana';
import VasanaJournalSection from '../components/VasanaJournalSection';

import api from '../services/api';
import { fallbackProducts } from '../utils/fallbackData';

export default function Home() {
  const [products, setProducts] = useState(fallbackProducts);

  useEffect(() => {
    api.get('/products?limit=12')
      .then((res) => {
        if (res.data?.products?.length) {
          setProducts(res.data.products);
        }
      })
      .catch(() => {
        // Keeps fallbackProducts
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F3ED] font-sans selection:bg-[#241C18] selection:text-white">
      
      {/* 1. Cinematic Hero Viewport Slider */}
      <HeroSection />

      {/* 2. Shop by Moment */}
      <ShopByMood />

      {/* 3. New Arrivals */}
      <NewArrivalsSection products={products} />

      {/* 4. Our Signature Sarees */}
      <SignatureSareesSection />

      {/* 5. Fabric Stories ("The Art of the Weave") */}
      <FabricStoriesSection />

      {/* 6. Vasana AI Stylist Banner */}
      <VasanaAIStylistBanner />

      {/* 7. Our Story */}
      <OurStorySection />

      {/* 8. Weaving Journey (THREAD → WEAVE → SAREE → YOUR MOMENT) */}
      <WeavingJourneySection />

      {/* 9. Why Vasana */}
      <WhyVasanaSection />

      {/* 10. Luxury Testimonials */}
      <TestimonialCarousel />

      {/* 11. Moments in Vasana */}
      <MomentsInVasana />

      {/* 12. The Vasana Journal */}
      <VasanaJournalSection />

    </div>
  );
}
