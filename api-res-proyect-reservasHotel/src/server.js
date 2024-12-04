import express from 'express';
import { PORT } from './config/config.js';
import clientesRoutes from './routes/clientesRoutes.js'
import reservasRoutes from './routes/reservasRoutes.js'

//creamos una app de tipo express
const app = express();

//indico el tipo de dato que voy a escribir
app.use(express.json());

//rutas
app.use("/api/clientes", clientesRoutes);
app.use("/api/reservas", reservasRoutes);

//arrancar el server
app.listen(PORT, () => {
    console.log(`Server ejecutandose en la url http://localhost:${PORT}...`);
})