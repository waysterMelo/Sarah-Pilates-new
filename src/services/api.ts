import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
});

// Check for token on initial load
const token = localStorage.getItem('authToken');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;
