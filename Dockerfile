# Usa una imagen base de Node.js en Alpine
FROM node:16-alpine

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos de tu aplicación
COPY ./src .

# Copia los archivos de configuración de npm
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Expone el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación con nodemon
CMD ["npx", "nodemon", "index.js"]
