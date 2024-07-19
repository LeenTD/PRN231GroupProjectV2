import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4001', // Đường dẫn của backend
});

export default axiosInstance;
