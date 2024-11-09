console.log("Esto se ejecuta antes de la tarea programada");
setTimeout(()=>{
    console.log("Esto se ejecuta despues de  5 segundos");
},5000)

setTimeout(()=>{
    console.log("Esto se ejecuta despuessss de 3 segundos");
},1)

setTimeout(()=>{
    console.log("Esto se ejecuta despues de 3 segundos");
},0)

console.log("Esto se ejecuta al final");