import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
    // config.headers['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7';
    // config.headers['Content-Type'] = `application/json`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;
