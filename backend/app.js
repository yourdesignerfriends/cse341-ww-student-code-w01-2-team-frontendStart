const path = require('path'); // Aquí importo path para manejar rutas de archivos
const express = require('express'); // Aquí importo Express para crear el servidor
const mongodb = require('./db/connect'); // Aquí importo mi conexión a MongoDB
const professionalRoutes = require('./routes/professional'); // Aquí importo las rutas de la API

const port = process.env.PORT || 8080; // Aquí defino el puerto, usando variable de entorno si existe
const app = express(); // Aquí inicializo la app de Express

app
  .use(express.json()) // Aquí habilito el parseo de JSON en el body de las peticiones
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Aquí permito todas las peticiones desde cualquier origen
    next(); // Paso al siguiente middleware
  })
  .use(express.static(path.join(__dirname, '..', 'frontend'))) // Aquí sirvo los archivos estáticos del frontend
  .use('/professional', professionalRoutes); // Aquí uso las rutas de la API en /professional

// express.static(...) ya sirve el frontend completo y devuelve index.html en la raíz,
// por eso este app.get('/') es redundante
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html')); // Aquí envío el index.html cuando alguien entra a la raíz
// });

mongodb.initDb((err) => {
  if (err) {
    console.log(err); // Aquí muestro el error si la conexión a MongoDB falla
  } else {
    app.listen(port); // Aquí arranco el servidor cuando la DB está conectada
    console.log(`Connected to DB and listening on ${port}`); // Aquí confirmo que el servidor está corriendo
  }
});