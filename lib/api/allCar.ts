'use server'

import { serverMutation, serverFetch } from "../core/server"

export interface FinalCarPayload {
  title: string;
  description: string;
  condition: 'Excellent' | 'Good' | 'Fair';
  isAvailable: boolean;
  hiringPrice: number;
  rating: number;
  image: string;
}

export interface CarResponse extends FinalCarPayload {
  id: string; 
  createdAt: string;
}

export const getCarById = async (carId: string | number): Promise<CarResponse> => {
  const response = await serverFetch<CarResponse>(`/api/car/${carId}`);
  return response as CarResponse;
};

// ২. সব গাড়ি গেট করার অ্যাকশন (GET)
export const getAllCar = async () => {
  return serverFetch<CarResponse[]>('/api/car');
};