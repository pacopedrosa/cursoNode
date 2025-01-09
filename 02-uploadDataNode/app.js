//Import necesarios
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express(); //creamos express

// Para obtener la ruta del fichero actual
const __filename = fileURlToPath(import.meta.url); //obtenemos la ruta del fichero
const __dirname = path.dirname(__filename); //obtenemos el directorio del fichero

//middlerware para servir los archivos estaticos HTML, CSS, JS, IMG
app.use(express.static(path.join(__dirname, 'public'))); //indicamos que la carpeta public es estática

//asociarla carpeta para la subida de archivos en el endpoint /upload/files
app.use('/upload/files',);

//configuramos el puerto
const PORT = 3000;

//Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});