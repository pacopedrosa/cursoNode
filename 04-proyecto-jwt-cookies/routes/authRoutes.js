import express from 'express';
import { login, logout, register } from '../controller/authController.js';


const router = express.Router();
//Rutas de autenticacion
// /login /register /logout

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);

//Aqui tendreis que añadir las rutas que faltan

export default router;
