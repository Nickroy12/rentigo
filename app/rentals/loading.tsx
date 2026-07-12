import React from 'react';

export default function Loading() {
  // লোডিং অবস্থায় গ্রিডে ৮টি ডামি কার্ড দেখানোর জন্য
  const skeletonCards = Array.from({ length: 8 });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-15">
      
      {/* Header Skeleton */}
      <div className="mb-10 text-center sm:text-left animate-pulse">
        {/* Title Line */}
        <div className="h-9 w-64 bg-slate-200 rounded-lg mx-auto sm:mx-0 mb-3" />
        {/* Subtitle Line */}
        <div className="h-4 w-96 max-w-full bg-slate-200 rounded-md mx-auto sm:mx-0" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skeletonCards.map((_, index) => (
          <div 
            key={index} 
            className="border border-slate-200/60 rounded-2xl p-4 bg-white shadow-sm space-y-4 animate-pulse"
          >
            {/* Car Image Placeholder */}
            <div className="aspect-[16/10] w-full bg-slate-200 rounded-xl" />
            
            {/* Title & Tags */}
            <div className="space-y-2">
              <div className="h-5 w-3/4 bg-slate-200 rounded-md" />
              <div className="flex gap-2">
                <div className="h-4 w-12 bg-slate-200 rounded-full" />
                <div className="h-4 w-16 bg-slate-200 rounded-full" />
              </div>
            </div>

            {/* Divider line if your CarCard has one */}
            <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
              {/* Price Placeholder */}
              <div className="space-y-1">
                <div className="h-4 w-14 bg-slate-200 rounded" />
              </div>
              {/* Button Placeholder */}
              <div className="h-9 w-24 bg-slate-200 rounded-xl" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}