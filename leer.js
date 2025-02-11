const fs = require("fs");

// Leer estadísticas de un archivo
fs.stat("indice.md", (err, stats) => {
  if (err) throw err;
  console.log("Estadísticas del archivo:", stats);
});
