import axios from 'axios'

const API_URL = 'http://localhost:3000/api/ingredients/discount-code';

export const fetchAllDiscountCodes = async () => {
  try {
    const response = await axios.get(API_URL);
    // axios sẽ trả kết quả về qua property của nó là data
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching discount codes:', error);
    throw error;
  }
};

// Lấy chi tiết một discount code
export const fetchDiscountCodeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching discount code:', error);
    throw error;
  }
};

// Tạo mới một discount code
export const createDiscountCode = async (discountCodeData) => {
  try {
    const response = await axios.post(API_URL, discountCodeData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating discount code:', error);
    throw error;
  }
};

// Cập nhật một discount code
export const updateDiscountCodeById = async (id, discountCodeData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, discountCodeData);
    return response.data;
  } catch (error) {
    console.error('Error updating discount code:', error);
    throw error;
  }
};

// Xóa một discount code
export const deleteDiscountCodeById = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting discount code:', error);
    throw error;
  }
};