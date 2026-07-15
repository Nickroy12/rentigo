import React from 'react'
import Image from 'next/image'
import { Eye } from 'lucide-react'
import Link from 'next/link';
import { ConfirmDelete } from '@/ui/Confirm';
import UpdateAvailable from '@/ui/UpdateAvailable';
import { getAllCars } from '@/lib/api/allCar';
import { Pagination } from '@/ui/Pagination';

interface Car {
  id: string | number;
  _id?: string | number;
  title: string;
  condition: string;
  hiringPrice: number | string;
  image: string;
  isAvailable: string; 
}

interface PageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

const CarManagement = async ({ searchParams }: PageProps) => {
  // ১. ইউআরএল থেকে কারেন্ট পেজ বের করা
  const resolvedSearchParams = await searchParams;
  const currentPage = resolvedSearchParams.page ? parseInt(resolvedSearchParams.page) : 1;

  // ২. পেজিনেশন কোয়েরিসহ এপিআই কল করা (লিমিট ৮ রাখা হয়েছে)
  const carsResponse = await getAllCars({
    page: currentPage,
    limit: 8
  });

  // ৩. ডাটা এবং মেটাডাটা সেফটি চেক
// ৩. ডাটা এবং মেটাডাটা সেফটি চেক
const cars = (Array.isArray(carsResponse?.data) ? carsResponse.data : []) as unknown as Car[];
  const meta = carsResponse?.meta || { page: 1, limit: 8, total: 0, totalPages: 1 };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Car Management</h1>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-600">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Vehicle
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Condition
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Availability
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Hiring Price
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cars && cars.length > 0 ? (
              cars.map((car) => {
                const carId = car._id || car.id;
                const status = car.isAvailable;

                return (
                  <tr key={carId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="flex items-center space-x-4">
                        <div className="relative h-12 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-100 bg-gray-50">
                          <Image
                            src={car.image || '/placeholder-car.jpg'}
                            alt={car.title}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <span className="font-semibold text-gray-900">{car.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                        car.condition === 'Excellent' 
                          ? 'bg-gray-950 text-white' 
                          : 'bg-blue-600 text-white'
                      }`}>
                        {car.condition}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                        status === 'true' ? 'bg-emerald-600 text-white' :
                        status === 'pending' ? 'bg-zinc-900 text-white' : 
                        'bg-gray-500 text-white'
                      }`}>
                        {status === 'true' ? 'Available' : status === 'pending' ? 'Pending' : 'Rented'}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${car.hiringPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link href={`/rentals/Details/${carId}`}
                          title="View Details"
                          className="p-2 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        <UpdateAvailable car={car}/>
                        <ConfirmDelete car={car} />
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">
                  No cars found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

       <Pagination meta={meta} />
    </div>
  )
}

export default CarManagement;