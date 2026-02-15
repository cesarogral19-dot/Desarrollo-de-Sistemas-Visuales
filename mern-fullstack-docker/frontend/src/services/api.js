import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

console.log(
  "%c🚀 API CONFIGURADA EN: " + API_URL,
  "color: yellow; background: black; font-size: 15px"
);

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
