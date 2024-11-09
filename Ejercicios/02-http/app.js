/**
 * creacion de un servidor http en web
 * utilidad:
 * - Responder a solicitudes web
 * - Realizar peticiones web, pudiendo funcionar como cliente
 */

const http = require('http');

//creacion del servidor

const serverHlanz = http.createServer((req,res) =>{
    //la funcion que ejecutamos aqui se realiza para cada solicitud  que hagamos
    res.statusCode = 200; //todo ok
    res.setHeader('Content-Type', 'text/plain'); // <-- establece el tipo de contenido 
    res.end("Bienvenido a mi servidor"); // <-- Respuesta que envia el servidor
    
});

const serverHlanz2 = http.createServer((req,res) =>{
    //la funcion que ejecutamos aqui se realiza para cada solicitud  que hagamos
    res.statusCode = 200; //todo ok
    res.setHeader('Content-Type', 'text/plain'); // <-- establece el tipo de contenido 
    res.end("Bienvenido a mi servidor"); // <-- Respuesta que envia el servidor
    
});

// const serverHlanz = http.createServer((req, res) => {
//     // configurar el tipo de respuesta
//     res.writeHead(200, { 'Content-Type': 'text/plain'});
//     res.write("Bienvenido a mi servidor de http con node"); // <-- escribir el contenido de la respuesta
//     res.end(); // termina la respuesta
// })

//puerto del servidor

const port = 3000;

const port2 = 3001;

// Hacemos que el servidor escuche en el puerto que le hemos indicado
serverHlanz.listen(port, () =>{
    console.log(`Servidor ejecutandose a través de la direccion http://localhost:${port}`);
});

serverHlanz2.listen(port2, () =>{
    console.log(`Servidor ejecutandose a través de la direccion http://localhost:${port2}`);
});