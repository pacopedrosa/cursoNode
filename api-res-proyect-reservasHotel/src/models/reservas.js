// Hacer crear reserva, getAllReservas, getReservaById, deleteReservaById y updateReserva

import db from "./database.js"

export const createReseva = (idCliente, fechaEntrada, fechaSalida, callback) => {
    const sql = `INSERT INTO reservas (cliente_id, fecha_entrada, fecha_salida) VALUES (?,?,?)`;
    const params = [idCliente, fechaEntrada, fechaSalida];
    db.run(sql, params, function(err){
        callback(err, {id:this.lastID});
    });
}


export const getAllReservas = (callback) => {
    const sql = `SELECT * FROM reservas`;
    db.all(sql, [], function(err, rows){
        callback(err, rows);
    });
}

export const getReservaById = (id, callback) => {
    const sql = `SELECT * FROM reservas WHERE id = ?`;
    db.get(sql, [id], function(err, row){
        callback(err, row);
    });
}

export const deleteReservaById = (id, callback) => {
    const sql = `DELETE FROM reservas WHERE id = ?`;
    db.run(sql, [id], function(err){
        callback(err);
    });
}


export const updateReserva = (id, fecha_entrada, fecha_salida, callback) => {
    const sql = `UPDATE reservas SET fecha_entrada=? fecha_salida=? WHERE id=?`;
    const params = [fecha_entrada, fecha_salida, id];
    db.run(sql, params, function(err, rows){
        callback(err, { changes: this.changes })
    })
}