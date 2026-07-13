'use server'
import { serverMutation } from "../core/server";

interface DeleteResponse {
  message: string;
}

export const handleDeleteCar = async (carId: string): Promise<DeleteResponse> => {
  const result = await serverMutation<DeleteResponse>(
    `/api/car/${carId}`, 
    {}, 
    'DELETE'
  );
  return result;
};