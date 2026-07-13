'use server'

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server"

// This matches the exact shape sent by finalCarData
export interface FinalCarPayload {
  title: string;
  description: string;
  condition: 'Excellent' | 'Good' | 'Fair';
  isAvailable: 'true' |  'Pending' | 'false';
  hiringPrice: number; // Converted to number via parseFloat
  rating: number;      // Converted to number via parseFloat
  image: string;       // Added from ImgBB url
}

export interface CarResponse extends FinalCarPayload {
  id: string;
  createdAt: string;
}

export const addCar = async (newCar: FinalCarPayload): Promise<CarResponse> => {
  return serverMutation<CarResponse>('/api/car', newCar);
};
export const updateCarAvailability = async (id: string, data: { isAvailable: boolean | string }): Promise<any> => {
  const res = await serverMutation(`/api/car/${id}`, data, 'PATCH');
  

 
  
  return res;
};