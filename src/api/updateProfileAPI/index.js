import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users/api/admin/profile';

// Fetch the admin profile
export const fetchAdminProfile = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching admin profile:', error);
    throw error;
  }
};

// Update the admin profile
export const updateAdminProfile = async (token, profileData) => {
  try {
    const response = await axios.put(API_URL, profileData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating admin profile:', error);
    throw error;
  }
};
