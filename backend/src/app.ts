//Archivo para la logica de express;
import express from 'express';
import morgan from 'morgan';
import indexRouter from './routes/index';


const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev')); // Para mostrar logs de peticiones HTTP

// Ruta básica para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce Backend!');
});


app.use('/', indexRouter); 


export default app;

