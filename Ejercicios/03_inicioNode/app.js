/**
 * Ejemplo de una calculadora
 */

//------------------ Forma antigua ----------------------
//const miCalculadora = require('./helpers/scripts');
//console.log(miCalculadora); //Me printea el objeto calculadora
//console.log(miCalculadora.sumar(2,3)); // 5


//------------------ Forma nueva ----------------------
const { sumar, restar, multiplicar, dividir, modulo } = require('./helpers/scripts');
console.log("suma: " + sumar(2,3));
console.log("resta: " + restar(3,2)); 
console.log("Multiplicar: " + multiplicar(2,3));
console.log("division: " + dividir(4,2));
console.log("moudulo: " + modulo(6,3));