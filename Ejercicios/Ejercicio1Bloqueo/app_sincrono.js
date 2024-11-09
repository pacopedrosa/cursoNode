/**
 * @description Bloqueo de codigo sincrono
 * 
 */

//----------------------importaciones ---------------------

const fs = require('fs');



//----------------------Declaracion de variables ---------------------


//---------------------Declaracion de funciones ---------------------



//--------------------Ejecucion ---------------------
console.log("Esto se ejecuta en primer lugar");
const data = fs.readFileSync("./info.txt", "utf-8")
console.log("Data -->", data);
console.log("Esto se ejecuta al final");