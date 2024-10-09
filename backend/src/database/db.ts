import { Sequelize, DataTypes, Model } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, PORT } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${PORT}/${DB_NAME}`, {
  logging: false,
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida correctamente.");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
}


export { DataTypes, Model, testConnection};
export default sequelize;
