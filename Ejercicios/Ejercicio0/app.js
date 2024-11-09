/**
 * @author Paco 
 * @description Hola mundo en js
 */



//-------------------------Declaracion de variables ---------------------------------



//------------------------ Declaracion de funciones --------------------------------


const saludo = (mensaje = "Usuario") => {
    console.log(` Hola ${mensaje}!!`);
}

//------------------------- Ejecucion --------------------------------

saludo(); // Imprime: Hola Usuario!!
saludo("Mundo"); // Imprime: Hola Mundo!!
saludo("paco"); // Imprime: Hola paco!!

