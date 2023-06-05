import Axios from 'axios';
import { API_URL } from '@constants/index';

const API = Axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json'
  }
});

export default API;
