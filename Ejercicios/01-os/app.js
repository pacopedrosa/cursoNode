const os = require('os');

const { infoSO } = require("./src/helpers/scripts.js");

console.clear();
//console.log(`La arquitectura de tu sistema es: ${os.arch()}`); // <-- Arquitectura de tu sistema
//console.log(`La plataforma de tu sistema es: ${os.platform()}`); // <-- Plataforma de tu sistema
//console.log(`La plataforma de tu sistema es: ${infoSO()[0].value}`);
// ${JSON.stringify(infoSO()).split(":")[2]}


/*for(let i = 0; i < infoSO.length; i++){
    console.log(`La plataforma de tu sistema es: ${JSON.stringify(infoSO()).split(":")[i]} y el nombre: ${JSON.stringify(infoSO()).split(":")[i]}}`);
}
*/

infoSO().forEach(({name,value}) => {
    if(name === "CPUs"){
        console.log(`${JSON.stringify(value)}`);
    }
    console.log(`${name} -> ${value}`);
})