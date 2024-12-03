import express from 'express';
import productsRoutes from './routes/products.js';
// creamos la instancia de express

const app = express();

// usamos el middleware para que nuestro servidor pueda entender json
app.use(express.json());

//rutas que podemos usar 
app.use('/api/products', productsRoutes)

//puerto al que se va correr el server
const PORT = 3000;
app.listen(PORT, () =>{
    console.log(`Server running on http://localhost:${PORT}`); 
})