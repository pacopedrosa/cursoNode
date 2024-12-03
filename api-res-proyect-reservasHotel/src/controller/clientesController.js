import { createClient, deleteCliente, getAllClientes, getClientById } from "../models/clientes.js"

// export const getClientesHandler = (req, res) => {
    
// }

export const getAllClientesHandler = (req, res) => {
    //llamar a la funcion en SQLITE3 que se traiga todos los clientes
    getAllClientes((err, rows)=> {
        if(err){
            res.status(500).json({error: err.message})
        }else{
            res.status(200).json(rows);
        }
    })
}

export const createClienteHandler = (req, res) => {
    const { nombre, email } = req.body;
    createClient(nombre, email, (err, result) => {
        if(err){
            res.status(500).json({error: err.message})
        }else{
            res.status(201).json(result);
        }
    })
}

export const deleteClienteHandler = (req, res) => {
    const { id } = req.params;
    //creamos la funcion para hacer el delete 
    deleteCliente(id, (err, result) => {
        if (err){
            res.status(500).json({error:message});
        } else if (result.changes === 0){
            res.status(404).json({error: 'Cliente no encontrado'});
        }else{
            res.status(204).json(result);
        }
    })
}


export const getClienteByIdHandler = (req, res) => {
    const { id } = req.params;

    getClientById(id, (err, rows) => {
        if(err){
            res.status(500).json({error:message});
        } else if(!rows){
            res.status(404).json({error:"Cliente no encontrado"});
        }else{
            res.status(200).json(rows);
        }
    })
}