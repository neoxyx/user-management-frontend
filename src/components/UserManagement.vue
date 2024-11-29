<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Cabecera -->
    <header class="flex items-center justify-between bg-blue-600 p-4 text-white">
      <h1 class="text-lg font-bold">Gestión de Usuarios</h1>
      <button
        @click="logout"
        class="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm"
      >
        Cerrar Sesión
      </button>
    </header>

    <div class="p-6">
      <!-- Botón de Añadir Usuario -->
      <div class="mb-4">
        <button
          @click="showAddUserForm = !showAddUserForm"
          class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
        >
          {{ showAddUserForm ? "Cancelar" : "Añadir Usuario" }}
        </button>
      </div>

      <!-- Tabla de Usuarios -->
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr class="bg-gray-200">
              <th class="py-2 px-4 text-left text-gray-700">Nombre</th>
              <th class="py-2 px-4 text-left text-gray-700">Apellido</th>
              <th class="py-2 px-4 text-left text-gray-700">Email</th>
              <th class="py-2 px-4 text-left text-gray-700">Teléfono</th>
              <th class="py-2 px-4 text-center text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="border-t hover:bg-gray-100">
              <td class="py-2 px-4">{{ user.nombre }}</td>
              <td class="py-2 px-4">{{ user.apellido }}</td>
              <td class="py-2 px-4">{{ user.email }}</td>
              <td class="py-2 px-4">{{ user.telefono }}</td>
              <td class="py-2 px-4 text-center space-x-2">
                <button
                  @click="editUser(user)"
                  class="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg"
                >
                  Editar
                </button>
                <button
                  @click="confirmDeleteUser(user.id)"
                  class="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Formulario de Añadir Usuario -->
      <div v-if="showAddUserForm" class="mt-6 p-4 bg-white rounded-lg shadow-lg">
        <h2 class="text-xl font-bold text-gray-700 mb-4">Nuevo Usuario</h2>
        <form @submit.prevent="addUser" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-600">Nombre:</label>
            <input
              type="text"
              v-model="newUser.nombre"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Apellido:</label>
            <input
              type="text"
              v-model="newUser.apellido"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600"
              >Correo Electrónico:</label
            >
            <input
              type="email"
              v-model="newUser.email"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Teléfono:</label>
            <input
              type="text"
              v-model="newUser.telefono"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Contraseña:</label>
            <input
              type="password"
              v-model="newUser.password"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              @input="validatePassword"
              required
            />
            <span v-if="passwordError" class="text-sm text-red-500">
              {{ passwordError }}
            </span>
          </div>
          <button
            type="submit"
            class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            :disabled="passwordError"
          >
            Agregar Usuario
          </button>
        </form>
      </div>

      <!-- Formulario de Editar Usuario -->
      <div v-if="showEditUserForm" class="mt-6 p-4 bg-white rounded-lg shadow-lg">
        <h2 class="text-xl font-bold text-gray-700 mb-4">Editar Usuario</h2>
        <form @submit.prevent="updateUser" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-600">Nombre:</label>
            <input
              type="text"
              v-model="editUserForm.nombre"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Apellido:</label>
            <input
              type="text"
              v-model="editUserForm.apellido"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600"
              >Correo Electrónico:</label
            >
            <input
              type="email"
              v-model="editUserForm.email"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Teléfono:</label>
            <input
              type="text"
              v-model="editUserForm.telefono"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Actualizar Usuario
          </button>
          <button
            @click="showEditUserForm = !showEditUserForm"
            class="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            {{ showEditUserForm ? "Cancelar" : "" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../axios"; // Importamos la configuración de Axios
import Swal from "sweetalert2";

export default {
  data() {
    return {
      users: [], // Lista de usuarios
      showAddUserForm: false, // Mostrar/ocultar formulario de agregar usuario
      showEditUserForm: false, // Mostrar/ocultar formulario de editar usuario
      newUser: {
        // Datos para el nuevo usuario
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        password: "",
      },
      editUserForm: {
        // Datos del usuario que se va a editar
        id: null,
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
      },
      passwordError: null, // Validación para la contraseña
    };
  },
  mounted() {
    this.getUsers(); // Cargar usuarios al montar el componente
  },
  methods: {
    // Obtener lista de usuarios
    async getUsers() {
      try {
        const response = await api.get("/users", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        this.users = response.data;
      } catch (error) {
        console.error("Error al obtener usuarios", error);
      }
    },

    // Eliminar un usuario
    async deleteUser(userId) {
      try {
        await api.delete(`/users/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        this.getUsers(); // Actualizar la lista
      } catch (error) {
        console.error("Error al eliminar el usuario", error);
      }
    },

    async confirmDeleteUser(userId) {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás deshacer esta acción.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        try {
          await this.deleteUser(userId); // Llama al método de eliminar
          Swal.fire("¡Eliminado!", "El usuario ha sido eliminado.", "success");
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar el usuario.", "error");
        }
      }
    },
    // Validar contraseña
    validatePassword() {
      if (this.newUser.password.length < 8) {
        this.passwordError = "La contraseña debe tener al menos 8 caracteres.";
      } else {
        this.passwordError = null;
      }
    },

    // Agregar un nuevo usuario
    async addUser() {
      if (this.passwordError) return;

      try {
        const response = await api.post("/users", this.newUser, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        this.users.push(response.data); // Agregar el nuevo usuario a la lista
        this.showAddUserForm = false;
        this.newUser = {
          nombre: "",
          apellido: "",
          email: "",
          telefono: "",
          password: "",
        }; // Resetear formulario
      } catch (error) {
        console.error("Error al agregar el usuario", error);
      }
    },

    // Cargar datos del usuario a editar
    editUser(user) {
      this.editUserForm = { ...user }; // Clonar los datos del usuario seleccionado
      this.showEditUserForm = true;
      this.showAddUserForm = false; // Asegurarse de ocultar el formulario de añadir
    },

    // Actualizar un usuario
    async updateUser() {
      try {
        const response = await api.put(
          `/users/${this.editUserForm.id}`,
          this.editUserForm,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );

        // Actualizar la lista de usuarios con los datos nuevos
        const index = this.users.findIndex((user) => user.id === response.data.id);
        if (index !== -1) this.users.splice(index, 1, response.data);

        this.showEditUserForm = false;
        this.editUserForm = {
          id: null,
          nombre: "",
          apellido: "",
          email: "",
          telefono: "",
        }; // Resetear formulario
      } catch (error) {
        console.error("Error al actualizar el usuario", error);
      }
    },
    // Cerrar sesión
    logout() {
      localStorage.removeItem("token"); // Eliminar el token del almacenamiento local
      window.location.href = "/"; // Redirigir a la página de inicio de sesión
    },
  },
};
</script>
