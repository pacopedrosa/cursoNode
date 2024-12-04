import { createReseva, deleteReservaById, getAllReservas, getReservaById, updateReserva } from "../models/reservas.js"

export const getAllReservasHandler = (req, res) => {
    //llamar a la funcion en SQLITE3 que se traiga todas las reservas
    getAllReservas((err, rows)=> {
        if(err){
            res.status(500).json({error: err.message})
        }else{
            res.status(200).json(rows);
        }
    })
}

export const getReservaByIdHandler = (req, res) => {
    const { id } = req.params;
    //llamar a la funcion en SQLITE3 que se traiga la reserva por id
    getReservaById(id, (err, rows)=> {
        if(err){
            res.status(500).json({error: err.message})
        }else if(!rows){
            res.status(404).json({error: "Reserva no encontrada"})
        }else{
            res.status(200).json(rows);
        }
    })
}

export const createReservaHandler = (req, res) => {
    const { idCliente, fechaEntrada, fechaSalida } = req.body;
    //llamar a la funcion en SQLITE3 que se crea la reserva
    createReseva(idCliente, fechaEntrada, fechaSalida, (err, result)=> {
        if(err){
            res.status(500).json({error: err.message})
        } else{
            res.status(201).json(result);
        }
    })
}

export const deleteReservaByIdHandler = (req, res) => {
    const { id } = req.params;
    //llamar a la funcion en SQLITE3 que se elimina la reserva por id
    deleteReservaById(id, (err, result)=> {
        if (err){
            res.status(500).json({error:message});
        } else if (result.changes === 0){
            res.status(404).json({error: 'Reserva no encontrada'});
        }else{
            res.status(204).json(result);
        }
    })
}