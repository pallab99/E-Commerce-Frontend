import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://urban-daily-backend.onrender.com/api',
});

export default instance;