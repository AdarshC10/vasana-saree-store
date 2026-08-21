import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductAccordion({ product }) {
  const [openSections, setOpenSections] = useState({ description: true, details: false, fabric: false, care: false, shipping: false, returns: false });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const accordionItems = [
    {
      key: 'description',
      title: 'DESCRIPTION',
      content: product.description || 'Authentic handloom saree crafted with precision weave and rich heritage aesthetics.'
    },
    {
      key: 'details',
      title: 'PRODUCT DETAILS',
      content: (
        <ul className="list-disc pl-5 space-y-1 text-xs font-sans text-gray-700">
          <li><strong>SKU Code:</strong> {product.sku || 'VSN-7849'}</li>
          <li><strong>Saree Length:</strong> {product.sareeLength || '5.5 meters'}</li>
          <li><strong>Blouse Piece:</strong> {product.blouseLength || '0.8 meters unstitched'}</li>
          <li><strong>Occasion:</strong> {product.occasion || 'Wedding & Festive'}</li>
          <li><strong>Authenticity Tag:</strong> Government Certified SilkMark</li>
        </ul>
      )
    },
    {
      key: 'fabric',
      title: 'FABRIC & CRAFT',
      content: product.craftStory || `Handloom ${product.fabric || 'silk'} saree featuring traditional gold zari border weaving, designed for comfortable festive and occasion wear.`
    },
    {
      key: 'care',
      title: 'CARE INSTRUCTIONS',
      content: product.careInstructions || 'Dry clean only. Wrap in unbleached white muslin cloth and store in a cool, dry place away from direct sunlight.'
    },
    {
      key: 'shipping',
      title: 'SHIPPING & DELIVERY',
      content: 'Complimentary insured express air shipping on orders above ₹5,000. Standard orders are dispatched within 24-48 hours and delivered within 3-5 business days across India.'
    },
    {
      key: 'returns',
      title: 'RETURNS & EXCHANGE',
      content: 'We offer a 7-day hassle-free return and exchange policy for unworn sarees with original tags and SilkMark certification intact.'
    }
  ];

  return (
    <div className="border-t border-[#EFE7DC] divide-y divide-[#EFE7DC] font-sans text-[#29231F]">
      {accordionItems.map((item) => {
        const isOpen = openSections[item.key];
        return (
          <div key={item.key} className="py-4">
            <button
              onClick={() => toggleSection(item.key)}
              className="w-full flex items-center justify-between text-left focus:outline-none group"
            >
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#241C18] group-hover:text-[#B4975A] transition-colors">
                {item.title}
              </span>
              <span className="p-1 text-[#B4975A]">
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 text-xs font-sans font-light text-gray-700 leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
