import { Sequelize, DataTypes, Model } from "sequelize";

const sequelize = new Sequelize(``);

async function authenticate() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export { DataTypes, Model };
export default sequelize;
