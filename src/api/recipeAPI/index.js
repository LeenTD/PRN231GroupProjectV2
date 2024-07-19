import axios from "axios";

const API_URL = "http://localhost:3000/api/recipes";

export const fetchAllRecipes = async () => {
  try {
    const response = await axios.get(API_URL);
    // Lưu ý: axios sẽ trả kết quả về qua property của nó là data
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching discount codes:", error);
    throw error;
  }
};

// Lấy chi tiết một discount code
export const fetchRecipeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    throw error;
  }
};

// Tạo mới một discount code
export const createRecipe = async recipeData => {
  try {
    const response = await axios.post(API_URL, recipeData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating recipe:", error);
    throw error;
  }
};

// Cập nhật một discount code
export const updateRecipeById = async (id, recipeData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, recipeData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating recipe:', error);
    throw error;
  }
};

// Xóa một discount code
export const deleteRecipeById = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw error;
  }
};
