import express from 'express';
import { createReservaHandler, deleteReservaByIdHandler, getAllReservasHandler, getReservaByIdHandler } from '../controller/reservasController.js';

//Tengo que crear un enrutador 

const router = express.Router();

//Todas las operaciones y rutas disponibles
//get

router.get('/:id', getReservaByIdHandler);
router.post('/', createReservaHandler);
router.delete('/:id', deleteReservaByIdHandler);
//GetAll
router.get('/', getAllReservasHandler);

export default router;