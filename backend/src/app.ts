//Archivo para la logica de express;
<<<<<<< HEAD
import express from 'express';
import morgan from 'morgan';
import indexRouter from './routes/index';
import errorHandler from './middlewares/errorHandler';
import cors from "cors";
=======
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import indexRouter from "./routes/index";
>>>>>>> 985a617c41f270cdf585b86b66a535b89f29467d

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
<<<<<<< HEAD
app.use(morgan('dev')); // Para mostrar logs de peticiones HTTP
app.use(cors());
=======
app.use(morgan("dev")); // Para mostrar logs de peticiones HTTP

>>>>>>> 985a617c41f270cdf585b86b66a535b89f29467d
// Ruta básica para verificar que el servidor está funcionando
app.get("/", (req, res) => {
  res.send("Welcome to the E-commerce Backend!");
});

<<<<<<< HEAD
 
app.use('/', indexRouter); 

app.use(errorHandler);
=======
app.use("/", indexRouter);
>>>>>>> 985a617c41f270cdf585b86b66a535b89f29467d

export default app;
