import sequelize, { DataTypes } from "../database/db";


const Category = sequelize.define("Category",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,   
    },
    name:{type: DataTypes.STRING, allowNull:false}
})


export default Category