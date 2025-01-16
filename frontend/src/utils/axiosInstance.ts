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
          const refreshResponse = await axiosInstance.post('api/auth/refresh');

          const newToken = refreshResponse.data.token;
          localStorage.setItem('token', newToken);

          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          // TODO add navigation to login page 16/01/2025, yb
          return axiosInstance(originalRequest);
        } catch (err) {
          localStorage.removeItem('token');
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
);

export default axiosInstance;
