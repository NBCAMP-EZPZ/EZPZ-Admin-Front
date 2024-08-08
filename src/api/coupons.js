import axiosInstance from './axiosInstance';

export const createCoupon = async (couponData) => {
  try {
    const response = await axiosInstance.post('/api/v1/coupons', couponData);
    return response.data;
  } catch (error) {
    throw error;
  }
};