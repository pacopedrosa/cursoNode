//aqui vamos a gestionar todas las rutas que permiran subir archivos 
//usando ./controllers/uploadController.js
import { Router } from 'express';
import { upload, uploadFile, listFile, deleteFile } from '../controllers/uploadController.js'; //importamos las funciones del controlador

const router = Router();

//ruta para subir archivo
router.post("/", uploadFile);

//ruta para listar archivo
router.get("/", listFile);

//ruta para eliminar archivo
router.delete("/:filename", deleteFile);

export default router; //exportamos el router