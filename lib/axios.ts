import axios from 'axios';

/**
 * This is the axios instance for the API.
 */
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3333/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'An unexpected error occurred.';

    return Promise.reject({ ...error, message });
  }
);
