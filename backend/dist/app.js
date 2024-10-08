"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Archivo para la logica de express;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev')); // Para mostrar logs de peticiones HTTP
// Ruta básica para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce Backend!');
});
app.use('/', index_1.default);
exports.default = app;
