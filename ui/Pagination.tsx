// @/ui/AdvancedPagination.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

interface PaginationProps {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const Pagination = ({ meta }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const { page, limit, total, totalPages } = meta;

  // ইউআরএল কোয়েরি আপডেট করার ফাংশন
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) return;
    
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  // স্ক্রিনশটের মতো ১ ২ ... ১২ ডাইনামিক পেজ নাম্বার জেনারেট করার লজিক
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3; // একবারে কতটি নাম্বার দেখাবে

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // সবসময় প্রথম পেজ দেখাবে
      pages.push(1);

      if (page > maxVisiblePages) {
        pages.push('...');
      }

      // কারেন্ট পেজের আশেপাশের পেজ
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (page < totalPages - (maxVisiblePages - 1)) {
        if (!pages.includes('...')) pages.push('...');
      }

      // সবসময় শেষ পেজ দেখাবে
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  if (total === 0) return null;

  // রেঞ্জ হিসাব করা (যেমন: Showing 1-8 of 24 results)
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between py-6 text-black rounded-xl px-4 transition-opacity ${isPending ? 'opacity-50' : 'opacity-100'}`}>
      
      {/* বাম পাশের রেঞ্জ কাউন্টার */}
      <div className="text-sm mb-4 sm:mb-0">
        Showing <span className="text-blue-600 font-medium">{from}-{to}</span> of{' '}
        <span className="text-blue-600 font-medium">{total}</span> results
      </div>

      {/* ডান পাশের কন্ট্রোল বাটনসমূহ */}
      <div className="flex items-center gap-2 text-sm select-none">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[#a1a1aa] hover:text-white disabled:opacity-30 disabled:hover:text-[#a1a1aa] transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Previous
        </button>

        {/* ডাইনামিক পেজ নাম্বারসমূহ */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((item, index) => {
            if (item === '...') {
              return (
                <span key={`dots-${index}`} className="px-2 py-1 text-[#52525b]">
                  ...
                </span>
              );
            }

            return (
              <button
                key={`page-${item}`}
                onClick={() => handlePageChange(item as number)}
                className={`w-9 h-9 flex items-center justify-center rounded-full font-medium transition-all cursor-pointer ${
                  page === item
                    ? 'bg-blue-600 text-white' // অ্যাক্টিভ পেজের ডার্ক সার্কেল ডিজাইন
                    : 'text-[#a1a1aa] hover:text-white hover:bg-blue-400'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[#a1a1aa] hover:text-white disabled:opacity-30 disabled:hover:text-[#a1a1aa] transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          Next
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};