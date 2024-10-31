import User from "./users";
import Cart from "./cart";
import Review from "./reviews";
import Product from "./products";
import CartDetail from "./cartDetail";
import Order from "./orders";
import Category from "./categories";
import Auth from "./auth";

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

Product.hasMany(Review);
Review.belongsTo(Product);


Cart.belongsToMany(Product,{through:CartDetail}); //Un carrito puede tener muchos Productos
Product.belongsToMany(Cart,{through:CartDetail}); //Un producto puede estar en muchos carritos


Cart.hasMany(Order);
Order.belongsTo(Cart);

// User.hasMany(Order);
// Order.belongsTo(User);

Product.belongsToMany(Category,{through: "ProductCategory"});
Category.belongsToMany(Product,{through: "ProductCategory"});


User.hasOne(Auth, { foreignKey: 'userId', as: 'auth' });
Auth.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { User, Cart, Product, Review, Order, CartDetail, Category, Auth };
