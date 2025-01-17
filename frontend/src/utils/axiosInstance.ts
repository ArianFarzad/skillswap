import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token && !config.headers['Authorization']) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// for token refresh
const refreshInstance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry // to prevent infinite-loops
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await refreshInstance.post('/api/auth/refresh');

        const newToken = refreshResponse.data.token;
        localStorage.setItem('token', newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('token');
        window.location.href = '/login'; // Force reload to login page
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
