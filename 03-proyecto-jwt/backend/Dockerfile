# Usar una imagen base de Node.js
FROM node:23-alpine

# Crear el directorio de la aplicación
WORKDIR /usr/src/app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto en el que corre la aplicación
EXPOSE 4000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]