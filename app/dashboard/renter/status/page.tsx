import { createRentalBooking } from '@/lib/action/rent'
import { getRent } from '@/lib/api/allCar'
import { getUserSession } from '@/lib/core/session'
import AdminChart from '@/ui/AdminChart';
import React from 'react'

interface CarItem {
  cardStatus: string;
  [key: string]: any;
}

const RenterState = async () => {
  const user = await getUserSession()
  
  if (!user?.email) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-gray-500">
        Please log in to view your rental stats.
      </div>
    )
  }

  const rent = await getRent(user.email)
  const totalCar = rent.length 
  
  const pendingCarsCount: number = rent.filter((item: CarItem) => item.cardStatus === "pending").length;
  const availableCarsCount: number = rent.filter((item: CarItem) => item.cardStatus === "true").length;
    const data =({
      totalCar: totalCar || 0,
      pendingCar: pendingCarsCount,
      totalHiredCar: availableCarsCount,
      serverStatus: 'Healthy',
    });
  
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Rental Overview</h2>
      
      {/* কার্ড গ্রিড লেআউট */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* ১. টোটাল কার কার্ড */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow duration-200">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Cars</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1">{totalCar}</h3>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl">
            {/* কার আইকন */}
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
        </div>

        {/* ২. পেন্ডিং কার কার্ড */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow duration-200">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Pending Approval</p>
            <h3 className="text-3xl font-bold text-yellow-600 mt-1">{pendingCarsCount}</h3>
          </div>
          <div className="p-3 bg-yellow-50 rounded-xl">
            {/* ঘড়ি বা পেন্ডিং আইকন */}
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* ৩. একটিভ/এভেইলএবল কার কার্ড */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow duration-200">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider font-semibold">Active Cars</p>
            <h3 className="text-3xl font-bold text-green-600 mt-1">{availableCarsCount}</h3>
          </div>
          <div className="p-3 bg-green-50 rounded-xl">
            {/* টিক বা একটিভ আইকন */}
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

      </div>
      <AdminChart data={data}/>
    </div>
  )
}

export default RenterState