import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // nginx proxies /api to backend
  timeout: 10000
});

export default api;

