'use client'
import React from 'react';
import Link from 'next/link'; // Imported Next.js Link
import { CarResponse } from '@/lib/action/action';
import { Gauge, Star } from 'lucide-react';

interface CarCardProps {
  car: CarResponse;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  // Demo slug generation for the dynamic URL (e.g., "tesla-model-3")
 

  return (
    <div className="bg-[#F8FAFC] border border-slate-100 rounded-[24px] p-6 flex flex-col justify-between w-full min-h-[340px]">
      
      {/* Top Section: Title & Price */}
      <div>
        <h3 className="font-semibold text-lg text-slate-800 tracking-tight mb-1">
          {car.title}
        </h3>
        
        <div className="flex items-start text-slate-900 font-bold">
          <span className="text-xs mt-0.5 font-medium">$</span>
          <span className="text-3xl font-extrabold leading-none tracking-tighter">{car.hiringPrice}</span>
          <span className="text-[11px] text-slate-400 font-medium self-end ml-0.5 mb-0.5">/day</span>
        </div>
      </div>

      {/* Middle Section: Car Image */}
      <div className="my-3 flex items-center justify-center overflow-hidden">
        <img 
          src={car.image || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600'} 
          alt={car.title}
          className="max-h-[120px] w-auto object-contain select-none"
        />
      </div>

      {/* Bottom Section: Minimal Specs & Action */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 pt-2 text-center text-slate-400">
          
          {/* Transmission */}
          <div className="flex flex-col items-center justify-center gap-1">
            <Gauge className="w-5 h-5 text-blue-600 stroke-[2]" />
            <span className="text-[11px] text-slate-500 font-medium">
              {car.condition}
            </span>
          </div>

          {/* Rating */}
          <div className="flex flex-col items-center justify-center gap-1">
            <Star className="w-5 h-5 text-amber-500 stroke-[2]" />
            <span className="text-[11px] text-slate-500 font-medium">
              {car.rating}
            </span>
          </div>

        </div>

        {/* See More Link */}
        <Link 
          href={`/rentals/Details/${car._id}`}
          className="flex items-center justify-center w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition-colors duration-200 shadow-sm shadow-blue-100 text-center"
        >
          See More
        </Link>
      </div>

    </div>
  );
};