import sequelize, { DataTypes } from "../database/db";

const Auth = sequelize.define("Auth", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "La contraseña no puede estar vacía" },
    },
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: { msg: "El id de ususario es requerido" },
    },
  },

  token: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "El token es requerido" },
    },
  },
});

export default Auth;