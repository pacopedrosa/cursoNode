import express from 'express';
import { productDB } from '../data/dataBase.js';

//1. Creamos un router
const router = express.Router();

//2. Definimos las rutas
router.get('/', (req, res) => {
    //Retorno todos los productos
    if(productDB.length === 0) {
        return res.status(404).json({ error: 'No hay productos en la base de datos' });
    }
    res.json(productDB);
})

//3. Creamos la ruta GET para obtener un producto por id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    if(isNaN(id)) {
        return res.status(404).json({ error: 'No existe ese producto' });
    }
    const productId = productDB.filter(product => product.id === parseInt(id));
    if(productId.length === 0){
        return res.status(404).json({ error: 'Product not found!'})
    }
    res.json(productId);
})

//4. Hacer el delete y el post

// router.delete('/:id', (req, res) => {
//     const { id } = req.params;
// })

export default router;