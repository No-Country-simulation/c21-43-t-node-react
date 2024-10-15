import Category from "./category";
import Products from "./products";
import Stock from "./stock";


Products.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Products, { foreignKey: 'categoryId' });

Products.hasOne(Stock, { foreignKey: 'productId' });
Stock.belongsTo(Products, { foreignKey: 'productId' });

export { Products, Category, Stock };