import axios from 'axios'

const API_URL = 'http://localhost:3000/api/posts/posts/';

export const fetchAllPostByAuthorId= async (id) => {
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