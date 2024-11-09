const http = require('http');

//creamos el servidor web

const serverHlanz = http.createServer((req, res) => {
    const url = req.url; //<-- capturamos la url que le cliente nos a solicitado al server
    if(url === '/'){
        res.setStatusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hola Mundo desde Node.js!\n');
    }else if(url === '/about'){
        res.setStatusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Estas en el apartado de about</h1>');
    }else{
        res.setStatusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Pagina no encontrada\n');
    }
    
})

//Defino un puerto

const port = 3000;

//Defino el puerto y asocio el puerto al escuchador 

serverHlanz.listen(port, () => {
    console.log(`Server escuchando en http//:localhost:${port}`);
})