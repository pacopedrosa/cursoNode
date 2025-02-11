/*
* Ejemplo uso
*/
const a = 2000;
console.log("Esto se muestra en primer lugar");
setTimeout(()=> {
	console.log("Estoy en el timeOut")
},a);
console.log("Ejemplo fuera");
