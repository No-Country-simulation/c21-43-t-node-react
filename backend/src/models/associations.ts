import User from "./users";
import Cart from "./cart";
import Review from "./reviews";
import Product from "./products";
import CartDetail from "./cartDetail";
import Order from "./orders";
import Category from "./categories";

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

Product.hasMany(Review);
Review.belongsTo(Product);

// CartDetail.hasMany(Product);
// Product.belongsTo(CartDetail);

Cart.hasMany(CartDetail);
CartDetail.belongsTo(Cart);

Order.hasOne(Cart);
Cart.belongsTo(Order);

Category.hasMany(Product);
Product.belongsTo(Category);


export { User, Cart, Product, Review, Order, CartDetail, Category };