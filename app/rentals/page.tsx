import React from 'react';


import { getAllCar } from '@/lib/api/allCar';
import { CarCard } from '@/ui/CarCard';
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const AllCarsPage = async () => {
  await delay(3000)
  // ডাটাবেজ থেকে সার্ভার অ্যাকশনের মাধ্যমে ডাটা ফেচ করা হচ্ছে
  const carsData = await getAllCar();
  
  // কাস্টিং সেফটি চেক
  const cars: CarResponse[] = Array.isArray(carsData) ? carsData : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-15">
      
      {/* Section Header */}
      <div className="mb-10 text-center sm:text-left">
        <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Explore Our Fleet</h2>
        <p className="text-slate-500 mt-1">Choose from our premium selection of vehicles for your next journey.</p>
      </div>

      {/* Empty State Check */}
      {cars.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
          <p className="text-slate-500 font-medium">No cars available at the moment.</p>
        </div>
      ) : (
        /* Responsive Grid Layout */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cars.reverse().map((car) => (
            
            <CarCard key={car.id || (car as any)._id} car={car} />
          ))}
        </div>
      )}

    </div>
  );
};

export default AllCarsPage;