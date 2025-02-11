import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";

// Cargar variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();

// Middleware para permitir CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error conectando a MongoDB:", err));

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
