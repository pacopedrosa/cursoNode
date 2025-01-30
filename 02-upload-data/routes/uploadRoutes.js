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

// Ruta para subir archivo
router.post("/", upload.single("file"), uploadFile);

// Ruta para listar los archivos subidos
router.get("/", listFiles);

// Ruta para mover un archivo a la papelera
router.post("/:fileName/recycle", moveToRecycled);

// Ruta para restaurar un archivo de la papelera
router.post("/:fileName/restore", restoreFile);

// Ruta para vaciar la papelera
router.delete("/recycle", emptyRecycleBin);

export default router;
