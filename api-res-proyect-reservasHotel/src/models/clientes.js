//Todo lo que pongamos aqui será lo encargado en gestionar la relacion con Database

import db from "./database.js";

//Creacion de un cliente
export const createClient = (nombre, email, callback) => {
    //Insercion en la Database de un cliente 
    const sql = `INSERT INTO clientes (nombre, email) VALUES (?,?)`;
    const params = [nombre, email];
    db.run(sql, params, function(err){
        callback(err, {id:this.LastID});
    })
}

export const getAllClientes = (callback) => {
    const sql = `SELECT * FROM clientes`;
    db.all(sql,[],function(err, rows){
        callback(err, rows)
    })
}


export const getClientById = (id, callback) => {
    const sql = `SELECT * FROM clientes WHERE id = ?`;
    const params = [id];
    db.get(sql,params, function(err, rows){
        callback(err, rows)
    })
}

export const deleteCliente = (id, callback) => {
    const sql = `DELETE FROM clientes WHERE id = ?`;
    db.run(sql, [id], function(err, rows){
        callback(err, { changes: this.changes })
    });
};

export const updateCliente = (id, nuevoNombre, nuevoEmail, callback) => {
    const sql = `UPDATE clientes SET nombre=?, email=? WHERE id =?`;
    const params = [nuevoEmail, nuevoEmail, id]
    db.run(sql, params, function(err, rows){
        callback(err, { changes: this.changes })
    })
}