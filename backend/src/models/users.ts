import sequelize, { DataTypes } from "../database/db";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "El nombre no puede estar vacío" },
      len: {
        args: [3, 15],
        msg: "El nombre debe tener entre 3 y 15 caracteres",
      },
    },
  },

  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "El apellido no puede estar vacío" },
      len: {
        args: [3, 15],
        msg: "El nombre debe tener entre 3 y 15 caracteres",
      },
    },
  },

  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "El número de teléfono no puede estar vacío" },
      isNumeric: { msg: "El número de teléfono solo puede contener dígitos" },
      len: {
        args: [10, 15],
        msg: "El número de teléfono debe tener entre 10 y 15 dígitos",
      },
    },
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: "Debe ser un formato de email válido" },
    },
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "La contraseña no puede estar vacía" },
      len: {
        args: [8, 100],
        msg: "La contraseña debe tener al menos 8 caracteres",
      },
    },
  },

  registrationType: {
    type: DataTypes.ENUM("Client", "Seller", "Admin"),
    allowNull: false,
  },
});

export default User;
