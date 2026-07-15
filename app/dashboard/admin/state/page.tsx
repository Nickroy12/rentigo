import React from 'react'
import AdminState from './AdminState'
import { getCar } from '@/lib/api/allCar'

interface CarItem {
  _id?: string | number;
  name?: string;
  isAvailable: "true" | "false" | "pending" | string;
}

interface CarApiResponse {
  data?: CarItem[];
}

const Admin = async () => {
  // Pass an empty string to satisfy the 'string | number' type requirement
  const car = await getCar("") as CarApiResponse;
  
  const totalCar: CarItem[] = car?.data || [];
  
  const availableCarsCount: number = totalCar.filter((item: CarItem) => item.isAvailable === "true").length;
  const pendingCarsCount: number = totalCar.filter((item: CarItem) => item.isAvailable === "pending").length;
  const rentCarsCount: number = totalCar.filter((item: CarItem) => item.isAvailable === "false").length;
  
  const simulatedTotalUsers = 0; 
  
  return (
    <AdminState 
      availableCount={availableCarsCount} 
      pendingCount={pendingCarsCount} 
      rentCount={rentCarsCount} 
      totalCount={totalCar.length} 
      totalUsersCount={simulatedTotalUsers}
    />
  )
}

export default Admin