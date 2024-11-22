<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
      <h2 class="text-2xl font-bold text-gray-700 text-center mb-4">Iniciar Sesión</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-600"
            >Correo Electrónico</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-600"
            >Contraseña</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Iniciar Sesión
        </button>
      </form>
      <p class="mt-4 text-sm text-center text-gray-600">
        ¿No tienes cuenta?
        <a href="#" class="text-blue-500 hover:underline">Regístrate aquí</a>
      </p>
    </div>
  </div>
</template>

<script>
import api from "../axios";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await api.post("/login", {
          email: this.email,
          password: this.password,
        });
        const token = response.data.token;
        localStorage.setItem("token", token);
        this.$router.push("/user-management"); // Redirige a la página de usuarios
      } catch (error) {
        console.error("Error al iniciar sesión", error);
        alert("Credenciales incorrectas.");
      }
    },
  },
};
</script>

<style>
/* Si necesitas estilos adicionales, agrégalos aquí */
</style>
