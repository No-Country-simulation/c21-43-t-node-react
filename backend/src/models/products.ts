import { Model, DataTypes } from "sequelize";
import sequelize from "../database/db";

// Define la interfaz que extiende de Model
export interface ProductData extends Model {
    id?: string;          // UUID
    name: string;        // Nombre del producto
    description: string; // Descripción del producto
    price: number;       // Precio del producto
    image: string;       // URL de la imagen
    stock: number;       // Stock disponible
    categoryId: string[]; // Array de IDs de categorías
}

// Define el modelo Product
const Product = sequelize.define<ProductData>("Product", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            isDecimal: {
                msg: "El precio debe ser un número decimal",
            },
            min: {
                args: [0],
                msg: "El precio no puede ser menor que 0",
            },
        },
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: {
                msg: "La imagen debe ser una URL válida",
            },
        },
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: "El stock debe ser un número entero",
            },
            min: {
                args: [0],
                msg: "El stock no puede ser menor que 0",
            },
        },
    },
}, {
    paranoid: true, // Si deseas utilizar el soft delete
    timestamps: true, // Para habilitar createdAt y updatedAt
});

// Exportar el modelo Product
export default Product;