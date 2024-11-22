// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '../components/UserLogin.vue';
import UserManagement from '../components/UserManagement.vue'; // Esta vista la crearemos más adelante

const routes = [
    {
        path: '/',
        name: 'login',
        component: UserLogin,
    },
    {
        path: '/user-management',
        name: 'user-management',
        component: UserManagement,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
