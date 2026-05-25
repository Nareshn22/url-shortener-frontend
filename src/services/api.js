import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Automatically inject JWT token into headers for protected routes
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signup: (userData) => API.post('/auth/signup', userData),
  login: (credentials) => API.post('/auth/login', credentials),
};

export const urlAPI = {
  getAll: () => API.get('/urls'),
  shorten: (longUrl) => API.post('/urls/shorten', { longUrl }),
  delete: (id) => API.delete(`/urls/${id}`),
  getAnalytics: (id) => API.get(`/urls/${id}/analytics`),
};

export default API;