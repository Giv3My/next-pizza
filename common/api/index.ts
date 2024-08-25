import axios from 'axios';
import { API_URL, LIQPAY_API_URL } from '../config';

export const api = axios.create({
  baseURL: API_URL,
});

export const liqPayApi = axios.create({
  baseURL: LIQPAY_API_URL,
});
