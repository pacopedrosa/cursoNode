import dotenv from 'dotenv';

dotenv.config(); // carga las variables de entorno de .env en process.env

export const PORT = process.env.PORT || 3000; // puerto en el que se ejecuta la API
export const DATABASE_PATH = process.env.DATABASE_PATH || './database/hotel.sqlite'; // ruta del archivo de la base de datos





