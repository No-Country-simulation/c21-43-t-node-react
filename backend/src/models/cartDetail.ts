import sequelize, { DataTypes } from "../database/db";

const CartDetail = sequelize.define("CartDetail", {
    id:{
       type: DataTypes.UUID,
       defaultValue: DataTypes.UUIDV4,
       primaryKey: true, 
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            isInt:{
                msg:"El valor debe ser un número entero"
            }
        }
    }
});

export default CartDetail;
