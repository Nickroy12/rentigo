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
    const car = await getCar() as CarApiResponse;
    
    const totalCar: CarItem[] = car?.data || [];
    
    const availableCarsCount: number = totalCar.filter((item: CarItem) => item.isAvailable === "true").length;
    const pendingCarsCount: number = totalCar.filter((item: CarItem) => item.isAvailable === "pending").length;
    const rentCarsCount: number = totalCar.filter((item: CarItem) => item.isAvailable === "false").length;
    
    console.log(availableCarsCount, "Available Cars Count")
    console.log(pendingCarsCount, "Pending Cars Count")
    console.log(rentCarsCount, "Rent Cars Count")
    
  return (
    <AdminState 
      availableCount={availableCarsCount} 
      pendingCount={pendingCarsCount} 
      rentCount={rentCarsCount} 
     
      totalCount={totalCar.length} 
    />
  )
}

export default Admin