import { getAllRent } from '@/lib/api/allCar'
import React from 'react'

const Page = async () => {
  // ১. TypeScript এরর দূর করতে undefined কে as any দিয়ে পাস করা হচ্ছে 
  const rentData = await getAllRent(undefined as any)

  // ২. যদি এপিআই কোনো কারণে ফেইল করে বা নাল (null) রিটার্ন করে, তার সেফটি হ্যান্ডেলিং
  if (!rentData) {
    return (
      <div className="container mx-auto p-6 text-center text-red-500">
        Failed to load rental bookings. Please try again later.
      </div>
    )
  }

  // ৩. ডাটা একটি অবজেক্ট হলে সেটিকে অ্যারেতে কনভার্ট করে নেওয়া হচ্ছে সেফটি হিসেবে
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
            {bookings.map((booking, index) => {
              // টাইপ এরর ফিক্স: .$oid এবং .$date বাদ দিয়ে সরাসরি প্রোপার্টি ব্যবহার করা হয়েছে
              const bookingId = booking?._id || `booking-${index}`
              const dateString = booking?.createdAt

              return (
                <tr key={bookingId} className="hover:bg-gray-50">
                  {/* কাস্টমার নাম */}
                  <td className="px-6 py-4 font-medium text-gray-900 capitalize">
                    {booking?.name || 'N/A'}
                  </td>
                  
                  {/* ইমেইল ও ফোন */}
                  <td className="px-6 py-4">
                    <div className="text-gray-900">{booking?.phone || 'N/A'}</div>
                    <div className="text-xs text-gray-400">{booking?.email || ''}</div>
                  </td>
                  
                  {/* রুট (From -> To) */}
                  <td className="px-6 py-4 capitalize">
                    {booking?.fromDestination && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                        {booking.fromDestination}
                      </span>
                    )}
                    {booking?.fromDestination && booking?.toDestination && (
                      <span className="mx-2 text-gray-400">→</span>
                    )}
                    {booking?.toDestination && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                        {booking.toDestination}
                      </span>
                    )}
                  </td>
                  
                  {/* পিকআপ ডেট ও টাইম */}
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{booking?.pickupDate || 'N/A'}</div>
                    <div className="text-xs text-gray-400">{booking?.pickupTime || ''}</div>
                  </td>
                  
                  {/* কার্ড স্ট্যাটাস (True/False Badge) */}
                  <td className="px-6 py-4">
                    {String(booking?.cardStatus) === 'true' ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                        Inactive
                      </span>
                    )}
                  </td>
                  
                  {/* বুকিং সৃষ্টির সময় */}
                  <td className="px-6 py-4 text-xs text-gray-400">
                    {dateString ? (
                      new Date(dateString).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    ) : (
                      'N/A'
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page