// controllers/uploadController.js
import fs from "fs";
import multer from "multer";
import path from "path";

// Configuración de Multer: almacenamiento y nombres de archivo
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Carpeta donde se guardarán los archivos subidos
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: (req, file, cb) => {
    // Guardamos el archivo con un nombre único basado en la fecha y el nombre original
    // cb(null, `${Date.now()}-${file.originalname}`);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Controlador para subir archivo
export const uploadFile = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No se ha subido ningún archivo");
    }
    res.send(`Archivo subido con éxito: ${req.file.filename}`);
  } catch (error) {
    res.status(500).send("Error al subir archivo");
  }
};

// Controlador para listar los archivos subidos
export const listFiles = (req, res) => {
  const uploadDir = path.join(process.cwd(), "uploads");
  const recycledDir = path.join(process.cwd(), "recycled");
  
  try {
    const uploadedFiles = fs.readdirSync(uploadDir);
    const recycledFiles = fs.readdirSync(recycledDir);
    
    const uploadedSizes = uploadedFiles.map(file => ({
      name: file,
      size: fs.statSync(path.join(uploadDir, file)).size
    }));
    
    const recycledSizes = recycledFiles.map(file => ({
      name: file,
      size: fs.statSync(path.join(recycledDir, file)).size
    }));

    res.json({
      uploaded: uploadedSizes,
      recycled: recycledSizes,
      totalUploadSize: uploadedSizes.reduce((acc, file) => acc + file.size, 0),
      totalRecycledSize: recycledSizes.reduce((acc, file) => acc + file.size, 0)
    });
  } catch (error) {
    res.status(500).send("Error al listar archivos");
  }
};

// Controlador para mover un archivo a la papelera
export const moveToRecycled = (req, res) => {
  const fileName = req.params.fileName;
  const sourcePath = path.join(process.cwd(), "uploads", fileName);
  const destPath = path.join(process.cwd(), "recycled", fileName);

  try {
    fs.renameSync(sourcePath, destPath);
    res.send(`Archivo ${fileName} movido a la papelera`);
  } catch (error) {
    res.status(500).send(`Error al mover el archivo a la papelera: ${fileName}`);
  }
};

// Controlador para restaurar un archivo de la papelera
export const restoreFile = (req, res) => {
  const fileName = req.params.fileName;
  const sourcePath = path.join(process.cwd(), "recycled", fileName);
  const destPath = path.join(process.cwd(), "uploads", fileName);

  try {
    fs.renameSync(sourcePath, destPath);
    res.send(`Archivo ${fileName} restaurado`);
  } catch (error) {
    res.status(500).send(`Error al restaurar el archivo: ${fileName}`);
  }
};

// Controlador para vaciar la papelera
export const emptyRecycleBin = (req, res) => {
  const recycledDir = path.join(process.cwd(), "recycled");
  
  try {
    const files = fs.readdirSync(recycledDir);
    files.forEach(file => {
      fs.unlinkSync(path.join(recycledDir, file));
    });
    res.send("Papelera vaciada con éxito");
  } catch (error) {
    res.status(500).send("Error al vaciar la papelera");
  }
};

export { upload };
