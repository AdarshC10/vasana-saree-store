import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function PageLoader({ text = 'Loading VASANA...' }) {
  return (
    <div className="fixed inset-0 z-50 bg-[#F7F4EE] flex flex-col items-center justify-center p-4 font-sans text-[#292522]">
      <div className="relative flex items-center justify-center mb-4">
        {/* Animated Gold Ring Spinner */}
        <div className="w-16 h-16 rounded-full border-2 border-[#EFE7DC] border-t-[#B8924A] animate-spin" />
        <div className="absolute">
          <ShieldCheck className="w-6 h-6 text-[#B8924A]" />
        </div>
      </div>
      
      <span className="font-serif text-xl font-light tracking-widest uppercase text-[#1F1A17]">
        VASANA
      </span>
      <span className="text-[10px] font-sans text-[#B8924A] uppercase tracking-super-wide font-bold mt-1">
        {text}
      </span>
    </div>
  );
}
