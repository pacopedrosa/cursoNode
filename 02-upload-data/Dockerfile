FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Crear directorios y establecer permisos
RUN mkdir -p uploads recycled && \
    chown -R node:node /app && \
    chmod -R 777 /app/uploads && \
    chmod -R 777 /app/recycled

USER node

EXPOSE 3000

CMD ["npm", "start"]