import { BASE_URL } from '@/Constants/constants';
import axios from 'axios';
const instance = axios.create({
  baseURL: BASE_URL,
});

export default instance;
