"use server";


import { serverMutation } from "../core/server";


interface RentalData {
  name: string;
  email: string;
  phone?: string;
  fromDestination?: string;
  toDestination?: string;
  pickupDate?: string;
  pickupTime?: string;
  message?: string;
  carId?: string;
}

export async function createRentalBooking(data: RentalData) {
  const result = await serverMutation<any, RentalData>("/api/rent", data, "POST");
  


  return result;
}