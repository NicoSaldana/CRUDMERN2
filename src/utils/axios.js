import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Asegúrate de que esta URL es correcta
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
