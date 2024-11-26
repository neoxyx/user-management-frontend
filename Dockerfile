# Etapa 1: Construcción
FROM node:18-alpine AS build-stage

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Etapa 2: Servidor web
FROM nginx:stable-alpine AS production-stage

# Copia los archivos construidos en la etapa anterior
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copia un archivo de configuración personalizado de Nginx (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto en el que Nginx está configurado para escuchar
EXPOSE 80

# Comando por defecto para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
