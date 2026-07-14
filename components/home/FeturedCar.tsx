import { getCar } from '@/lib/api/allCar'
import { CarCard } from '@/ui/CarCard'
import React from 'react'

const FeaturedCar = async () => {
  const response = await getCar() 
  
  // 1. Safely extract the array. 
  // Adjust 'response.cars' or 'response.data' depending on your API's structure.
  const carList = Array.isArray(response) 
    ? response 
    : (response?.cars || response?.data || [])

  // 2. Now filter safely
  const excellent = carList.filter((item: any) => item.condition === "Excellent")

  // 3. Fallback UI if no cars are found
  if (!excellent.length) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-500">No excellent condition cars available right now.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
           <h1 className="text-4xl text-center md:text-6xl font-bold tracking-tight text-slate-900 mb-4">
          Feature Car
        </h1>
       
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {excellent.map((item: any) => (
          <CarCard key={item.id || item._id} car={item} />
        ))}
      </div>
    </div>
  )
}

export default FeaturedCar