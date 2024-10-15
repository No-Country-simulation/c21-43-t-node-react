import User from "./users";
import Cart from "./cart";
import Review from "./reviews";
import Product from "./products";
import Stock from "./stock";
import CartDetail from "./cartDetail";
import Order from "./orders";
import Category from "./categories";

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

Product.hasMany(Review);
Review.belongsTo(Product);

CartDetail.hasMany(Product);
Product.belongsTo(CartDetail);

Cart.hasMany(CartDetail);
CartDetail.belongsTo(Cart);

Order.hasOne(Cart);
Cart.belongsTo(Order);

Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasOne(Stock);
Stock.belongsTo(Product);

export { User, Cart, Product, Stock, Review, Order, CartDetail, Category };
