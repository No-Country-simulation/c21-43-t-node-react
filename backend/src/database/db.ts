import { Sequelize, DataTypes, Model } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

//BASE DE DATOS LOCAL
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, PORT, DB_URI } = process.env;

// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${PORT || 5432}/${DB_NAME}`,
//   {
//     logging: false,
//   }
// );

//BASE DE DATOS RAILWAY
const sequelize = new Sequelize(`${DB_URI}`, {
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

export { DataTypes, Model, testConnection };
export default sequelize;