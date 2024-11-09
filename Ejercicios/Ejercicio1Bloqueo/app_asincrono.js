/**
 * @description Bloqueo de codigo asincrono
 * 
 */

//----------------------importaciones ---------------------

const fs = require('fs');



//----------------------Declaracion de variables ---------------------


//---------------------Declaracion de funciones ---------------------



//--------------------Ejecucion ---------------------
console.log("Esto se ejecuta en primer lugar");
const data = fs.readFile("./info.txt", "utf-8", (err, data) => {
    return err ? console.error(err) : console.log("Data -->", data);
    
})
console.log("Data -->", data);
console.log("Esto se ejecuta al final");