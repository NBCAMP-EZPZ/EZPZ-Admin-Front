import axiosInstance from './axiosInstance';

// 팝업 목록을 가져오는 API
export const getPopups = async (approvalStatus = 'all', page = 0) => {
  try {
    const params = approvalStatus === 'all' ? { page } : { approvalStatus, page };
    const response = await axiosInstance.get('/api/v1/popups', { params });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// 팝업 상세 정보를 가져오는 API
export const getPopupDetail = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/v1/popups/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// 팝업을 승인, 반려하는 API
export const approvePopup = async (id,status) => {
  try {
    const response = await axiosInstance.patch(`/api/v1/popups/${id}?approval=${status}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};