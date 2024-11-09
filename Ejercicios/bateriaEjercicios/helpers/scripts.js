//Ejercicio1
//usa el modulo fs para crear el archivo llamado datos1.txt y que almacene la informacion lorem....

const fs = require('fs');
const Ejercicio1 = (textToSave) => {
    fs.writeFile('datos1.txt', textToSave, (err) => {
        if (err) throw err;
        console.log('Archivo creado!');
    })
}

//https://jsonplaceholder.typicode.com/posts

//Ejercicio2
//Lee el archivo datos1.txt y muestra su contenido por consola con access

const Ejercicio2 = (archivo) => {
    archivo = 'datos2.txt';
    fs.access(archivo, fs.K_OK, (err) =>{
        if(err) throw err
        fs.readFile(archivo, 'utf8', (err, data) => {
            if (err) throw err;
            console.log('Contenido del archivo:', data);
        });
    });
};

//Ejercicio3
//Renombra datos1.txt a datos2.txt
const Ejercicio3 = (archivo) => {
archivo = 'datos2.txt';
fs.rename('datos1.txt',archivo, (err) => {
    if (err) throw err;
    console.log('Archivo renombrado!');
})
}

//Ejercicio4
//Elmininar archivo datos2.txt

const Ejercicio4 = (archivo) => {
    archivo = 'datos2.txt';
    fs.rm('datos2.txt', {recursive: true}, (err) => {
        if (err) throw err;
        console.log('Archivo eliminado!');
    })
}


//Ejercicio5
//Crea una carpeta llamada datos y dentro de ella crea un archivo llamado info.txt 
//y que muestre informacion del sistema operativo

const os = require('os');
const path = require('path');

const Ejercicio5 = (carpeta, archivo, textToSave) => {
    carpeta = 'datos';
    archivo = 'datos.txt';
    textToSave = os.arch();
    
    fs.mkdir(carpeta,{recursive : true},(err) => {
        if (err) throw err;
        console.log('Carpeta creada!');

        const filePath = path.join(carpeta,archivo);

        fs.writeFile(filePath, textToSave, (err) => {
            if (err) throw err;
            console.log('Archivo creado!');
        })
    })
}


//Ejercicio6
//Utilizando la variable del fichero usuarios.js
//se pide: crear un fichero llamado usuarios.txt que guarde los post de los usuarios con id 1 y 2

const Ejercicio6 = (archivo, fichero) => {
    fichero = 'usuarios.txt';
    const users = require('./data/usuarios.js');
    archivo = users;

    const post = jsonData.post;

    const recorrido = post.forEach(post => {
        console.log('id: ' + post.id);
    });

    fs.writeFile(fichero, recorrido, 'utf8', (err, data) => {
        if (err) throw err;
        console.log('Archivo creado!');
    });
}


//Ejercicio7
//Utilizando la variable del fichero usuarios.js
//se pide: crear una funcion que le pase como parametro un id de usuario 
//y devuelva los post del usuario
//ademas creará un fichero llamado usuario_id.txt con los post del usuario












module.exports = {Ejercicio6};