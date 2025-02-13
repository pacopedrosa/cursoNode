// routes/uploadRoutes.js
import { Router } from "express";
import {
  upload,
  uploadFile,
  listFiles,
  moveToRecycled,
  restoreFile,
  emptyRecycleBin
} from "../controllers/uploadController.js";

const router = Router();

// Middleware para manejar errores específicos de las rutas
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Ruta para subir archivo
router.post("/", upload.single("file"), asyncHandler(uploadFile));

// Ruta para listar los archivos subidos
router.get("/", asyncHandler(listFiles));

// Ruta para mover un archivo a la papelera
router.post("/:fileName/recycle", asyncHandler(moveToRecycled));

// Ruta para restaurar un archivo de la papelera
router.post("/:fileName/restore", asyncHandler(restoreFile));

// Ruta para vaciar la papelera
router.delete("/recycle", asyncHandler(emptyRecycleBin));

export default router;
