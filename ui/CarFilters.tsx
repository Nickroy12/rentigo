// @/ui/CarFilters.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition, useState } from 'react';

export const CarFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  // সার্চ ইনপুটের ভ্যালু ধরে রাখার জন্য স্টেট
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  // সার্চ ফর্ম সাবমিট (বাটন ক্লিক বা Enter চাপলে যা হবে)
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim());
    } else {
      params.delete('search');
    }
    params.delete('page'); // নতুন সার্চে পেজ ১ থেকে শুরু হবে

    startTransition(() => {
      // সরাসরি /rentals পেজে সার্চ ডেটাসহ রিডাইরেক্ট করবে
      router.push(`/rentals?${params.toString()}`);
    });
  };

  // সর্টিং এর জন্য কমন ফাংশন
  const updateSortParams = (sortByValue: string | null, sortOrderValue: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (sortByValue && sortOrderValue) {
      params.set('sortBy', sortByValue);
      params.set('sortOrder', sortOrderValue);
    } else {
      params.delete('sortBy');
      params.delete('sortOrder');
    }
    params.delete('page');

    startTransition(() => {
      router.push(`/rentals?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8  p-4 rounded-xl ">
      
      {/* সার্চ ইনপুট এবং বাটন - এখন এটি একটি ফর্ম */}
      <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full sm:max-w-md">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-10 py-5 bg-white  rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none border-b-2 border-blue-600 focus:border-transparent transition-all"
          />
          {isPending && (
            <div className="absolute right-3 top-3.5 w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          )}
        </div>
        
        {/* সার্চ বাটন */}
        <button
          type="submit"
          disabled={isPending}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium text-sm rounded-lg transition-colors shadow-sm whitespace-nowrap"
        >
          {isPending ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* সর্টিং ড্রপডাউন */}
      <div className="w-full sm:w-auto flex items-center gap-2">
        <span className="text-xs font-medium text-slate-500 whitespace-nowrap">Sort by:</span>
        <select
          value={searchParams.get('sortOrder') || ''}
          onChange={(e) => {
            const val = e.target.value;
            updateSortParams(val ? 'hiringPrice' : null, val ? val : null);
          }}
          className="w-full sm:w-48 bg-white border border-slate-200 px-3 py-2.5 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <option value="">Default (Newest)</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
      
    </div>
  );
};