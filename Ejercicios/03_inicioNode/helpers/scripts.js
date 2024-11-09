
/**
 * @description : Calculadora
 * @param {Number} numero1 
 * @param {Number} numero2 
 * @returns {Number}
 */

const sumar=(numero1=0,numero2=0)=>{

    return numero1+numero2;
}

const restar=(numero1=0,numero2=0)=>{
    return numero1-numero2;
}

const multiplicar=(numero1=0,numero2=0)=>{
    return numero1*numero2;
}

const dividir=(numero1,numero2)=>{
    //return b ? a / b : "Error: Division por cero";
    return numero2 === 0? "Error: Division por cero" : numero1 / numero2;
}

const modulo = (numero1,numero2)=>{
    //return b ? a % b : "Error: Division por cero";
    return numero2 === 0? "Error: Division por cero" : numero1 % numero2;
}

// Exportacion con ************* COmmon JS ********************************
//module.exports = {sumar, restar, multiplicar, dividir, modulo};


/*
const Calculadora = { 
    sumar: sumar,
    restar: restar,
    multiplicar: multiplicar,
    dividir: dividir,
    modulo: modulo
};
*/

const Calculadora = { 
    sumar,
    restar,
    multiplicar,
    dividir,
    modulo
}

module.exports = Calculadora; 