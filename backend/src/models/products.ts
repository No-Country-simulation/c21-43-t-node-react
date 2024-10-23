import sequelize, { DataTypes } from "../database/db";

const Product = sequelize.define("Product", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    price:{
        type: DataTypes.DECIMAL,
        allowNull: false,
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
    stock:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            isInt: {
                msg: "El stock debe ser un número entero"
            },
            min:0
        }
    }
},
{
    paranoid:true,
    timestamps:true
}
);

export default Product;
