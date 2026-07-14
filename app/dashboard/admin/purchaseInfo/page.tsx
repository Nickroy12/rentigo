import { getAllRent, getRent } from '@/lib/api/allCar'
import React from 'react'

const Page = async () => {
  // এপিআই থেকে রেন্টাল বুকিং ডাটা নিয়ে আসা হচ্ছে
  const rentData = await getAllRent()

  // যদি ডাটা একটি অবজেক্ট হয়, তাহলে সেটিকে অ্যারেতে কনভার্ট করে নেওয়া হচ্ছে সেফটি হিসেবে
  const bookings = Array.isArray(rentData) ? rentData : [rentData]

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Car Rental Bookings</h1>
      
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 font-semibold">
            <tr>
              <th scope="col" className="px-6 py-4">Customer</th>
              <th scope="col" className="px-6 py-4">Contact</th>
              <th scope="col" className="px-6 py-4">Route</th>
              <th scope="col" className="px-6 py-4">Pickup Date & Time</th>
              <th scope="col" className="px-6 py-4">Card Status</th>
              <th scope="col" className="px-6 py-4">Created At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {bookings.map((booking) => (
              <tr key={booking._id.$oid} className="hover:bg-gray-50">
                {/* কাস্টমার নাম */}
                <td className="px-6 py-4 font-medium text-gray-900 capitalize">
                  {booking.name}
                </td>
                
                {/* ইমেইল ও ফোন */}
                <td className="px-6 py-4">
                  <div className="text-gray-900">{booking.phone}</div>
                  <div className="text-xs text-gray-400">{booking.email}</div>
                </td>
                
                {/* রুট (From -> To) */}
                <td className="px-6 py-4 capitalize">
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                    {booking.fromDestination}
                  </span>
                  <span className="mx-2 text-gray-400">→</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                    {booking.toDestination}
                  </span>
                </td>
                
                {/* পিকআপ ডেট ও টাইম */}
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{booking.pickupDate}</div>
                  <div className="text-xs text-gray-400">{booking.pickupTime}</div>
                </td>
                
                {/* কার্ড স্ট্যাটাস (True/False Badge) */}
                <td className="px-6 py-4">
                  {booking.cardStatus === 'true' ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                      Inactive
                    </span>
                  )}
                </td>
                
                {/* বুকিং সৃষ্টির সময় */}
                <td className="px-6 py-4 text-xs text-gray-400">
                  {new Date(booking.createdAt.$date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page