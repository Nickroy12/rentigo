import { getCar, getRent } from '@/lib/api/allCar'
import { getUserSession } from '@/lib/core/session'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import React from 'react'

// টাইপ ডেফিনিশন (আপনার ব্যাকএন্ড ডাটার সাথে মিলিয়ে নিতে পারেন)
interface RentItem {
  _id: string
  carId: string
  cardStatus?: string
  isAvailable?: string
  title?: string
  pickupDate?: string
}

interface CarItem {
  _id: string
  title?: string
  name?: string
  image?: string
  condition?: string
  isAvailable?: string
}

const RentPage = async () => {
  const user = await getUserSession()

  // ইউজার লগইন না থাকলে রিডাইরেক্ট
  if (!user?.email) {
    redirect('/login')
  }

  // প্যারালাল ডাটা ফেচিং (পারফরম্যান্স আরও ফাস্ট করার জন্য)
  const [rentDataFetched, allCarsData] = await Promise.all([
    getRent(user.email),
    getCar(''),
  ])

  const rent: RentItem[] = Array.isArray(rentDataFetched) ? rentDataFetched : []

  const carsList: CarItem[] = Array.isArray(allCarsData)
    ? allCarsData
    : (allCarsData?.cars || allCarsData?.data || [])

  // 🚀 পারফরম্যান্স অপ্টিমাইজেশন: O(1) লুকআপের জন্য কার লিস্টকে ম্যাপে রূপান্তর
  const carMap = new Map<string, CarItem>()
  carsList.forEach((car) => {
    if (car._id) carMap.set(car._id, car)
  })

  // স্ট্যাটিস্টিকস হিসাব করা
  const totalCar = rent.length

  // ফিল্টারিং সেকশন — no explicit param type here, let TS infer from `rent: RentItem[]`
  const pendingCarsCount = rent.filter(
    (item) => item.cardStatus === 'pending' || item.isAvailable === 'pending'
  ).length

  const availableCarsCount = rent.filter(
    (item) => item.cardStatus === 'true' || item.isAvailable === 'false'
  ).length

  const statsData = {
    totalCar: totalCar || 0,
    pendingCars: pendingCarsCount || 0,
    availableCars: availableCarsCount || 0,
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* স্ট্যাটস বা কাউন্টার কার্ডস */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
          <p className="text-sm text-blue-600 font-medium">Total Rented</p>
          <p className="text-2xl font-bold text-blue-900">{statsData.totalCar}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 text-center">
          <p className="text-sm text-yellow-600 font-medium">Pending</p>
          <p className="text-2xl font-bold text-yellow-900">{statsData.pendingCars}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center">
          <p className="text-sm text-green-600 font-medium">Accepted</p>
          <p className="text-2xl font-bold text-green-900">{statsData.availableCars}</p>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Rentals</h1>

      {rent.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {rent.map((rentItem) => {
            // 🚀 ওয়ান-ক্লিকে ম্যাপ থেকে কার ডাটা রিড করা হচ্ছে (খুবই ফাস্ট)
            const matchingCar = carMap.get(rentItem.carId)
            const detailLink = matchingCar?._id ? `/rentals/Details/${matchingCar._id}` : '#'

            return (
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
                      <h2 className="font-bold text-xl text-gray-900">
                        {matchingCar?.title || rentItem.title || 'Unknown Vehicle'}
                      </h2>
                      {matchingCar?.condition && (
                        <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-2.5 py-0.5 rounded mt-1">
                          {matchingCar.condition}
                        </span>
                      )}
                    </div>

                    {/* গাড়ির এভেইলেবিলিটি বা স্ট্যাটাস */}
                    <div className="text-right">
                      <p
                        className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded mt-1 ${
                          matchingCar?.isAvailable === 'pending'
                            ? 'bg-yellow-50 text-yellow-600'
                            : matchingCar?.isAvailable === 'false'
                            ? 'bg-green-50 text-green-600'
                            : 'bg-red-50 text-red-600'
                        }`}
                      >
                        {matchingCar?.isAvailable === 'pending'
                          ? 'Pending'
                          : matchingCar?.isAvailable === 'false'
                          ? 'Accept'
                          : 'Rejected'}
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