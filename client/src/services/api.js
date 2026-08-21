import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('vasana_user');
    if (user) {
      const parsed = JSON.parse(user);
      if (parsed.token) {
        config.headers.Authorization = `Bearer ${parsed.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    // Detect HTML fallback string returned by Vercel SPA rewrite and reject to trigger fallback datasets
    if (typeof response.data === 'string' && (response.data.trim().startsWith('<!') || response.data.trim().startsWith('<html'))) {
      return Promise.reject(new Error('Backend API unreachable in standalone mode'));
    }
    return response;
  },
  (error) => {
    const customError = error.response?.data?.message || 'Server error. Please check your connection.';
    return Promise.reject(new Error(customError));
  }
);

export default api;
