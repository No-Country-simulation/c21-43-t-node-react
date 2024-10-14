import sequelize, { DataTypes } from "../database/db";

const Cart = sequelize.define("Cart", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

export default Cart;