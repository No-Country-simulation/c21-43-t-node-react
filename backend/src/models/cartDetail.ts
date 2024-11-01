import { Model, DataTypes } from "sequelize";
import sequelize from "../database/db";

// Define la interfaz que extiende de Model
export interface CartDetailData extends Model {
    id?: string;       // UUID
    CartId: string;    // Id del carrito
    ProductId: string; // Id del producto
    quantity: number;  // Cantidad
}

// Define el modelo CartDetail
const CartDetail = sequelize.define<CartDetailData>("CartDetail", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: "El valor debe ser un número entero",
            },
            min: {
                args: [1], // Puedes agregar una validación mínima si lo deseas
                msg: "La cantidad debe ser al menos 1",
            },
        },
    },
}, {
    // Opciones del modelo
    paranoid: false, // Si deseas utilizar el soft delete
    timestamps: true, // Para habilitar createdAt y updatedAt
});

export default CartDetail;