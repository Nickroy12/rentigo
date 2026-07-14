// @/app/cars/page.tsx
import React from 'react';

import { CarCard } from '@/ui/CarCard';
import { CarFilters } from '@/ui/CarFilters';
import { Pagination } from '@/ui/Pagination';
import { getAllCars } from '@/lib/api/allCar';

interface PageProps {
  searchParams: Promise<{
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: string;
  }>;
}
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const AllCarsPage = async ({ searchParams }: PageProps) => {
await delay(3000)
  const resolvedSearchParams = await searchParams;

  const query = {
    search: resolvedSearchParams.search,
    sortBy: resolvedSearchParams.sortBy,
    sortOrder: resolvedSearchParams.sortOrder,
    page: resolvedSearchParams.page ? parseInt(resolvedSearchParams.page) : 1,
    limit: 8
  };

  const carsResponse = await getAllCars(query);
  
  const allCars = Array.isArray(carsResponse?.data) ? carsResponse.data : [];
  const meta = carsResponse?.meta || { page: 1, limit: 8, total: 0, totalPages: 0 };

  const availableCars = allCars.filter((car: any) => car.isAvailable === "true");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-15">
      
      <div className="mb-6 text-center sm:text-left">
        <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Explore Our Fleet</h2>
        <p className="text-slate-500 mt-1">Choose from our premium selection of vehicles for your next journey.</p>
      </div>

      <CarFilters />

      {availableCars.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
          <p className="text-slate-500 font-medium">No cars available at the moment matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {availableCars.map((car: any) => (
            <CarCard key={car.id || car._id} car={car} />
          ))}
        </div>
      )}

 
        <div className="mt-8">
          <Pagination meta={meta} />
        </div>
     

    </div>
  );
};

export default AllCarsPage;