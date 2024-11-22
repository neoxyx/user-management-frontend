// src/axios.js
import axios from 'axios';

// Aquí debes poner la URL de tu API de Laravel
const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Cambia esto según la URL de tu API
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
