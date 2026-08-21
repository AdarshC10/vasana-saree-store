import React from 'react';

export default function ProductSkeleton() {
  return (
    <div className="min-h-screen bg-[#F7F3ED] pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="h-4 bg-[#EFE7DC] w-48 rounded" />

      {/* Main split skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 aspect-[3/4] bg-[#EFE7DC] rounded shadow-luxury" />
        
        <div className="lg:col-span-5 space-y-6">
          <div className="h-4 bg-[#EFE7DC] w-32 rounded" />
          <div className="h-8 bg-[#EFE7DC] w-3/4 rounded" />
          <div className="h-5 bg-[#EFE7DC] w-40 rounded" />
          <div className="h-16 bg-[#EFE7DC] w-full rounded" />
          <div className="h-20 bg-[#EFE7DC] w-full rounded" />
          <div className="h-12 bg-[#241C18]/20 w-full rounded" />
          <div className="h-12 bg-[#B4975A]/30 w-full rounded" />
        </div>
      </div>
    </div>
  );
}
