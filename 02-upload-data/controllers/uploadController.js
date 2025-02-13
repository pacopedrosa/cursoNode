// controllers/uploadController.js
import fs from "fs";
import multer from "multer";
import path from "path";
import fsPromises from 'fs/promises';

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
  try {
    const fileName = decodeURIComponent(req.params.fileName);
    console.log("Moviendo archivo:", fileName);

    const sourcePath = path.join(process.cwd(), "uploads", fileName);
    const destPath = path.join(process.cwd(), "recycled", fileName);

    // Verificar si el archivo existe
    if (!fs.existsSync(sourcePath)) {
      console.log("Archivo no encontrado:", sourcePath);
      return res.status(404).json({
        error: true,
        message: `El archivo ${fileName} no existe`
      });
    }

    // Asegurar que el directorio recycled existe
    if (!fs.existsSync('recycled')) {
      fs.mkdirSync('recycled', { recursive: true });
    }

    // Copiar el archivo y luego eliminarlo en lugar de usar rename
    fs.copyFileSync(sourcePath, destPath);
    fs.unlinkSync(sourcePath);
    
    console.log("Archivo movido exitosamente");
    
    res.json({
      success: true,
      message: `Archivo ${fileName} movido a la papelera`
    });
  } catch (error) {
    console.error("Error al mover archivo:", error);
    res.status(500).json({
      error: true,
      message: error.message
    });
  }
};

// Controlador para restaurar un archivo de la papelera
export const restoreFile = (req, res) => {
  try {
    const fileName = decodeURIComponent(req.params.fileName);
    console.log("Restaurando archivo:", fileName);

    const sourcePath = path.join(process.cwd(), "recycled", fileName);
    const destPath = path.join(process.cwd(), "uploads", fileName);

    // Verificar si el archivo existe
    if (!fs.existsSync(sourcePath)) {
      console.log("Archivo no encontrado:", sourcePath);
      return res.status(404).json({
        error: true,
        message: `El archivo ${fileName} no existe`
      });
    }

    // Asegurar que el directorio uploads existe
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads', { recursive: true });
    }

    // Copiar el archivo y luego eliminarlo en lugar de usar rename
    fs.copyFileSync(sourcePath, destPath);
    fs.unlinkSync(sourcePath);
    
    console.log("Archivo restaurado exitosamente");
    
    res.json({
      success: true,
      message: `Archivo ${fileName} restaurado`
    });
  } catch (error) {
    console.error("Error al restaurar archivo:", error);
    res.status(500).json({
      error: true,
      message: error.message
    });
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
