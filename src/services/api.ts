import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
});

// Check for token on initial load
const token = localStorage.getItem('authToken');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Add a response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token is invalid or expired
      localStorage.removeItem('authToken');
      delete api.defaults.headers.common['Authorization'];
      // Redirect to login page. We do a hard refresh to clear all state.
      // Adjusted for HashRouter.
      if (!window.location.hash.includes('/login')) {
        window.location.href = '/#/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
