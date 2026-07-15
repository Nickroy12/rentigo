import { serverFetch } from "../core/server";

// রেসপন্স টাইপ সেফটির জন্য ইন্টারফেস (ঐচ্ছিক কিন্তু রিকমেন্ডেড)
interface ICar {
  _id: string;
  brand: string;
  model: string;
  price: number;
  createdAt: string;
  // আপনার গাড়ির অন্যান্য ফিল্ড এখানে যুক্ত করতে পারেন
}

interface ApiResponse<T> {
  success: boolean;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: T[];
}

// এই অবজেক্টের মাধ্যমে ফ্রন্টএন্ড থেকে ফিল্টার অপশন পাঠানো যাবে
interface IFetchCarsQuery {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
export interface IRentData {
  cardStatus?: string
  _id: string;
  email: string;
  createdAt: string; // Dates are transferred as ISO strings over HTTP JSON
  [key: string]: any; 

}

// মূল এপিআই কলিং ফাংশন
export const getAllCars = async (queryParams: IFetchCarsQuery = {}) => {
  const params = new URLSearchParams();

  // ডায়নামিকভাবে কুয়েরি প্যারামিটারগুলো যুক্ত করা
  if (queryParams.search) params.append('search', queryParams.search);
  if (queryParams.sortBy) params.append('sortBy', queryParams.sortBy);
  if (queryParams.sortOrder) params.append('sortOrder', queryParams.sortOrder);
  
  // page এবং limit থাকলে সেগুলোকে string-এ কনভার্ট করে পাঠানো
  if (queryParams.page) params.append('page', queryParams.page.toString());
  if (queryParams.limit) params.append('limit', queryParams.limit.toString());

  // কুয়েরি স্ট্রিং তৈরি করা (যেমন: ?search=toyota&limit=8)
  const queryString = params.toString() ? `?${params.toString()}` : '';

  // আপনার serverFetch ব্যবহার করে কল করা
  return await serverFetch<ApiResponse<ICar>>(`/api/car${queryString}`);
};
export const getCarById = async (carId: string | number): Promise<CarResponse> => {
  const response = await serverFetch<CarResponse>(`/api/car/${carId}`);
  return response as CarResponse;
};
export const getCar = async (carId: string | number): Promise<CarResponse> => {
  const response = await serverFetch<CarResponse>(`/api/car`);
  return response as CarResponse;
};
export const getRent = async (subId: string): Promise<IRentData[]> => {
  const data = await serverFetch<IRentData[]>(`/api/rent?sub_id=${subId}`);
  
  // Safety check since serverFetch returns {} on failure
  return Array.isArray(data) ? data : [];
};
export const getAllRent = async (subId: string): Promise<IRentData[]> => {
  const data = await serverFetch<IRentData[]>(`/api/rent`);
  
  // Safety check since serverFetch returns {} on failure
  return Array.isArray(data) ? data : [];
};