import dotenv from 'dotenv';
import app from './app';
import sequelize from './database/db';
import './models/associations';

dotenv.config();
const PORT = 3000;

const startServer = async () => {
  try {
    await sequelize.sync({ force: true });
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor", error);
  }
};

startServer();
