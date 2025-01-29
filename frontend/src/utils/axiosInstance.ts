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
        localStorage.setItem('myUserId', refreshResponse.data.userId);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        const retriedResponse = await axiosInstance(originalRequest);

        // Automatically redirect if a token was refreshed successfully
        const redirectPath =
          new URLSearchParams(window.location.search).get('redirect') ||
          '/profile';

        if (redirectPath) {
          window.location.href = redirectPath;
        }

        return retriedResponse;
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
