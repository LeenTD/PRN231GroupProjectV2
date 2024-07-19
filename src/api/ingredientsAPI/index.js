import axios from 'axios'

const API_URL = 'http://localhost:3000/api/ingredients/ingredient/';

export const fetchAllIngredients = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    // axios sẽ trả kết quả về qua property của nó là data
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching ingredients', error);
    throw error;
  }
};

// Cập nhật một ingredients
export const updateIngredientById = async (id, discountCodeData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, discountCodeData);
    return response.data;
  } catch (error) {
    console.error('Error updating ingredients', error);
    throw error;
  }
};

// Xóa một discount code
export const deleteIngredientById = async (id) => {
  try {
    console.log(`${API_URL}/${id}`);
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting discount code:', error);
    throw error;
  }
};


export const createIngredient = async data => {
  try {
    console.log(data);
    const response = await axios.post(API_URL, JSON.stringify(data) ,{
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating recipe:", error);
    throw error;
  }
};