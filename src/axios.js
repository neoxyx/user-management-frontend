// src/axios.js
import axios from 'axios';

// Aquí debes poner la URL de tu API de Laravel
const api = axios.create({
    baseURL: 'https://user-management-api-production-1981.up.railway.app/api', // Cambia esto según la URL de tu API
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
