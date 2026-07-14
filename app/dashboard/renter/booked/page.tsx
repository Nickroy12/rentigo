import { getCar, getRent } from '@/lib/api/allCar'
import { getUserSession } from '@/lib/core/session'
import { redirect } from 'next/navigation'
import Link from 'next/link' // ১. Link কম্পোনেন্ট ইমপোর্ট করা হয়েছে
import React from 'react'

const RentPage = async () => {
  const user = await getUserSession()

  // ইউজার লগইন না থাকলে রিডাইরেক্ট
  if (!user?.email) {
    redirect('/login') 
  }

  // ডাটা ফেচিং
  const data = await getRent(user.email)
  const allCarsData = await getCar() 

  // getCar() এর ডাটা অ্যারে কিনা তা নিশ্চিত করা 
  const carsList = Array.isArray(allCarsData) 
    ? allCarsData 
    : (allCarsData?.cars || allCarsData?.data || [])

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Rentals</h1>
      
      {data && data.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {data.map((rentItem: any) => {
            // রেন্টাল ডাটার 'carId' এর সাথে কার ডাটার '_id' মিলিয়ে ফিল্টার করা হচ্ছে
            const matchingCar = carsList.find((car: any) => car._id === rentItem.carId)

            // সেফটি চেক: গাড়ি খুঁজে না পেলে রেন্টাল আইডিও ব্যবহার করা যাবে না ক্র্যাশ এড়াতে
            const detailLink = matchingCar?._id ? `/rentals/Details/${matchingCar._id}` : '#'

            return (
              // ২. div-এর পরিবর্তে Link কম্পোনেন্ট ব্যবহার করে ক্লিকেবল করা হয়েছে
              <Link 
                href={detailLink} 
                key={rentItem._id} 
                className="border rounded-xl shadow-md bg-white overflow-hidden flex flex-col justify-between hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              >
                
                {/* গাড়ির ইমেজ সেকশন */}
                <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center">
                  {matchingCar?.image ? (
                    <img 
                      src={matchingCar.image} 
                      alt={matchingCar?.name || 'Car'} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 flex flex-col items-center">
                      <span className="text-4xl">🚗</span>
                      <p className="text-xs mt-1">No Image Available</p>
                    </div>
                  )}
                </div>

                {/* গাড়ির তথ্যের সেকশন */}
                <div className="p-5 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      {/* ম্যাচিং হওয়া গাড়ির আসল নাম */}
                      <h2 className="font-bold text-xl text-gray-900">
                        {matchingCar?.title || rentItem.title || 'Unknown Vehicle'}
                      </h2>
                      {matchingCar?.condition && (
                        <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-2.5 py-0.5 rounded mt-1">
                          {matchingCar.condition}
                        </span>
                      )}
                    </div>
                    
                    {/* গাড়ির এভেইলেবিলিটি বা প্রাইস */}
                    <div className="text-right">
                    <p className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded mt-1 ${
  matchingCar?.isAvailable === "pending" 
    ? "bg-yellow-50 text-yellow-600" 
    : matchingCar?.isAvailable === "false" 
      ? "bg-green-50 text-green-600" 
      : "bg-red-50 text-red-600"
}`}>
  {matchingCar?.isAvailable === "pending" ? "Pending" : matchingCar?.isAvailable === "false" ? "Accept" : "Rejected"}
</p>
          
                    </div>
                  </div>

                  {/* বুকিং বা রেন্টালের অতিরিক্ত তথ্য */}
                  <div className="border-t pt-3 mt-4 grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div>
                      <p className="text-xs text-gray-400">Rental ID</p>
                      <p className="font-mono text-xs text-gray-700 truncate">{rentItem._id}</p>
                    </div>
                    {rentItem.pickupDate && (
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Booked Date</p>
                        <p className="text-xs text-gray-700">{rentItem.pickupDate}</p>
                      </div>
                    )}
                  </div>
                </div>

              </Link>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed rounded-xl bg-gray-50">
          <p className="text-gray-500 text-lg">You don't have any active rentals right now.</p>
        </div>
      )}
    </div>
  )
}

export default RentPage