import sequelize, { DataTypes } from "../database/db";

const Order = sequelize.define("Order", {
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
    },
    orderDate:{
        type: DataTypes.DATE,
        allowNull: false,
        validate:{
            isDate: {
                args:true,
                msg: "El campo debe ser una fecha valida"
            }
        }
    },
    shippingAddress:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: {
                msg: "La dirección de envío no puede estar vacía"
            }
        }
    },
    totalAmount:{
        type: DataTypes.DECIMAL(10,2),
        allowNull:false,
        validate:{
            isDecimal:{
                msg: "El campo debe ser un numero decimal con un máximo  de 10 dígitos en total y 2 decimales"
            },
            min:{
                args: [0],
                msg: "El campo no puede ser menor que 0"
            }
        }
    }
}
);

export default Order;
