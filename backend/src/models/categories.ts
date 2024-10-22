import sequelize, { DataTypes } from "../database/db";

const Category = sequelize.define("Category", {
    id:{
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    }
});

export default Category;
