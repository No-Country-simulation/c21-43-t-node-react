// src/index.ts
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Inicializar dotenv para usar variables de entorno
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev')); // Para mostrar logs de peticiones HTTP

// Puerto desde variables de entorno o un puerto por defecto
const PORT = process.env.PORT || 3000;

// Ruta básica para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce Backend!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});