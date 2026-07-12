import { getAllCar } from '@/lib/api/allCar'
import React from 'react'
import Image from 'next/image'
// Import the required Lucide icons
import { Eye, Edit3, Trash2 } from 'lucide-react'
import Link from 'next/link';

interface Car {
  id: string | number;
  title: string;
  condition: string;
  hiringPrice: number | string;
  image: string;
  isAvailable: boolean; // Added isAvailable property
}

const CarManagement = async () => {
  const cars: Car[] = await getAllCar()

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
              // Note: Using [...cars].reverse() instead of cars.reverse() to avoid mutating the original array directly in rendering
              [...cars].reverse().map((car) => (
                <tr key={car.id} className="hover:bg-gray-50 transition-colors">
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
                  {/* New Availability Column Cell */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                      car.isAvailable 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-950 text-white'
                    }`}>
                      {car.isAvailable ? 'Available' : 'Rented'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${car.hiringPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      {/* View Button */}
                      <Link href={`/rentals/Details/${car._id}`}
                        title="View Details"
                        className="p-2 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>

                      {/* Update Button */}
                      <button 
                        title="Update Car"
                        className="p-2 text-blue-600 rounded-md hover:bg-amber-50 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      {/* Delete Button */}
                      <button 
                        title="Delete Car"
                        className="p-2 text-blue-600 rounded-md hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
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
    </div>
  )
}

export default CarManagement