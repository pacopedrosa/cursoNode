# Proyecto Upload DATA en Node Js

## **1. Estructura del proyecto**

La estructura del proyecto sigue igual:

```bash
upload-project/
├── controllers/
│   └── uploadController.js
├── public/
│   └── index.html
├── routes/
│   └── uploadRoutes.js
├── uploads/
│   └── (aquí se guardarán los archivos subidos)
├── app.js
└── package.json
```

---

## **2. Implementación del proyecto**

### **2.1 Inicializa el proyecto**

Ejecuta estos comandos en la terminal:

```bash
mkdir upload-project
cd upload-project
npm init -y
```

### **2.2 Instala dependencias**

```bash
npm install express multer
```