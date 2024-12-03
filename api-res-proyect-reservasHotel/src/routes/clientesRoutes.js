import express from 'express';
import { createClienteHandler, deleteClienteHandler, getAllClientesHandler, getClienteByIdHandler} from '../controller/clientesController.js';

//Tengo que crear un enrutador 

const router = express.Router();

//Todas las operaciones y rutas disponibles
//get

router.get('/:id', getClienteByIdHandler);
router.post('/', createClienteHandler);
router.delete('/:id', deleteClienteHandler);
//GetAll
router.get('/', getAllClientesHandler);

export default router;