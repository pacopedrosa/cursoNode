//logica para la configuracion de Multer: almacenamiento, eliminacion de archivos

import multer from 'multer'; //importamos multer
import path from 'path'; //importamos path
import fs from 'fs'; //importamos fs

//configuramos multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        //carpeta donde se guardaran los archivos
        cb(null, path.join(process.cwd(), 'uploads'));
    },
    filename: (req, file, cb) => {
        //nombre del archivo
        // cb(null, "el_que_quiero_dar_al_fichero");
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({ storage }); //creamos el objeto upload

//funcion para subir archivo
export const uploadFile = (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).send("Por favor suba un archivo");
        }
        res.status(200).send("Archivo subido correctamente");
        
    } catch (error) {
        // res.status(500).json({ message: error.message });
        res.status(500).send( "Error al subir el archivo" );
    }
}