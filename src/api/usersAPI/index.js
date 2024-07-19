import axios from 'axios'

const API_URL = 'http://localhost:4003';

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-all-users`);
    // axios sẽ trả kết quả về qua property của nó là data
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Lấy chi tiết một discount code
export const fetchUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/get-user/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Xóa một discount code
export const deleteUserById = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete-user/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const signIn = async (formDataObject) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signin`, formDataObject);
    return response.data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};