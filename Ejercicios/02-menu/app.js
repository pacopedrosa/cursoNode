const colors = require("colors/safe");
const fs = require("fs");
const readline = require("readline-sync");


/**
 * @description Programa que permita manejar la E/S de una data usuarios.json a traves de un menu
 * La data sera: {nombre: String, edad: Number}
 * El programa permitira:
 * - Agregar usuarios
 * - Listar usuarios
 * - Salir
 * 
 * Buscar un usuario por nombre
 * Eliminar uun usuario por nombre
 * Dependencias: colors, chalk, js, readline-sync
 */


//console.log(chalk.bgGreen("Bienvenido el programa de manejo de usuarios"));
//console.log(colors.green("Hola mundo"));

//----------------Declaracion de variables------------------------------------------------
//const url =  import.meta.env.FILE_NAME_DATA;
const FILE_NAME_DATA = ".data/usuarios.json";
//---------------Declaracion de funciones--------------------------------

function agregarUser(){
    //debe pedir el nombre de un usuario
    //Si el usuario ya existe, debe mostar un mensaje de error
    //Si no existe, debe pedir la edad del usuario
    //Guardar el usuario en el archivo usuarios.json
    console.clear();
    const nombre = readline.question(colors.blue("Ingrese el nombre del usuario: "));
    if(nombre==""){
        console.log(colors.red("El usuario esta vacio"));
        return;
    }  
    //aqui debo de buscar el nombre en la data
    if(searchUser(nombre)){
        console.log(colors.red("El usuario ya existe"));
        return;
    }

    const edad = readline.questionInt(colors.blue("Ingrese la edad del usuario: "));
    if (edad <= 0) {
        console.log(colors.red("La edad debe ser mayor a 0"));
        return;
    }
    //Crear el objeto del usuario e insertarlo
    const newUserData = {
        username: nombre,
        edad: edad
    }

    const oldUsers = loadDataJson();
    oldUsers.push(newUserData);

    //guardar la data en el disco porque esta en un array

    saveDataJson(oldUsers);

}


function loadDataJson(){
    try{
    if(!fs.existsSync(FILE_NAME_DATA)){
        return [];
    }
    const data = fs.readFileSync(FILE_NAME_DATA, 'utf-8');
    return JSON.parse(data);
    }catch(error){
        console.error("Error al leer el fichero de usuarios", error);
        return [];
    }
}


function saveDataJson(){

    try{
        fs.writeFileSync(FILE_NAME_DATA, JSON.stringify(data), "utf-8");
        console.log("Archivo guardado!");
    }catch(error){
        console.error("Error al guardar el fichero de usuarios", error);
    }
}


function listUsers(){

    const users = loadDataJson();
    console.clear(); // limpiar consola
    console.log(colors.green("======================"));
    console.log(colors.green("Listado de usuarios"));
    users.forEach(user => {
        console.log(`Nombre: ${user.username}, Edad: ${user.edad}`);
    });
}

function searchUser(nameFind){    
    //LLamo a la funcion loadDataJson
    const users = loadDataJson();
    return users.find((user) => user.username === nameFind) || null;

}


function deleteUser(){

    console.clear();
    const nombre = readline.question(colors.blue("Ingrese el nombre del usuario a eliminar: "));
    if(nombre == ""){
        console.log(colors.red("El nombre esta vacio"));
        return;
    }
    const user = searchUser(nombre);
    if(!user){
        console.log(colors.red("El usuario no existe"));
        return;
    }
    const users = loadDataJson();
    users.forEach(user => {
        if(user.username === nombre){
            users.splice(users.indexOf(user.username), 1);
            saveDataJson(users);
            console.log(colors.green("usuario eliminado correctamente"));
            return;
        }
    })
}

function menu(){
console.clear(); // limpiar consola
console.log(colors.green("======================"));
console.log(colors.green("Aplicion de usuarios"));
console.log(colors.green("1. Agregar usuario"));
console.log(colors.green("2. Listar usuarios"));
console.log(colors.green("3. Buscar usuario"));
console.log(colors.green("4. Eliminar usuario"));
console.log(colors.green("5. Salir"));
const option = readline.questionInt(colors.yellow("Seleccione un opcion: (1,2,3)"))

switch(option){
    case 1:
        agregarUser();
        break;
    case 2:
        listUsers();
        break;
    case 3:
        deleteUser();
        break;
    case 4:
        searchUser();
        break;
    case 5:
        console.log(colors.green("Saliendo..."));
        process.exit();
        break;
    default:
        console.log(colors.red("Opcion invalida"));
        menu();
        break;
}
}

//--------------------------------Inicio app--------------------------------

menu();