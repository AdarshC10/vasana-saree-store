import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, X, Check, ArrowRight, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const occasions = [
  { id: 'Wedding', name: 'Wedding & Bridal', desc: 'Grand Kanjivarams & heavy Zari Brocades' },
  { id: 'Festive', name: 'Festive Celebrations', desc: 'Lustrous Banarasis & Bandhani Drapes' },
  { id: 'Office', name: 'Formal & Office', desc: 'Minimalist Linens & Crisp Handloom Cottons' },
  { id: 'Party', name: 'Evening Soirée / Party', desc: 'Ethereal Organzas & Fluid Georgettes' },
  { id: 'Casual', name: 'Daywear & Casual', desc: 'Comfortable Tussars & Lightweight Cottons' }
];

const styles = [
  { id: 'Traditional', name: 'Traditional Heritage', desc: 'Deep temple motifs, gold borders & classic drapes' },
  { id: 'Minimal', name: 'Minimalist Chic', desc: 'Solid tones, delicate subtle metallic selvedges' },
  { id: 'Luxury', name: 'Opulent Royalty', desc: 'Heavy embroidery, velvet accents & zari jaals' },
  { id: 'Modern', name: 'Modern Contemporary', desc: 'Pre-stitched pleats, unique palettes & drape twists' }
];

export default function SareeVisualizerModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedOccasion, setSelectedOccasion] = useState(occasions[0].id);
  const [selectedStyle, setSelectedStyle] = useState(styles[0].id);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleComplete = () => {
    navigate(`/shop?occasion=${encodeURIComponent(selectedOccasion)}&sort=rating`);
    onClose();
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-vasana-bg border border-vasana-gold max-w-2xl w-full p-6 sm:p-10 shadow-2xl relative text-vasana-dark max-h-[90vh] overflow-y-auto"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-vasana-dark hover:text-vasana-burgundy transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 text-xs font-sans tracking-super-wide text-vasana-gold uppercase font-bold mb-1">
            <Sparkles className="w-4 h-4" />
            <span>AI DRAPE WIZARD</span>
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl font-light">
            Saree Drape Visualizer
          </h3>
          <p className="text-xs font-sans text-gray-500 mt-1">
            Step {step} of 2: {step === 1 ? 'Select Your Occasion' : 'Choose Your Aesthetic Style'}
          </p>
        </div>

        {/* Step 1: Occasion */}
        {step === 1 && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
              {occasions.map((occ) => (
                <div
                  key={occ.id}
                  onClick={() => setSelectedOccasion(occ.id)}
                  className={`p-4 border transition-all cursor-pointer flex items-center justify-between ${
                    selectedOccasion === occ.id
                      ? 'border-vasana-burgundy bg-vasana-rose/30 shadow-sm'
                      : 'border-vasana-rose/50 bg-white hover:border-vasana-gold'
                  }`}
                >
                  <div>
                    <h4 className="font-serif text-lg font-normal text-vasana-dark">
                      {occ.name}
                    </h4>
                    <p className="text-xs font-sans text-gray-500">{occ.desc}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    selectedOccasion === occ.id ? 'bg-vasana-burgundy border-vasana-burgundy text-white' : 'border-gray-300'
                  }`}>
                    {selectedOccasion === occ.id && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-vasana-burgundy text-white text-xs font-sans font-bold tracking-widest uppercase hover:bg-vasana-burgundyDark transition-colors flex items-center space-x-2"
              >
                <span>NEXT: CHOOSE STYLE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Style */}
        {step === 2 && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
              {styles.map((stl) => (
                <div
                  key={stl.id}
                  onClick={() => setSelectedStyle(stl.id)}
                  className={`p-4 border transition-all cursor-pointer flex items-center justify-between ${
                    selectedStyle === stl.id
                      ? 'border-vasana-burgundy bg-vasana-rose/30 shadow-sm'
                      : 'border-vasana-rose/50 bg-white hover:border-vasana-gold'
                  }`}
                >
                  <div>
                    <h4 className="font-serif text-lg font-normal text-vasana-dark">
                      {stl.name}
                    </h4>
                    <p className="text-xs font-sans text-gray-500">{stl.desc}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    selectedStyle === stl.id ? 'bg-vasana-burgundy border-vasana-burgundy text-white' : 'border-gray-300'
                  }`}>
                    {selectedStyle === stl.id && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 border border-gray-300 text-xs font-sans text-gray-600 hover:border-vasana-dark"
              >
                Back
              </button>
              <button
                onClick={handleComplete}
                className="px-8 py-3.5 bg-vasana-gold text-vasana-dark font-sans text-xs font-bold tracking-super-wide uppercase hover:bg-vasana-goldLight transition-colors flex items-center space-x-2 shadow-luxury"
              >
                <Sparkles className="w-4 h-4" />
                <span>GENERATE CURATED SAREES</span>
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
